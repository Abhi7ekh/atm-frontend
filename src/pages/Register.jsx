import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      if (res.success) {
        toast.success("✅ Registration successful! Redirecting to login...", {
          autoClose: 1500,
        });
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(res.message || "❌ Registration failed.");
      }
    } catch (err) {
      toast.error("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl border border-green-200">
        <h1 className="text-center text-4xl font-bold text-green-700 mb-8">📝 Task Manager</h1>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">🧾 Create New Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-green-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-green-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-green-400"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-green-400"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
          >
            📝 Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
