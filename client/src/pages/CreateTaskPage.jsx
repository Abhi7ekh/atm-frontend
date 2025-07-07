import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask, getStudents } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(""); // ✅ Added due date
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔒 Role Protection
  useEffect(() => {
    if (!token || role !== "admin") {
      toast.error("❌ Unauthorized access");
      navigate("/");
    } else {
      fetchStudents();
    }
  }, []);

  // 📥 Load all students
  const fetchStudents = async () => {
    try {
      const res = await getStudents(token);
      if (res.success) {
        setStudents(res.students || []);
      } else {
        toast.error("❌ Failed to load students");
      }
    } catch (err) {
      toast.error("❌ Server error while fetching students");
    }
  };

  // 🚀 Handle task creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate || selectedStudents.length === 0) {
      return toast.warn("⚠️ All fields are required");
    }

    setLoading(true);
    try {
      const res = await createTask(token, {
        title,
        description,
        dueDate,
        assignedTo: selectedStudents,
      });

      if (res.success) {
        toast.success("✅ Task created successfully");
        setTitle("");
        setDescription("");
        setDueDate("");
        setSelectedStudents([]);
      } else {
        toast.error(res.message || "❌ Failed to create task");
      }
    } catch (err) {
      toast.error("❌ Server error while creating task");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 py-10 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          ✍️ Create New Task
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Enter Task Title"
            className="border rounded p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Enter Task Description"
            className="border rounded p-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />

          {/* 📅 Due Date Input */}
          <input
            type="date"
            className="border rounded p-3"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          {/* ✅ Multi-select Students */}
          <select
            multiple
            value={selectedStudents}
            onChange={(e) =>
              setSelectedStudents(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="border rounded p-3 h-40"
          >
            <option disabled value="">
              -- Select Students --
            </option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded transition disabled:opacity-50"
          >
            {loading ? "⏳ Creating..." : "✅ Create Task"}
          </button>
        </form>

        <div className="flex justify-center mt-6">
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

export default CreateTaskPage;
