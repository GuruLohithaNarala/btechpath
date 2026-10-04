import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { techPulseService } from "../services/appServices";
import { TrendingUp, Sparkles, ExternalLink, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

export default function TechPulse() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrends() {
      setLoading(true);
      const res = await techPulseService.getTrends();
      if (res && res.trends) {
        setTrends(res.trends);
      }
      setLoading(false);
    }
    loadTrends();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <span>Curated Engineering Tech Pulse & Market Shifts</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Tech <span className="gradient-text">Pulse Trends</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Stay ahead of the curve. Discover emerging technology shifts, high-demand skill areas, and recommended learning roadmaps.
        </p>
      </div>

      {/* Grid of Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm">Loading industry trend insights...</p>
          </div>
        ) : (
          trends.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 hover:border-slate-700 transition-all card-hover"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 text-xs font-semibold border border-blue-500/20">
                  {t.category}
                </span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  {t.trend} ({t.growth})
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-white">{t.technology}</h3>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <strong className="text-cyan-400 font-semibold uppercase tracking-wider block">Why It Matters:</strong>
                  <p className="text-slate-300">{t.why_it_matters}</p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <strong className="text-emerald-400 font-semibold uppercase tracking-wider block">Who Should Learn It:</strong>
                  <p className="text-slate-300">{t.who_should_learn}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 font-medium">Mapped Track:</span>
                  <span className="text-xs font-bold text-cyan-300">{t.related_roadmap}</span>
                </div>

                <Link
                  to={`/roadmap-generator`}
                  className="flex items-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow transition-all"
                >
                  View Track <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
