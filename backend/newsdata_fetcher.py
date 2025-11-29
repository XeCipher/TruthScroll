import requests

# ---- OPTIONAL: Fix IPv6 DNS issue on some ISPs ----
requests.packages.urllib3.util.connection.HAS_IPV6 = False

API_KEY = "pub_df00b8afa60b4c0aad1a70455d6e9f1a"

BASE_URL = "https://newsdata.io/api/1/news"
PARAMS = {
    "apikey": API_KEY,
    "country": "in",
    "language": "en",
    "category": "world"
}

def fetch_latest_indian_news():
    try:
        print("\n🔍 Fetching Indian News...")

        # 👇 NO PAGE PARAMETER ADDED
        response = requests.get(BASE_URL, params=PARAMS, timeout=10)
        response.raise_for_status()

        data = response.json()
        return data.get("results", [])

    except requests.exceptions.RequestException as e:
        print("❌ Network / API Error:", e)
        return []


def display_news(news_list):
    print("\n📰 TOP LATEST INDIAN NEWS:\n")

    for i, news in enumerate(news_list, start=1):
        print(f"#{i}. {news.get('title')}")
        print(f"Source: {news.get('source_id')}")
        print(f"Published: {news.get('pubDate')}")
        print(f"Link: {news.get('link')}")
        print("-" * 60)


if __name__ == "__main__":
    print("🚀 Starting TruthScroll Indian News Fetcher...")
    news = fetch_latest_indian_news()

    if news:
        display_news(news)
    else:
        print("❌ No news to display.")
