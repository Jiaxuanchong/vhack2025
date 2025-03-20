import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Download VADER lexicon if not available
nltk.download("vader_lexicon")

# Initialize Sentiment Analyzer
sia = SentimentIntensityAnalyzer()

# Sentiment analysis function
def get_sentiment(text: str) -> str:
    sentiment_score = sia.polarity_scores(text)
    if sentiment_score["compound"] >= 0.05:
        return "Positive (Bullish)"
    elif sentiment_score["compound"] <= -0.05:
        return "Negative (Bearish)"
    else:
        return "Neutral"
