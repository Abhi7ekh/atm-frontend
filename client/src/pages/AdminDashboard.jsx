import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔐 Route Protection
  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/");
    }
  }, [navigate, token, role]);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-cyan-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-indigo-200">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
          🛡️ Admin Dashboard
        </h1>

        <div className="grid gap-4">
          <button
            onClick={() => navigate("/create-task")}
            className="bg-indigo-600 text-white py-3 px-6 rounded hover:bg-indigo-700 transition"
          >
            ➕ Create a New Task
          </button>

          <button
            onClick={() => navigate("/all-tasks")}
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition"
          >
            📋 View All Assigned Tasks
          </button>

          <button
            onClick={() => navigate("/register-student")}
            className="bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700 transition"
          >
            👤 Create Student Account
          </button>

          <button
            onClick={() => navigate("/student-list")}
            className="bg-cyan-600 text-white py-3 px-6 rounded hover:bg-cyan-700 transition"
          >
            👥 View Registered Students
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-3 px-6 rounded hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
