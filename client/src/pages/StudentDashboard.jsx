import React, { useEffect, useState } from "react";
import { getMyTasks } from "../services/api"; // 🎯 Correct API
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || role !== "student") {
        navigate("/"); // Redirect unauthorized access
        return;
      }

      try {
        const res = await getMyTasks(token);
        if (res.success) {
          setTasks(res.tasks);
        } else {
          setErrorMsg(res.message || "Unable to fetch tasks ❌");
        }
      } catch (error) {
        console.error("❌ Fetch Error:", error);
        setErrorMsg("Server error ❌");
      }
    };

    fetchTasks();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">🎓 Student Dashboard</h1>

        {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

        {tasks.length === 0 && !errorMsg ? (
          <p className="text-gray-600">No tasks assigned yet.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task._id || task.id} className="border p-4 rounded shadow bg-gray-50">
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-sm text-gray-500 mt-1">Status: {task.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
