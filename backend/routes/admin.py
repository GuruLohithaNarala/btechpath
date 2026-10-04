from flask import Blueprint, jsonify, request
from utils.db import get_db

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")

@admin_bp.route("/analytics", methods=["GET"])
def get_admin_analytics():
    db = get_db()
    
    # Calculate or generate mock analytics data for Recharts
    analytics = {
        "summary": {
            "total_students": 1420,
            "active_students": 985,
            "courses_completed": 3410,
            "projects_started": 890,
            "avg_quiz_score": 84.5,
            "avg_progress": 48.2
        },
        "charts": {
            "students_by_year": [
                {"year": "1st Year", "students": 320},
                {"year": "2nd Year", "students": 480},
                {"year": "3rd Year", "students": 410},
                {"year": "4th Year", "students": 210}
            ],
            "popular_career_goals": [
                {"goal": "Full Stack", "students": 420},
                {"goal": "Data Analyst", "students": 310},
                {"goal": "AI/ML Engineer", "students": 290},
                {"goal": "Cloud/DevOps", "students": 180},
                {"goal": "Python Dev", "students": 120},
                {"goal": "Cybersecurity", "students": 100}
            ],
            "quiz_performance": [
                {"category": "DBMS", "avg_score": 88},
                {"category": "DSA", "avg_score": 76},
                {"category": "Web Dev", "avg_score": 91},
                {"category": "AI/ML", "avg_score": 82},
                {"category": "Aptitude", "avg_score": 79}
            ],
            "monthly_activity": [
                {"month": "May", "signups": 150, "quiz_attempts": 620},
                {"month": "Jun", "signups": 210, "quiz_attempts": 890},
                {"month": "Jul", "signups": 310, "quiz_attempts": 1150},
                {"month": "Aug", "signups": 420, "quiz_attempts": 1480},
                {"month": "Sep", "signups": 330, "quiz_attempts": 1320}
            ]
        }
    }
    return jsonify({"analytics": analytics}), 200

@admin_bp.route("/students", methods=["GET"])
def get_students_list():
    students = [
        {"id": "u1", "name": "Aarav Sharma", "email": "aarav@btech.edu", "branch": "CSE", "year": "2nd Year", "career_goal": "Full Stack", "xp": 240, "status": "Active"},
        {"id": "u2", "name": "Ananya Verma", "email": "ananya@btech.edu", "branch": "CSE AI & ML", "year": "3rd Year", "career_goal": "AI/ML Engineer", "xp": 480, "status": "Active"},
        {"id": "u3", "name": "Rohan Patel", "email": "rohan@btech.edu", "branch": "IT", "year": "2nd Year", "career_goal": "Data Analyst", "xp": 310, "status": "Active"},
        {"id": "u4", "name": "Priya Nair", "email": "priya@btech.edu", "branch": "Electronics & Comm", "year": "4th Year", "career_goal": "Cloud/DevOps", "xp": 620, "status": "Active"},
        {"id": "u5", "name": "Karthik Raja", "email": "karthik@btech.edu", "branch": "Mechanical", "year": "1st Year", "career_goal": "Python Developer", "xp": 120, "status": "Active"}
    ]
    return jsonify({"students": students, "total": len(students)}), 200
