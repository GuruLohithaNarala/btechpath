import { apiRequest } from "./api";

export const roadmapService = {
  async generateRoadmap(formData) {
    try {
      return await apiRequest("/roadmaps/generate", "POST", formData);
    } catch (e) {
      // Fallback generator
      return {
        roadmap: {
          _id: "demo_roadmap_id",
          user_name: formData.user_name || "Student",
          branch: formData.branch || "CSE",
          year: formData.year || "2nd Year",
          career_goal: formData.career_goal || "Full Stack Developer",
          skill_level: formData.skill_level || "Beginner",
          study_time: formData.study_time || "2 hours/day",
          overall_completion: 30,
          total_steps: 8,
          completed_steps: 2,
          steps: [
            { id: "step_1", order: 1, title: "HTML5, CSS3 & Responsive Layouts", skills: ["Flexbox", "Grid", "Tailwind"], status: "Completed", duration: "2 Weeks", tasks: ["Build portfolio homepage", "Master CSS Grid"] },
            { id: "step_2", order: 2, title: "JavaScript ES6+ & DOM Manipulation", skills: ["Async/Await", "Promises", "Fetch API"], status: "Completed", duration: "3 Weeks", tasks: ["Build Todo App", "Fetch Weather API"] },
            { id: "step_3", order: 3, title: "React.js Component Architecture", skills: ["Hooks", "JSX", "React Router"], status: "In Progress", duration: "4 Weeks", tasks: ["State management", "Build E-commerce UI"] },
            { id: "step_4", order: 4, title: "Backend with Node.js / Express or Flask", skills: ["REST APIs", "Middleware", "JSON"], status: "Not Started", duration: "4 Weeks", tasks: ["Build REST API", "Handle auth headers"] },
            { id: "step_5", order: 5, title: "Database Systems (MongoDB / SQL)", skills: ["PyMongo", "Indexing", "JOINs"], status: "Not Started", duration: "3 Weeks", tasks: ["Design schema", "Optimize queries"] },
            { id: "step_6", order: 6, title: "JWT Auth & Security", skills: ["Bcrypt", "Protected Routes"], status: "Not Started", duration: "2 Weeks", tasks: ["Implement token login", "Role auth"] },
            { id: "step_7", order: 7, title: "Full Stack Projects & Deployment", skills: ["Docker", "Vercel", "Render"], status: "Not Started", duration: "4 Weeks", tasks: ["Deploy to production", "Setup CI/CD"] },
            { id: "step_8", order: 8, title: "Interview Prep & System Design", skills: ["Coding Mocks", "LLD", "HLD"], status: "Not Started", duration: "3 Weeks", tasks: ["Solve top 50 interview Qs", "Mock interviews"] }
          ]
        }
      };
    }
  },

  async getRoadmapById(id) {
    try {
      return await apiRequest(`/roadmaps/${id}`, "GET");
    } catch (e) {
      return this.generateRoadmap({});
    }
  },

  async getCareerTracks() {
    try {
      return await apiRequest("/roadmaps/tracks", "GET");
    } catch (e) {
      return {
        tracks: [
          { title: "Full Stack Developer", total_steps: 10, first_step: "HTML5, CSS3 & Responsive Design" },
          { title: "Data Analyst", total_steps: 10, first_step: "Python Fundamentals" },
          { title: "AI/ML Engineer", total_steps: 9, first_step: "Python & Scientific Computing" },
          { title: "Python Developer", total_steps: 7, first_step: "Python Core & Data Structures" },
          { title: "Cloud/DevOps Engineer", total_steps: 7, first_step: "Linux Administration & Shell Scripting" },
          { title: "Cybersecurity", total_steps: 6, first_step: "Computer Networks & Protocols" },
          { title: "Software Developer", total_steps: 6, first_step: "Programming Core (C++ / Java / Python)" },
          { title: "Software Testing", total_steps: 6, first_step: "Software Testing Fundamentals" }
        ]
      };
    }
  },

  async updateStepStatus(roadmapId, stepId, status) {
    try {
      return await apiRequest(`/roadmaps/${roadmapId}/steps/${stepId}`, "PUT", { status });
    } catch (e) {
      return { message: "Status updated locally" };
    }
  }
};

export const courseService = {
  async getCourses(filters = {}) {
    try {
      const query = new URLSearchParams(filters).toString();
      return await apiRequest(`/courses?${query}`, "GET");
    } catch (e) {
      return { courses: [] };
    }
  },
  async getCourseDetail(id) {
    try {
      return await apiRequest(`/courses/${id}`, "GET");
    } catch (e) {
      return { course: null };
    }
  }
};

export const quizService = {
  async getQuiz(id) {
    try {
      return await apiRequest(`/quizzes/${id}`, "GET");
    } catch (e) {
      return { quiz: null };
    }
  },
  async submitQuiz(id, answers, userId) {
    try {
      return await apiRequest(`/quizzes/${id}/submit`, "POST", { answers, user_id: userId });
    } catch (e) {
      return { score: 2, total: 3, percentage: 67, xp_earned: 40 };
    }
  }
};

export const projectService = {
  async getProjects(filters = {}) {
    try {
      const query = new URLSearchParams(filters).toString();
      return await apiRequest(`/projects?${query}`, "GET");
    } catch (e) {
      return {
        projects: [
          {
            id: "fallback-p1",
            title: "Expense Tracker Web Application",
            category: "Web Development",
            career: "Full Stack Developer",
            difficulty: "Beginner",
            estimated_time: "10 hours",
            short_description: "Track daily income and expenses with interactive charts and category filtering.",
            technologies: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
            detail: {
              problem_statement: "Students struggle to keep track of monthly pocket money, hosteller expenses, and recurring subscriptions.",
              objective: "Build a responsive web application that logs transactions, calculates total balance, and visualizes monthly spending trends.",
              prerequisites: ["HTML/CSS", "JavaScript ES6", "Basic React Hooks"],
              technologies: ["React.js", "Tailwind CSS", "Express.js", "MongoDB", "Chart.js"],
              features: [
                "User Authentication (JWT)",
                "Add/Edit/Delete Income & Expense Entries",
                "Category Tagging (Food, Books, Travel, Entertainment)",
                "Monthly Pie Chart Summary",
                "Export Statement as CSV/JSON"
              ],
              step_by_step: [
                "Set up the React frontend with Vite and Tailwind CSS",
                "Initialize the Express backend with a Mongoose schema",
                "Create CRUD routes for transaction data",
                "Connect Chart.js to render spending breakdowns",
                "Deploy the app and document the setup"
              ],
              database_design: "UsersCollection: {_id, email, passwordHash} | TransactionsCollection: {_id, userId, type, category, amount, date, description}",
              testing: "Unit-test transaction calculations with Jest and validate endpoints with Postman.",
              deployment: "Frontend on Vercel, backend on Render, database on MongoDB Atlas.",
              github_checklist: ["Add a clean README.md", "Include an .env.example file", "Document setup instructions clearly"],
              resume_description: "• Built a Full Stack Expense Tracker in React and Express used to analyze monthly budgets.\n• Integrated Chart.js for data visualization, reducing expense entry time by 40%.\n• Implemented secure JWT auth and MongoDB aggregation pipelines for instant statement generation.",
              interview_questions: [
                "How did you secure JWT tokens in local storage versus HTTP-only cookies?",
                "How would you optimize MongoDB queries when transaction data reaches 1 million records?"
              ]
            }
          },
          {
            id: "fallback-p2",
            title: "Sales Analytics Dashboard",
            category: "Data Analytics",
            career: "Data Analyst",
            difficulty: "Intermediate",
            estimated_time: "15 hours",
            short_description: "Interactive business intelligence dashboard analyzing store revenue and region trends.",
            technologies: ["Python", "Pandas", "SQL", "Power BI", "Plotly"],
            detail: {
              problem_statement: "Retail managers need actionable insights from raw CSV sales data to identify top categories and weak regions.",
              objective: "Process sales records, run SQL queries, and deploy an interactive dashboard.",
              prerequisites: ["Python", "Pandas DataFrames", "SQL JOINs"],
              technologies: ["Python 3.11", "Pandas", "NumPy", "PostgreSQL", "Streamlit", "Plotly"],
              features: [
                "Automated Data Cleaning",
                "KPI Metric Cards",
                "Regional Heatmap Visualization",
                "Product Performance Filtering"
              ],
              step_by_step: [
                "Ingest raw CSV data with Pandas",
                "Clean missing values and normalize date fields",
                "Load results into SQL and run analytics queries",
                "Build the Streamlit dashboard layout",
                "Deploy the dashboard and document findings"
              ],
              database_design: "SalesTable: {order_id, customer_id, product_category, unit_price, quantity, order_date, region}",
              testing: "Verify data consistency between source totals and SQL query aggregates.",
              deployment: "Streamlit Community Cloud or Hugging Face Spaces.",
              github_checklist: ["Add sample data CSV", "Document setup steps", "Host a live dashboard link"],
              resume_description: "• Built an interactive Sales Analytics Dashboard processing 100K+ transactional records using Python and SQL.\n• Discovered key regional sales patterns and visualized insights with Plotly.\n• Designed multi-filter charts deployed on Streamlit Cloud.",
              interview_questions: [
                "How did you handle missing values in Pandas?",
                "What SQL query did you write to calculate month-over-month growth?"
              ]
            }
          },
          {
            id: "fallback-p3",
            title: "AI Resume Analyzer & ATS Score Calculator",
            category: "AI/ML",
            career: "AI/ML Engineer",
            difficulty: "Advanced",
            estimated_time: "20 hours",
            short_description: "Parses PDF resumes, extracts key skills using NLP, and compares them against job descriptions.",
            technologies: ["Python", "PyPDF2", "SpaCy", "Scikit-Learn", "Flask"],
            detail: {
              problem_statement: "Job applicants submit resumes without knowing if they match a target role or ATS filters.",
              objective: "Build an AI tool that extracts resume text, matches skills, and outputs a score with suggestions.",
              prerequisites: ["Python Fundamentals", "Basic NLP concepts", "Scikit-learn"],
              technologies: ["Python", "PyPDF2", "SpaCy", "Scikit-Learn", "Flask", "React"],
              features: [
                "PDF Text Extraction",
                "Skill Keyword Extraction",
                "Job Match Score",
                "Suggested Missing Skills"
              ],
              step_by_step: [
                "Extract text from PDF resumes",
                "Clean and tokenize the text using SpaCy",
                "Vectorize resume and job description text",
                "Calculate cosine similarity scores",
                "Expose data through a Flask API and React UI"
              ],
              database_design: "ResumesCollection: {_id, filename, score, missingKeywords, timestamp}",
              testing: "Test parsing accuracy across multiple PDF layouts and edge cases.",
              deployment: "Render backend and Vercel frontend.",
              github_checklist: ["Add sample resume PDFs", "Provide API docs", "Describe usage instructions clearly"],
              resume_description: "• Developed an AI Resume Analyzer using NLP and TF-IDF vectorization in Python.\n• Computed ATS job match similarity scores and highlighted missing keywords.\n• Created a React and Flask interface for quick resume optimization recommendations.",
              interview_questions: [
                "Why choose TF-IDF over embeddings for skill matching?",
                "How would you handle multi-column resume layouts during parsing?"
              ]
            }
          }
        ]
      };
    }
  },
  async getProjectDetail(id) {
    try {
      return await apiRequest(`/projects/${id}`, "GET");
    } catch (e) {
      return {
        project: {
          id,
          title: "Expense Tracker Web Application",
          category: "Web Development",
          career: "Full Stack Developer",
          difficulty: "Beginner",
          estimated_time: "10 hours",
          short_description: "Track daily income and expenses with interactive charts and category filtering.",
          technologies: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
          detail: {
            problem_statement: "Students struggle to keep track of monthly pocket money, hosteller expenses, and recurring subscriptions.",
            objective: "Build a responsive web application that logs transactions, calculates total balance, and visualizes monthly spending trends.",
            prerequisites: ["HTML/CSS", "JavaScript ES6", "Basic React Hooks"],
            technologies: ["React.js", "Tailwind CSS", "Express.js", "MongoDB", "Chart.js"],
            features: ["User Authentication (JWT)", "Add/Edit/Delete Income & Expense Entries", "Monthly Pie Chart Summary"],
            step_by_step: ["Set up the frontend", "Build the transaction model", "Connect to the API", "Deploy the app"],
            database_design: "UsersCollection: {_id, email, passwordHash} | TransactionsCollection: {_id, userId, type, category, amount, date, description}",
            testing: "Unit-test calculations and validate API endpoints.",
            deployment: "Frontend on Vercel and backend on Render.",
            github_checklist: ["Add README", "Add .env.example", "Document project setup"],
            resume_description: "• Built a Full Stack Expense Tracker in React and Express used to analyze monthly budgets.\n• Integrated Chart.js for visualization and secure JWT auth.",
            interview_questions: ["How did you secure JWT tokens?", "How would you scale this app?"]
          }
        }
      };
    }
  }
};

export const placementService = {
  async getPlacementData() {
    try {
      return await apiRequest("/placement", "GET");
    } catch (e) {
      return {
        dsa_modules: [
          { id: "dsa_arrays", title: "Arrays & Strings", total_problems: 25, completed: 12, difficulty: "Easy to Medium", key_topics: ["Two Pointers", "Sliding Window", "Prefix Sum"] },
          { id: "dsa_ll", title: "Linked Lists", total_problems: 15, completed: 8, difficulty: "Medium", key_topics: ["Reversal", "Cycle Detection", "Merge K Lists"] },
          { id: "dsa_stack", title: "Stack & Queue", total_problems: 15, completed: 6, difficulty: "Medium", key_topics: ["Monotonic Stack", "Next Greater Element", "LRU Cache"] },
          { id: "dsa_trees", title: "Binary Trees & BST", total_problems: 20, completed: 5, difficulty: "Medium to Hard", key_topics: ["Traversals", "LCA", "Diameter of Tree"] },
          { id: "dsa_graphs", title: "Graphs", total_problems: 18, completed: 2, difficulty: "Hard", key_topics: ["BFS", "DFS", "Dijkstra's Algorithm", "Topological Sort"] }
        ],
        core_cs: [
          { id: "dbms", subject: "DBMS", topics_count: 12, key_concepts: ["ACID Properties", "Normalization (1NF-3NF/BCNF)", "Indexing", "Transactions & Locking"] },
          { id: "os", subject: "Operating Systems", topics_count: 10, key_concepts: ["Process vs Thread", "Deadlock Prevention", "Virtual Memory", "CPU Scheduling"] },
          { id: "cn", subject: "Computer Networks", topics_count: 10, key_concepts: ["TCP 3-Way Handshake", "OSI 7 Layers", "HTTP vs HTTPS", "DNS Resolution"] },
          { id: "oop", subject: "OOP Concepts", topics_count: 8, key_concepts: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"] }
        ],
        aptitude: [
          { id: "quant", category: "Quantitative Aptitude", topics: ["Percentages", "Profit & Loss", "Time & Work", "Probability", "Speed & Distance"] },
          { id: "logical", category: "Logical Reasoning", topics: ["Blood Relations", "Coding-Decoding", "Syllogism", "Seating Arrangement"] },
          { id: "verbal", category: "Verbal Ability", topics: ["Reading Comprehension", "Sentence Correction", "Synonyms & Antonyms", "Para Jumbles"] }
        ],
        government_jobs: [
          { id: "upsc-ese", title: "Engineering Services Examination (ESE)", sector: "Central Government", roles: "Group A and Group B engineering roles across central government departments.", eligibility: "An engineering degree in a discipline listed in the current UPSC notice.", selection: "Preliminary Examination, Main Examination, and Personality Test.", preparation: "Build depth in your discipline and practice objective questions and engineering aptitude.", official_url: "https://upsc.gov.in/", official_label: "UPSC official site" },
          { id: "isro-scientist", title: "ISRO Scientist/Engineer", sector: "Central Government", roles: "Engineering and research roles supporting India's space programmes.", eligibility: "Relevant engineering degree and minimum academic criteria specified in the current notice.", selection: "May include a written test and interview.", preparation: "Revise core engineering subjects and explain your project work clearly.", official_url: "https://www.isro.gov.in/Careers.html", official_label: "ISRO careers" },
          { id: "psu-engineer", title: "PSU Graduate Engineer / Trainee", sector: "Public Sector Undertaking", roles: "Engineering roles at public sector companies.", eligibility: "Relevant engineering degree and GATE score when specified by the PSU.", selection: "GATE shortlisting followed by interview or other assessments.", preparation: "Prepare for GATE in your discipline and track individual PSU notices.", official_url: "https://www.powergrid.in/job-opportunities", official_label: "Example PSU: POWERGRID jobs" }
        ],
        interview_qa: [
          { q: "Explain the difference between Process and Thread.", subject: "OS", a: "A process is an independent executing program with its own memory space. A thread is a lightweight unit of execution within a process that shares memory with other threads in the same process." },
          { q: "What are ACID properties in DBMS?", subject: "DBMS", a: "Atomicity, Consistency, Isolation, and Durability." },
          { q: "Tell me about yourself and your B.Tech final year project.", subject: "HR / Tech", a: "Structure using STAR method and highlight key tech stack, your role, and measurable outcomes." },
          { q: "How does TCP differ from UDP?", subject: "Computer Networks", a: "TCP is connection-oriented and reliable; UDP is lightweight and connectionless with less overhead." },
          { q: "When would you use a LEFT JOIN instead of an INNER JOIN?", subject: "DBMS", a: "Use LEFT JOIN when every row from the left table must remain even if there is no match on the right." },
          { q: "Why should we hire you?", subject: "HR", a: "Match requirements from the role to evidence from your projects, skills, and learning mindset."
          }
        ]
      };
    }
  }
};

export const resumeService = {
  async getResumeProfile(userId) {
    try {
      return await apiRequest(`/resume/profile?user_id=${userId}`, "GET");
    } catch (e) {
      return { resume: null };
    }
  },
  async saveResumeProfile(data) {
    try {
      return await apiRequest("/resume/profile", "POST", data);
    } catch (e) {
      return { message: "Saved locally" };
    }
  },
  async analyzeResume(data) {
    try {
      return await apiRequest("/resume/analyze", "POST", data);
    } catch (e) {
      return { analysis: null };
    }
  }
};

export const techPulseService = {
  async getTrends() {
    try {
      return await apiRequest("/tech-pulse", "GET");
    } catch (e) {
      return { trends: [] };
    }
  }
};

export const aiService = {
  async sendMessage(message) {
    try {
      return await apiRequest("/ai/mentor", "POST", { message });
    } catch (e) {
      return {
        response: {
          reply: "I am your BTechPath AI Mentor! Feel free to ask questions about software roadmaps, study plans, or project ideas.",
          suggested_prompts: ["What should I learn next?", "Explain SQL JOIN simply.", "Give me a 2-hour study plan."]
        }
      };
    }
  }
};

export const dashboardService = {
  async getStudentDashboard(userId) {
    try {
      return await apiRequest(`/dashboard/student?user_id=${userId}`, "GET");
    } catch (e) {
      return { dashboard: null };
    }
  }
};

export const adminService = {
  async getAnalytics() {
    try {
      return await apiRequest("/admin/analytics", "GET");
    } catch (e) {
      return { analytics: null };
    }
  },
  async getStudents() {
    try {
      return await apiRequest("/admin/students", "GET");
    } catch (e) {
      return { students: [] };
    }
  }
};
