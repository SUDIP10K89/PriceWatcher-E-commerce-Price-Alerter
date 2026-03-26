import requests
from bs4 import BeautifulSoup
from db import add_price, get_last_price, get_product
from alerts import send_email_alert

def scrape_product(product_id, url):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            print(f"Failed to fetch {url}, status: {response.status_code}")
            return None

        soup = BeautifulSoup(response.text, 'html.parser')

        price_tag = soup.select_one(".price_color")
        if not price_tag:
            print("Price element not found")
            return None

        price_text = price_tag.get_text().strip()
        price = float(price_text.replace("Â£", "").replace(",", ""))

        
        last_price = get_last_price(product_id)

        if last_price is not None and float(last_price) == price:
            print("Price unchanged. Skipping insert.")
            return price

       
        add_price(product_id, price)
        print(f"New price stored: {price}")

        product = get_product(product_id)
        
        if product:
            name, target_price = product
            if price <= float(target_price):
                print(f"PRICE DROP ALERT for {name}! Price = {price}")
                send_email_alert(name, price, url)

        return price

    except Exception as e:
        print("Error scraping product:", e)
        return None