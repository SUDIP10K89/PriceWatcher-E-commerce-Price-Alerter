from db import init_db, add_product

init_db()

# add_product(
#     name="Test Book",
#     url="https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html",
#     site="books.toscrape.com",
#     target_price=20.00
# )

add_product(
    name="Test Daraz",
    url="https://www.daraz.com.np/products/professional-noise-cancellation-clip-collar-mic-condenser-for-youtube-video-interviews-lectures-news-travel-videos-ideal-for-mobile-use-i111626830-s1030227632.html?scm=1007.51610.379274.0&pvid=0ce62b21-abba-4596-ae73-20262d11890d&search=flashsale&spm=a2a0e.tm80335409.FlashSale.d_111626830",
    site="daraz",
    target_price=300
)

print("Product added. Scheduler will handle price checks.")