import uuid
from utils.db import get_db, is_mongo_connected
from utils.auth_middleware import hash_password
from services.roadmap_generator import generate_roadmap

def seed_database():
    print("[Seed] Starting MongoDB database seeding for BTechPath...")
    db = get_db()

    # Seed Demo Users
    users_coll = db.users
    demo_student = {
        "_id": "student_demo_id",
        "name": "Aarav Sharma",
        "email": "student@btechpath.com",
        "password": hash_password("password123"),
        "role": "student",
        "branch": "Computer Science & Engineering",
        "year": "2nd Year",
        "career_goal": "Full Stack Developer",
        "xp": 240,
        "streak": 5,
        "badges": ["Python Beginner", "SQL Explorer", "DSA Starter"]
    }

    demo_admin = {
        "_id": "admin_demo_id",
        "name": "System Administrator",
        "email": "admin@btechpath.com",
        "password": hash_password("admin123"),
        "role": "admin",
        "branch": "Admin",
        "year": "N/A",
        "career_goal": "Administrator",
        "xp": 1000,
        "streak": 30,
        "badges": ["Admin Master"]
    }

    users_coll.update_one({"email": demo_student["email"]}, {"$set": demo_student}, upsert=True)
    users_coll.update_one({"email": demo_admin["email"]}, {"$set": demo_admin}, upsert=True)
    print("  [OK] Users seeded (Student: student@btechpath.com / password123 | Admin: admin@btechpath.com / admin123)")

    # Seed Default Roadmaps
    roadmaps_coll = db.roadmaps
    sample_goals = ["Data Analyst", "Full Stack Developer", "AI/ML Engineer", "Python Developer", "Cloud/DevOps Engineer"]
    for goal in sample_goals:
        rm = generate_roadmap("Computer Science & Engineering", "2nd Year", goal, "Beginner", "2 hours/day", "Aarav Sharma")
        # Remove _id to avoid updating immutable field on upsert
        rm_data = {k: v for k, v in rm.items() if k != "_id"}
        roadmaps_coll.update_one({"career_goal": goal}, {"$set": rm_data}, upsert=True)
    print("  [OK] Roadmaps seeded for 5 primary career tracks.")

    print("[Seed] Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
