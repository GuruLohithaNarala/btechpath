import React, { useState } from "react";
import { CheckCircle2, Clock, Circle, ArrowDown, ExternalLink, HelpCircle, BookOpen } from "lucide-react";

export default function RoadmapFlow({ steps, onUpdateStepStatus, onOpenQuiz }) {
  const [expandedStep, setExpandedStep] = useState(steps && steps.length > 0 ? steps[0].id : null);

  if (!steps || steps.length === 0) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Completed
          </span>
        );
      case "In Progress":
        return (
          <span className="flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 mr-1 animate-pulse" /> In Progress
          </span>
        );
      default:
        return (
          <span className="flex items-center px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-semibold">
            <Circle className="w-3.5 h-3.5 mr-1" /> Not Started
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 relative py-4">
      {steps.map((step, idx) => {
        const isExpanded = expandedStep === step.id;
        const isLast = idx === steps.length - 1;

        return (
          <div key={step.id || idx} className="relative flex flex-col items-center">
            
            {/* Step Card */}
            <div
              className={`w-full bg-slate-900 border rounded-3xl p-6 transition-all duration-300 ${
                step.status === "Completed"
                  ? "border-emerald-500/40 shadow-glow"
                  : step.status === "In Progress"
                  ? "border-amber-500/40 shadow-xl"
                  : "border-slate-800"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-base shrink-0 ${
                    step.status === "Completed"
                      ? "bg-emerald-500 text-white"
                      : step.status === "In Progress"
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-800 text-slate-400"
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                      <h4 className="text-lg font-bold text-white">{step.title}</h4>
                      {getStatusBadge(step.status)}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Est. Duration: {step.duration || "2 Weeks"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    {isExpanded ? "Hide Details" : "View Details"}
                  </button>

                  <button
                    onClick={() => {
                      const nextS = step.status === "Completed" ? "Not Started" : "Completed";
                      onUpdateStepStatus(step.id, nextS);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      step.status === "Completed"
                        ? "bg-slate-800 text-slate-400 hover:text-white"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow"
                    }`}
                  >
                    {step.status === "Completed" ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-800/60">
                {step.skills.map((sk, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 text-xs font-medium border border-slate-700"
                  >
                    {sk}
                  </span>
                ))}
              </div>

              {/* Detailed View */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-in fade-in">
                  <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>

                  {/* Tasks */}
                  {step.tasks && (
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Tasks</h5>
                      <div className="space-y-1.5">
                        {step.tasks.map((task, tIdx) => (
                          <div key={tIdx} className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Triggers */}
                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      onClick={() => onOpenQuiz && onOpenQuiz(step.quiz_id || "quiz_sql_join")}
                      className="flex items-center px-4 py-2 rounded-xl bg-blue-600/20 text-cyan-300 border border-blue-500/30 hover:bg-blue-600/30 text-xs font-semibold transition-all"
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Take Module Quiz (+20 XP)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Down Connector Arrow */}
            {!isLast && (
              <div className="py-3 flex flex-col items-center text-slate-600">
                <div className="w-0.5 h-6 bg-slate-800" />
                <ArrowDown className="w-5 h-5 text-blue-500 animate-bounce" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
