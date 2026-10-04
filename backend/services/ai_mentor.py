def generate_ai_response(user_prompt, context=None):
    prompt_lower = user_prompt.lower().strip()
    
    if "python or java" in prompt_lower:
        content = (
            "### Python vs Java for B.Tech Students:\n\n"
            "**Choose Python if:**\n"
            "- Your goal is Data Science, AI/ML, Data Analytics, or fast Web Development.\n"
            "- You want readable, beginner-friendly syntax for fast problem-solving.\n\n"
            "**Choose Java if:**\n"
            "- You are preparing for traditional Product-Based Company (PBC) placement drives (Amazon, Service-Now, Target).\n"
            "- You want deep Object-Oriented Programming (OOP) and Enterprise System knowledge.\n\n"
            "💡 **Recommendation:** If in 1st/2nd year, pick Python first to build problem-solving speed, then learn Java/C++ for core DSA if target companies demand it."
        )
        suggestions = ["Give me a 2-hour study plan.", "What project should I build?", "Explain SQL JOIN simply."]
    elif "2-hour" in prompt_lower or "study plan" in prompt_lower:
        content = (
            "### ⏱️ Optimal 2-Hour Daily B.Tech Study Plan:\n\n"
            "1. **00:00 - 00:45 (45 mins) - Concept Learning:**\n"
            "   - Read 1 core topic from Learning Hub or watch a structured module (e.g. React Hooks or SQL JOINs).\n\n"
            "2. **00:45 - 01:30 (45 mins) - Hands-on Practice:**\n"
            "   - Write code on your IDE. Solve 2 problems or implement the code snippet manually.\n\n"
            "3. **01:30 - 01:50 (20 mins) - Quiz & Self Assessment:**\n"
            "   - Take the topic quiz on BTechPath to solidify retention and earn XP.\n\n"
            "4. **01:50 - 02:00 (10 mins) - Revision & Git Commit:**\n"
            "   - Commit your practice code to GitHub to maintain your streak!"
        )
        suggestions = ["What should I learn next?", "Explain SQL JOIN simply.", "Which career can I pursue?"]
    elif "sql join" in prompt_lower:
        content = (
            "### 🔍 SQL JOIN Explained Simply:\n\n"
            "A **JOIN** in SQL combines records from two tables based on a shared key (like `student_id`).\n\n"
            "**Analogy:** Imagine a list of *Students* in one notebook and their *Exam Scores* in another notebook. A JOIN matches each student's name to their exam score using their Roll Number!\n\n"
            "**Types of JOINs:**\n"
            "- `INNER JOIN`: Returns matching records in BOTH tables.\n"
            "- `LEFT JOIN`: Returns ALL from Left table + matching from Right table.\n"
            "- `RIGHT JOIN`: Returns ALL from Right table + matching from Left table.\n"
            "- `FULL JOIN`: Returns everything whenever there is a match in either table."
        )
        suggestions = ["Take SQL Quiz", "What project should I build?", "I'm in 2nd year CSE. What should I focus on?"]
    elif "2nd year" in prompt_lower or "2nd year cse" in prompt_lower:
        content = (
            "### 🎯 2nd Year CSE Roadmap Focus:\n\n"
            "In 2nd year, your primary objectives are establishing core Computer Science foundations:\n\n"
            "1. **Data Structures & Algorithms (DSA):** Arrays, Strings, Linked Lists, Stack, Queue, Recursion in C++/Java/Python.\n"
            "2. **Core CS Subjects:** DBMS (SQL, Normalization), Operating Systems (Processes, Threads), Computer Networks.\n"
            "3. **Development Skill:** Pick one track (Web Development or Data Analytics) and build 2 working projects.\n"
            "4. **Git & GitHub:** Start pushing all lab code and side projects to GitHub."
        )
        suggestions = ["Show Full Stack Roadmap", "Show Data Analyst Roadmap", "What project should I build?"]
    elif "project" in prompt_lower:
        content = (
            "### 🚀 Recommended Project Ideas by Difficulty:\n\n"
            "**Beginner:**\n"
            "- Expense Tracker (HTML/CSS/JS or Python Flask)\n"
            "- Student Marks Calculator\n\n"
            "**Intermediate:**\n"
            "- Book Exchange Platform (Full Stack React + Node/Flask + MongoDB)\n"
            "- Sales Analytics Dashboard (Python, Pandas, Power BI / Chart.js)\n\n"
            "**Advanced:**\n"
            "- AI Resume Analyzer & Job Matcher\n"
            "- Placement Analytics & Training Dashboard"
        )
        suggestions = ["Explore Project Hub", "Give me a 2-hour study plan.", "What should I learn next?"]
    else:
        content = (
            f"Hello! I am your **BTechPath AI Mentor** 🎓.\n\n"
            f"Based on your query: *'{user_prompt}'*, I recommend checking out our structured **Roadmap Generator** or exploring the **Learning Hub** for guided modules.\n\n"
            f"How else can I assist your engineering career journey today?"
        )
        suggestions = ["What should I learn next?", "I'm in 2nd year CSE. What should I focus on?", "Give me a 2-hour study plan.", "Explain SQL JOIN simply."]

    return {
        "reply": content,
        "suggested_prompts": suggestions,
        "disclaimer": "Automated response generated by BTechPath AI Mentor Engine."
    }
