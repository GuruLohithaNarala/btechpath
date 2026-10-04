import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { roadmapService } from "../services/appServices";
import RoadmapDiagram from "../components/RoadmapDiagram";

export default function RoadmapView() {
  const { id } = useParams();
  const location = useLocation();
  const [roadmap, setRoadmap] = useState(location.state?.roadmap || null);
  const [loading, setLoading] = useState(!roadmap);

  useEffect(() => {
    async function loadRoadmap() {
      if (!roadmap) {
        setLoading(true);
        const res = await roadmapService.getRoadmapById(id);
        if (res && res.roadmap) {
          setRoadmap(res.roadmap);
        }
        setLoading(false);
      }
    }
    loadRoadmap();
  }, [id, roadmap]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400 space-y-4">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm">Loading your custom career roadmap...</p>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Roadmap Not Found</h2>
        <p className="text-slate-400 text-sm">Create a new roadmap tailored to your career goal.</p>
        <Link to="/roadmap-generator" className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold">
          Generate Roadmap
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <RoadmapDiagram
        steps={roadmap.steps}
        careerGoal={roadmap.career_goal}
      />
    </div>
  );
}
