import React from "react";
import { Link } from "react-router-dom";
import { Compass, Globe, Share2, Code2, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-glow">
                <Compass className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                BTech<span className="text-cyan-400">Path</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              "Your 4-Year Engineering Journey, Simplified." <br />
              Empowering Indian B.Tech students to master skills, build real projects, and clear campus placements with confidence.
            </p>
            <div className="flex items-center space-x-4 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                <Code2 className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="mailto:support@btechpath.com" className="hover:text-amber-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/roadmaps" className="hover:text-cyan-300 transition-colors">Career Roadmaps</Link></li>
              <li><Link to="/journey" className="hover:text-cyan-300 transition-colors">4-Year Journey</Link></li>
              <li><Link to="/learn" className="hover:text-cyan-300 transition-colors">Learning Hub</Link></li>
              <li><Link to="/projects" className="hover:text-cyan-300 transition-colors">Project Hub</Link></li>
              <li><Link to="/placement" className="hover:text-cyan-300 transition-colors">Placement Prep</Link></li>
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Career Tracks</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/roadmaps?track=Full+Stack+Developer" className="hover:text-cyan-300 transition-colors">Full Stack Developer</Link></li>
              <li><Link to="/roadmaps?track=Data+Analyst" className="hover:text-cyan-300 transition-colors">Data Analyst</Link></li>
              <li><Link to="/roadmaps?track=AI%2FML+Engineer" className="hover:text-cyan-300 transition-colors">AI/ML Engineer</Link></li>
              <li><Link to="/roadmaps?track=Cloud%2FDevOps+Engineer" className="hover:text-cyan-300 transition-colors">Cloud / DevOps</Link></li>
              <li><Link to="/roadmaps?track=Cybersecurity" className="hover:text-cyan-300 transition-colors">Cybersecurity</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Tools & Prep</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/resume-builder" className="hover:text-cyan-300 transition-colors">ATS Resume Builder</Link></li>
              <li><Link to="/ai-mentor" className="hover:text-cyan-300 transition-colors">AI Mentor Assistant</Link></li>
              <li><Link to="/tech-pulse" className="hover:text-cyan-300 transition-colors">Tech Pulse Trends</Link></li>
              <li><Link to="/login" className="hover:text-cyan-300 transition-colors">Student Login</Link></li>
              <li><Link to="/admin" className="hover:text-amber-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BTechPath. All rights reserved.</p>
          <p className="flex items-center mt-2 sm:mt-0">
            Crafted with <Heart className="w-3.5 h-3.5 mx-1 text-rose-500 fill-rose-500" /> for Indian Engineering Students.
          </p>
        </div>
      </div>
    </footer>
  );
}
