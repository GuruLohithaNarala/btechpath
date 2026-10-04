import React, { useState } from "react";
import { CheckCircle2, Circle, Lock, ArrowRight, Zap, BookOpen } from "lucide-react";

export default function VisualRoadmap({ steps, onUpdateStepStatus, onOpenQuiz }) {
  const [selectedStep, setSelectedStep] = useState(steps && steps.length > 0 ? steps[0].id : null);

  if (!steps || steps.length === 0) return null;

  const getStepColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500";
      case "In Progress":
        return "bg-amber-500";
      default:
        return "bg-slate-700";
    }
  };

  const getStepBorderColor = (status) => {
    switch (status) {
      case "Completed":
        return "border-emerald-500";
      case "In Progress":
        return "border-amber-500";
      default:
        return "border-slate-600";
    }
  };

  // Group steps into phases (roughly 2-3 steps per phase)
  const phasesPerRow = Math.ceil(steps.length / 2);
  const phases = [];
  for (let i = 0; i < steps.length; i += phasesPerRow) {
    phases.push(steps.slice(i, i + phasesPerRow));
  }

  const selectedStepData = steps.find((s) => s.id === selectedStep);

  return (
    <div className="space-y-8">
      {/* Visual Roadmap Display */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Your Career Roadmap Path</h2>
          <p className="text-sm text-slate-400">Click on any milestone to view details</p>
        </div>

        {/* Roadmap Visual */}
        <div className="relative">
          {phases.map((phaseSteps, phaseIdx) => (
            <div key={phaseIdx} className="relative mb-8">
              {/* Phase Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {phaseSteps.map((step, stepIdx) => {
                  const isSelected = step.id === selectedStep;
                  const stepNumber = phases.slice(0, phaseIdx).reduce((sum, p) => sum + p.length, 0) + stepIdx + 1;
                  const progressPercent = (stepNumber / steps.length) * 100;

                  return (
                    <div
                      key={step.id}
                      onClick={() => setSelectedStep(step.id)}
                      className="relative group cursor-pointer"
                    >
                      {/* Progress Line Background */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-blue-500 rounded-3xl" />

                      {/* Step Card */}
                      <div
                        className={`relative bg-gradient-to-br rounded-3xl p-6 border-2 transition-all transform hover:scale-105 ${
                          isSelected
                            ? `${getStepColor(step.status)} border-${getStepBorderColor(step.status).split("-")[1]}-500 shadow-lg text-white`
                            : `bg-slate-800 ${getStepBorderColor(step.status)} border-opacity-30 hover:border-opacity-70`
                        }`}
                      >
                        {/* Step Number Circle */}
                        <div className="absolute -top-4 -left-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 border-slate-900 ${
                              step.status === "Completed"
                                ? "bg-emerald-500 text-white"
                                : step.status === "In Progress"
                                ? "bg-amber-500 text-white"
                                : "bg-slate-600 text-slate-300"
                            }`}
                          >
                            {stepNumber}
                          </div>
                        </div>

                        {/* Status Icon */}
                        <div className="absolute top-4 right-4">
                          {step.status === "Completed" ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                          ) : step.status === "In Progress" ? (
                            <Zap className="w-6 h-6 text-amber-400 animate-pulse" />
                          ) : (
                            <Circle className="w-6 h-6 text-slate-500" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="pt-6 space-y-3">
                          <div>
                            <h3 className={`font-bold text-base leading-tight ${isSelected ? "text-white" : "text-slate-200"}`}>
                              {step.title}
                            </h3>
                            <p className={`text-xs mt-1 ${isSelected ? "text-white/80" : "text-slate-400"}`}>
                              {step.duration}
                            </p>
                          </div>

                          {/* Skills Preview */}
                          <div className="flex flex-wrap gap-1.5">
                            {step.skills.slice(0, 2).map((skill, idx) => (
                              <span
                                key={idx}
                                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                  isSelected
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-700/60 text-cyan-300"
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                            {step.skills.length > 2 && (
                              <span
                                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                  isSelected
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-700/60 text-slate-400"
                                }`}
                              >
                                +{step.skills.length - 2}
                              </span>
                            )}
                          </div>

                          {/* Status Badge */}
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                            step.status === "Completed"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                              : step.status === "In Progress"
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                              : isSelected
                              ? "bg-slate-600/50 border-slate-500 text-slate-200"
                              : "bg-slate-700/50 border-slate-600 text-slate-400"
                          }`}>
                            {step.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Connector Arrow to Next Phase */}
              {phaseIdx < phases.length - 1 && (
                <div className="flex justify-center py-6">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-transparent" />
                    <ArrowRight className="w-5 h-5 text-blue-500 transform rotate-90" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="pt-6 border-t border-slate-800">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-400">Overall Progress</span>
              <span className="text-xs font-bold text-cyan-400">
                {steps.filter((s) => s.status === "Completed").length} / {steps.length} Complete
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                style={{
                  width: `${(steps.filter((s) => s.status === "Completed").length / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Selected Step Details */}
      {selectedStepData && (
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 space-y-6 animate-in fade-in">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-white">{selectedStepData.title}</h3>
              <p className="text-sm text-slate-400 mt-1">Duration: {selectedStepData.duration}</p>
            </div>
            <div className={`px-4 py-2 rounded-xl text-sm font-semibold ${
              selectedStepData.status === "Completed"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : selectedStepData.status === "In Progress"
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                : "bg-slate-800 text-slate-400 border border-slate-700"
            }`}>
              {selectedStepData.status}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overview</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{selectedStepData.description}</p>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Skills to Master</h4>
            <div className="flex flex-wrap gap-2">
              {selectedStepData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-blue-950/50 border border-blue-500/30 text-blue-300 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tasks */}
          {selectedStepData.tasks && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Practice Tasks</h4>
              <div className="space-y-2">
                {selectedStepData.tasks.map((task, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => {
                const nextStatus = selectedStepData.status === "Completed" ? "Not Started" : "Completed";
                onUpdateStepStatus(selectedStepData.id, nextStatus);
              }}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                selectedStepData.status === "Completed"
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow"
              }`}
            >
              {selectedStepData.status === "Completed" ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button
              onClick={() => onOpenQuiz && onOpenQuiz(selectedStepData.quiz_id || "quiz_default")}
              className="flex-1 px-4 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 border border-blue-500/30 font-semibold text-sm transition-all flex items-center justify-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Take Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
