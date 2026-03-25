import psycopg2
from decimal import Decimal
from config import DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD

def get_connection():
    
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        return conn
    except Exception as e:
        print("Error connecting to PostgreSQL:", e)
        return None


def init_db():
    
    conn = get_connection()
    if not conn:
        return
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS products (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    url TEXT NOT NULL,
                    site VARCHAR(100) NOT NULL,
                    target_price NUMERIC(10,2) NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW()
                );
            """)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS price_history (
                    id SERIAL PRIMARY KEY,
                    product_id INT REFERENCES products(id) ON DELETE CASCADE,
                    price NUMERIC(10,2) NOT NULL,
                    date_checked TIMESTAMP DEFAULT NOW()
                );
            """)
        conn.commit()
        print("Database tables created successfully!")
    finally:
        conn.close()


def add_product(name: str, url: str, site: str, target_price: float) -> int:
   
    conn = get_connection()
    if not conn:
        raise RuntimeError("Failed to connect to database")
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO products (name, url, site, target_price)
                VALUES (%s, %s, %s, %s) RETURNING id
                """,
                (name, url, site, Decimal(target_price))
            )
            product_id = cursor.fetchone()[0]
        conn.commit()
        return product_id
    finally:
        conn.close()


def add_price(product_id: int, price: float):
    
    conn = get_connection()
    if not conn:
        raise RuntimeError("Failed to connect to database")
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO price_history (product_id, price)
                VALUES (%s, %s)
                """,
                (product_id, Decimal(price))
            )
        conn.commit()
    finally:
        conn.close()


if __name__ == "__main__":
    init_db()
    print("Database initialized and ready!")