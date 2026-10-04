import React, { useState, useEffect } from "react";
import { resumeService } from "../services/appServices";
import { useAuth } from "../context/AuthContext";
import { GraduationCap, Award, FileText, Download, CheckCircle2, AlertTriangle, Sparkles, Save, Eye } from "lucide-react";

export default function ResumeBuilder() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const [resumeData, setResumeData] = useState({
    personal: {
      full_name: user ? user.name : "Aarav Sharma",
      email: user ? user.email : "aarav.sharma@btech.edu",
      phone: "+91 98765 43210",
      location: "Bengaluru, India",
      github: "github.com/aaravsharma",
      linkedin: "linkedin.com/in/aaravsharma"
    },
    education: [
      {
        institution: "National Institute of Technology",
        degree: "B.Tech in Computer Science & Engineering",
        year: "2023 - 2027",
        cgpa: "8.7 / 10.0"
      }
    ],
    skills: "Python, JavaScript, React.js, Node.js, Express, MongoDB, SQL, Data Structures & Algorithms, Git, HTML5, CSS3",
    projects: [
      {
        title: "Expense Tracker Web Application",
        tech: "React, Express, MongoDB",
        description: "Architected a responsive financial tracking app. Integrated Chart.js for real-time analytics, boosting user engagement by 35%."
      },
      {
        title: "Sales Analytics Dashboard",
        tech: "Python, Pandas, SQL, Streamlit",
        description: "Processed 100K+ retail sales data records. Developed interactive Streamlit dashboard visualizing regional revenue trends."
      }
    ],
    internships: [
      {
        company: "Tech Solutions Pvt Ltd",
        role: "Software Engineering Intern",
        duration: "May 2025 - July 2025",
        description: "Developed RESTful API endpoints for client dashboard using Node.js and MongoDB."
      }
    ],
    certifications: ["AWS Certified Cloud Practitioner", "Meta Front-End Developer Certificate"],
    achievements: ["Secured Top 5 in University Hackathon 2025", "Solved 250+ DSA problems on LeetCode"]
  });

  useEffect(() => {
    runAnalysis(resumeData);
  }, []);

  const runAnalysis = async (dataToAnalyze) => {
    const res = await resumeService.analyzeResume(dataToAnalyze);
    if (res && res.analysis) {
      setAnalysis(res.analysis);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const userId = user ? user.id : "demo_user";
    const res = await resumeService.saveResumeProfile({ ...resumeData, user_id: userId });
    if (res && res.analysis) {
      setAnalysis(res.analysis);
    }
    setLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <GraduationCap className="w-4 h-4" />
          <span>Placement ATS Optimization Tool</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          ATS Resume <span className="gradient-text">Builder & Scanner</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Build a single-column ATS-compliant resume and scan for missing keywords, weak descriptions, and quantifiable impact metrics.
        </p>
      </div>

      {/* Main Grid: Form Left, ATS Score & Live Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (6 cols): Form Editor */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-lg flex items-center">
                <FileText className="w-5 h-5 mr-2 text-cyan-400" /> Edit Resume Details
              </h3>
              <button
                disabled={loading}
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-glow transition-all"
              >
                <Save className="w-4 h-4 mr-1.5" />
                {loading ? "Saving..." : "Save & Scan ATS"}
              </button>
            </div>

            {/* Personal Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Personal Information</h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={resumeData.personal.full_name}
                  onChange={(e) => setResumeData({ ...resumeData, personal: { ...resumeData.personal, full_name: e.target.value } })}
                  placeholder="Full Name"
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                />
                <input
                  type="email"
                  value={resumeData.personal.email}
                  onChange={(e) => setResumeData({ ...resumeData, personal: { ...resumeData.personal, email: e.target.value } })}
                  placeholder="Email"
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                />
                <input
                  type="text"
                  value={resumeData.personal.phone}
                  onChange={(e) => setResumeData({ ...resumeData, personal: { ...resumeData.personal, phone: e.target.value } })}
                  placeholder="Phone"
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                />
                <input
                  type="text"
                  value={resumeData.personal.location}
                  onChange={(e) => setResumeData({ ...resumeData, personal: { ...resumeData.personal, location: e.target.value } })}
                  placeholder="Location"
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                />
                <input
                  type="text"
                  value={resumeData.personal.github}
                  onChange={(e) => setResumeData({ ...resumeData, personal: { ...resumeData.personal, github: e.target.value } })}
                  placeholder="GitHub URL"
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                />
                <input
                  type="text"
                  value={resumeData.personal.linkedin}
                  onChange={(e) => setResumeData({ ...resumeData, personal: { ...resumeData.personal, linkedin: e.target.value } })}
                  placeholder="LinkedIn URL"
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Technical Skills (Comma Separated)</h4>
              <textarea
                rows={2}
                value={resumeData.skills}
                onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none"
              />
            </div>

            {/* Projects */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Projects</h4>
              {resumeData.projects.map((proj, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => {
                      const newP = [...resumeData.projects];
                      newP[idx].title = e.target.value;
                      setResumeData({ ...resumeData, projects: newP });
                    }}
                    placeholder="Project Title"
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs font-bold"
                  />
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => {
                      const newP = [...resumeData.projects];
                      newP[idx].description = e.target.value;
                      setResumeData({ ...resumeData, projects: newP });
                    }}
                    placeholder="Project description with metrics (e.g. Boosted speed by 35%)"
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column (6 cols): ATS Score & Live Preview */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* ATS Analysis Summary Card */}
          {analysis && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-base flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-amber-400" /> Automated ATS Score
                </h3>
                <span className={`text-2xl font-black ${
                  analysis.score >= 80 ? "text-emerald-400" : analysis.score >= 65 ? "text-amber-400" : "text-rose-400"
                }`}>
                  {analysis.score} / 100 ({analysis.grade})
                </span>
              </div>

              {/* Feedback Points */}
              {analysis.feedback && analysis.feedback.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">ATS Recommendations</h4>
                  {analysis.feedback.map((fb, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-amber-200/90 bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{fb}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Live ATS Printable Preview Sheet */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center">
                <Eye className="w-4 h-4 mr-1.5 text-cyan-400" /> Live Resume Document Preview
              </h3>
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-glow transition-all"
              >
                <Download className="w-4 h-4 mr-1.5" /> Print / Save PDF
              </button>
            </div>

            {/* Standard White Paper ATS Document */}
            <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-2xl font-sans text-xs space-y-5 border border-slate-300">
              
              {/* Header */}
              <div className="text-center border-b pb-4 space-y-1">
                <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900">{resumeData.personal.full_name}</h2>
                <p className="text-slate-600 text-[11px]">
                  {resumeData.personal.email} | {resumeData.personal.phone} | {resumeData.personal.location}
                </p>
                <p className="text-slate-600 text-[11px]">
                  {resumeData.personal.github} | {resumeData.personal.linkedin}
                </p>
              </div>

              {/* Education */}
              <div className="space-y-1">
                <h3 className="font-bold uppercase text-[11px] border-b border-slate-400 pb-0.5 text-slate-900">Education</h3>
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between font-semibold pt-1">
                    <div>
                      <p className="font-bold">{edu.institution}</p>
                      <p className="text-slate-700 italic text-[11px]">{edu.degree}</p>
                    </div>
                    <div className="text-right">
                      <p>{edu.year}</p>
                      <p className="text-slate-700 text-[11px]">CGPA: {edu.cgpa}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <h3 className="font-bold uppercase text-[11px] border-b border-slate-400 pb-0.5 text-slate-900">Technical Skills</h3>
                <p className="text-slate-800 pt-1 leading-relaxed">{resumeData.skills}</p>
              </div>

              {/* Projects */}
              <div className="space-y-2">
                <h3 className="font-bold uppercase text-[11px] border-b border-slate-400 pb-0.5 text-slate-900">Projects</h3>
                {resumeData.projects.map((p, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between font-bold">
                      <span>{p.title}</span>
                      <span className="text-slate-600 font-normal italic text-[11px]">{p.tech}</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed text-[11px]">{p.description}</p>
                  </div>
                ))}
              </div>

              {/* Internships */}
              {resumeData.internships && (
                <div className="space-y-1">
                  <h3 className="font-bold uppercase text-[11px] border-b border-slate-400 pb-0.5 text-slate-900">Experience / Internships</h3>
                  {resumeData.internships.map((exp, idx) => (
                    <div key={idx} className="space-y-0.5 pt-1">
                      <div className="flex justify-between font-bold">
                        <span>{exp.role} - {exp.company}</span>
                        <span className="text-slate-600 font-normal text-[11px]">{exp.duration}</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed text-[11px]">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
