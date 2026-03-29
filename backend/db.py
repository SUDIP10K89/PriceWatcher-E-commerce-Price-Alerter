import psycopg2
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
    cursor = conn.cursor()

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
        product_id INT REFERENCES products(id),
        price NUMERIC(10,2) NOT NULL,
        date_checked TIMESTAMP DEFAULT NOW()
    );
    """)

    conn.commit()
    cursor.close()
    conn.close()
    print("Database tables created successfully!")


def add_product(name, url, site, target_price):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO products (name, url, site, target_price)
        VALUES (%s, %s, %s, %s) RETURNING id
    """, (name, url, site, target_price))
    product_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()
    return product_id


def add_price(product_id, price):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO price_history (product_id, price)
        VALUES (%s, %s)
    """, (product_id, price))
    conn.commit()
    cursor.close()
    conn.close()

def get_last_price(product_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT price FROM price_history
        WHERE product_id = %s
        ORDER BY date_checked DESC
        LIMIT 1
    """, (product_id,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    return result[0] if result else None


def get_product(product_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT name, target_price FROM products
        WHERE id = %s
    """, (product_id,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    return result
