from db import init_db, add_product

init_db()

add_product(
    name="Test Book",
    url="https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html",
    site="books.toscrape.com",
    target_price=20.00
)

print("Product added. Scheduler will handle price checks.")