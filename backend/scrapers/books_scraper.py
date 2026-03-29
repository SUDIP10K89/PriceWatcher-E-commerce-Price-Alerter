from bs4 import BeautifulSoup
from utils import fetch_with_retry, random_delay
from logger import logger


def get_price(url):
    html = fetch_with_retry(url)

    if not html:
        logger.error(f"Failed to fetch page: {url}")
        return None

    soup = BeautifulSoup(html, "html.parser")

    price_tag = soup.select_one(".price_color")
    if not price_tag:
        logger.error("Price element not found")
        return None

    price_text = price_tag.get_text().strip()
    price = float(price_text.replace("Â£", "").replace(",", ""))

    logger.info(f"Scraped price: {price}")

    random_delay(1, 3)  

    return price