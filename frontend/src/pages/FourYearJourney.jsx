import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Code, Database, Layers, GraduationCap, CheckCircle2, ArrowRight } from "lucide-react";

export default function FourYearJourney() {
  const JOURNEY_DATA = [
    {
      year: "First Year (1st & 2nd Semester)",
      badge: "Foundations & Exploration",
      title: "Building Strong Logic & Tools",
      icon: Code,
      color: "from-blue-600 to-indigo-600",
      focus_points: [
        "Master C Programming or Python basics",
        "Understand variables, loops, arrays, pointers, functions",
        "Engineering Mathematics & Discrete Structure basics",
        "Version Control with Git & GitHub workflow",
        "Command Line CLI & basic problem solving on HackerRank/LeetCode"
      ],
      deliverables: "Push at least 5 beginner repositories to GitHub. Solve 50+ basic logic problems.",
      target_outcomes: "Solid programming logic without relying on AI copy-pasting."
    },
    {
      year: "Second Year (3rd & 4th Semester)",
      badge: "Core CS & Systems",
      title: "Data Structures & Core Computer Science",
      icon: Database,
      color: "from-cyan-600 to-blue-600",
      focus_points: [
        "Data Structures & Algorithms (Arrays, Linked Lists, Stack, Queue, Trees, Sorting)",
        "Object-Oriented Programming (OOP) in C++/Java/Python",
        "Database Management Systems (DBMS) & SQL queries (JOINs, Indexing, ACID)",
        "Operating Systems (Processes, Threads, Memory Management)",
        "Computer Networks (TCP/IP, OSI model, HTTP/HTTPS)",
        "Web Development basics (HTML, CSS, JavaScript, React)"
      ],
      deliverables: "Build 2 full working web/analytics projects. Solve 100+ LeetCode DSA questions.",
      target_outcomes: "Ready for technical hackathons and departmental coding rounds."
    },
    {
      year: "Third Year (5th & 6th Semester)",
      badge: "Specialization & Internships",
      title: "Advanced DSA, Domain Focus & Projects",
      icon: Layers,
      color: "from-indigo-600 to-purple-600",
      focus_points: [
        "Advanced DSA (Graphs, Dynamic Programming, Tries, Segment Trees)",
        "Choose Target Specialization: Full Stack, Data Analytics, AI/ML, Cloud/DevOps, or Cybersecurity",
        "Build 2-3 High-Impact Portfolio Projects with DB design & API deployment",
        "Apply for Summer Internships & Off-Campus Hiring Drives",
        "System Design (Low Level Design - LLD concepts)"
      ],
      deliverables: "Completed 1 Summer Internship or major Open Source contribution. 200+ DSA solved.",
      target_outcomes: "ATS-compliant resume with verifiable live project links."
    },
    {
      year: "Fourth Year (7th & 8th Semester)",
      badge: "Placements & Graduation",
      title: "Placement Drives, System Design & Interview Mastery",
      icon: GraduationCap,
      color: "from-emerald-600 to-teal-600",
      focus_points: [
        "Intensive DSA Revision & Company-specific previous questions",
        "Quantitative Aptitude, Logical Reasoning & Verbal Ability practice",
        "Core CS Refresher (DBMS, OS, CN interview questions)",
        "High Level System Design (HLD - Load balancers, Caching, DB Sharding)",
        "Mock Technical & HR Interviews using STAR method",
        "Resume refinement & Salary Negotiation"
      ],
      deliverables: "Cracked campus placement drives with multiple job offer letters.",
      target_outcomes: "Successful placement in top Product/Service engineering companies."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>Complete B.Tech Semester Roadmap</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          The <span className="gradient-text">4-Year Engineering Journey</span> Blueprint
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          A semester-by-semester execution plan for Indian B.Tech engineering students from day one of college until placement day.
        </p>
      </div>

      {/* Visual Timeline Cards */}
      <div className="space-y-8 relative">
        {JOURNEY_DATA.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 hover:border-slate-700 transition-all relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-glow shrink-0`}>
                    <IconComp className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                      {item.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">{item.year}</h3>
                  </div>
                </div>
                <h4 className="text-base font-bold text-slate-300">{item.title}</h4>
              </div>

              {/* Focus Bullet Points */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Learning Focus</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.focus_points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-3 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcomes & Deliverables Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 text-xs">
                <div className="bg-blue-950/20 border border-blue-500/20 p-4 rounded-2xl space-y-1">
                  <span className="font-bold text-blue-300">Expected Deliverables:</span>
                  <p className="text-slate-300">{item.deliverables}</p>
                </div>
                <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-2xl space-y-1">
                  <span className="font-bold text-emerald-300">Career Outcome:</span>
                  <p className="text-slate-300">{item.target_outcomes}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center pt-8">
        <Link
          to="/roadmap-generator"
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-glow transition-all inline-flex items-center"
        >
          Generate Your Custom Milestone Roadmap <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>

    </div>
  );
}
