import React, { useState } from "react";
import { Lightbulb, Layers, Code, AlertTriangle, Key, HelpCircle, CheckCircle } from "lucide-react";

export default function ExplainSimplyCard({ data, onStartQuiz }) {
  if (!data) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-slate-200">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
          <Lightbulb className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Concept Breakdown</span>
          <h3 className="text-xl font-bold text-white">Explain Simply</h3>
        </div>
      </div>

      {/* Definition */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center">
          <Layers className="w-4 h-4 mr-2 text-cyan-400" /> Formal Definition
        </h4>
        <p className="text-base text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          {data.definition}
        </p>
      </div>

      {/* Analogy */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center">
          <Lightbulb className="w-4 h-4 mr-2 text-amber-400" /> Real-World Analogy
        </h4>
        <p className="text-base text-amber-200/90 leading-relaxed bg-amber-950/20 p-4 rounded-2xl border border-amber-500/20 italic">
          "{data.analogy}"
        </p>
      </div>

      {/* Visual Example */}
      {data.visual && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center">
            <Layers className="w-4 h-4 mr-2 text-blue-400" /> Visual Diagram
          </h4>
          <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-blue-200 font-mono text-sm tracking-wide">
            {data.visual}
          </div>
        </div>
      )}

      {/* Code Example */}
      {data.code_example && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center">
            <Code className="w-4 h-4 mr-2 text-emerald-400" /> Code Example
          </h4>
          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-sm overflow-x-auto">
            <code>{data.code_example}</code>
          </pre>
        </div>
      )}

      {/* Common Mistakes & Memory Tip Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.common_mistakes && (
          <div className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-2xl space-y-2">
            <h5 className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1.5" /> Common Pitfalls
            </h5>
            <ul className="space-y-1.5 text-xs text-rose-200/90 list-disc list-inside">
              {data.common_mistakes.map((m, idx) => (
                <li key={idx}>{m}</li>
              ))}
            </ul>
          </div>
        )}

        {data.memory_tip && (
          <div className="bg-indigo-950/20 border border-indigo-500/20 p-4 rounded-2xl space-y-2">
            <h5 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center">
              <Key className="w-4 h-4 mr-1.5" /> Memory Hack
            </h5>
            <p className="text-xs text-indigo-200/90 font-medium">
              {data.memory_tip}
            </p>
          </div>
        )}
      </div>

      {/* Quick Quiz CTA */}
      {onStartQuiz && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onStartQuiz}
            className="flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-glow transition-all"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Take Quick Quiz (+20 XP)
          </button>
        </div>
      )}
    </div>
  );
}
