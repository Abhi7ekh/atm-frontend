import React, { useEffect, useState } from "react";
import { createTask, getAllTasks, deleteTask } from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", assignedTo: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Protect route and fetch tasks
  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, [navigate, token, role]);

  // 📥 Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    const res = await getAllTasks(token);
    if (res.success) {
      setTasks(res.tasks);
    } else {
      setMessage(res.error || "Failed to load tasks ❌");
    }
    setLoading(false);
  };

  // ✏️ Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Create new task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await createTask(form, token);
    if (res.success || res.message) {
      setMessage(res.message || "Task created ✅");
      setForm({ title: "", description: "", assignedTo: "" });
      fetchTasks();
    } else {
      setMessage(res.error || "Task creation failed ❌");
    }

    setLoading(false);
  };

  // ❌ Delete a task
  const handleDelete = async (taskId) => {
    const res = await deleteTask(taskId, token);
    if (res.success || res.message) {
      setMessage("Task deleted ✅");
      fetchTasks();
    } else {
      setMessage(res.error || "Failed to delete task ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">🛡️ Admin Dashboard</h1>

        {message && (
          <div className="mb-4 p-3 rounded text-white bg-blue-600">
            {message}
          </div>
        )}

        {/* 📌 Task Creation Form */}
        <form onSubmit={handleCreateTask} className="mb-6 grid gap-4">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={form.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="assignedTo"
            placeholder="Assign to (Student Email)"
            value={form.assignedTo}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Creating..." : "➕ Create Task"}
          </button>
        </form>

        {/* 📋 All Tasks Section */}
        <h2 className="text-xl font-semibold mb-3">📋 All Tasks</h2>
        {loading ? (
          <p className="text-gray-600">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="border p-4 rounded shadow-sm flex justify-between items-start bg-gray-50"
              >
                <div>
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  <p className="text-gray-700">{task.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Assigned to: {task.assignedTo}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  ❌ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
