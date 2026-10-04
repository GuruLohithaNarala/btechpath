import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import RoadmapGenerator from "./pages/RoadmapGenerator";
import RoadmapView from "./pages/RoadmapView";
import FourYearJourney from "./pages/FourYearJourney";
import CareerTracks from "./pages/CareerTracks";
import LearningHub from "./pages/LearningHub";
import ProjectsHub from "./pages/ProjectsHub";
import PlacementPrep from "./pages/PlacementPrep";
import GovernmentPlatforms from "./components/GovernmentPlatforms";
import ResumeBuilder from "./pages/ResumeBuilder";
import TechPulse from "./pages/TechPulse";
import AIMentor from "./pages/AIMentor";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/roadmap-generator" element={<RoadmapGenerator />} />
              <Route path="/roadmaps" element={<CareerTracks />} />
              <Route path="/roadmaps/:id" element={<RoadmapView />} />
              <Route path="/journey" element={<FourYearJourney />} />
              <Route path="/learn" element={<LearningHub />} />
              <Route path="/projects" element={<ProjectsHub />} />
              <Route path="/placement" element={<PlacementPrep />} />
              <Route path="/professional-platforms" element={<GovernmentPlatforms />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/tech-pulse" element={<TechPulse />} />
              <Route path="/ai-mentor" element={<AIMentor />} />
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
