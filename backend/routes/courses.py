from flask import Blueprint, request, jsonify
from utils.db import get_db

courses_bp = Blueprint("courses", __name__, url_prefix="/api/courses")

SAMPLE_COURSES = [
    {
        "id": "c1",
        "topic": "SQL JOIN Operations",
        "category": "DBMS",
        "difficulty": "Intermediate",
        "career": "Data Analyst",
        "year": "2nd Year",
        "estimated_time": "45 mins",
        "short_explanation": "Combines rows from two or more tables based on a related column between them.",
        "explain_simply": {
            "definition": "A JOIN clause is used to combine rows from two or more tables based on a related column between them.",
            "analogy": "Think of matching students in a roll-call sheet with their exam scores notebook using their unique Roll Number!",
            "visual": "Table A (Students) ⟗ Table B (Marks) → Combined Output on student_id",
            "code_example": "SELECT Students.name, Marks.score \nFROM Students \nINNER JOIN Marks ON Students.id = Marks.student_id;",
            "common_mistakes": [
                "Forgetting the ON clause causes a Cartesian Cross Join (huge performance hit).",
                "Using LEFT JOIN when INNER JOIN is required, leading to unwanted NULL rows."
            ],
            "memory_tip": "INNER = Exact matches only; LEFT = All left table rows + matching right table rows."
        },
        "resources": [
            {"type": "Article", "title": "SQL JOINs Visual Breakdown", "url": "https://w3schools.com"},
            {"type": "Video", "title": "Mastering SQL JOINs in 15 Minutes", "url": "https://youtube.com"}
        ],
        "quiz_id": "quiz_sql_join"
    },
    {
        "id": "c2",
        "topic": "Recursion in Data Structures",
        "category": "DSA",
        "difficulty": "Intermediate",
        "career": "Software Developer",
        "year": "2nd Year",
        "estimated_time": "60 mins",
        "short_explanation": "A programming technique where a function calls itself to solve a smaller instance of the same problem.",
        "explain_simply": {
            "definition": "Recursion is a method of solving a problem where the solution depends on solutions to smaller instances of the same problem.",
            "analogy": "Standing between two parallel mirrors, or Russian Matryoshka dolls nested inside one another until you reach the smallest solid doll!",
            "visual": "factorial(3) -> 3 * factorial(2) -> 2 * factorial(1) -> 1 (Base Case reached!)",
            "code_example": "def factorial(n):\n    if n <= 1: return 1  # Base Case\n    return n * factorial(n - 1) # Recursive Step",
            "common_mistakes": [
                "Omitting the base case, causing a Stack Overflow Error.",
                "Not reducing the problem size on every recursive call."
            ],
            "memory_tip": "Every recursive function must have 2 things: 1) Base Case to stop, 2) Recursive call moving toward base case."
        },
        "resources": [
            {"type": "Article", "title": "Understanding Call Stacks & Recursion", "url": "https://geeksforgeeks.org"}
        ],
        "quiz_id": "quiz_recursion"
    },
    {
        "id": "c3",
        "topic": "React Hooks & State Management",
        "category": "Web Development",
        "difficulty": "Intermediate",
        "career": "Full Stack Developer",
        "year": "2nd Year",
        "estimated_time": "50 mins",
        "short_explanation": "Hooks let functional React components manage component state and side effects easily.",
        "explain_simply": {
            "definition": "React Hooks are functions that let you 'hook into' React state and lifecycle features from function components.",
            "analogy": "Think of state as a smart whiteboard that instantly redraws the UI whenever you update a number written on it!",
            "visual": "useState(0) -> [count, setCount] -> setCount(1) -> UI Re-renders automatically",
            "code_example": "const [count, setCount] = useState(0);\n<button onClick={() => setCount(count + 1)}>Increment</button>",
            "common_mistakes": [
                "Mutating state directly (count = count + 1) instead of using the setter function.",
                "Calling hooks inside loops or nested conditions."
            ],
            "memory_tip": "Never mutate state directly! Always call setter function."
        },
        "resources": [
            {"type": "Docs", "title": "React Official Hooks Guide", "url": "https://react.dev"}
        ],
        "quiz_id": "quiz_react"
    },
    {
        "id": "c4",
        "topic": "Linear Regression in Machine Learning",
        "category": "AI/ML",
        "difficulty": "Beginner",
        "career": "AI/ML Engineer",
        "year": "3rd Year",
        "estimated_time": "40 mins",
        "short_explanation": "A supervised learning algorithm used to predict continuous numeric outcomes based on linear relationships.",
        "explain_simply": {
            "definition": "Linear Regression models the relationship between a dependent variable (y) and one or more independent variables (X) using a straight line y = mx + c.",
            "analogy": "Predicting the price of a house based solely on its square footage using a line of best fit on a scatter plot.",
            "visual": "Plot Data Points -> Draw Best Fit Line -> Calculate Slope (m) & Intercept (c)",
            "code_example": "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
            "common_mistakes": [
                "Applying linear regression to non-linear data distributions without transformations.",
                "Ignoring outliers that distort the line of best fit."
            ],
            "memory_tip": "y = mx + c. Predicts continuous numbers, not categories!"
        },
        "resources": [
            {"type": "Video", "title": "StatQuest: Linear Regression", "url": "https://youtube.com"}
        ],
        "quiz_id": "quiz_linear_regression"
    }
]

@courses_bp.route("", methods=["GET"])
def get_courses():
    category = request.args.get("category")
    difficulty = request.args.get("difficulty")
    career = request.args.get("career")
    search = request.args.get("search", "").lower()

    filtered = SAMPLE_COURSES
    if category and category != "All":
        filtered = [c for c in filtered if c["category"].lower() == category.lower()]
    if difficulty and difficulty != "All":
        filtered = [c for c in filtered if c["difficulty"].lower() == difficulty.lower()]
    if career and career != "All":
        filtered = [c for c in filtered if c["career"].lower() == career.lower()]
    if search:
        filtered = [c for c in filtered if search in c["topic"].lower() or search in c["short_explanation"].lower()]

    return jsonify({"courses": filtered, "total": len(filtered)}), 200

@courses_bp.route("/<course_id>", methods=["GET"])
def get_course_detail(course_id):
    course = next((c for c in SAMPLE_COURSES if c["id"] == course_id), SAMPLE_COURSES[0])
    return jsonify({"course": course}), 200
