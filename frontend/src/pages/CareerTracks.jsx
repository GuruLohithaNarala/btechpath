import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { roadmapService } from "../services/appServices";
import { Compass, Target, ArrowRight, CheckCircle2, Layers } from "lucide-react";

export default function CareerTracks() {
  const [searchParams] = useSearchParams();
  const selectedTrackParam = searchParams.get("track");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTracks() {
      setLoading(true);
      const res = await roadmapService.getCareerTracks();
      if (res && res.tracks) {
        setTracks(res.tracks);
      }
      setLoading(false);
    }
    loadTracks();
  }, []);

  const TRACK_DETAILS = {
    "Full Stack Developer": {
      desc: "Build modern end-to-end web applications with React, Node.js, Express, and MongoDB/SQL databases.",
      stages: ["Beginner: HTML/CSS, JS ES6+, Git", "Intermediate: React.js, Tailwind, REST APIs", "Advanced: Node.js/Flask, Database Indexing, JWT Auth", "Projects: Expense Tracker, E-Commerce Platform", "Interview Prep: System Design LLD, System Mocks"]
    },
    "Data Analyst": {
      desc: "Transform raw data into business intelligence using SQL, Python (Pandas/NumPy), and interactive dashboards.",
      stages: ["Beginner: Python Basics, SQL SELECT, Excel", "Intermediate: Pandas, Seaborn, Matplotlib", "Advanced: Power BI / Tableau DAX, Complex JOINs", "Projects: Sales Analytics Dashboard, Customer Churn", "Interview Prep: SQL Live Coding & Case Studies"]
    },
    "AI/ML Engineer": {
      desc: "Develop machine learning algorithms, deep learning neural networks, NLP, and GenAI models.",
      stages: ["Beginner: Python, Linear Algebra, Scikit-Learn", "Intermediate: Regressions, Decision Trees, Hyperparameters", "Advanced: Neural Networks, PyTorch/TensorFlow, Transformers", "Projects: AI Resume Analyzer, Fake News Detector", "Interview Prep: ML System Design & Algorithm Derivations"]
    },
    "Python Developer": {
      desc: "Master Python backend development, microservices, web scraping, and RESTful API engineering.",
      stages: ["Beginner: Python OOP, File I/O, Data Structures", "Intermediate: Flask/Django, SQL ORM (SQLAlchemy)", "Advanced: Asyncio, FastAPI, Celery, Redis", "Projects: REST API Backend, Automation Suite", "Interview Prep: PyTest, Data Structures & Python Internals"]
    },
    "Cloud/DevOps Engineer": {
      desc: "Manage Linux infrastructure, containerize applications, automate CI/CD pipelines, and deploy on AWS.",
      stages: ["Beginner: Linux Bash, CLI, Git Workflow", "Intermediate: Docker Containerization, AWS EC2/S3", "Advanced: Kubernetes, Terraform (IaC), GitHub Actions", "Projects: Microservices Kubernetes Deployment", "Interview Prep: Cloud Security, Pipeline Architecture"]
    },
    "Cybersecurity": {
      desc: "Protect networks, applications, and systems against cyber threats using ethical hacking & web security.",
      stages: ["Beginner: Computer Networks, TCP/IP, Linux Kali", "Intermediate: OWASP Top 10, Web App Vulnerabilities", "Advanced: Penetration Testing, Metasploit, Cryptography", "Projects: Security Scan Tool, Vulnerability Assessment", "Interview Prep: Log Analysis, Threat Modeling"]
    },
    "Software Developer": {
      desc: "Core Computer Science role focusing on DSA, Object-Oriented System Design, and Low Level Design.",
      stages: ["Beginner: C++/Java Programming Core, OOP", "Intermediate: Data Structures & Algorithms (Trees/Graphs)", "Advanced: Operating Systems, Computer Networks, DBMS", "Projects: Multi-threaded Server, LLD System", "Interview Prep: LeetCode Medium/Hard, Technical Mocks"]
    },
    "Software Testing": {
      desc: "Ensure software quality through automated QA testing, API validation, and performance test suites.",
      stages: ["Beginner: Manual Testing STLC, Test Case Writing", "Intermediate: SQL Data Verification, Postman API Testing", "Advanced: Selenium / Cypress Automation with Java/Python", "Projects: E-commerce QA Automation Suite", "Interview Prep: Bug Lifecycle, Test Strategy Scenarios"]
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold">
          <Target className="w-4 h-4 text-cyan-400" />
          <span>Curated Tech Career Paths</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Explore Specialized <span className="gradient-text">Career Tracks</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(TRACK_DETAILS).map(([title], idx) => {
          const isHighlighted = selectedTrackParam === title;

          return (
            <div
              key={idx}
              className={`bg-slate-900 border rounded-3xl p-6 sm:p-8 flex items-center justify-between gap-4 transition-all card-hover ${
                isHighlighted ? "border-cyan-400 shadow-glow" : "border-slate-800"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-extrabold text-white">{title}</h3>
              </div>

              <Link
                to={`/roadmap-generator?track=${encodeURIComponent(title)}`}
                className="flex items-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow transition-all"
              >
                Generate Roadmap <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
