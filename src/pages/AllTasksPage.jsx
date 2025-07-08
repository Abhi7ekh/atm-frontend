// client/src/pages/AllTasksPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTasks, deleteTask, getStudents } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllTasksPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔒 Protect route
  useEffect(() => {
    if (!token || role !== "admin") {
      toast.error("❌ Unauthorized access");
      navigate("/");
    } else {
      fetchTasks();
      fetchStudents();
    }
  }, []);

  // 📥 Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await getAllTasks(token);
      if (res.success) {
        setTasks(res.tasks || []);
      } else {
        toast.error(res.message || "❌ Failed to fetch tasks");
      }
    } catch (err) {
      toast.error("❌ Server error while fetching tasks");
    }
    setLoading(false);
  };

  // 👥 Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await getStudents(token);
      if (res.success) {
        setStudents(res.students || []);
      } else {
        toast.error(res.message || "❌ Failed to fetch students");
      }
    } catch (err) {
      toast.error("❌ Server error while fetching students");
    }
  };

  // ❌ Delete Task
  const handleDelete = async (taskId) => {
    try {
      const res = await deleteTask(taskId, token);
      if (res.success) {
        toast.success("✅ Task deleted");
        fetchTasks();
      } else {
        toast.error(res.message || "❌ Failed to delete task");
      }
    } catch (err) {
      toast.error("❌ Server error while deleting task");
    }
  };

  // 🔄 Map student ID to student details
  const getStudentDetails = (id) => {
    const student = students.find((s) => s.id === id || s._id === id);
    return student ? `${student.name} (${student.email})` : "Unknown Student";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-indigo-100 py-10 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-indigo-200">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          📋 All Assigned Tasks
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">⏳ Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500 italic">📭 No tasks found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-5 rounded-lg shadow-md border-l-4 border-indigo-500 relative hover:shadow-xl transition"
              >
                <h3 className="text-lg font-bold text-indigo-700 mb-1">{task.title}</h3>
                <p className="text-gray-700 mb-2">{task.description}</p>

                <div className="text-sm mt-2 text-gray-800">
                  <span className="font-semibold text-indigo-700">👥 Assigned to:</span>
                  <ul className="list-disc ml-5 mt-1 text-gray-700">
                    {(task.assignedTo || []).map((studentId, idx) => (
                      <li key={idx}>{getStudentDetails(studentId)}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  title="Delete Task"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="bg-gray-300 text-gray-800 py-2 px-6 rounded hover:bg-gray-400 transition"
          >
            🔙 Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTasksPage;
