import uuid

CAREER_TEMPLATES = {
    "Data Analyst": [
        {"title": "Python Fundamentals", "skills": ["Variables", "Control Flow", "Functions", "Data Structures"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "SQL & Relational Databases", "skills": ["SELECT", "JOINs", "Aggregations", "Subqueries", "Indexing"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Excel for Data Analysis", "skills": ["VLOOKUP", "Pivot Tables", "Formulae", "Data Cleaning"], "duration": "1 Week", "status": "Not Started"},
        {"title": "Statistics & Mathematics", "skills": ["Descriptive Stats", "Probability", "Hypothesis Testing", "Correlation"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "Data Manipulation with Pandas & NumPy", "skills": ["DataFrames", "Cleaning", "Transformations", "Aggregations"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Data Visualization (Matplotlib & Seaborn)", "skills": ["Bar Charts", "Histograms", "Heatmaps", "Custom Styling"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "Business Intelligence with Power BI / Tableau", "skills": ["DAX", "Interactive Dashboards", "Data Modeling"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Real-World Analytics Projects", "skills": ["Sales Analytics", "Customer Churn", "Financial Reports"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "Portfolio & GitHub Setup", "skills": ["Markdown", "GitHub Pages", "Case Studies"], "duration": "1 Week", "status": "Not Started"},
        {"title": "Data Analyst Interview Preparation", "skills": ["SQL Live Coding", "Case Study Questions", "Behavioral"], "duration": "3 Weeks", "status": "Not Started"}
    ],
    "Full Stack Developer": [
        {"title": "HTML5, CSS3 & Modern Responsive Design", "skills": ["Flexbox", "CSS Grid", "Semantic HTML", "Responsive Layouts"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "JavaScript Fundamentals & ES6+", "skills": ["DOM", "Async/Await", "Promises", "Fetch API", "ES6 Modules"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Git & Version Control", "skills": ["Git Workflow", "Branching", "Pull Requests", "GitHub"], "duration": "1 Week", "status": "Not Started"},
        {"title": "Frontend Framework (React.js)", "skills": ["Components", "JSX", "State & Props", "Hooks", "React Router"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "Tailwind CSS & Component Libraries", "skills": ["Utility Classes", "Dark Mode", "Custom Themes"], "duration": "1 Week", "status": "Not Started"},
        {"title": "Backend Development (Node.js / Express or Python Flask)", "skills": ["RESTful APIs", "HTTP Verbs", "Middleware", "JSON parsing"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "Database Systems (SQL & MongoDB)", "skills": ["PostgreSQL/MySQL", "MongoDB Atlas", "Mongoose/PyMongo", "Indexing"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Authentication & Authorization", "skills": ["JWT Tokens", "Bcrypt Hashing", "Protected Routes", "OAuth Concepts"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "Full Stack Projects & Deployment", "skills": ["Vercel", "Render", "Docker Basics", "CI/CD"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "Full Stack Placement Prep & Mock Interviews", "skills": ["System Design Basics", "Coding Questions", "Portfolio Review"], "duration": "3 Weeks", "status": "Not Started"}
    ],
    "AI/ML Engineer": [
        {"title": "Python & Scientific Computing", "skills": ["Advanced Python", "NumPy Vectorization", "Pandas DataFrames"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Linear Algebra & Calculus for ML", "skills": ["Matrix Operations", "Eigenvalues", "Gradient Descent", "Partial Derivatives"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Classical Machine Learning Algorithms", "skills": ["Linear/Logistic Regression", "Decision Trees", "Random Forests", "SVM", "K-Means"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "Scikit-Learn & Model Evaluation", "skills": ["Precision/Recall", "ROC-AUC", "Cross Validation", "Hyperparameter Tuning"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "Deep Learning Fundamentals", "skills": ["Neural Networks", "Backpropagation", "Activation Functions", "PyTorch/TensorFlow"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "Computer Vision or Natural Language Processing", "skills": ["CNNs", "OpenCV", "Transformers", "Hugging Face", "LLMs"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "AI Model Deployment & MLOps", "skills": ["FastAPI", "Streamlit", "ONNX", "Docker"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "AI Projects & Kaggle Competitions", "skills": ["Resume Analyzer", "Fake News Detection", "Model Optimization"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "AI Interview Prep & Technical Questions", "skills": ["ML System Design", "Algorithm Derivations", "Coding"], "duration": "3 Weeks", "status": "Not Started"}
    ],
    "Python Developer": [
        {"title": "Python Core & Data Structures", "skills": ["OOP", "Generators", "Decorators", "List Comprehensions"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "File I/O & Exception Handling", "skills": ["JSON/CSV parsing", "Try/Except", "Custom Exceptions"], "duration": "1 Week", "status": "Not Started"},
        {"title": "SQL & ORM Frameworks", "skills": ["SQLAlchemy", "PostgreSQL", "Database Migrations"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Web Frameworks (Flask & Django)", "skills": ["Routing", "Views", "Templates", "REST APIs"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "Asynchronous Python & APIs", "skills": ["Asyncio", "FastAPI", "Celery", "Redis"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Testing & Debugging", "skills": ["PyTest", "Unittest", "Debugging", "Code Coverage"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "Python Projects & Microservices", "skills": ["API Backend", "Automation Scripting", "Web Scraping"], "duration": "4 Weeks", "status": "Not Started"}
    ],
    "Cloud/DevOps Engineer": [
        {"title": "Linux Administration & Shell Scripting", "skills": ["Bash", "File Permissions", "Systemd", "Networking CLI"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Git & Source Control Workflows", "skills": ["Git Branching Strategy", "Merge Conflicts", "GitHub Actions"], "duration": "1 Week", "status": "Not Started"},
        {"title": "Containerization with Docker", "skills": ["Dockerfiles", "Docker Compose", "Multi-stage builds"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Cloud Fundamentals (AWS / Azure)", "skills": ["EC2", "S3", "IAM", "VPC", "CloudWatch"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "Infrastructure as Code (Terraform)", "skills": ["HCL Syntax", "State Files", "Resource Provisioning"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Container Orchestration (Kubernetes)", "skills": ["Pods", "Deployments", "Services", "Ingress", "Helm"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "CI/CD Pipelines & Monitoring", "skills": ["GitHub Actions / Jenkins", "Prometheus", "Grafana"], "duration": "3 Weeks", "status": "Not Started"}
    ],
    "Cybersecurity": [
        {"title": "Computer Networks & Protocols", "skills": ["TCP/IP", "OSI Model", "DNS", "HTTP/HTTPS", "Wireshark"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Linux & Command Line Mastery", "skills": ["Kali Linux", "Permissions", "Bash Scripting", "Process Analysis"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "Web Application Security (OWASP Top 10)", "skills": ["SQL Injection", "XSS", "CSRF", "Auth Vulnerabilities"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "Ethical Hacking & Penetration Testing", "skills": ["Nmap", "Metasploit", "Burp Suite", "Reconnaissance"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "Cryptography & PKI", "skills": ["Symmetric/Asymmetric", "Hashing", "SSL/TLS Certificates"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "Security Operations & Defense", "skills": ["SIEM", "Log Analysis", "Incident Response"], "duration": "3 Weeks", "status": "Not Started"}
    ],
    "Software Developer": [
        {"title": "Programming Core (C++ / Java / Python)", "skills": ["Pointers/References", "OOP Concepts", "Memory Management"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "Data Structures & Algorithms (DSA)", "skills": ["Arrays", "Strings", "Trees", "Graphs", "DP"], "duration": "6 Weeks", "status": "Not Started"},
        {"title": "Database Management Systems (DBMS)", "skills": ["Normalization", "Transactions (ACID)", "SQL"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Operating Systems & Computer Networks", "skills": ["Process Management", "Concurrency", "Sockets"], "duration": "3 Weeks", "status": "Not Started"},
        {"title": "Software Engineering & Clean Code", "skills": ["Design Patterns", "SOLID Principles", "Unit Testing"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "Full Project & System Design", "skills": ["Low Level Design (LLD)", "High Level Design (HLD)", "Projects"], "duration": "4 Weeks", "status": "Not Started"}
    ],
    "Software Testing": [
        {"title": "Software Testing Fundamentals", "skills": ["STLC", "SDLC", "Test Cases", "Bug Lifecycle"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "Manual Testing & QA Methodology", "skills": ["Boundary Value", "Equivalence Partitioning", "Jira"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "Database Verification (SQL for QA)", "skills": ["Data Validation", "Complex Queries", "JOINs"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "API Testing (Postman)", "skills": ["HTTP Requests", "Assertions", "Collection Runner", "JSON"], "duration": "2 Weeks", "status": "Not Started"},
        {"title": "Automation Testing (Selenium / Cypress with Java or Python)", "skills": ["Page Object Model", "Locators", "Test Frameworks"], "duration": "4 Weeks", "status": "Not Started"},
        {"title": "Performance & Security Testing Basics", "skills": ["JMeter", "Load Testing", "Security Scans"], "duration": "2 Weeks", "status": "Not Started"}
    ]
}

def generate_roadmap(branch, year, career_goal, skill_level="Beginner", study_time="2 hours/day", user_name="Student"):
    template = CAREER_TEMPLATES.get(career_goal, CAREER_TEMPLATES["Full Stack Developer"])
    
    # Adjust starting step based on year and skill level
    steps = []
    total_steps = len(template)
    
    for idx, item in enumerate(template):
        status = "Not Started"
        if idx == 0 and (year in ["2nd Year", "3rd Year", "4th Year"] or skill_level != "Beginner"):
            status = "Completed"
        elif idx == 1 and year in ["3rd Year", "4th Year"] and skill_level == "Advanced":
            status = "In Progress"
        elif idx == 0:
            status = "In Progress"

        step_obj = {
            "id": f"step_{idx+1}",
            "order": idx + 1,
            "title": item["title"],
            "description": f"Master {item['title']} to build a strong foundation for {career_goal}.",
            "skills": item["skills"],
            "duration": item["duration"],
            "status": status,
            "resources": [
                {"type": "Video", "title": f"Complete {item['title']} Tutorial", "url": "https://youtube.com"},
                {"type": "Documentation", "title": f"Official {item['skills'][0]} Docs", "url": "https://developer.mozilla.org"}
            ],
            "tasks": [
                f"Watch intro module on {item['skills'][0]}",
                f"Build a mini practice project focusing on {item['skills'][-1]}",
                f"Solve 5 practice problems on {item['title']}"
            ],
            "quiz_id": f"quiz_{item['skills'][0].lower().replace(' ', '_')}"
        }
        steps.append(step_obj)
        
    completed_count = sum(1 for s in steps if s["status"] == "Completed")
    progress_percentage = round((completed_count / total_steps) * 100) if total_steps > 0 else 0

    return {
        "_id": str(uuid.uuid4()),
        "user_name": user_name,
        "branch": branch,
        "year": year,
        "career_goal": career_goal,
        "skill_level": skill_level,
        "study_time": study_time,
        "overall_completion": progress_percentage,
        "steps": steps,
        "total_steps": total_steps,
        "completed_steps": completed_count
    }
