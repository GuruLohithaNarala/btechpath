import React from "react";

export default function RoadmapDiagram({ steps, careerGoal }) {
  if (!steps || steps.length === 0) return null;

  const totalSteps = steps.length;

  const getStepColor = (status) => {
    switch (status) {
      case "Completed":
        return { bg: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-400" };
      case "In Progress":
        return { bg: "bg-amber-500", border: "border-amber-500", text: "text-amber-400" };
      default:
        return { bg: "bg-slate-600", border: "border-slate-600", text: "text-slate-400" };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return "✓";
      case "In Progress":
        return "⚡";
      default:
        return "○";
    }
  };

  return (
    <div className="space-y-8">
      {/* Roadmap Diagram */}
      <div className="bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-4">
        
        {/* Timeline Path */}
        <div className="space-y-6 relative">
          
          {/* Start Trophy */}
          <div className="flex items-center justify-center mb-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-sm font-bold text-amber-400">Start Your Journey</p>
            </div>
          </div>

          {/* Steps Timeline */}
          {steps.map((step, idx) => {
            const colors = getStepColor(step.status);
            const isLast = idx === totalSteps - 1;

            return (
              <div key={step.id}>
                <div className="flex items-center gap-4 sm:gap-6 group">
                  <div className="w-20 sm:w-28 flex-shrink-0 text-right">
                    <p className={`text-sm font-bold ${colors.text}`}>{step.duration}</p>
                  </div>

                  <div className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 ${colors.border} ${colors.bg} flex items-center justify-center text-white font-bold text-2xl shadow-lg relative z-10`}>
                    {getStatusIcon(step.status)}
                  </div>

                  <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-2xl p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-white truncate">{step.title}</h3>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {step.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span key={skillIndex} className={`px-2 py-0.5 rounded-lg text-xs font-medium ${colors.bg} bg-opacity-20 ${colors.text}`}>
                              {skill}
                            </span>
                          ))}
                          {step.skills.length > 3 && (
                            <span className="px-2 py-0.5 rounded-lg text-xs font-medium text-slate-400">
                              +{step.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {!isLast && (
                  <div className="flex items-center gap-4 sm:gap-6 ml-4 sm:ml-6">
                    <div className="w-20 sm:w-28" />
                    <div className="flex-shrink-0 w-1 h-6 bg-gradient-to-b from-blue-500 to-slate-600" />
                    <div />
                  </div>
                )}
              </div>
            );
          })}

          {/* Success End */}
          <div className="flex items-center justify-center mt-8">
            <div className="text-center">
              <p className="text-4xl font-black text-green-400 mb-2">SUCCESS!</p>
              <p className="text-sm font-semibold text-slate-400">Ready for {careerGoal || "Your Career"}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
