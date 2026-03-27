import requests
from bs4 import BeautifulSoup


def get_price(url):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return None

    soup = BeautifulSoup(response.text, "html.parser")

    price_tag = soup.select_one(".price_color")
    if not price_tag:
        return None

    price_text = price_tag.get_text().strip()
    price = float(price_text.replace("Â£", "").replace(",", ""))

    return price

