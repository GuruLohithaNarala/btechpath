import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = int(os.getenv("PORT", 5000))
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/btechpath")
    JWT_SECRET = os.getenv("JWT_SECRET", "btechpath_super_secret_jwt_key_2026")
    JWT_EXPIRATION_HOURS = 72
    AI_API_KEY = os.getenv("AI_API_KEY", "mock_ai_key")
    DEBUG = True
