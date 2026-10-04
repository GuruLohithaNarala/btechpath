import re

def validate_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def validate_registration(data):
    errors = []
    if not data.get("name") or len(data.get("name").strip()) < 2:
        errors.append("Name must be at least 2 characters long")
    if not data.get("email") or not validate_email(data.get("email")):
        errors.append("Valid email address is required")
    if not data.get("password") or len(data.get("password")) < 6:
        errors.append("Password must be at least 6 characters long")
    return errors

def validate_roadmap_request(data):
    errors = []
    if not data.get("branch"):
        errors.append("Engineering branch is required")
    if not data.get("year"):
        errors.append("Year of study is required")
    if not data.get("career_goal"):
        errors.append("Career goal is required")
    return errors
