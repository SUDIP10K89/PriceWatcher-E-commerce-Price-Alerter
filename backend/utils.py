import random
import time
import requests

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Mozilla/5.0 (X11; Linux x86_64)",
]

def get_random_user_agent():
    return random.choice(USER_AGENTS)

def random_delay(min_delay=1, max_delay=3):
    delay = random.uniform(min_delay, max_delay)
    time.sleep(delay)

def fetch_with_retry(url, max_retries=3, timeout=10):
    for attempt in range(max_retries):
        try:
            headers = {
                "User-Agent": get_random_user_agent()
            }

            response = requests.get(url, headers=headers, timeout=timeout)

            if response.status_code == 200:
                return response.text
            else:
                print(f"[Retry {attempt+1}] Status code: {response.status_code}")

        except Exception as e:
            print(f"[Retry {attempt+1}] Error: {e}")

        random_delay(1, 2)

    print("Failed after retries:", url)
    return None