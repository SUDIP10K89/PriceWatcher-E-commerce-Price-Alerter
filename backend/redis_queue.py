import redis
import os
from dotenv import load_dotenv

load_dotenv()

def get_redis_conn():
    return redis.Redis(
        host=os.getenv("REDIS_HOST"),
        port=int(os.getenv("REDIS_PORT", "17996")),
        username="default",
        password=os.getenv("REDIS_PASSWORD"),
        decode_responses=True
    )
