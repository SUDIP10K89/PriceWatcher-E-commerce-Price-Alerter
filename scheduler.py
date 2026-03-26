from apscheduler.schedulers.blocking import BlockingScheduler
from db import get_connection
from scraper import scrape_product


def run_price_check():
    print("Running scheduled price check...")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, url FROM products")
    products = cursor.fetchall()

    for product in products:
        product_id, url = product
        scrape_product(product_id, url)

    cursor.close()
    conn.close()


def start_scheduler():
    scheduler = BlockingScheduler()

    
    scheduler.add_job(run_price_check, 'interval', hours=1)

    print("Scheduler started. Running every hour...")
    scheduler.start()


if __name__ == "__main__":
    run_price_check()
    # start_scheduler()