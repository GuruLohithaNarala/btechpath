def analyze_resume_data(resume_dict):
    score = 100
    feedback = []
    strengths = []
    missing_sections = []

    # Check Personal Info
    personal = resume_dict.get("personal", {})
    if not personal.get("full_name") or not personal.get("email") or not personal.get("phone"):
        score -= 15
        feedback.append("Missing essential personal details (Full name, email, or phone).")
    else:
        strengths.append("Personal contact details are complete.")

    if not personal.get("github") or not personal.get("linkedin"):
        score -= 10
        feedback.append("Include your LinkedIn profile and GitHub URL for technical recruiter visibility.")

    # Check Education
    education = resume_dict.get("education", [])
    if not education:
        score -= 15
        missing_sections.append("Education")
        feedback.append("Missing Education section with B.Tech degree details.")
    else:
        strengths.append("Education details included.")

    # Check Skills
    skills = resume_dict.get("skills", "")
    if isinstance(skills, list):
        skills_str = ", ".join(skills)
    else:
        skills_str = str(skills)
    
    if len(skills_str.split(",")) < 5:
        score -= 15
        feedback.append("Skills section is sparse. Add at least 6-8 core technical skills (languages, frameworks, DBs).")
    else:
        strengths.append("Technical skills listed.")

    # Check Projects
    projects = resume_dict.get("projects", [])
    if not projects:
        score -= 20
        missing_sections.append("Projects")
        feedback.append("No technical projects added. Adding 2-3 detailed B.Tech projects is crucial for placements.")
    else:
        has_metrics = False
        for p in projects:
            desc = p.get("description", "")
            if any(char.isdigit() for char in desc) or "%" in desc or "ms" in desc:
                has_metrics = True
                break
        if not has_metrics:
            score -= 10
            feedback.append("Project bullet points lack quantifiable impact metrics (e.g. 'Improved speed by 35%', 'Handled 500+ daily queries').")
        else:
            strengths.append("Projects demonstrate measurable outcomes and metrics.")

    # Check Internships / Certifications
    internships = resume_dict.get("internships", [])
    certifications = resume_dict.get("certifications", [])
    if not internships and not certifications:
        score -= 5
        feedback.append("Consider adding online certifications or internship experiences to strengthen impact.")

    final_score = max(30, min(100, score))
    
    grade = "A+" if final_score >= 85 else ("B" if final_score >= 70 else "C")

    return {
        "score": final_score,
        "grade": grade,
        "strengths": strengths,
        "feedback": feedback,
        "missing_sections": missing_sections,
        "action_items": [
            "Use active power verbs (Implemented, Architected, Optimized, Designed).",
            "Keep formatting ATS-compliant (Single column, standard font, no tables/graphics).",
            "Quantify project achievements with numbers and percentages."
        ]
    }
