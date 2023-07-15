import requests
from bs4 import BeautifulSoup
import json

url = "https://www.pc-kombo.com/us/components/cases"
response = requests.get(url)
html_content = response.content
soup = BeautifulSoup(html_content, 'html.parser')

# Parse the connection URL
conn_url = "postgres://casesdb_user:cXFNrwwgVIHyoplFjAsZ0J0lzVXUE3D4@dpg-cigfqqtgkuvojj902dv0-a.singapore-postgres.render.com/casesdb"

div_elements = soup.find_all('div', class_='column col-10 col-lg-8 col-sm-12')
link_count = 0  # Counter to keep track of the number of links processed
for div_element in div_elements:
    for link in div_element.find_all('a'):
        href = link.get('href')
        print(href)
        response_inner = requests.get(href)
        html_content_inner = response_inner.content
        soup_inner = BeautifulSoup(html_content_inner, 'html.parser')

        names = soup_inner.find('h1', itemprop='name').text.strip()
        print("Name:", names)
        asds = soup_inner.find_all('div', class_='card-body')
        for asd in asds:
            dt_tags = asd.find_all('dt', string='Motherboard')
            for dt_tag in dt_tags:
                dd_tag = dt_tag.find_next_sibling('dd')
                if dd_tag:
                    size = dd_tag.text.strip()
                    print("Size:", size)

        manufacturer = None
        for asd in asds:
            dt_tags = asd.find_all('dt', string='Producer')
            for dt_tag in dt_tags:
                dd_tag = dt_tag.find_next_sibling('dd')
                if dd_tag:
                    manufacturer = dd_tag.text.strip()
                    print("Manufacturer:", manufacturer)

        # Insert the extracted data into the database
        # Adjust the code below to fit your database integration method
        payload = {
            # 'MyModelId': '',
            'Manufacturer': manufacturer,
            'Name': names,
            'Size': size
        }
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        api_url = 'https://ezpcdjango.onrender.com/mymodel/'
        # api_url = 'http://127.0.0.1:8000/mymodel/'

        response = requests.post(api_url, data=json.dumps(payload), headers= headers)
        if response.status_code == 200:
            print("Data inserted successfully")
        else:
            print("Failed to insert data")

        link_count += 1  # Increment the link counter

        if link_count >= 3:  # Check if the desired number of links have been processed
            break  # Exit the loop once the limit is reached
    else:
        continue  # Continue to the next iteration of the outer loop
    break  # Exit the outer loop if the limit is reached
