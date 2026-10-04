import React, { useState, useEffect } from "react";
import { adminService } from "../services/appServices";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid 
} from "recharts";
import { ShieldCheck, Users, BookOpen, Briefcase, Award, TrendingUp, Plus, Trash2, Edit3 } from "lucide-react";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("analytics");

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      const [analyticsRes, studentsRes] = await Promise.all([
        adminService.getAnalytics(),
        adminService.getStudents()
      ]);
      if (analyticsRes && analyticsRes.analytics) {
        setAnalytics(analyticsRes.analytics);
      }
      if (studentsRes && studentsRes.students) {
        setStudents(studentsRes.students);
      }
      setLoading(false);
    }
    loadAdminData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400 space-y-4">
        <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm">Loading admin analytics console...</p>
      </div>
    );
  }

  const COLORS = ["#2563EB", "#06B6D4", "#6366F1", "#10B981", "#F59E0B"];

  const summary = analytics ? analytics.summary : {
    total_students: 1420, active_students: 985, courses_completed: 3410, projects_started: 890, avg_quiz_score: 84.5, avg_progress: 48.2
  };

  const charts = analytics ? analytics.charts : {
    students_by_year: [{ year: "1st Year", students: 320 }, { year: "2nd Year", students: 480 }, { year: "3rd Year", students: 410 }, { year: "4th Year", students: 210 }],
    popular_career_goals: [{ goal: "Full Stack", students: 420 }, { goal: "Data Analyst", students: 310 }, { goal: "AI/ML", students: 290 }, { goal: "Cloud/DevOps", students: 180 }],
    quiz_performance: [{ category: "DBMS", avg_score: 88 }, { category: "DSA", avg_score: 76 }, { category: "Web Dev", avg_score: 91 }, { category: "AI/ML", avg_score: 82 }]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
            System Administrator Console
          </span>
          <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 text-xs">Monitor student progress, analytics charts, and manage platform contents.</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "analytics" ? "bg-amber-500 text-slate-950 shadow-glow" : "bg-slate-800 text-slate-300"
            }`}
          >
            System Analytics
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "students" ? "bg-amber-500 text-slate-950 shadow-glow" : "bg-slate-800 text-slate-300"
            }`}
          >
            Manage Students
          </button>
        </div>
      </div>

      {/* Summary Analytics Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400 font-medium">Total Students</span>
          <p className="text-2xl font-black text-white">{summary.total_students}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400 font-medium">Active Students</span>
          <p className="text-2xl font-black text-emerald-400">{summary.active_students}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400 font-medium">Courses Done</span>
          <p className="text-2xl font-black text-cyan-400">{summary.courses_completed}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400 font-medium">Projects Started</span>
          <p className="text-2xl font-black text-indigo-400">{summary.projects_started}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400 font-medium">Avg Quiz Score</span>
          <p className="text-2xl font-black text-amber-400">{summary.avg_quiz_score}%</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-1">
          <span className="text-xs text-slate-400 font-medium">Avg Progress</span>
          <p className="text-2xl font-black text-blue-400">{summary.avg_progress}%</p>
        </div>
      </div>

      {/* TAB 1: ANALYTICS CHARTS */}
      {activeTab === "analytics" && (
        <div className="space-y-8 animate-in fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Chart 1: Students by Year */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-white text-base">Students Enrolled by Year</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.students_by_year}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }} />
                    <Bar dataKey="students" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Popular Career Goals */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-white text-base">Popular Career Specialization Goals</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.popular_career_goals} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                    <YAxis dataKey="goal" type="category" stroke="#94a3b8" fontSize={12} width={100} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }} />
                    <Bar dataKey="students" fill="#06b6d4" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Quiz Performance by Category */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-white text-base">Average Quiz Performance by Topic</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.quiz_performance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="category" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }} />
                    <Bar dataKey="avg_score" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: MANAGE STUDENTS TABLE */}
      {activeTab === "students" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-lg">Enrolled Engineering Students</h3>
            <span className="text-xs text-slate-400">Total: {students.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Branch</th>
                  <th className="p-3">Year</th>
                  <th className="p-3">Career Goal</th>
                  <th className="p-3">XP Points</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-850">
                    <td className="p-3 font-bold text-white">{st.name}</td>
                    <td className="p-3 text-slate-400">{st.email}</td>
                    <td className="p-3">{st.branch}</td>
                    <td className="p-3">{st.year}</td>
                    <td className="p-3 text-cyan-400 font-semibold">{st.career_goal}</td>
                    <td className="p-3 font-bold text-amber-400">{st.xp} XP</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                        {st.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
