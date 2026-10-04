def get_daily_recommendations(user_profile):
    year = user_profile.get("year", "2nd Year")
    career_goal = user_profile.get("career_goal", "Full Stack Developer")
    study_time = user_profile.get("study_time", "2 hours/day")
    
    if "Data Analyst" in career_goal:
        plan = [
            {"id": "t1", "title": "Learn SQL JOINs & Subqueries", "time": "30 min", "category": "Learn", "completed": False},
            {"id": "t2", "title": "Solve 5 SQL aggregation questions on Hackerrank", "time": "40 min", "category": "Practice", "completed": False},
            {"id": "t3", "title": "Take the SQL Fundamentals Quiz", "time": "15 min", "category": "Quiz", "completed": False}
        ]
    elif "AI/ML" in career_goal:
        plan = [
            {"id": "t1", "title": "Understand Linear Regression & Gradient Descent", "time": "45 min", "category": "Learn", "completed": False},
            {"id": "t2", "title": "Implement Scikit-Learn Model evaluation metrics", "time": "40 min", "category": "Practice", "completed": False},
            {"id": "t3", "title": "Attempt AI/ML Core Quiz", "time": "15 min", "category": "Quiz", "completed": False}
        ]
    elif "Python" in career_goal:
        plan = [
            {"id": "t1", "title": "Master Python List Comprehensions & Generators", "time": "30 min", "category": "Learn", "completed": False},
            {"id": "t2", "title": "Solve 3 Array & String problems in Python", "time": "45 min", "category": "Practice", "completed": False},
            {"id": "t3", "title": "Complete Python Basics Quiz", "time": "15 min", "category": "Quiz", "completed": False}
        ]
    elif "Cloud" in career_goal or "DevOps" in career_goal:
        plan = [
            {"id": "t1", "title": "Learn Dockerfile syntax & multi-stage builds", "time": "40 min", "category": "Learn", "completed": False},
            {"id": "t2", "title": "Containerize a simple Node/Python web app", "time": "45 min", "category": "Practice", "completed": False},
            {"id": "t3", "title": "Take Docker & Containerization Quiz", "time": "15 min", "category": "Quiz", "completed": False}
        ]
    else: # Default Full Stack / Software Dev
        plan = [
            {"id": "t1", "title": "Learn React useEffect Hook & API Data Fetching", "time": "35 min", "category": "Learn", "completed": False},
            {"id": "t2", "title": "Build a simple weather dashboard with Fetch API", "time": "45 min", "category": "Practice", "completed": False},
            {"id": "t3", "title": "Take React.js Essentials Quiz", "time": "15 min", "category": "Quiz", "completed": False}
        ]
        
    if "4th Year" in year:
        plan.append({"id": "t4", "title": "Solve 1 DSA Problem (Linked List / Binary Tree)", "time": "30 min", "category": "Placement", "completed": False})
        
    return {
        "date": "Today",
        "career_goal": career_goal,
        "available_time": study_time,
        "tasks": plan
    }
