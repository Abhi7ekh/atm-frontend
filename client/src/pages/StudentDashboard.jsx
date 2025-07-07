import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyTasks, updateTaskStatus } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔐 Role-based protection
  useEffect(() => {
    if (!token || role !== "student") {
      toast.error("❌ Unauthorized access");
      navigate("/");
    } else {
      fetchTasks();
    }
  }, []);

  // 📥 Fetch tasks
  const fetchTasks = async () => {
    setInitialLoad(true);
    try {
      const res = await getMyTasks(token);
      if (res.success) {
        setTasks(res.tasks);
      } else {
        toast.error(res.message || "❌ Failed to fetch tasks");
      }
    } catch (err) {
      toast.error("❌ Server error while fetching tasks");
    }
    setInitialLoad(false);
  };

  // 🔄 Update task status
  const handleStatusChange = async (id, newStatus) => {
    setLoading(true);
    try {
      const res = await updateTaskStatus(id, newStatus, token);
      if (res.success) {
        toast.success("✅ Task status updated");
        fetchTasks();
      } else {
        toast.error(res.message || "❌ Failed to update status");
      }
    } catch (err) {
      toast.error("❌ Server error");
    }
    setLoading(false);
  };

  // 🚪 Logout handler
  const handleLogout = () => {
    localStorage.clear();
    toast.success("👋 Logged out");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 py-10 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-blue-200 p-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          🎓 Student Dashboard
        </h1>

        {initialLoad ? (
          <p className="text-center text-gray-600">⏳ Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-600 italic">
            📭 No tasks assigned yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id || task.id}
                className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500 shadow-sm hover:shadow-md transition duration-300"
              >
                <h3 className="text-lg font-bold text-blue-800 mb-2">{task.title}</h3>
                <p className="text-gray-700">{task.description}</p>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    Status:
                  </label>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id || task.id, e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    disabled={loading}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🔙 Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-300 text-gray-800 py-2 px-6 rounded hover:bg-gray-400 transition"
          >
            🔙 Back to Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
