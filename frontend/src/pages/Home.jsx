import React from "react";
import { Link } from "react-router-dom";
import { 
  Compass, 
  Target, 
  TrendingUp, 
  Award, 
  Code, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Zap, 
  Layers, 
  Bot,
  ShieldCheck
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Background Subtle Gradient Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-12 space-y-8 text-center lg:text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Designed Exclusively for Indian B.Tech Students</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
                Know what to learn. <br />
                <span className="gradient-text">Know when to learn it.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
                Your personalized roadmap for mastering engineering skills, building real industry projects, and becoming 100% placement ready.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/roadmap-generator"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-glow transition-all transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  Get My Roadmap
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>

                <Link
                  to="/roadmaps"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-base transition-all flex items-center justify-center"
                >
                  Explore Roadmaps
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>8 Dedicated Career Tracks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>4-Year Engineering Journey</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>ATS Resume & Placement Prep</span>
                </div>
              </div>
            </div>



          </div>
        </div>
      </section>

      {/* Core Question Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              The 5 Questions Every Engineering Student Faces
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              BTechPath transforms engineering ambiguity into a structured, step-by-step clear pathway.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
            {[
              { q: "What should I learn?", desc: "Curated skills matching high-demand market roles." },
              { q: "When should I learn it?", desc: "Year-wise timeline from 1st year to 4th year." },
              { q: "Which career to pursue?", desc: "Clear roadmaps for 8 top tech specializations." },
              { q: "What projects to build?", desc: "Full project guides with DB designs & resume points." },
              { q: "How to prepare for placements?", desc: "DSA, Core CS, Aptitude, and Mock Interview banks." }
            ].map((card, idx) => (
              <div key={idx} className="bg-slate-950/60 border border-slate-800 p-6 rounded-2xl space-y-3 text-left hover:border-blue-500/40 transition-colors">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Step {idx + 1}</span>
                <h3 className="font-bold text-white text-base leading-snug">{card.q}</h3>
                <p className="text-xs text-slate-400">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Year Journey & Specializations Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">4-Year Engineering Milestone Blueprint</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            Never feel lost during semester exams or placement drives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { year: "1st Year", title: "Fundamentals & Git", focus: "C/Python, Logic Building, Math, Git/GitHub", color: "from-blue-600 to-indigo-600" },
            { year: "2nd Year", title: "Core CS & DSA", focus: "DSA, DBMS, SQL, Web Dev, OS, Networks", color: "from-cyan-600 to-blue-600" },
            { year: "3rd Year", title: "Specialization & Projects", focus: "AI/ML, Data, Cloud, Full Stack, Internships", color: "from-indigo-600 to-purple-600" },
            { year: "4th Year", title: "Placement Preparation", focus: "DSA Revision, Aptitude, System Design, Mocks", color: "from-emerald-600 to-teal-600" }
          ].map((y, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 hover:border-slate-700 transition-all card-hover">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${y.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                Y{idx + 1}
              </div>
              <h3 className="font-bold text-white text-lg">{y.year}: {y.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed"><strong className="text-slate-300">Focus:</strong> {y.focus}</p>
              <Link to="/journey" className="inline-flex items-center text-xs font-semibold text-cyan-400 hover:underline pt-2">
                Explore Year {idx + 1} Plan →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Everything You Need to Succeed</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            Built with modern features to make engineering learning effective and engaging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="p-3 w-fit rounded-2xl bg-blue-500/10 text-cyan-400 border border-blue-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-white">Learning Hub & "Explain Simply"</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Complex concepts broken down with analogies, visual diagrams, code examples, common mistakes, and memory hacks.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="p-3 w-fit rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-white">Project Hub</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Step-by-step guides with database schemas, testing strategies, GitHub checklists, and resume bullet points.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="p-3 w-fit rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-white">ATS Resume Builder</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Generate ATS-compliant resumes with instant automated scanner feedback on quantifiable metrics and keywords.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-navy-900 to-slate-900 border border-blue-500/30 rounded-3xl p-10 sm:p-16 text-center space-y-6 shadow-glow">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Simplify Your Engineering Journey?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Generate your personalized roadmap in less than 60 seconds. Free for all Indian B.Tech students.
          </p>
          <div className="pt-2">
            <Link
              to="/roadmap-generator"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-glow transition-all inline-flex items-center"
            >
              Build My Personal Roadmap Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
