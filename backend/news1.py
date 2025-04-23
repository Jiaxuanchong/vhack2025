from fastapi import FastAPI
import requests
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

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
     # Assign numerical impact score based on probability confidence
    impact_percentage= (predicted_probs[2] - predicted_probs[0]) * 100  # Positive - Negative

    if impact_percentage > 15:  # Higher than 15% means clearly positive
        sentiment_label = "Positive"
    elif impact_percentage < -15:  # Lower than -15% means clearly negative
        sentiment_label = "Negative"
    else:
        sentiment_label = "Neutral"

    return sentiment_label, impact_percentage


#uvicorn news1:app --reload --port 8001 