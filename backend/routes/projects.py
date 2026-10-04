from flask import Blueprint, request, jsonify

projects_bp = Blueprint("projects", __name__, url_prefix="/api/projects")

SAMPLE_PROJECTS = [
    {
        "id": "p1",
        "title": "Expense Tracker Web Application",
        "category": "Web Development",
        "career": "Full Stack Developer",
        "difficulty": "Beginner",
        "year": "1st Year / 2nd Year",
        "estimated_time": "10 hours",
        "short_description": "Track daily income and expenses with interactive charts and category filtering.",
        "technologies": ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
        "detail": {
            "problem_statement": "Students struggle to keep track of monthly pocket money, hosteller expenses, and recurring subscriptions.",
            "objective": "Build a responsive web application that logs transactions, calculates total balance, and visualizes monthly spending trends.",
            "prerequisites": ["HTML/CSS", "JavaScript ES6", "Basic React Hooks"],
            "technologies": ["React.js", "Tailwind CSS", "Express.js", "MongoDB", "Chart.js"],
            "features": [
                "User Authentication (JWT)",
                "Add/Edit/Delete Income & Expense Entries",
                "Category Tagging (Food, Books, Travel, Entertainment)",
                "Monthly Pie Chart Summary",
                "Export Statement as CSV/JSON"
            ],
            "step_by_step": [
                "Step 1: Set up React frontend with Vite & Tailwind CSS",
                "Step 2: Initialize Express backend with Mongoose schema",
                "Step 3: Implement Auth endpoints (Register/Login)",
                "Step 4: Create CRUD API endpoints for transaction logs",
                "Step 5: Connect Chart.js component to render spending breakdown"
            ],
            "database_design": "UsersCollection: {_id, email, passwordHash} | TransactionsCollection: {_id, userId, type, category, amount, date, description}",
            "testing": "Unit test transaction calculation functions with Jest/PyTest. Postman endpoint validation.",
            "deployment": "Frontend on Vercel, Backend on Render/Railway, Database on MongoDB Atlas.",
            "github_checklist": [
                "Add clean README.md with screenshots",
                "Add sample .env.example file",
                "Include clear setup instructions"
            ],
            "resume_description": "• Architected a Full Stack Expense Tracker in React & Express used to analyze monthly budgets.\n• Integrated Chart.js for data visualization, reducing expense entry time by 40%.\n• Implemented secure JWT auth and MongoDB aggregation pipelines for instant statement generation.",
            "interview_questions": [
                "How did you secure JWT tokens in local storage vs HTTP-only cookies?",
                "How would you optimize MongoDB queries if transactions reach 1 million records?"
            ]
        }
    },
    {
        "id": "p2",
        "title": "Sales Analytics Dashboard",
        "category": "Data Analytics",
        "career": "Data Analyst",
        "difficulty": "Intermediate",
        "year": "2nd Year / 3rd Year",
        "estimated_time": "15 hours",
        "short_description": "Interactive business intelligence dashboard analyzing retail store revenue, top products, and region trends.",
        "technologies": ["Python", "Pandas", "SQL", "Power BI / Streamlit", "Plotly"],
        "detail": {
            "problem_statement": "Retail managers need actionable insights from raw CSV sales data to identify best-selling product categories and low-performing regions.",
            "objective": "Process 100K+ sales records, execute SQL queries, and deploy an interactive analytics dashboard.",
            "prerequisites": ["Python", "Pandas DataFrames", "SQL JOINs & Aggregations"],
            "technologies": ["Python 3.11", "Pandas", "NumPy", "PostgreSQL / SQLite", "Streamlit", "Plotly"],
            "features": [
                "Automated Data Cleaning & Outlier Removal",
                "KPI Metric Cards (Total Revenue, Avg Order Value, Profit Margin)",
                "Regional Heatmap Visualization",
                "Product Performance Filtering by Month/Quarter"
            ],
            "step_by_step": [
                "Step 1: Ingest raw CSV data using Pandas",
                "Step 2: Clean missing values and format datetime fields",
                "Step 3: Load data into SQL database and execute analytical queries",
                "Step 4: Build interactive Streamlit dashboard layout",
                "Step 5: Add Plotly interactive bar charts and pie charts"
            ],
            "database_design": "SalesTable: {order_id, customer_id, product_category, unit_price, quantity, order_date, region}",
            "testing": "Verify data consistency between raw CSV totals and SQL query aggregations.",
            "deployment": "Streamlit Community Cloud / Hugging Face Spaces.",
            "github_checklist": [
                "Include sample data CSV in data/ directory",
                "Add step-by-step Jupyter Notebook with EDA",
                "Host live dashboard link"
            ],
            "resume_description": "• Built an interactive Sales Analytics Dashboard processing 100K+ transactional records using Python & SQL.\n• Discovered key regional sales patterns, enabling a projected 15% increase in inventory efficiency.\n• Designed multi-filter Plotly visual charts deployed on Streamlit Cloud.",
            "interview_questions": [
                "How did you handle missing values or corrupted records in Pandas?",
                "What SQL query did you write to calculate Month-over-Month growth percentage?"
            ]
        }
    },
    {
        "id": "p3",
        "title": "AI Resume Analyzer & ATS Score Calculator",
        "category": "AI/ML",
        "career": "AI/ML Engineer",
        "difficulty": "Advanced",
        "year": "3rd Year / 4th Year",
        "estimated_time": "20 hours",
        "short_description": "Parses PDF resumes, extracts key skills using NLP, and compares them against job descriptions for match score.",
        "technologies": ["Python", "PyPDF2", "SpaCy / NLTK", "Scikit-Learn", "Flask"],
        "detail": {
            "problem_statement": "Job applicants submit resumes without knowing if they match specific job requirements or ATS scanner filters.",
            "objective": "Build an AI tool that extracts resume text, matches skills using TF-IDF / Cosine Similarity, and outputs actionable feedback.",
            "prerequisites": ["Python Fundamentals", "Basic NLP concepts", "Scikit-learn"],
            "technologies": ["Python", "PyPDF2", "SpaCy", "Scikit-Learn", "Flask", "React"],
            "features": [
                "PDF Text Extraction & Parsing",
                "Skill Keyword Extraction via Named Entity Recognition (NER)",
                "Job Description Matching Score (Cosine Similarity)",
                "Missing Skill Suggestions Report"
            ],
            "step_by_step": [
                "Step 1: Build PDF text extraction pipeline using PyPDF2",
                "Step 2: Clean and tokenize text using SpaCy NLP pipeline",
                "Step 3: Vectorize resume text and job description using TfidfVectorizer",
                "Step 4: Calculate cosine similarity score percentage",
                "Step 5: Build Flask REST API and React UI preview"
            ],
            "database_design": "ResumesCollection: {_id, filename, score, missingKeywords, timestamp}",
            "testing": "Test parsing accuracy across 20 different PDF resume layouts.",
            "deployment": "Render backend + Vercel frontend.",
            "github_checklist": [
                "Add test PDF resumes for evaluator testing",
                "Provide API documentation endpoints"
            ],
            "resume_description": "• Developed an AI Resume Analyzer utilizing NLP (SpaCy & TF-IDF Vectorization) in Python.\n• Computed ATS job match similarity scores with 92% extraction accuracy across standard layouts.\n• Created a React & Flask web interface delivering instant keyword optimization recommendations.",
            "interview_questions": [
                "Why did you select TF-IDF vectorization over word embeddings like Word2Vec for keyword matching?",
                "How do you handle multi-column PDF layouts during text extraction?"
            ]
        }
    }
]

def make_project(project_id, title, category, career, difficulty, estimated_time,
                 short_description, technologies, detail):
    return {
        "id": project_id,
        "title": title,
        "category": category,
        "career": career,
        "difficulty": difficulty,
        "year": "2nd Year / 3rd Year",
        "estimated_time": estimated_time,
        "short_description": short_description,
        "technologies": technologies,
        "detail": detail
    }

SAMPLE_PROJECTS.extend([
    make_project(
        "p4", "Campus Events REST API", "Backend Development", "Python Developer",
        "Intermediate", "14 hours",
        "Build a documented API for campus events, registrations, and attendee updates.",
        ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pytest"],
        {
            "problem_statement": "Campus event information is scattered across messages, making registrations and updates difficult to manage.",
            "objective": "Create a secure REST API that lets organizers publish events and students register or cancel registrations.",
            "prerequisites": ["Python OOP", "HTTP and REST basics", "SQL fundamentals"],
            "technologies": ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pytest"],
            "features": ["Event CRUD endpoints", "JWT-protected organizer routes", "Registration capacity limits", "Pagination and search", "OpenAPI documentation"],
            "step_by_step": ["Design event, user, and registration models", "Create FastAPI routes and request validation", "Add PostgreSQL persistence with SQLAlchemy", "Implement authentication and role checks", "Write API tests and publish the OpenAPI docs"],
            "database_design": "Users: {id, email, role} | Events: {id, organizer_id, title, starts_at, capacity} | Registrations: {id, event_id, user_id, status}",
            "testing": "Use Pytest and FastAPI TestClient for validation, authorization, capacity, and duplicate-registration cases.",
            "deployment": "Deploy the API to Render or Railway and use a managed PostgreSQL database.",
            "github_checklist": ["Document endpoints and setup", "Include .env.example", "Add test instructions and API screenshots"],
            "resume_description": "Built a FastAPI event management service with PostgreSQL persistence, JWT authorization, and automated API tests.",
            "interview_questions": ["How did you prevent registrations from exceeding event capacity?", "How would you version this API without breaking clients?"]
        }
    ),
    make_project(
        "p5", "Containerized Service Delivery Pipeline", "Cloud & DevOps", "Cloud/DevOps Engineer",
        "Advanced", "24 hours",
        "Package a small service into containers and automate test, build, and cloud deployment stages.",
        ["Docker", "GitHub Actions", "Kubernetes", "Terraform", "AWS"],
        {
            "problem_statement": "Manual deployments are inconsistent and make it hard to recover from failed releases.",
            "objective": "Build a repeatable CI/CD pipeline that tests, packages, and deploys a containerized service with infrastructure defined as code.",
            "prerequisites": ["Linux CLI and Git", "Docker fundamentals", "Basic cloud networking"],
            "technologies": ["Docker", "GitHub Actions", "Kubernetes", "Terraform", "AWS"],
            "features": ["Automated test and image build", "Container registry publishing", "Kubernetes deployment manifests", "Terraform-managed infrastructure", "Health checks and rollback notes"],
            "step_by_step": ["Containerize a sample web service", "Create a CI workflow for tests and image builds", "Provision a least-privilege cloud environment with Terraform", "Deploy the service to a Kubernetes cluster", "Document monitoring, rollback, and cleanup steps"],
            "database_design": "No application database required | Pipeline state: Terraform backend | Deployment config: Kubernetes ConfigMaps and Secrets",
            "testing": "Validate workflow stages with a failing test, inspect image vulnerabilities, and verify deployment health checks.",
            "deployment": "Deploy to a low-cost AWS test environment and include explicit teardown instructions to avoid ongoing charges.",
            "github_checklist": ["Never commit cloud credentials", "Include architecture and pipeline diagrams", "Document deployment and teardown commands"],
            "resume_description": "Automated container build and Kubernetes deployment with GitHub Actions and Terraform, including health checks and repeatable environment teardown.",
            "interview_questions": ["How would you keep secrets out of build logs?", "What checks would you add before promoting an image to production?"]
        }
    ),
    make_project(
        "p6", "Authorized Web Security Audit Dashboard", "Cybersecurity", "Cybersecurity",
        "Advanced", "18 hours",
        "Create a defensive dashboard that reports security headers and common configuration risks for approved test sites.",
        ["Python", "Flask", "OWASP", "SQLite", "HTML/CSS"],
        {
            "problem_statement": "Developers need a simple way to review basic web security configuration before a release.",
            "objective": "Build a passive audit tool for locally hosted or explicitly authorized sites that summarizes response headers and configuration findings.",
            "prerequisites": ["HTTP and DNS basics", "Python fundamentals", "Web application security concepts"],
            "technologies": ["Python", "Flask", "OWASP", "SQLite", "HTML/CSS"],
            "features": ["Scope allowlist for approved hosts", "Security-header checks", "TLS certificate expiry summary", "Finding severity and remediation guidance", "Exportable audit report"],
            "step_by_step": ["Define an allowlist and safe request limits", "Build a passive HTTP response inspection module", "Map missing protections to OWASP guidance", "Store audit summaries and render a dashboard", "Test against a local intentionally misconfigured lab app"],
            "database_design": "AuditRuns: {id, target, created_at, status} | Findings: {id, audit_id, check_name, severity, remediation}",
            "testing": "Use local test fixtures for expected headers and certificate states; verify non-allowlisted hosts are rejected.",
            "deployment": "Run locally or deploy privately; only assess systems you own or have explicit permission to test.",
            "github_checklist": ["State authorized-use scope clearly", "Include local test fixtures", "Document each check and its remediation"],
            "resume_description": "Developed a passive web security audit dashboard that checks approved test sites for security-header and TLS configuration issues with actionable remediation reports.",
            "interview_questions": ["Why should the scanner enforce an explicit target allowlist?", "How would you distinguish a missing header from a false positive?"]
        }
    ),
    make_project(
        "p7", "Concurrent Task Scheduler", "Software Engineering", "Software Developer",
        "Intermediate", "16 hours",
        "Design a Java service that accepts background jobs, schedules retries, and safely processes work with multiple workers.",
        ["Java", "Concurrency", "JUnit", "SQLite", "Maven"],
        {
            "problem_statement": "Applications often need reliable background work without blocking user-facing requests.",
            "objective": "Implement a task scheduler with bounded concurrency, retry policies, and observable job states.",
            "prerequisites": ["Java OOP", "Collections and data structures", "Threads and synchronization basics"],
            "technologies": ["Java", "Concurrency", "JUnit", "SQLite", "Maven"],
            "features": ["Submit and cancel jobs", "Bounded worker pool", "Delayed retries with backoff", "Job status history", "Graceful shutdown"],
            "step_by_step": ["Define job and lifecycle state models", "Implement a thread-safe in-memory queue", "Add worker execution and retry policies", "Persist job history in SQLite", "Measure throughput and test shutdown behavior"],
            "database_design": "Jobs: {id, payload, state, attempts, run_after, created_at} | JobEvents: {id, job_id, state, occurred_at, message}",
            "testing": "Use JUnit for concurrent submissions, retry limits, cancellation, and graceful shutdown; add stress tests for queue safety.",
            "deployment": "Package as a Java command-line service or Docker image with configurable worker count.",
            "github_checklist": ["Add architecture notes and thread-safety decisions", "Include benchmark instructions", "Document configuration and failure behavior"],
            "resume_description": "Engineered a concurrent Java task scheduler with bounded workers, retry backoff, persistent job history, and JUnit coverage for race-prone workflows.",
            "interview_questions": ["How did you prevent two workers from claiming the same job?", "What tradeoffs come with at-least-once job execution?"]
        }
    ),
    make_project(
        "p8", "E-commerce QA Automation Suite", "Software Testing", "Software Testing",
        "Intermediate", "16 hours",
        "Automate critical shopping workflows and API checks for a sample online storefront.",
        ["Playwright", "TypeScript", "Postman", "GitHub Actions"],
        {
            "problem_statement": "Manual regression checks for product search, cart, and checkout are slow and easy to miss before a release.",
            "objective": "Create a maintainable automated test suite that validates key user journeys and API contracts.",
            "prerequisites": ["Test case design", "JavaScript or TypeScript basics", "HTTP and API fundamentals"],
            "technologies": ["Playwright", "TypeScript", "Postman", "GitHub Actions"],
            "features": ["Product search and filter tests", "Cart and checkout journey coverage", "API schema and status checks", "Screenshots and traces on failure", "CI test reports"],
            "step_by_step": ["Define risk-based test scenarios", "Create stable Playwright page interactions", "Add API checks for products and orders", "Run tests in GitHub Actions", "Review flaky tests and publish HTML reports"],
            "database_design": "Test fixtures: {users, products, inventory} | Test run results: {suite, case, status, duration, artifact_path}",
            "testing": "Run end-to-end tests against a disposable staging environment and verify both successful and rejected checkout cases.",
            "deployment": "Run the test suite in CI against a staging URL; keep test credentials in repository secrets.",
            "github_checklist": ["Separate test data from production", "Include run and report instructions", "Attach traces or screenshots for failed tests"],
            "resume_description": "Created a Playwright and TypeScript regression suite for shopping and checkout flows, with API validation and CI failure artifacts.",
            "interview_questions": ["How do you reduce flaky browser tests?", "Which checkout cases belong in API tests versus end-to-end tests?"]
        }
    )
])

DOMAIN_PROJECT_GUIDES = {
    "Full Stack Developer": {
        "category": "Web Development",
        "prerequisites": ["HTML/CSS", "JavaScript", "React basics", "REST APIs", "Database fundamentals"],
        "features": ["Responsive interface with form validation", "REST API with persistent data", "Search, filtering, and useful empty states", "Authentication and access control", "Deployment-ready configuration"],
        "steps": ["Define the user flows and data model", "Build the responsive client screens", "Implement API routes and persistence", "Add validation, authentication, and error handling", "Test key flows and deploy the application"],
        "database_design": "Users: {id, email, role} | Records: {id, user_id, title, status, created_at} | Activity: {id, record_id, action, occurred_at}",
        "testing": "Test API validation and authorization, then cover the primary user journey and responsive layouts in the browser.",
        "deployment": "Deploy the frontend and API separately, configure environment variables, and use a managed database.",
        "questions": ["How did you keep client and API validation consistent?", "How would you handle a growing number of records efficiently?"]
    },
    "Data Analyst": {
        "category": "Data Analytics",
        "prerequisites": ["Python basics", "SQL joins and aggregations", "Pandas", "Data visualization fundamentals"],
        "features": ["Reproducible data cleaning pipeline", "Documented business metrics", "Interactive filters and drill-downs", "Clear charts with accessible labels", "Exportable insights and methodology"],
        "steps": ["Profile the source data and document assumptions", "Clean records and validate data quality", "Write SQL or Pandas transformations", "Build the dashboard and explain key findings", "Compare results against source totals and publish"],
        "database_design": "Source: {record_id, event_date, category, region, value} | Metrics: {period, dimension, measure, value} | Data quality: {rule, failed_rows, checked_at}",
        "testing": "Reconcile aggregate metrics with source data, test date boundaries, and verify filters do not change totals unexpectedly.",
        "deployment": "Publish the dashboard to Streamlit Community Cloud or Power BI Service with a documented refresh process.",
        "questions": ["How did you validate the accuracy of your headline metric?", "Which chart choices could mislead a reader and how did you avoid them?"]
    },
    "AI/ML Engineer": {
        "category": "AI/ML",
        "prerequisites": ["Python", "Pandas and NumPy", "Probability and statistics", "Scikit-learn fundamentals"],
        "features": ["Documented dataset preparation", "Baseline model for comparison", "Evaluation with appropriate metrics", "Reusable inference pipeline", "Model limitations and responsible-use notes"],
        "steps": ["Define the prediction task and evaluation metric", "Explore, clean, and split the dataset", "Train a baseline and compare candidate models", "Evaluate error patterns and document limitations", "Package inference and create a small demo"],
        "database_design": "Datasets: {version, source, license, loaded_at} | Experiments: {model, parameters, metric, score, created_at} | Predictions: {input_hash, output, model_version}",
        "testing": "Check data leakage, compare against a baseline, test inference on edge cases, and track performance on a held-out set.",
        "deployment": "Serve inference through a small Flask or FastAPI endpoint and pin model and dependency versions.",
        "questions": ["Why is your chosen metric suitable for this problem?", "How would you detect drift after the model is deployed?"]
    },
    "Python Developer": {
        "category": "Backend Development",
        "prerequisites": ["Python OOP", "HTTP and REST", "SQL fundamentals", "Virtual environments and Git"],
        "features": ["Versioned REST endpoints", "Validated request and response schemas", "Persistent storage and migrations", "Structured logging and useful errors", "Automated tests and API documentation"],
        "steps": ["Model the domain entities and API contract", "Build validated routes and service functions", "Add database persistence and migrations", "Write unit and integration tests", "Document configuration and deploy the service"],
        "database_design": "Users: {id, email, created_at} | Resources: {id, owner_id, name, status, created_at} | Events: {id, resource_id, type, occurred_at}",
        "testing": "Use Pytest for service logic and API tests; include invalid payload, missing resource, and authorization cases.",
        "deployment": "Deploy to Render or Railway with a managed database, health endpoint, and secrets supplied through environment variables.",
        "questions": ["How did you separate route handling from business logic?", "How would you safely introduce a breaking API change?"]
    },
    "Cloud/DevOps Engineer": {
        "category": "Cloud & DevOps",
        "prerequisites": ["Linux CLI", "Git", "Docker basics", "Cloud networking fundamentals"],
        "features": ["Repeatable infrastructure configuration", "Automated build and validation pipeline", "Health checks and deployment status", "Least-privilege secrets handling", "Cost-aware teardown instructions"],
        "steps": ["Draw the service and infrastructure boundaries", "Containerize the workload", "Define infrastructure as code", "Automate build, test, and deployment stages", "Verify monitoring, rollback, and cleanup"],
        "database_design": "No application database required | Infrastructure state: remote Terraform backend | Runtime settings: managed configuration and secrets",
        "testing": "Run pipeline checks on a disposable environment, validate health probes, and confirm infrastructure teardown succeeds.",
        "deployment": "Use a low-cost test environment and document how to destroy resources; never commit credentials.",
        "questions": ["How did you prevent credentials from appearing in logs?", "What signals would you use to decide whether to roll back a deployment?"]
    },
    "Cybersecurity": {
        "category": "Cybersecurity",
        "prerequisites": ["HTTP and networking basics", "Linux fundamentals", "Python basics", "OWASP security concepts"],
        "features": ["Defensive checks with clear scope limits", "Severity and evidence for each finding", "Actionable remediation guidance", "Audit trail and exportable reports", "Local test fixtures for safe validation"],
        "steps": ["Define the authorized scope and threat model", "Implement passive checks against a local lab or approved target", "Normalize and classify findings", "Add tests for expected and rejected cases", "Document responsible use and remediation"],
        "database_design": "AuditRuns: {id, approved_scope, created_at, status} | Findings: {id, run_id, check_name, severity, evidence, remediation}",
        "testing": "Use local fixtures and intentionally misconfigured lab services; verify out-of-scope targets are rejected and requests are rate-limited.",
        "deployment": "Run locally or in a private lab. Assess only systems you own or have explicit permission to test.",
        "questions": ["How did you ensure checks stay within the authorized scope?", "How do you prioritize a finding when exploitability and impact differ?"]
    },
    "Software Developer": {
        "category": "Software Engineering",
        "prerequisites": ["Java or C++ fundamentals", "OOP and data structures", "Unit testing", "Git and build tools"],
        "features": ["Clear modular design and interfaces", "Correct handling of edge cases", "Measured complexity or performance", "Automated unit and integration tests", "Architecture and tradeoff documentation"],
        "steps": ["Specify behavior and invariants", "Choose data structures and module boundaries", "Implement the core algorithm or service", "Test correctness and performance", "Document tradeoffs and extension points"],
        "database_design": "Commands: {id, type, input, created_at} | Results: {command_id, status, output, duration} | Configuration: {key, value}",
        "testing": "Add unit tests for boundary conditions, integration tests for module contracts, and benchmarks for performance-sensitive paths.",
        "deployment": "Package with Maven or CMake and provide a reproducible local run configuration or Docker image.",
        "questions": ["What invariant is central to your implementation?", "Which data structure tradeoff had the greatest effect on performance?"]
    },
    "Software Testing": {
        "category": "Software Testing",
        "prerequisites": ["Test design basics", "JavaScript or Python", "HTTP and API fundamentals", "Git and CI basics"],
        "features": ["Risk-based test plan and traceability", "Automated UI or API coverage", "Stable isolated test data", "Useful failure reports and artifacts", "CI execution with clear pass criteria"],
        "steps": ["Identify user risks and define test cases", "Prepare isolated fixtures and environment", "Automate the highest-value scenarios", "Run the suite in CI and capture failures", "Review coverage, reliability, and escaped defects"],
        "database_design": "TestCases: {id, area, priority, expected_result} | TestRuns: {id, commit, started_at, status} | Results: {run_id, case_id, duration, artifact_path}",
        "testing": "Run against a disposable staging environment, cover success and failure paths, and track flaky tests separately from product defects.",
        "deployment": "Run checks in CI against staging; store credentials in repository secrets and publish reports as build artifacts.",
        "questions": ["How do you choose which checks belong at UI, API, or unit level?", "How do you distinguish a flaky test from a genuine product regression?"]
    }
}

DOMAIN_PROJECT_CATALOG = {
    "Full Stack Developer": [
        ("Student Internship Portal", "Intermediate", "18 hours", "Create a portal for student profiles, internship listings, applications, and recruiter updates.", ["React", "Node.js", "Express", "MongoDB"]),
        ("Campus Marketplace", "Intermediate", "20 hours", "Build a student-only marketplace with item listings, saved searches, and seller contact requests.", ["React", "Express", "PostgreSQL", "JWT"]),
        ("Collaborative Study Planner", "Beginner", "12 hours", "Help study groups organize subjects, sessions, shared notes, and weekly goals.", ["React", "Firebase", "Tailwind CSS"]),
        ("Recipe Sharing Platform", "Beginner", "14 hours", "Let users publish recipes, filter by ingredients, and save personal collections.", ["React", "Node.js", "MongoDB", "Cloudinary"]),
        ("Local Services Booking App", "Advanced", "24 hours", "Connect customers and local providers through service listings, bookings, and status updates.", ["React", "Node.js", "PostgreSQL", "Stripe test mode"]),
        ("Club Membership Manager", "Beginner", "12 hours", "Manage student club applications, member roles, announcements, and event attendance.", ["React", "Flask", "SQLite", "CSS"]),
        ("Personal Finance Planner", "Intermediate", "18 hours", "Track budgets, recurring expenses, and savings goals with monthly visual summaries.", ["React", "Express", "MongoDB", "Recharts"]),
        ("Peer Tutoring Scheduler", "Intermediate", "16 hours", "Match peer tutors with students and manage available slots and session feedback.", ["React", "Django", "PostgreSQL", "FullCalendar"]),
        ("Accessible Notes Workspace", "Intermediate", "16 hours", "Create searchable notes with tags, keyboard navigation, and shareable read-only views.", ["React", "FastAPI", "PostgreSQL", "WCAG"]),
        ("Student Skill Tracker", "Beginner", "10 hours", "Track skills, certifications, and internship goals with a simple dashboard for student progress.", ["React", "Express", "MongoDB", "Tailwind CSS"])
    ],
    "Data Analyst": [
        ("Customer Churn Analysis", "Intermediate", "14 hours", "Analyze subscription activity to identify churn patterns and customer retention signals.", ["Python", "Pandas", "SQL", "Power BI"]),
        ("Student Placement Outcomes Dashboard", "Beginner", "12 hours", "Explore placement rates by branch, skills, internship history, and graduation year.", ["SQL", "Excel", "Power BI", "Python"]),
        ("Bike Share Demand Study", "Intermediate", "16 hours", "Measure how weather, season, and time influence bike rental demand.", ["Python", "Pandas", "Seaborn", "Jupyter"]),
        ("Retail Inventory Insights", "Intermediate", "15 hours", "Find stockout risks and slow-moving products from a sample retail transaction dataset.", ["SQL", "Python", "Pandas", "Tableau"]),
        ("Public Transit Reliability Report", "Advanced", "20 hours", "Compare scheduled and actual arrival data to reveal route-level reliability trends.", ["Python", "Pandas", "PostgreSQL", "Plotly"]),
        ("A/B Experiment Evaluation", "Intermediate", "12 hours", "Evaluate a fictional product experiment and communicate statistical uncertainty clearly.", ["Python", "SciPy", "Pandas", "Jupyter"]),
        ("Food Delivery Operations Dashboard", "Beginner", "10 hours", "Track delivery times, order volume, cancellation rates, and service areas.", ["Excel", "SQL", "Power BI"]),
        ("Customer Support Ticket Trends", "Intermediate", "14 hours", "Summarize ticket categories, resolution time, backlog, and customer satisfaction.", ["Python", "Pandas", "SQL", "Streamlit"]),
        ("Renewable Energy Production Explorer", "Advanced", "18 hours", "Compare renewable generation patterns across regions and time using public datasets.", ["Python", "Pandas", "DuckDB", "Plotly"]),
        ("Smart City Traffic Insights", "Intermediate", "16 hours", "Analyze commuting trends and congestion hotspots to recommend better transit planning decisions.", ["Python", "SQL", "Pandas", "Tableau"])
    ],
    "AI/ML Engineer": [
        ("Fake News Classification Study", "Intermediate", "18 hours", "Compare text classification baselines on a licensed dataset and document error patterns.", ["Python", "Scikit-learn", "NLTK", "Streamlit"]),
        ("Customer Review Sentiment Explorer", "Beginner", "12 hours", "Classify sample product reviews and visualize sentiment confidence and common terms.", ["Python", "Pandas", "Scikit-learn", "Plotly"]),
        ("House Price Estimation Model", "Beginner", "14 hours", "Train and evaluate regression models using a public housing dataset with clear caveats.", ["Python", "Pandas", "Scikit-learn", "FastAPI"]),
        ("Plant Disease Image Classifier", "Advanced", "22 hours", "Prototype an image classifier on a public dataset and report class-wise performance.", ["Python", "PyTorch", "Pillow", "Gradio"]),
        ("Book Recommendation Engine", "Intermediate", "16 hours", "Recommend books using transparent content-based and collaborative filtering baselines.", ["Python", "Pandas", "Scikit-learn", "Streamlit"]),
        ("Campus FAQ Retrieval Assistant", "Intermediate", "16 hours", "Answer campus FAQs by retrieving relevant approved documents and citing their sources.", ["Python", "FastAPI", "Sentence Transformers", "FAISS"]),
        ("Credit Risk Model Evaluation", "Advanced", "20 hours", "Compare interpretable classification models and audit fairness metrics on public data.", ["Python", "Scikit-learn", "SHAP", "Jupyter"]),
        ("Sensor Anomaly Detection", "Advanced", "18 hours", "Detect unusual readings in a synthetic sensor stream and compare alert thresholds.", ["Python", "NumPy", "Scikit-learn", "Streamlit"]),
        ("Document Topic Explorer", "Intermediate", "14 hours", "Group a collection of licensed documents into topics and inspect model limitations.", ["Python", "spaCy", "Scikit-learn", "Plotly"]),
        ("Credit Card Fraud Pattern Detector", "Advanced", "20 hours", "Build a fraud detection prototype using transaction patterns and explain key model decisions.", ["Python", "Pandas", "Scikit-learn", "XGBoost"])
    ],
    "Python Developer": [
        ("URL Shortener API", "Beginner", "10 hours", "Create a documented API that generates short links and records safe usage metrics.", ["Python", "Flask", "SQLite", "Pytest"]),
        ("Library Lending Service", "Intermediate", "14 hours", "Manage a library catalog, member accounts, checkouts, renewals, and overdue status.", ["Python", "Django REST Framework", "PostgreSQL", "Pytest"]),
        ("Automated File Organizer", "Beginner", "8 hours", "Sort a user-selected folder by file type with a preview, undo log, and safe defaults.", ["Python", "pathlib", "Typer", "Pytest"]),
        ("Public Data Import Pipeline", "Intermediate", "14 hours", "Fetch a documented public dataset, validate records, and expose a searchable API.", ["Python", "FastAPI", "Pydantic", "PostgreSQL"]),
        ("Async Notification Service", "Advanced", "20 hours", "Queue email-like notifications for a local test sink with retries and delivery tracking.", ["Python", "FastAPI", "Redis", "Celery"]),
        ("Inventory Management API", "Intermediate", "16 hours", "Track products, stock adjustments, suppliers, and low-stock alerts through an API.", ["Python", "Flask", "SQLAlchemy", "PostgreSQL"]),
        ("Command-line Habit Tracker", "Beginner", "8 hours", "Build a local-first CLI for recording habits, streaks, and weekly summaries.", ["Python", "Typer", "SQLite", "Rich"]),
        ("Weather Data Aggregator", "Intermediate", "12 hours", "Normalize responses from a public weather API and cache forecasts with expiry.", ["Python", "FastAPI", "httpx", "Redis"]),
        ("Background Report Generator", "Advanced", "18 hours", "Generate scheduled CSV reports from sample records and expose job status endpoints.", ["Python", "Django", "Celery", "PostgreSQL"]),
        ("Campus Event Attendance API", "Intermediate", "12 hours", "Track attendance, check-in logs, and event summary reports with a clean API surface.", ["Python", "FastAPI", "SQLite", "Pydantic"])
    ],
    "Cloud/DevOps Engineer": [
        ("GitOps Static Site Platform", "Intermediate", "16 hours", "Deploy a static site through a Git-based workflow with preview and production environments.", ["Docker", "GitHub Actions", "Terraform", "AWS S3"]),
        ("Kubernetes Observability Lab", "Advanced", "22 hours", "Instrument a sample service with metrics, dashboards, and actionable health alerts.", ["Kubernetes", "Prometheus", "Grafana", "Docker"]),
        ("Automated Backup and Restore Drill", "Intermediate", "14 hours", "Schedule encrypted backups for sample data and regularly verify restore integrity.", ["Python", "AWS S3", "Terraform", "GitHub Actions"]),
        ("Serverless Image Processing Pipeline", "Advanced", "20 hours", "Process uploaded demo images asynchronously and track each job through cloud events.", ["AWS Lambda", "S3", "Terraform", "Python"]),
        ("Autoscaling Web Service Demo", "Advanced", "20 hours", "Deploy a sample service with measured scaling thresholds and documented load tests.", ["Docker", "Kubernetes", "Helm", "Prometheus"]),
        ("Infrastructure Drift Reporter", "Intermediate", "14 hours", "Compare declared test infrastructure with observed state and report changes for review.", ["Terraform", "Python", "GitHub Actions", "AWS"]),
        ("Secrets Rotation Practice Lab", "Intermediate", "12 hours", "Demonstrate safe secret storage and rotation using a disposable non-production service.", ["Docker", "AWS Secrets Manager", "Terraform", "Python"]),
        ("Cloud Cost Visibility Dashboard", "Beginner", "10 hours", "Summarize sample cloud billing exports by service, tag, and month with budget alerts.", ["Python", "Pandas", "AWS Cost Explorer", "Streamlit"]),
        ("Blue-Green Deployment Simulator", "Advanced", "18 hours", "Practice staged releases and health-based traffic switching for a containerized demo.", ["Docker", "Kubernetes", "Argo Rollouts", "GitHub Actions"]),
        ("Cloud Cost Anomaly Monitor", "Intermediate", "14 hours", "Analyze VM and storage usage data to detect unusual cost spikes and alert on budget drift.", ["Python", "Terraform", "AWS", "Prometheus"])
    ],
    "Cybersecurity": [
        ("Security Header Review Tool", "Beginner", "10 hours", "Review security headers on a local lab site and produce remediation-focused reports.", ["Python", "Flask", "Requests", "OWASP"]),
        ("Defensive Log Anomaly Dashboard", "Intermediate", "16 hours", "Summarize synthetic authentication logs and flag unusual patterns for analyst review.", ["Python", "Pandas", "SQLite", "Streamlit"]),
        ("File Integrity Monitor", "Beginner", "10 hours", "Track file hashes in a test directory and report unexpected changes with timestamps.", ["Python", "hashlib", "SQLite", "Pytest"]),
        ("Dependency Risk Reporter", "Intermediate", "12 hours", "Parse dependency audit output and create a prioritized report with upgrade guidance.", ["Python", "CycloneDX", "OSV data", "HTML"]),
        ("Phishing Awareness Classifier", "Intermediate", "14 hours", "Teach safe email review by labeling a public or synthetic dataset and explaining warning signals.", ["Python", "Scikit-learn", "Pandas", "Streamlit"]),
        ("Secure Login Lab", "Intermediate", "16 hours", "Build a local authentication demo with secure password storage, rate limits, and audit events.", ["Python", "Flask", "Argon2", "SQLite"]),
        ("Threat Modeling Workbook", "Beginner", "8 hours", "Create a lightweight threat model for a sample student web app with mitigations and ownership.", ["OWASP Threat Dragon", "Markdown", "Draw.io"]),
        ("TLS Configuration Review Lab", "Advanced", "14 hours", "Inspect TLS configuration on owned local services and explain certificate and protocol findings.", ["Python", "OpenSSL", "Docker", "OWASP"]),
        ("Privacy Data Inventory Tool", "Intermediate", "12 hours", "Catalog sample application data fields by purpose, retention, and access control needs.", ["Python", "Flask", "SQLite", "Pandas"]),
        ("Security Posture Summary Dashboard", "Intermediate", "13 hours", "Create a dashboard that reviews basic security controls and highlights missing protections for a small app.", ["Python", "Flask", "SQLite", "HTML/CSS"])
    ],
    "Software Developer": [
        ("LRU Cache Library", "Beginner", "10 hours", "Implement a reusable least-recently-used cache and compare operations under varied workloads.", ["Java", "JUnit", "Maven", "JMH"]),
        ("Event Seat Allocation Engine", "Intermediate", "16 hours", "Model seat holds, confirmations, and expiry while preventing conflicting reservations.", ["Java", "Concurrency", "JUnit", "PostgreSQL"]),
        ("Mini Search Engine", "Advanced", "22 hours", "Index a local document collection and rank results with transparent scoring rules.", ["Java", "Inverted Index", "JUnit", "Maven"]),
        ("Library Catalog Domain Model", "Beginner", "12 hours", "Design a testable object model for catalog search, lending rules, and renewals.", ["Java", "OOP", "JUnit", "Maven"]),
        ("Local Chat Server", "Advanced", "20 hours", "Build a TCP chat server with multiple clients, orderly shutdown, and message history.", ["Java", "Sockets", "Concurrency", "JUnit"]),
        ("Expression Evaluator", "Intermediate", "14 hours", "Parse and evaluate arithmetic expressions with operator precedence and useful errors.", ["C++", "Recursive Descent", "CMake", "Catch2"]),
        ("Transit Route Planner", "Intermediate", "16 hours", "Find shortest routes across a sample transit graph and compare route weights.", ["Java", "Graphs", "JUnit", "Maven"]),
        ("Persistent Key-Value Store", "Advanced", "22 hours", "Implement a small append-only store with recovery checks and documented consistency tradeoffs.", ["Java", "File I/O", "JUnit", "Maven"]),
        ("Memory Allocation Visualizer", "Intermediate", "14 hours", "Visualize allocation strategies and fragmentation using a configurable memory simulator.", ["C++", "Data Structures", "CMake", "ImGui"]),
        ("CLI Task Manager", "Beginner", "9 hours", "Build a command-line application for managing daily tasks, priorities, and completion history.", ["Java", "JUnit", "Maven", "File I/O"])
    ],
    "Software Testing": [
        ("REST API Contract Test Pack", "Beginner", "10 hours", "Validate a sample service's response schemas, status codes, and backward compatibility.", ["Postman", "Newman", "JSON Schema", "GitHub Actions"]),
        ("Accessibility Regression Checks", "Intermediate", "12 hours", "Add automated accessibility checks and a manual review checklist for key pages.", ["Playwright", "axe-core", "TypeScript", "GitHub Actions"]),
        ("Visual Regression Test Suite", "Intermediate", "14 hours", "Capture stable page screenshots and review intentional versus unexpected UI changes.", ["Playwright", "TypeScript", "Chromatic", "GitHub Actions"]),
        ("Performance Baseline Lab", "Intermediate", "14 hours", "Measure response and page-load performance against a small repeatable test workload.", ["k6", "Lighthouse", "Docker", "Grafana"]),
        ("Cross-Browser Checkout Matrix", "Advanced", "18 hours", "Run critical checkout scenarios across browser engines with isolated test data.", ["Playwright", "TypeScript", "BrowserStack", "GitHub Actions"]),
        ("Data Import Validation Suite", "Intermediate", "12 hours", "Test CSV imports for malformed rows, duplicate records, and boundary-value errors.", ["Python", "Pytest", "Pandas", "SQLite"]),
        ("Mobile App Smoke Test Plan", "Intermediate", "16 hours", "Automate core mobile app smoke flows and record device and OS coverage.", ["Appium", "Python", "Pytest", "Android Emulator"]),
        ("Flaky Test Triage Dashboard", "Advanced", "18 hours", "Analyze historical CI results and group intermittent failures by test and environment.", ["Python", "Pandas", "SQLite", "Streamlit"]),
        ("Booking Workflow State Tests", "Intermediate", "14 hours", "Cover booking creation, cancellation, expiry, and recovery through API and UI tests.", ["Cypress", "JavaScript", "Postman", "GitHub Actions"]),
        ("API Regression Dashboard", "Intermediate", "13 hours", "Track historical API test results and highlight flaky checks, error trends, and areas needing attention.", ["Playwright", "TypeScript", "Postman", "GitHub Actions"])
    ]
}

def add_catalog_projects():
    next_project_number = len(SAMPLE_PROJECTS) + 1
    for career, guide in DOMAIN_PROJECT_GUIDES.items():
        for title, difficulty, hours, description, technologies in DOMAIN_PROJECT_CATALOG[career]:
            detail = {
                "problem_statement": description,
                "objective": f"Build {title.lower()} that addresses this use case and demonstrates reliable, maintainable engineering.",
                "prerequisites": guide["prerequisites"],
                "technologies": technologies,
                "features": guide["features"],
                "step_by_step": guide["steps"],
                "database_design": guide["database_design"],
                "testing": guide["testing"],
                "deployment": guide["deployment"],
                "github_checklist": ["Add setup and run instructions", "Include sample data or fixtures where appropriate", "Document design choices, limitations, and screenshots"],
                "resume_description": f"Built {title} using {', '.join(technologies)}. {description}",
                "interview_questions": guide["questions"]
            }
            SAMPLE_PROJECTS.append(make_project(
                f"p{next_project_number}", title, guide["category"], career,
                difficulty, hours, description, technologies, detail
            ))
            next_project_number += 1

add_catalog_projects()

@projects_bp.route("", methods=["GET"])
def get_projects():
    career = request.args.get("career")
    difficulty = request.args.get("difficulty")
    category = request.args.get("category")

    filtered = SAMPLE_PROJECTS
    if career and career != "All":
        filtered = [p for p in filtered if p["career"].lower() == career.lower()]
    if difficulty and difficulty != "All":
        filtered = [p for p in filtered if p["difficulty"].lower() == difficulty.lower()]
    if category and category != "All":
        filtered = [p for p in filtered if p["category"].lower() == category.lower()]

    return jsonify({"projects": filtered, "total": len(filtered)}), 200

@projects_bp.route("/<project_id>", methods=["GET"])
def get_project_detail(project_id):
    proj = next((p for p in SAMPLE_PROJECTS if p["id"] == project_id), SAMPLE_PROJECTS[0])
    return jsonify({"project": proj}), 200
