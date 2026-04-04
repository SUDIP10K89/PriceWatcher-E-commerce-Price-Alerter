from scraper_manager import scrape_product
from logger import logger

def scrape_job(product_id, url, site):
    logger.info(f"Worker starting scrape for {product_id} ({site})")
    scrape_product(product_id, url, site)
