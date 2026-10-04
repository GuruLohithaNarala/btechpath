from flask import Blueprint, jsonify

tech_pulse_bp = Blueprint("tech_pulse", __name__, url_prefix="/api/tech-pulse")

TECH_TRENDS = [
    {
        "id": "t1",
        "technology": "Generative AI & LLM Engineering",
        "category": "AI/GenAI",
        "trend": "🔥 Explosive Demand",
        "growth": "+145% YoY",
        "why_it_matters": "Companies are integrating LLM capabilities, RAG (Retrieval-Augmented Generation), and autonomous AI agents into enterprise products.",
        "who_should_learn": "3rd & 4th Year CSE, AI/ML, and Data Science students with Python proficiency.",
        "related_roadmap": "AI/ML Engineer",
        "resources": [
            {"title": "Hugging Face LLM Course", "url": "https://huggingface.co"},
            {"title": "LangChain & LlamaIndex Guide", "url": "https://langchain.com"}
        ]
    },
    {
        "id": "t2",
        "technology": "Full Stack React & Modern Cloud APIs",
        "category": "Web Development",
        "trend": "⚡ High Hiring Constant",
        "growth": "+40% YoY",
        "why_it_matters": "Startups and product MNCs continuously seek developers who can build end-to-end responsive web interfaces connected to cloud databases.",
        "who_should_learn": "1st to 4th Year students aiming for core software development roles.",
        "related_roadmap": "Full Stack Developer",
        "resources": [
            {"title": "React.js 18 Documentation", "url": "https://react.dev"}
        ]
    },
    {
        "id": "t3",
        "technology": "Cloud Native & Docker/Kubernetes",
        "category": "Cloud/DevOps",
        "trend": "🚀 High Growth",
        "growth": "+65% YoY",
        "why_it_matters": "Microservice architecture deployment on AWS/GCP requires containerization and automated CI/CD pipelines.",
        "who_should_learn": "2nd, 3rd & 4th Year students interested in Infrastructure & Systems.",
        "related_roadmap": "Cloud/DevOps Engineer",
        "resources": [
            {"title": "Docker Official Docs", "url": "https://docker.com"}
        ]
    },
    {
        "id": "t4",
        "technology": "Cybersecurity & Web App Security",
        "category": "Cybersecurity",
        "trend": "🛡️ Critical Shortage",
        "growth": "+55% YoY",
        "why_it_matters": "With increasing cloud adoption, vulnerability assessment and ethical hacking skills are in high demand.",
        "who_should_learn": "Students in CSE, IT, ECE with strong Networking fundamentals.",
        "related_roadmap": "Cybersecurity",
        "resources": [
            {"title": "OWASP Top 10 Security Guide", "url": "https://owasp.org"}
        ]
    }
]

@tech_pulse_bp.route("", methods=["GET"])
def get_tech_pulse():
    return jsonify({"trends": TECH_TRENDS}), 200
