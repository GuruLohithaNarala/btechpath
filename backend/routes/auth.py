from flask import Blueprint, request, jsonify
import uuid
from utils.db import get_db
from utils.auth_middleware import hash_password, verify_password, generate_jwt_token, token_required
from utils.validators import validate_registration

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    errors = validate_registration(data)
    if errors:
        return jsonify({"error": errors[0]}), 400

    db = get_db()
    existing_user = db.users.find_one({"email": data["email"].lower().strip()})
    if existing_user:
        return jsonify({"error": "Email is already registered"}), 409

    user_id = str(uuid.uuid4())
    role = data.get("role", "student")
    user_doc = {
        "_id": user_id,
        "name": data["name"].strip(),
        "email": data["email"].lower().strip(),
        "password": hash_password(data["password"]),
        "role": role,
        "branch": data.get("branch", "Computer Science & Engineering"),
        "year": data.get("year", "2nd Year"),
        "career_goal": data.get("career_goal", "Full Stack Developer"),
        "xp": 0,
        "streak": 0,
        "badges": [],
        "overall_progress": 0,
        "avg_quiz_score": 0,
        "projects_completed": 0,
        "learning_progress": 0
    }

    db.users.insert_one(user_doc)
    token = generate_jwt_token(user_id, role=role)

    user_data = {
        "id": user_id,
        "name": user_doc["name"],
        "email": user_doc["email"],
        "role": user_doc["role"],
        "branch": user_doc["branch"],
        "year": user_doc["year"],
        "career_goal": user_doc["career_goal"],
        "xp": user_doc["xp"],
        "streak": user_doc["streak"],
        "badges": user_doc["badges"],
        "overall_progress": user_doc["overall_progress"],
        "avg_quiz_score": user_doc["avg_quiz_score"],
        "projects_completed": user_doc["projects_completed"],
        "learning_progress": user_doc["learning_progress"]
    }

    return jsonify({
        "message": "User registered successfully",
        "token": token,
        "user": user_data
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").lower().strip()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    db = get_db()
    user = db.users.find_one({"email": email})
    
    # Check demo fallback accounts if user not found in mock DB
    if not user:
        if email == "student@btechpath.com" and password == "password123":
            user = {
                "_id": "student_demo_id",
                "name": "Aarav Sharma",
                "email": "student@btechpath.com",
                "password": hash_password("password123"),
                "role": "student",
                "branch": "Computer Science & Engineering",
                "year": "2nd Year",
                "career_goal": "Full Stack Developer",
                "xp": 180,
                "streak": 5,
                "badges": ["Python Beginner", "SQL Explorer", "DSA Starter"]
            }
        elif email == "admin@btechpath.com" and password == "admin123":
            user = {
                "_id": "admin_demo_id",
                "name": "System Administrator",
                "email": "admin@btechpath.com",
                "password": hash_password("admin123"),
                "role": "admin",
                "branch": "Admin",
                "year": "N/A",
                "career_goal": "Administrator",
                "xp": 1000,
                "streak": 30,
                "badges": ["Admin Master"]
            }

    if not user or not verify_password(user["password"], password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = generate_jwt_token(user["_id"], role=user.get("role", "student"))

    user_data = {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user.get("role", "student"),
        "branch": user.get("branch", "Computer Science & Engineering"),
        "year": user.get("year", "2nd Year"),
        "career_goal": user.get("career_goal", "Full Stack Developer"),
        "xp": user.get("xp", 0),
        "streak": user.get("streak", 0),
        "badges": user.get("badges", []),
        "overall_progress": user.get("overall_progress", 0),
        "avg_quiz_score": user.get("avg_quiz_score", 0),
        "projects_completed": user.get("projects_completed", 0),
        "learning_progress": user.get("learning_progress", 0)
    }

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": user_data
    }), 200

@auth_bp.route("/me", methods=["GET"])
@token_required
def get_current_user_profile(current_user):
    user_data = {
        "id": str(current_user["_id"]),
        "name": current_user.get("name"),
        "email": current_user.get("email"),
        "role": current_user.get("role", "student"),
        "branch": current_user.get("branch", "Computer Science & Engineering"),
        "year": current_user.get("year", "2nd Year"),
        "career_goal": current_user.get("career_goal", "Full Stack Developer"),
        "xp": current_user.get("xp", 0),
        "streak": current_user.get("streak", 0),
        "badges": current_user.get("badges", []),
        "overall_progress": current_user.get("overall_progress", 0),
        "avg_quiz_score": current_user.get("avg_quiz_score", 0),
        "projects_completed": current_user.get("projects_completed", 0),
        "learning_progress": current_user.get("learning_progress", 0)
    }
    return jsonify({"user": user_data}), 200
