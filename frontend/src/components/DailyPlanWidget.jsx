import React, { useState } from "react";
import { CheckSquare, Square, Calendar, Clock, Sparkles } from "lucide-react";

export default function DailyPlanWidget({ planData }) {
  const [tasks, setTasks] = useState(planData ? planData.tasks : []);

  if (!planData || !tasks) return null;

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const pct = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white shadow-glow">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Today's Recommended Plan</h3>
            <p className="text-xs text-slate-400 flex items-center mt-0.5">
              <Calendar className="w-3.5 h-3.5 mr-1 text-cyan-400" />
              Goal: {planData.career_goal} • Time: {planData.available_time}
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20">
          {pct}% Completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task, idx) => (
          <div
            key={task.id || idx}
            onClick={() => toggleTask(task.id)}
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
              task.completed
                ? "bg-emerald-950/20 border-emerald-500/30 text-slate-400 line-through"
                : "bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center space-x-3">
              {task.completed ? (
                <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-slate-500 shrink-0" />
              )}
              <span className="text-sm font-medium">{task.title}</span>
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{task.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
