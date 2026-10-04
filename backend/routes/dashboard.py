from flask import Blueprint, request, jsonify
from utils.db import get_db
from utils.auth_middleware import token_required
from services.recommendation_engine import get_daily_recommendations

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/api/dashboard")

@dashboard_bp.route("/student", methods=["GET"])

def get_student_dashboard():
    user_id = request.args.get("user_id", "student_demo_id")
    db = get_db()
    
    user = db.users.find_one({"_id": user_id}) or {
        "name": "Aarav Sharma",
        "branch": "Computer Science & Engineering",
        "year": "2nd Year",
        "career_goal": "Full Stack Developer",
        "xp": 240,
        "streak": 5,
        "badges": ["Python Beginner", "SQL Explorer", "DSA Starter"]
    }

    daily_plan = get_daily_recommendations(user)

    dashboard_data = {
        "user_name": user.get("name", "Student"),
        "branch": user.get("branch", "CSE"),
        "year": user.get("year", "2nd Year"),
        "career_goal": user.get("career_goal", "Full Stack Developer"),
        "metrics": {
            "overall_progress": user.get("overall_progress", 0),
            "learning_streak": user.get("streak", 0),
            "xp_points": user.get("xp", 0),
            "avg_quiz_score": user.get("avg_quiz_score", 0),
            "projects_completed": user.get("projects_completed", 0)
        },
        "daily_plan": daily_plan,
        "recent_achievements": [
            {"title": badge, "date": "Earned", "desc": "Achievement unlocked"}
            for badge in user.get("badges", [])
        ],
        "continue_learning": {
            "topic": "React Hooks & State Management",
            "category": "Web Development",
            "progress": user.get("learning_progress", 0),
            "next_lesson": "useEffect Dependency Arrays"
        }
    }

    return jsonify({"dashboard": dashboard_data}), 200
