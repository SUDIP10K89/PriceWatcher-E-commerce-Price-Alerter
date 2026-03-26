from db import init_db, add_product, get_product_by_url
from scraper import scrape_product

init_db()


PRODUCT_NAME = "Test Book"
PRODUCT_URL = "https://books.toscrape.com/catalogue/soumission_998/index.html"
PRODUCT_SITE = "books.toscrape.com"
TARGET_PRICE = 20.00


product = get_product_by_url(PRODUCT_URL)

if product:
    product_id = product[0]
    print(f"Product already exists with ID: {product_id}")
else:
    product_id = add_product(
        name=PRODUCT_NAME,
        url=PRODUCT_URL,
        site=PRODUCT_SITE,
        target_price=TARGET_PRICE
    )
    print(f"Product added with ID: {product_id}")


scrape_product(product_id, PRODUCT_URL)