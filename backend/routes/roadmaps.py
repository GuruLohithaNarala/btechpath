from flask import Blueprint, request, jsonify
from utils.db import get_db
from utils.auth_middleware import token_required
from services.roadmap_generator import generate_roadmap, CAREER_TEMPLATES

roadmaps_bp = Blueprint("roadmaps", __name__, url_prefix="/api/roadmaps")

@roadmaps_bp.route("/generate", methods=["POST"])
def generate_user_roadmap():
    data = request.get_json() or {}
    branch = data.get("branch", "Computer Science & Engineering")
    year = data.get("year", "2nd Year")
    career_goal = data.get("career_goal", "Full Stack Developer")
    skill_level = data.get("skill_level", "Beginner")
    study_time = data.get("study_time", "2 hours/day")
    user_name = data.get("user_name", "Student")

    roadmap_data = generate_roadmap(branch, year, career_goal, skill_level, study_time, user_name)

    db = get_db()
    db.roadmaps.insert_one(roadmap_data)

    return jsonify({"message": "Roadmap generated successfully", "roadmap": roadmap_data}), 201

@roadmaps_bp.route("/tracks", methods=["GET"])
def get_career_tracks():
    tracks = []
    for title in CAREER_TEMPLATES.keys():
        r = generate_roadmap("CSE", "2nd Year", title)
        tracks.append({
            "title": title,
            "total_steps": r["total_steps"],
            "skills_overview": r["steps"][0]["skills"] + r["steps"][1]["skills"],
            "first_step": r["steps"][0]["title"]
        })
    return jsonify({"tracks": tracks}), 200

@roadmaps_bp.route("/<roadmap_id>", methods=["GET"])
def get_roadmap_by_id(roadmap_id):
    db = get_db()
    rm = db.roadmaps.find_one({"_id": roadmap_id})
    if not rm:
        # Generate default dynamic roadmap for demo if id not found
        rm = generate_roadmap("Computer Science & Engineering", "2nd Year", "Data Analyst")
        rm["_id"] = roadmap_id
    return jsonify({"roadmap": rm}), 200

@roadmaps_bp.route("/<roadmap_id>/steps/<step_id>", methods=["PUT"])
def update_step_status(roadmap_id, step_id):
    data = request.get_json() or {}
    new_status = data.get("status", "Completed")

    db = get_db()
    rm = db.roadmaps.find_one({"_id": roadmap_id})
    if rm:
        steps = rm.get("steps", [])
        for step in steps:
            if step["id"] == step_id:
                step["status"] = new_status
                break
        
        completed_count = sum(1 for s in steps if s["status"] == "Completed")
        pct = round((completed_count / len(steps)) * 100) if steps else 0
        
        db.roadmaps.update_one(
            {"_id": roadmap_id},
            {"$set": {"steps": steps, "completed_steps": completed_count, "overall_completion": pct}}
        )
        rm["steps"] = steps
        rm["completed_steps"] = completed_count
        rm["overall_completion"] = pct

    return jsonify({"message": "Step status updated", "roadmap": rm}), 200
