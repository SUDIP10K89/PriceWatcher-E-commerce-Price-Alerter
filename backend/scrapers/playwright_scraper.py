from playwright.sync_api import sync_playwright
from logger import logger


def get_price_playwright(url, price_selector):
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            page.goto(url, timeout=60000)
            page.wait_for_selector(price_selector, timeout=15000)

            price_text = page.locator(price_selector).inner_text()

            browser.close()

            # Clean price text
            price = float(
                price_text.replace("$", "")
                          .replace("£", "")
                          .replace(",", "")
                          .replace("Rs.","")
                          .strip()
            )

            logger.info(f"Playwright scraped price: {price}")
            return price

    except Exception as e:
        logger.error(f"Playwright error: {e}")
        return None