import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO


def send_email_alert(product_name, price, url):
    try:
        subject = f"Price Drop Alert: {product_name}"
        body = f"""
        Price dropped for {product_name}!

        Current Price: {price}
        Product URL: {url}
        """

        msg = MIMEMultipart()
        msg["From"] = EMAIL_USER
        msg["To"] = EMAIL_TO
        msg["Subject"] = subject

        msg.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)
        server.quit()

        print("Email alert sent!")

    except Exception as e:
        print("Failed to send email:", e)