import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { roadmapService } from "../services/appServices";
import { useAuth } from "../context/AuthContext";
import { Sparkles } from "lucide-react";

export default function RoadmapGenerator() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const selectedTrack = new URLSearchParams(location.search).get("track") || "Full Stack Developer";

  const [formData, setFormData] = useState({
    user_name: user ? user.name : "Student",
    branch: user ? user.branch || "Computer Science & Engineering" : "Computer Science & Engineering",
    year: user ? user.year || "2nd Year" : "2nd Year",
    career_goal: selectedTrack,
    skill_level: "Beginner",
    study_time: "2 hours/day"
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, career_goal: selectedTrack }));
  }, [selectedTrack]);

  useEffect(() => {
    if (location.search.includes("track=")) {
      handleSubmit();
    }
  }, [location.search]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        career_goal: selectedTrack
      };

      const res = await roadmapService.generateRoadmap(payload);
      const roadmapId = res.roadmap ? res.roadmap._id : "demo_roadmap_id";
      navigate(`/roadmaps/${roadmapId}`, { state: { roadmap: res.roadmap } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Auto-Generated Path</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Generate <span className="gradient-text">{selectedTrack}</span> Roadmap
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Creating your personalized route automatically based on the selected category.
          </p>
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-glow transition-all"
        >
          {loading ? "Generating Roadmap..." : "Generate Roadmap"}
          <Sparkles className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
}
