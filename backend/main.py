from fastapi import FastAPI
from models import NewsRequest
from sentiment import get_sentiment

# Initialize FastAPI app
app = FastAPI()

# API Route for sentiment analysis
@app.post("/analyze")
async def analyze_sentiment(news: NewsRequest):
    sentiment = get_sentiment(news.headline)
    return {"headline": news.headline, "sentiment": sentiment}

# Run the server with: uvicorn main:app --reload
