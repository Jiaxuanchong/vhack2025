from fastapi import FastAPI
import requests
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load the tokenizer and fine-tuned model
tokenizer = AutoTokenizer.from_pretrained('yiyanghkust/finbert-pretrain')
model_path = "likith123/SSAF-FinBert"
model = AutoModelForSequenceClassification.from_pretrained(model_path)

def predict_sentiment(input_text):
    inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    predicted_probs = torch.softmax(outputs.logits, dim=1).squeeze().tolist()
    
    # Map sentiment scores to labels
    labels = ["Negative", "Neutral", "Positive"]
    sentiment_label = labels[predicted_probs.index(max(predicted_probs))]
    
    return sentiment_label

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
            formatted_date = datetime.utcfromtimestamp(published_date).strftime('%d %b %Y')
            sentiment_label = predict_sentiment(title)
            
            # Try to get the image first
            image_url = None
            if "thumbnail" in item:
                image_resolutions = item["thumbnail"].get("resolutions", [])
                if image_resolutions:
                    image_url = image_resolutions[0].get("url", None)

            # If no image, check for video thumbnail
            if not image_url and "video" in item:
                video_resolutions = item["video"].get("thumbnail", {}).get("resolutions", [])
                if video_resolutions:
                    image_url = video_resolutions[0].get("url", None)

            # If no image or video thumbnail, set a default placeholder
            if not image_url:
                image_url = "https://via.placeholder.com/300"  # Default placeholder image
            
            results.append({
                "title": title,
                "publisher": publisher,
                "link": link,
                "published_date": formatted_date,
                "sentiment": sentiment_label,
                "image": image_url  # Add image URL
            })
        
        return {"news_sentiment": results}
    else:
        return {"error": "Failed to fetch data", "status_code": response.status_code}

#uvicorn news:app --reload --port 8001 