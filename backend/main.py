# from fastapi import FastAPI
# from models import NewsRequest
# from sentiment import get_sentiment
# import requests
# from transformers import pipeline

# Initialize fastapi
# app = FastAPI()

# API Route to Fetch Bitcoin News from Yahoo Finance
# @app.get("/fetching-bitcoin-news")
# async def fetching_bitcoin_news():
#     url = "https://query1.finance.yahoo.com/v1/finance/search?q=bitcoin&newsCount=10"
#     headers = {"User-Agent": "Mozilla/5.0"}

#     response = requests.get(url, headers=headers)

#     if response.status_code == 200:
#         data = response.json()
#         news_items = data.get("news", [])

#         results = [
#             {
#                 "title": item["title"],
#                 "publisher": item["publisher"],
#                 "link": item["link"],
#                 "published_date": item["providerPublishTime"],
#             }
#             for item in news_items
#         ]
#         return {"news": results}
#     else:
#         return {"error": "Failed to fetch data", "status_code": response.status_code}
    
# # API Route for sentiment analysis
# @app.post("/analyze")
# async def analyze_sentiment(news: NewsRequest):
#     sentiment = get_sentiment(news.headline)
#     return {"headline": news.headline, "sentiment": sentiment}

# Run the server with: uvicorn main:app --reload
