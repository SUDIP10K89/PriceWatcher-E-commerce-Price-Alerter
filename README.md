# PriceWatcher

A Python application that monitors product prices from websites and sends email alerts when prices drop below your target.

## Features

- Web scraping to fetch current product prices
- Price history tracking in PostgreSQL database
- Email notifications when prices fall below target
- Scheduled price checks (configurable interval)

## Requirements

- Python 3+
- PostgreSQL database
- Required packages (see `requirements.txt`)

## Installation

```bash
pip install -r requirements.txt
```

## Configuration

Create a `.env` file with your database and email settings:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pricewatcher
DB_USER=your_user
DB_PASSWORD=your_password

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_TO=alert_recipient@example.com
```

## Usage

Add a product to track:

```python
from db import init_db, add_product

init_db()

add_product(
    name="Product Name",
    url="https://example.com/product",
    site="example.com",
    target_price=99.99
)
```

Run a price check:

```bash
python scheduler.py
```

## Project Structure

- `main.py` - Entry point for adding products
- `scraper.py` - Web scraping logic
- `scheduler.py` - Scheduled price checking
- `db.py` - Database operations
- `alerts.py` - Email notification handling
- `config.py` - Configuration management

## License

MIT
