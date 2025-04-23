from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

import requests
from news1 import predict_sentiment
from config import APP_NAME, APP_VERSION, APP_DESCRIPTION
from datetime import datetime

# Create FastAPI app
app = FastAPI(
    title=APP_NAME,
    description=APP_DESCRIPTION,
    version=APP_VERSION
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8001"],  # In production, this should be restricted
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/bitcoin-news-sentiment")  
async def bitcoin_news_sentiment():
    url = "https://query1.finance.yahoo.com/v1/finance/search?q=bitcoin&newsCount=5"
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
            sentiment_label, impact_percentage = predict_sentiment(title)
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
                "image": image_url,  # Add image URL
                "impact_percentage": round(impact_percentage, 2)
            })
        
        return {"news_sentiment": results}
    else:
        return {"error": "Failed to fetch data", "status_code": response.status_code}

# Initialize directories
def initialize_app():
    """Create necessary directories on startup."""
    directories = [
        "documents",
        "vector_store"
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)

# Initialize the app on startup
initialize_app()

# Run the app with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)