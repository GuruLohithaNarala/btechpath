import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Compass, LogIn, Sparkles, UserCheck, ShieldCheck } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.user && res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setLoading(true);
    try {
      const res = await login(demoEmail, demoPass);
      if (res.user && res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white mx-auto shadow-glow">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400">Log in to track your engineering roadmap & progress.</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs rounded-xl">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 font-semibold mb-1 block">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@btechpath.com"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold mb-1 block">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm rounded-xl shadow-glow transition-all"
          >
            {loading ? "Authenticating..." : "Log In"}
          </button>
        </form>

        {/* Demo Login Options */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block text-center">
            Instant One-Click Demo Accounts
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin("student@btechpath.com", "password123")}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500 text-xs text-cyan-300 font-semibold flex items-center justify-center"
            >
              <UserCheck className="w-3.5 h-3.5 mr-1.5" /> Student Demo
            </button>

            <button
              onClick={() => handleDemoLogin("admin@btechpath.com", "admin123")}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-xs text-amber-300 font-semibold flex items-center justify-center"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Admin Demo
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 pt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-400 font-bold hover:underline">
            Sign Up Free
          </Link>
        </div>

      </div>
    </div>
  );
}
