import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Compass, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  LayoutDashboard, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Award, 
  Zap, 
  Bell, 
  Sparkles,
  ShieldCheck
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Roadmaps", path: "/roadmaps" },
    { name: "4-Year Journey", path: "/journey" },
    { name: "Learn", path: "/learn" },
    { name: "Projects", path: "/projects" },
    { name: "Placement Prep", path: "/placement" },
    { name: "Professional Platforms", path: "/professional-platforms" },
    { name: "Tech Pulse", path: "/tech-pulse" },
    { name: "AI Mentor", path: "/ai-mentor" },
    ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
    ...(user && user.role === "admin" ? [{ name: "Admin Portal", path: "/admin" }] : [])
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                BTech<span className="text-cyan-400">Path</span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 font-medium hidden sm:inline">
                Engineering Journey, Simplified.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-blue-600/20 text-cyan-300 border border-blue-500/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* XP Badge */}
                <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{user.xp || 100} XP</span>
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500 text-sm font-medium focus:outline-none transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                      {user.name ? user.name[0].toUpperCase() : "U"}
                    </div>
                    <span className="text-slate-200 max-w-[120px] truncate">{user.name}</span>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-slate-800">
                        <p className="text-xs text-slate-400 font-medium">Logged in as</p>
                        <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md bg-blue-500/20 text-cyan-300 font-bold uppercase">
                          {user.role}
                        </span>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2.5 text-blue-400" />
                        Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <User className="w-4 h-4 mr-2.5 text-cyan-400" />
                        Student Profile
                      </Link>

                      <Link
                        to="/resume-builder"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <GraduationCap className="w-4 h-4 mr-2.5 text-amber-400" />
                        ATS Resume Builder
                      </Link>

                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-amber-300 hover:bg-slate-800 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 mr-2.5 text-amber-400" />
                          Admin Console
                        </Link>
                      )}

                      <div className="border-t border-slate-800 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                            navigate("/");
                          }}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-2.5" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl shadow-glow transition-all transform hover:-translate-y-0.5"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            {user && (
              <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                <Zap className="w-3 h-3 fill-amber-400" />
                <span>{user.xp || 100}</span>
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                isActive(link.path)
                  ? "bg-blue-600/20 text-cyan-300 border border-blue-500/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-800 flex flex-col space-y-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800"
                >
                  <User className="w-5 h-5 mr-3 text-cyan-400" />
                  My Profile ({user.name})
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate("/");
                  }}
                  className="flex items-center w-full px-4 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 font-medium text-slate-300 bg-slate-800 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 font-semibold text-white bg-blue-600 rounded-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
