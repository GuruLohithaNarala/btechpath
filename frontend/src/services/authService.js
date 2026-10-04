import { apiRequest } from "./api";

export const authService = {
  async login(email, password) {
    try {
      const res = await apiRequest("/auth/login", "POST", { email, password });
      if (res.token) {
        localStorage.setItem("btechpath_token", res.token);
        localStorage.setItem("btechpath_user", JSON.stringify(res.user));
      }
      return res;
    } catch (err) {
      // Offline fallback for demo test
      if (email === "student@btechpath.com" && password === "password123") {
        const mockUser = {
          id: "student_demo_id",
          name: "Aarav Sharma",
          email: "student@btechpath.com",
          role: "student",
          branch: "Computer Science & Engineering",
          year: "2nd Year",
          career_goal: "Full Stack Developer",
          xp: 240,
          streak: 5,
          badges: ["Python Beginner", "SQL Explorer", "DSA Starter"]
        };
        const token = "mock_demo_student_token";
        localStorage.setItem("btechpath_token", token);
        localStorage.setItem("btechpath_user", JSON.stringify(mockUser));
        return { message: "Demo Login Success", token, user: mockUser };
      } else if (email === "admin@btechpath.com" && password === "admin123") {
        const mockUser = {
          id: "admin_demo_id",
          name: "System Administrator",
          email: "admin@btechpath.com",
          role: "admin",
          branch: "Admin",
          year: "N/A",
          career_goal: "Administrator",
          xp: 1000,
          streak: 30,
          badges: ["Admin Master"]
        };
        const token = "mock_demo_admin_token";
        localStorage.setItem("btechpath_token", token);
        localStorage.setItem("btechpath_user", JSON.stringify(mockUser));
        return { message: "Admin Login Success", token, user: mockUser };
      }
      throw err;
    }
  },

  async register(userData) {
    const res = await apiRequest("/auth/register", "POST", userData);
    if (res.token) {
      localStorage.setItem("btechpath_token", res.token);
      localStorage.setItem("btechpath_user", JSON.stringify(res.user));
    }
    return res;
  },

  logout() {
    localStorage.removeItem("btechpath_token");
    localStorage.removeItem("btechpath_user");
  },

  getCurrentUser() {
    const saved = localStorage.getItem("btechpath_user");
    return saved ? JSON.parse(saved) : null;
  }
};
