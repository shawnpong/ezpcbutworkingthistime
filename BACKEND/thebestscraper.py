import os
import django
import asyncio
from django.db import connection
from asgiref.sync import sync_to_async
import httpx
from bs4 import BeautifulSoup
import re

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")
django.setup()

# Convert the populate_sizes_and_manufacturers function to an asynchronous version
def populate_sizes_and_manufacturers():
    with connection.cursor() as cursor:
        cursor.execute(
            'INSERT INTO "myapp_sizes" ("Size") '
            'SELECT DISTINCT "Size" FROM "myapp_mymodel";'
        )
        cursor.execute(
            'INSERT INTO "myapp_manufacturers" ("Manufacturer") '
            'SELECT DISTINCT "Manufacturer" FROM "myapp_mymodel";'
        )

api_url = "http://127.0.0.1:8000/"
url = "https://www.pc-kombo.com/us/components/cases"

# This function processes each link asynchronously and extracts data from the web page.
async def process_link(link, mymodels):
    try:
        async with httpx.AsyncClient(
            timeout=30
        ) as client:  # Increase the timeout value
            response_inner = await client.get(link)
            html_content_inner = response_inner.content
            soup_inner = BeautifulSoup(html_content_inner, "html.parser")

            # Extract name from the web page
            names = soup_inner.find("h1", itemprop="name").text.strip()
            print("Name:", names)

            # Extract link from the web page
            link_tag = soup_inner.find("a", itemprop="url")
            if link_tag:
                link = link_tag["href"]
                print("Link:", link)
            else:
                print("No matching tag found.")
                link = None

            # Extract size from the web page
            asds = soup_inner.find_all("div", class_="card-body")
            for asd in asds:
                dt_tags = asd.find_all("dt", string="Motherboard")
                for dt_tag in dt_tags:
                    dd_tag = dt_tag.find_next_sibling("dd")
                    if dd_tag:
                        size = dd_tag.text.strip()
                        print("Size:", size)
                        # sizes.append({"Size": size})

            # Extract GPU length from the web page
            for asd in asds:
                dt_tags = asd.find_all("dt", string="Supported GPU length")
                for dt_tag in dt_tags:
                    dd_tag = dt_tag.find_next_sibling("dd")
                    if dd_tag:
                        gpu_text = dd_tag.text.strip()
                        gpu_match = re.search(r"\d+", gpu_text)
                        if gpu_match:
                            gpu = int(gpu_match.group())
                            print("GPU:", gpu)
                        else:
                            print("No GPU length number found.")
                            gpu = None

            # Extract manufacturer from the web page
            manufacturer = None
            for asd in asds:
                dt_tags = asd.find_all("dt", string="Producer")
                for dt_tag in dt_tags:
                    dd_tag = dt_tag.find_next_sibling("dd")
                    if dd_tag:
                        manufacturer = dd_tag.text.strip()
                        print("Manufacturer:", manufacturer)
                        # manufacturers.append({"Manufacturer": manufacturer})

            # Store the extracted data in the mymodel dictionary
            mymodel = {
                "Manufacturer": manufacturer,
                "Name": names,
                "Size": size,
                "GPU": gpu,
                "Link": link,
            }
            mymodels.append(mymodel)
    except httpx.ReadTimeout:
        print("Timeout occurred for link:", link)
    except Exception as e:
        print("Error accessing link:", link)
        print("Error details:", e)


# This function inserts data into the respective API endpoints in batches.
async def insert_data(mymodels):
    headers = {"Accept": "application/json", "Content-Type": "application/json"}

    # Insert mymodel data into the API
    async with httpx.AsyncClient() as batch_client:
        response = await batch_client.post(
            api_url + "mymodel/batch_create/", json=mymodels, headers=headers
        )
        if response.status_code == 200:
            print("mymodels inserted successfully")
        else:
            print("mymodels failed to insert data")

# The main asynchronous function that initiates the web scraping process.
async def main():
    # Fetch the main web page
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        html_content = response.content
        soup = BeautifulSoup(html_content, "html.parser")

    mymodels = []

    tasks = []
    batch_size = 100
    batch_delay = 0  # Seconds to wait between batches

    # Loop through each link and create tasks to process them
    for div_element in soup.find_all("div", class_="column col-10 col-lg-8 col-sm-12"):
        for link in div_element.find_all("a"):
            href = link.get("href")
            tasks.append(process_link(href, mymodels))

            # When the batch size is reached, process the batch, insert data, and wait before the next batch
            if len(tasks) == batch_size:
                await asyncio.gather(*tasks)
                tasks = []
                print(f"Processed {batch_size} links.")

                # Insert data after processing each batch
                await insert_data(mymodels)
                mymodels = []

                print(f"Waiting {batch_delay} seconds before the next batch...")
                await asyncio.sleep(batch_delay)

    # Process any remaining links in the last batch
    if tasks:
        await asyncio.gather(*tasks)

    # Insert data for the last batch
    await insert_data(mymodels)
    await sync_to_async(populate_sizes_and_manufacturers)()  # Call the synchronous function directly


# Run the main function to start the web scraping process.
asyncio.run(main())

