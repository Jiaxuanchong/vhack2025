from pydantic import BaseModel

class NewsRequest(BaseModel):
    headline: str
