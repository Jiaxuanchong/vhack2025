import requests
from transformers import pipeline
from fastapi import FastAPI
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
from pydantic import BaseModel

# Initialize FastAPI
app = FastAPI()

# Load the tokenizer and fine-tuned FinBERT model
tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")

# Define request body schema
class SentimentRequest(BaseModel):
    headline: str

def predict_sentiment(input_text):
    """Predict sentiment using FinBERT model."""
    inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    
    with torch.no_grad():
        outputs = model(**inputs)
    
    predicted_probs = torch.softmax(outputs.logits, dim=1).squeeze().tolist()

    # Sentiment labels mapping for FinBERT
    labels = ["Negative", "Neutral", "Positive"]

    # Determine the highest probability label
    max_index = predicted_probs.index(max(predicted_probs))
    overall_sentiment = labels[max_index]

    # Create response dictionary
    sentiment_response = {
        "Headline": input_text,
        "Negative": predicted_probs[0],  
        "Neutral": predicted_probs[1],   
        "Positive": predicted_probs[2],  
        "Overall Sentiment": overall_sentiment
    }

    return sentiment_response

# API Endpoint for Sentiment Analysis
@app.post("/sentiment/")
async def analyze_sentiment(request: SentimentRequest):
    return predict_sentiment(request.headline)



# API Route to Fetch Bitcoin News from Yahoo Finance
@app.get("/bitcoin-news-sentiment")
async def bitcoin_news_sentiment():
    url = "https://query1.finance.yahoo.com/v1/finance/search?q=bitcoin&newsCount=10"
    headers = {"User-Agent": "Mozilla/5.0"}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        news_items = data.get("news", [])

        results = []
        for item in news_items:
            title = item.get("title", "")
            publisher = item.get("publisher", "")
            link = item.get("link", "")
            published_date = item.get("providerPublishTime", "")
            sentiment_data = predict_sentiment(title)

            results.append({
                "title": title,
                "publisher": publisher,
                "link": link,
                "published_date": published_date,
                "sentiment_label": sentiment_data["Overall Sentiment"]
            })

        return {"news_sentiment": results}
    else:
        return {"error": "Failed to fetch data", "status_code": response.status_code}
    
    
#uvicorn news:app --reload --port 8001 
# Run into new port


