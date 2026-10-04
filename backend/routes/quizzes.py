from flask import Blueprint, request, jsonify
import uuid
import datetime
from utils.db import get_db
from utils.auth_middleware import token_required

quizzes_bp = Blueprint("quizzes", __name__, url_prefix="/api/quizzes")

QUIZ_DATABASE = {
    "quiz_sql_join": {
        "id": "quiz_sql_join",
        "title": "SQL JOINs Mastery Quiz",
        "topic": "SQL JOINs",
        "questions": [
            {
                "id": "q1",
                "question": "Which SQL JOIN returns only records that have matching values in both tables?",
                "options": ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"],
                "correct_index": 2,
                "type": "Multiple Choice",
                "explanation": "INNER JOIN selects records that have matching values in both tables."
            },
            {
                "id": "q2",
                "question": "A LEFT JOIN will include all records from the left table even if there are no matches in the right table.",
                "options": ["True", "False"],
                "correct_index": 0,
                "type": "True/False",
                "explanation": "True. LEFT JOIN returns all rows from the left table, and the matched records from the right table. Unmatched right table values are NULL."
            },
            {
                "id": "q3",
                "question": "What occurs if you omit the ON condition in a JOIN clause?",
                "options": ["Syntax Error", "Cartesian Product (CROSS JOIN)", "Database crashes", "Returns empty set"],
                "correct_index": 1,
                "type": "Multiple Choice",
                "explanation": "Without an ON clause or WHERE condition, SQL pairs every row of Table A with every row of Table B (Cross Join)."
            }
        ]
    },
    "quiz_recursion": {
        "id": "quiz_recursion",
        "title": "Recursion & DSA Core Quiz",
        "topic": "Recursion",
        "questions": [
            {
                "id": "q1",
                "question": "What is mandatory in every recursive function to prevent infinite execution?",
                "options": ["Loop condition", "Base Case", "Global Variable", "Main Function"],
                "correct_index": 1,
                "type": "Multiple Choice",
                "explanation": "A Base Case specifies when the recursion should stop executing."
            },
            {
                "id": "q2",
                "question": "Which data structure is internally used by the system to track recursive function calls?",
                "options": ["Queue", "Stack (Call Stack)", "Heap", "Linked List"],
                "correct_index": 1,
                "type": "Multiple Choice",
                "explanation": "The runtime system uses the Call Stack to store stack frames for each recursive invocation."
            }
        ]
    },
    "quiz_react": {
        "id": "quiz_react",
        "title": "React Hooks & Fundamentals",
        "topic": "React.js",
        "questions": [
            {
                "id": "q1",
                "question": "Which hook is used to declare state variables in React functional components?",
                "options": ["useEffect", "useContext", "useState", "useReducer"],
                "correct_index": 2,
                "type": "Multiple Choice",
                "explanation": "useState allows functional components to store state between renders."
            },
            {
                "id": "q2",
                "question": "Directly modifying state variables like `count = count + 1` triggers a re-render in React.",
                "options": ["True", "False"],
                "correct_index": 1,
                "type": "True/False",
                "explanation": "False. You must call `setCount(...)` to inform React of state changes so it can re-render."
            }
        ]
    }
}

@quizzes_bp.route("/<quiz_id>", methods=["GET"])
def get_quiz(quiz_id):
    quiz = QUIZ_DATABASE.get(quiz_id, QUIZ_DATABASE["quiz_sql_join"])
    # Return questions without exposing correct_index to client directly in question fetching
    public_questions = []
    for q in quiz["questions"]:
        public_questions.append({
            "id": q["id"],
            "question": q["question"],
            "options": q["options"],
            "type": q["type"]
        })

    return jsonify({
        "quiz": {
            "id": quiz["id"],
            "title": quiz["title"],
            "topic": quiz["topic"],
            "total_questions": len(quiz["questions"]),
            "questions": public_questions
        }
    }), 200

@quizzes_bp.route("/<quiz_id>/submit", methods=["POST"])
def submit_quiz(quiz_id):
    data = request.get_json() or {}
    user_answers = data.get("answers", {}) # dict of q_id -> selected_index
    user_id = data.get("user_id", "demo_user")

    quiz = QUIZ_DATABASE.get(quiz_id, QUIZ_DATABASE["quiz_sql_join"])
    total_q = len(quiz["questions"])
    correct_count = 0
    detailed_results = []

    for q in quiz["questions"]:
        selected = user_answers.get(q["id"])
        is_correct = (selected == q["correct_index"])
        if is_correct:
            correct_count += 1
        detailed_results.append({
            "question_id": q["id"],
            "question": q["question"],
            "user_selected": selected,
            "correct_index": q["correct_index"],
            "is_correct": is_correct,
            "explanation": q["explanation"]
        })

    pct = round((correct_count / total_q) * 100) if total_q > 0 else 0
    xp_earned = correct_count * 20

    attempt_doc = {
        "_id": str(uuid.uuid4()),
        "user_id": user_id,
        "quiz_id": quiz_id,
        "quiz_title": quiz["title"],
        "score": correct_count,
        "total": total_q,
        "percentage": pct,
        "xp_earned": xp_earned,
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

    db = get_db()
    db.quiz_attempts.insert_one(attempt_doc)
    
    # Update user XP in database
    db.users.update_one({"_id": user_id}, {"$inc": {"xp": xp_earned}})

    return jsonify({
        "message": "Quiz evaluated successfully",
        "score": correct_count,
        "total": total_q,
        "percentage": pct,
        "xp_earned": xp_earned,
        "results": detailed_results
    }), 200
