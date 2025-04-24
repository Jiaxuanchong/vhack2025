from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException
import openai
import requests
from news1 import predict_sentiment
from datetime import datetime
from pydantic import BaseModel
from prompt_templates import build_messages
from openai import OpenAIError

APP_NAME = "vhack2025 API"     # Name of the app
APP_DESCRIPTION = """
vhack2025 backend service  
- Provides endpoints for chat-style prompt completion  
- Integrates with your Llama-based prompt_templates  
- Designed to run under Uvicorn with hot reload  
"""

# Create FastAPI app
app = FastAPI(
    title=APP_NAME,
    description=APP_DESCRIPTION,
    version="0.1.0",
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
    
class ChatRequest(BaseModel):
    query: str
    context: Optional[List[str]] = []

@app.post("/chat/openai")
async def chat_openai(request: ChatRequest):
    try:
        # ←— NEW v1 interface here:
        resp = openai.chat.completions.create(
            model="gpt-4",
            messages=build_messages(request.query, request.context),
            temperature=0.7,
            max_tokens=512,
            n=1,
            stream=False
        )

    except OpenAIError as e:
        # ←— catches all API-level errors
        raise HTTPException(status_code=502, detail=f"OpenAI API error: {e}")
    except Exception as e:
        # ←— any other unexpected failure
        raise HTTPException(status_code=500, detail="Internal server error")
    
    # Extract the actual response content
    assistant_message = resp.choices[0].message.content
        
    # Return the response to the frontend
    return {"response": assistant_message}


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