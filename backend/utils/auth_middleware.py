import jwt
import datetime
from functools import wraps
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config
from utils.db import get_db

def hash_password(password):
    return generate_password_hash(password)

def verify_password(password_hash, password):
    return check_password_hash(password_hash, password)

def generate_jwt_token(user_id, role="student"):
    payload = {
        "user_id": str(user_id),
        "role": role,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=Config.JWT_EXPIRATION_HOURS),
        "iat": datetime.datetime.utcnow()
    }
    return jwt.encode(payload, Config.JWT_SECRET, algorithm="HS256")

def decode_jwt_token(token):
    try:
        payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            auth_header = request.headers["Authorization"]
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]
        
        if not token:
            return jsonify({"error": "Authentication token missing"}), 401

        payload = decode_jwt_token(token)
        if not payload:
            return jsonify({"error": "Invalid or expired token"}), 401

        db = get_db()
        current_user = db.users.find_one({"_id": payload["user_id"]})
        if not current_user:
            # Check by string or object id
            current_user = db.users.find_one({"email": payload.get("email")})
        
        if not current_user:
            # Fallback user object if database is empty/mock
            current_user = {
                "_id": payload["user_id"],
                "name": "Student User",
                "email": "student@btechpath.com",
                "role": payload.get("role", "student")
            }

        return f(current_user, *args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user.get("role") != "admin":
            return jsonify({"error": "Admin privilege required"}), 403
        return f(current_user, *args, **kwargs)
    return token_required(decorated)
