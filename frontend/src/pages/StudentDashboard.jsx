import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { dashboardService } from "../services/appServices";
import DailyPlanWidget from "../components/DailyPlanWidget";
import { 
  LayoutDashboard, 
  Target, 
  Zap, 
  Award, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      const userId = user ? user.id : "student_demo_id";
      const res = await dashboardService.getStudentDashboard(userId);
      if (res && res.dashboard) {
        setData(res.dashboard);
      }
      setLoading(false);
    }
    loadDashboard();
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400 space-y-4">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm">Preparing your personal student dashboard...</p>
      </div>
    );
  }

  const d = data || {
    user_name: user ? user.name : "Aarav Sharma",
    branch: user ? user.branch : "Computer Science & Engineering",
    year: user ? user.year : "2nd Year",
    career_goal: user ? user.career_goal : "Full Stack Developer",
    metrics: {
      overall_progress: user ? user.overall_progress ?? 0 : 42,
      learning_streak: user ? user.streak ?? 0 : 5,
      xp_points: user ? user.xp ?? 0 : 240,
      avg_quiz_score: user ? user.avg_quiz_score ?? 0 : 88,
      projects_completed: user ? user.projects_completed ?? 0 : 2
    },
    daily_plan: { career_goal: user ? user.career_goal : "Full Stack Developer", available_time: "2 hours/day", tasks: [
      { id: "t1", title: "Learn React useEffect Hook & State", time: "35 min", completed: false },
      { id: "t2", title: "Solve 2 Array Problems on LeetCode", time: "45 min", completed: false },
      { id: "t3", title: "Take SQL JOINs Quiz", time: "15 min", completed: false }
    ]},
    recent_achievements: user ? [] : [
      { title: "SQL Explorer", date: "Yesterday", desc: "Passed SQL JOINs Quiz with 100% score" },
      { title: "5-Day Streak", date: "2 days ago", desc: "Studied 5 consecutive days" }
    ],
    continue_learning: {
      topic: "React Hooks & State Management",
      category: "Web Development",
      progress: user ? user.learning_progress ?? 0 : 65,
      next_lesson: "useEffect Dependencies"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-navy-900 to-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-10 shadow-glow relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 text-xs font-semibold border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Student Command Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, {d.user_name} 👋
          </h1>
          <p className="text-slate-300 text-sm">
            Continue your journey toward <strong className="text-cyan-300">{d.career_goal}</strong> ({d.branch} • {d.year}).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/roadmap-generator"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow transition-all"
          >
            Update Roadmap
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Roadmap Progress</span>
          <p className="text-2xl font-black text-cyan-400">{d.metrics.overall_progress}%</p>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-cyan-400" style={{ width: `${d.metrics.overall_progress}%` }} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Current Year</span>
          <p className="text-lg font-bold text-white mt-1 truncate">{d.year}</p>
          <span className="text-[10px] text-slate-500">{d.branch}</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Career Goal</span>
          <p className="text-sm font-bold text-cyan-300 mt-1 truncate">{d.career_goal}</p>
          <span className="text-[10px] text-slate-500">Active Specialization</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Learning Streak</span>
          <p className="text-2xl font-black text-amber-400 flex items-center">
            <Zap className="w-5 h-5 mr-1 fill-amber-400" /> {d.metrics.learning_streak} Days
          </p>
          <span className="text-[10px] text-slate-500">Active Learner</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Avg Quiz Score</span>
          <p className="text-2xl font-black text-emerald-400">{d.metrics.avg_quiz_score}%</p>
          <span className="text-[10px] text-slate-500">High Accuracy</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400">Projects Done</span>
          <p className="text-2xl font-black text-indigo-400">{d.metrics.projects_completed}</p>
          <span className="text-[10px] text-slate-500">Verified Portfolio</span>
        </div>
      </div>

      {/* Main Grid: Daily Plan & Continue Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Recommended Today & Continue Learning */}
        <div className="lg:col-span-8 space-y-8">
          
          <DailyPlanWidget planData={d.daily_plan} />

          {/* Continue Learning Widget */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-lg flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-cyan-400" /> Continue Learning
              </h3>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                {d.continue_learning.category}
              </span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">{d.continue_learning.topic}</h4>
                <span className="text-xs font-bold text-cyan-400">{d.continue_learning.progress}% Done</span>
              </div>
              <p className="text-xs text-slate-400">Next Lesson: <span className="text-slate-200">{d.continue_learning.next_lesson}</span></p>
              
              <div className="pt-2 flex justify-end">
                <Link
                  to="/learn"
                  className="flex items-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow transition-all"
                >
                  Resume Lesson <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Achievements & Quick Navigation */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recent Achievements */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-white text-base flex items-center">
              <Award className="w-5 h-5 mr-2 text-amber-400" /> Achievements & Badges
            </h3>

            <div className="space-y-3">
              {d.recent_achievements.map((ach, idx) => (
                <div key={idx} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300">{ach.title}</span>
                    <span className="text-slate-500">{ach.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{ach.desc}</p>
                </div>
              ))}
            </div>

            <Link
              to="/profile"
              className="block text-center text-xs font-semibold text-cyan-400 hover:underline pt-2"
            >
              View All Earned Badges →
            </Link>
          </div>

          {/* Quick Hub Links */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h3 className="font-bold text-white text-base mb-2">Quick Navigation</h3>
            <Link to="/projects" className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200">
              <span className="flex items-center"><Briefcase className="w-4 h-4 mr-2 text-cyan-400" /> Project Hub</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
            <Link to="/placement" className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200">
              <span className="flex items-center"><GraduationCap className="w-4 h-4 mr-2 text-emerald-400" /> Placement Prep</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
            <Link to="/resume-builder" className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200">
              <span className="flex items-center"><Award className="w-4 h-4 mr-2 text-amber-400" /> Resume Builder</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
