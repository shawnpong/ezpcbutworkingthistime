import asyncio
import httpx
from bs4 import BeautifulSoup
import re

api_url = 'http://127.0.0.1:8000/'
url = "https://www.pc-kombo.com/us/components/cases"

async def process_link(link, mymodels, manufacturers, sizes):
    try:
        async with httpx.AsyncClient(timeout=30) as client:  # Increase the timeout value
            response_inner = await client.get(link)
            html_content_inner = response_inner.content
            soup_inner = BeautifulSoup(html_content_inner, 'html.parser')

            names = soup_inner.find('h1', itemprop='name').text.strip()
            print("Name:", names)

            link_tag = soup_inner.find('a', itemprop='url')
            if link_tag:
                link = link_tag['href']
                print("Link:", link)
            else:
                print("No matching tag found.")
                link = None

            asds = soup_inner.find_all('div', class_='card-body')
            for asd in asds:
                dt_tags = asd.find_all('dt', string='Motherboard')
                for dt_tag in dt_tags:
                    dd_tag = dt_tag.find_next_sibling('dd')
                    if dd_tag:
                        size = dd_tag.text.strip()
                        print("Size:", size)
                        sizes.append({'Size': size})

            for asd in asds:
                dt_tags = asd.find_all('dt', string='Supported GPU length')
                for dt_tag in dt_tags:
                    dd_tag = dt_tag.find_next_sibling('dd')
                    if dd_tag:
                        gpu_text = dd_tag.text.strip()
                        gpu_match = re.search(r'\d+', gpu_text)
                        if gpu_match:
                            gpu = int(gpu_match.group())
                            print("GPU:", gpu)
                        else:
                            print("No GPU length number found.")
                            gpu = None

            manufacturer = None
            for asd in asds:
                dt_tags = asd.find_all('dt', string='Producer')
                for dt_tag in dt_tags:
                    dd_tag = dt_tag.find_next_sibling('dd')
                    if dd_tag:
                        manufacturer = dd_tag.text.strip()
                        print("Manufacturer:", manufacturer)
                        manufacturers.append({'Manufacturer': manufacturer})

            mymodel = {
                'Manufacturer': manufacturer,
                'Name': names,
                'Size': size,
                'GPU': gpu,
                'Link': link
            }
            mymodels.append(mymodel)
    except httpx.ReadTimeout:
        print("Timeout occurred for link:", link)
    except Exception as e:
        print("Error accessing link:", link)
        print("Error details:", e)
        
async def insert_data(mymodels, manufacturers, sizes):
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    sizes = [dict(t) for t in {tuple(d.items()) for d in sizes}]
    manufacturers = [dict(t) for t in {tuple(d.items()) for d in manufacturers}]

    async with httpx.AsyncClient() as batch_client:
        response = await batch_client.post(api_url + "mymodel/batch_create/", json=mymodels, headers=headers)
        print(response.content)
        if response.status_code == 200:
            print("mymodels inserted successfully")
        else:
            print("mymodels failed to insert data")

    async with httpx.AsyncClient() as batch_client:
        response = await batch_client.post(api_url + "manufacturers/batch_create/", json=manufacturers, headers=headers)
        print(response.content)
        if response.status_code == 200:
            print("manufacturers inserted successfully")
        else:
            print("manufacturers failed to insert data")

    async with httpx.AsyncClient() as batch_client:
        response = await batch_client.post(api_url + "sizes/batch_create/", json=sizes, headers=headers)
        print(response.content)
        if response.status_code == 200:
            print("sizes inserted successfully")
        else:
            print("sizes failed to insert data")

async def main():
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        html_content = response.content
        soup = BeautifulSoup(html_content, 'html.parser')

    mymodels = []
    manufacturers = []
    sizes = []

    tasks = []
    batch_size = 100
    batch_delay = 1  # Seconds to wait between batches

    for div_element in soup.find_all('div', class_='column col-10 col-lg-8 col-sm-12'):
        for link in div_element.find_all('a'):
            href = link.get('href')
            tasks.append(process_link(href, mymodels, manufacturers, sizes))

            if len(tasks) == batch_size:
                await asyncio.gather(*tasks)
                tasks = []
                print(f"Processed {batch_size} links.")

                # Insert data after processing each batch
                await insert_data(mymodels, manufacturers, sizes)
                mymodels = []
                manufacturers = []
                sizes = []

                print(f"Waiting {batch_delay} seconds before the next batch...")
                await asyncio.sleep(batch_delay)

    # Process any remaining links in the last batch
    if tasks:
        await asyncio.gather(*tasks)

    # Insert data for the last batch
    await insert_data(mymodels, manufacturers, sizes)

asyncio.run(main())
