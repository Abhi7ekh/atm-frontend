// client/src/pages/RegisterStudent.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterStudent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔒 Role protection
  useEffect(() => {
    if (!token || role !== "admin") {
      toast.error("❌ Unauthorized access");
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      return toast.warn("⚠️ All fields are required");
    }

    try {
      // ✅ FIXED: Correct argument order
      const res = await registerStudent({ name, email, password, role: "student" }, token);

      if (res.success) {
        toast.success("✅ Student registered successfully");
        setFormData({ name: "", email: "", password: "" });
      } else {
        toast.error(res.message || "❌ Registration failed");
      }
    } catch (err) {
      toast.error("❌ Server error during registration");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-10 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-purple-200">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          🧑‍🎓 Register New Student
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-purple-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Student Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-purple-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Temporary Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-purple-400"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
          >
            ✅ Create Student Account
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

export default RegisterStudent;
