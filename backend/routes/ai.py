from flask import Blueprint, request, jsonify
from services.ai_mentor import generate_ai_response

ai_bp = Blueprint("ai", __name__, url_prefix="/api/ai")

@ai_bp.route("/mentor", methods=["POST"])
def chat_with_mentor():
    data = request.get_json() or {}
    message = data.get("message", "")
    if not message:
        return jsonify({"error": "Message is required"}), 400

    response = generate_ai_response(message)
    return jsonify({"response": response}), 200
