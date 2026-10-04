from flask import Blueprint, request, jsonify
from utils.db import get_db
from services.resume_analyzer import analyze_resume_data

resume_bp = Blueprint("resume", __name__, url_prefix="/api/resume")

@resume_bp.route("/analyze", methods=["POST"])
def analyze_resume():
    data = request.get_json() or {}
    analysis_result = analyze_resume_data(data)
    return jsonify({"analysis": analysis_result}), 200

@resume_bp.route("/profile", methods=["GET"])
def get_resume_profile():
    user_id = request.args.get("user_id", "demo_user")
    db = get_db()
    res_doc = db.resume_profiles.find_one({"user_id": user_id})
    if not res_doc:
        res_doc = {
            "user_id": user_id,
            "personal": {
                "full_name": "Aarav Sharma",
                "email": "aarav.sharma@btech.edu",
                "phone": "+91 98765 43210",
                "location": "Bengaluru, India",
                "github": "github.com/aaravsharma",
                "linkedin": "linkedin.com/in/aaravsharma"
            },
            "education": [
                {
                    "institution": "National Institute of Technology",
                    "degree": "B.Tech in Computer Science & Engineering",
                    "year": "2023 - 2027",
                    "cgpa": "8.7 / 10.0"
                }
            ],
            "skills": "Python, JavaScript, React.js, Node.js, Express, MongoDB, SQL, Data Structures & Algorithms, Git, HTML5, CSS3",
            "projects": [
                {
                    "title": "Expense Tracker Web App",
                    "tech": "React, Node.js, MongoDB",
                    "description": "Architected a responsive financial tracking app. Integrated Chart.js for real-time analytics, boosting user engagement by 35%."
                },
                {
                    "title": "Sales Analytics Dashboard",
                    "tech": "Python, Pandas, SQL, Streamlit",
                    "description": "Processed 100K+ retail sales data records. Developed interactive Streamlit dashboard visualizing regional revenue trends."
                }
            ],
            "internships": [
                {
                    "company": "Tech Solutions Pvt Ltd",
                    "role": "Software Engineering Intern",
                    "duration": "May 2025 - July 2025",
                    "description": "Developed RESTful API endpoints for client dashboard using Node.js and MongoDB."
                }
            ],
            "certifications": ["AWS Certified Cloud Practitioner", "Meta Front-End Developer Certificate"],
            "achievements": ["Secured Top 5 in University Hackathon 2025", "Solved 250+ DSA problems on LeetCode"]
        }
    return jsonify({"resume": res_doc}), 200

@resume_bp.route("/profile", methods=["POST"])
def save_resume_profile():
    data = request.get_json() or {}
    user_id = data.get("user_id", "demo_user")

    db = get_db()
    db.resume_profiles.update_one(
        {"user_id": user_id},
        {"$set": {**data, "user_id": user_id}},
        upsert=True
    )
    analysis = analyze_resume_data(data)
    return jsonify({"message": "Resume saved successfully", "analysis": analysis}), 200
