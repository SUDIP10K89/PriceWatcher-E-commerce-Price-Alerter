from db import init_db, add_product
from scraper import scrape_product

init_db()


product_id = add_product(
    name="Test Book",
    url="https://books.toscrape.com/catalogue/soumission_998/index.html",
    site="books.toscrape.com",
    target_price=20.00
)

print("Product added with ID:", product_id)

scrape_product(
    product_id,
    "https://books.toscrape.com/catalogue/the-coming-woman-a-novel-based-on-the-life-of-the-infamous-feminist-victoria-woodhull_993/index.html"
)