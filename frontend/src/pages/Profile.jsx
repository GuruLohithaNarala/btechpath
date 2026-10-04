import React from "react";
import { useAuth } from "../context/AuthContext";
import { User, Award, Zap, BookOpen, Target, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center text-slate-400">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const BADGE_LIST = [
    { name: "Python Beginner", desc: "Completed Python basics module & quiz", icon: "🐍" },
    { name: "SQL Explorer", desc: "Mastered SQL JOINs & aggregation queries", icon: "📊" },
    { name: "DSA Starter", desc: "Solved top 25 Arrays & Strings problems", icon: "⚡" },
    { name: "Project Builder", desc: "Built & deployed a full-stack portfolio project", icon: "🚀" },
    { name: "Quiz Master", desc: "Scored 90%+ in 3 consecutive quizzes", icon: "🎯" },
    { name: "Interview Ready", desc: "Completed mock technical QA bank", icon: "🎓" }
  ];

  const userBadges = user.badges || ["Python Beginner", "SQL Explorer", "DSA Starter"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      
      {/* Header Profile Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center text-white font-extrabold text-3xl shadow-glow">
          {user.name ? user.name[0].toUpperCase() : "S"}
        </div>
        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-cyan-300 text-xs font-bold uppercase">
              {user.role}
            </span>
          </div>
          <p className="text-xs text-slate-400">{user.email}</p>
          <p className="text-xs text-cyan-400 font-semibold">{user.branch} • {user.year}</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-1 min-w-[140px]">
          <span className="text-[11px] text-slate-400 font-semibold">Total Gamification XP</span>
          <p className="text-2xl font-black text-amber-400 flex items-center justify-center">
            <Zap className="w-5 h-5 mr-1 fill-amber-400" /> {user.xp || 100}
          </p>
        </div>
      </div>

      {/* Badges & Achievements Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <h3 className="font-bold text-white text-lg flex items-center">
          <Award className="w-5 h-5 mr-2 text-amber-400" /> Earned Badges & Achievements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {BADGE_LIST.map((b, idx) => {
            const isEarned = userBadges.includes(b.name);

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border space-y-2 transition-all ${
                  isEarned
                    ? "bg-slate-950/80 border-amber-500/30 text-white shadow-glow"
                    : "bg-slate-950/30 border-slate-800 text-slate-500 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{b.icon}</span>
                  {isEarned && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20">
                      Unlocked
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-white">{b.name}</h4>
                <p className="text-xs text-slate-400">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
