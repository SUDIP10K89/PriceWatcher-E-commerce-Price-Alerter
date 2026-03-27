from scrapers.books_scraper import get_price as books_price
# future:
# from scrapers.amazon_scraper import get_price as amazon_price
# from scrapers.ebay_scraper import get_price as ebay_price

from logger import logger
from db import add_price, get_last_price, get_product
from alerts import send_email_alert


def scrape_product(product_id, url, site):
    if site == "books.toscrape.com":
        price = books_price(url)
    else:
        logger.info("No scraper for site: %s", site)
        return

    if price is None:
        logger.error("Failed to get price")
        return

    last_price = get_last_price(product_id)

    if last_price is not None and float(last_price) == price:
        logger.info("Price unchanged")
        return

    add_price(product_id, price)
    logger.info("New price stored: %s", price)

    product = get_product(product_id)
    if product:
        name, target_price = product
        if price <= float(target_price):
            send_email_alert(name, price, url)