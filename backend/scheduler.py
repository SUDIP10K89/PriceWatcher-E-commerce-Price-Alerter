from apscheduler.schedulers.blocking import BlockingScheduler
from redis_queue import get_redis_conn
import rq_compat 
from rq.queue import Queue
from worker_tasks import scrape_job
from db import get_connection

def run_price_check():
    print("Running scheduled price check...")
    redis_conn = get_redis_conn()
    queue = Queue(connection=redis_conn)

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, url, site FROM products")
    products = cursor.fetchall()

    for product in products:
        product_id, url, site = product
        queue.enqueue(scrape_job, product_id, url, site)

    cursor.close()
    conn.close()
    print(f"{len(products)} jobs enqueued.")

def start_scheduler():
    scheduler = BlockingScheduler()
    scheduler.add_job(run_price_check, 'interval', hours=1)
    print("Scheduler started...")
    scheduler.start()


if __name__ == "__main__":
    start_scheduler()



