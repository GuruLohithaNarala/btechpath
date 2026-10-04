import React, { useState, useEffect } from "react";
import { projectService } from "../services/appServices";
import { Briefcase, Search, Filter, Clock, Code, Database, CheckCircle2, ChevronRight, X, ExternalLink, FileText, HelpCircle } from "lucide-react";

export default function ProjectsHub() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  // Filters
  const [careerFilter, setCareerFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const CAREERS = [
    "All",
    "Full Stack Developer",
    "Data Analyst",
    "AI/ML Engineer",
    "Python Developer",
    "Cloud/DevOps Engineer",
    "Cybersecurity",
    "Software Developer",
    "Software Testing"
  ];
  const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];
  const CATEGORIES = [
    "All",
    "Web Development",
    "Data Analytics",
    "AI/ML",
    "Backend Development",
    "Cloud & DevOps",
    "Cybersecurity",
    "Software Engineering",
    "Software Testing"
  ];

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      const res = await projectService.getProjects({
        career: careerFilter,
        difficulty: difficultyFilter,
        category: categoryFilter
      });
      if (res && res.projects) {
        setProjects(res.projects);
      }
      setLoading(false);
    }
    loadProjects();
  }, [careerFilter, difficultyFilter, categoryFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold">
          <Briefcase className="w-4 h-4 text-cyan-400" />
          <span>Real-World Engineering Projects</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Portfolio <span className="gradient-text">Project Hub</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Deep-dive project blueprints with step-by-step guides, DB designs, GitHub checklists, and resume bullet points.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-semibold mb-1 block">Career Track:</label>
            <select
              value={careerFilter}
              onChange={(e) => setCareerFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3 focus:outline-none"
            >
              {CAREERS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold mb-1 block">Difficulty:</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3 focus:outline-none"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold mb-1 block">Category:</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3 focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 text-xs font-semibold border border-blue-500/20">
                  {selectedProject.category} • {selectedProject.difficulty}
                </span>
                <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body with 12 Detailed Sections */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-200 text-sm leading-relaxed">
              
              {/* 1 & 2: Problem Statement & Objective */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider">1. Problem Statement</h4>
                  <p>{selectedProject.detail.problem_statement}</p>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">2. Objective</h4>
                  <p>{selectedProject.detail.objective}</p>
                </div>
              </div>

              {/* 3 & 4: Prerequisites & Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider">3. Prerequisites</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.detail.prerequisites.map((p, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider">4. Technologies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.detail.technologies.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-950 border border-blue-500/30 text-cyan-300 text-xs font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5: Core Features */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider">5. Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.detail.features.map((f, idx) => (
                    <div key={idx} className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6: Step-by-Step Development */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider">6. Step-by-Step Development Guide</h4>
                <div className="space-y-2">
                  {selectedProject.detail.step_by_step.map((step, idx) => (
                    <div key={idx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* 7 & 8: Database Design & Testing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-indigo-400 text-xs uppercase tracking-wider flex items-center">
                    <Database className="w-4 h-4 mr-1.5" /> 7. Database Design
                  </h4>
                  <p className="font-mono text-xs text-indigo-200">{selectedProject.detail.database_design}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider">8. Testing Strategy</h4>
                  <p className="text-xs text-slate-300">{selectedProject.detail.testing}</p>
                </div>
              </div>

              {/* 9 & 10: Deployment & GitHub Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">9. Deployment Instructions</h4>
                  <p className="text-xs text-slate-300">{selectedProject.detail.deployment}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider">10. GitHub Checklist</h4>
                  <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                    {selectedProject.detail.github_checklist.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 11: Resume Bullet Points */}
              <div className="bg-blue-950/20 border border-blue-500/20 p-5 rounded-2xl space-y-2">
                <h4 className="font-bold text-cyan-300 text-xs uppercase tracking-wider flex items-center">
                  <FileText className="w-4 h-4 mr-1.5" /> 11. ATS Resume Copy-Paste Bullet Points
                </h4>
                <pre className="text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed">
                  {selectedProject.detail.resume_description}
                </pre>
              </div>

              {/* 12: Interview Questions */}
              <div className="bg-amber-950/20 border border-amber-500/20 p-5 rounded-2xl space-y-2">
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wider flex items-center">
                  <HelpCircle className="w-4 h-4 mr-1.5" /> 12. Technical Interview Questions
                </h4>
                <ul className="space-y-2 text-xs text-amber-100 list-disc list-inside">
                  {selectedProject.detail.interview_questions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm">Loading project blueprints...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-3xl">
            <p className="text-base font-semibold text-white">No projects found for selected filters.</p>
          </div>
        ) : (
          projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 flex flex-col justify-between hover:border-slate-700 transition-all card-hover"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 text-xs font-semibold border border-blue-500/20">
                    {proj.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {proj.estimated_time}
                  </span>
                </div>

                <h3 className="font-bold text-white text-lg leading-snug">{proj.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {proj.short_description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-medium text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{proj.difficulty}</span>
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="flex items-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow transition-all"
                >
                  View Blueprint <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
