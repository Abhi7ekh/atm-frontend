import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // 🔒 Hardcoded role
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      if (res.success) {
        toast.success("✅ Admin registered successfully!", { autoClose: 1500 });
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(res.message || "❌ Registration failed.");
      }
    } catch (err) {
      toast.error("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl border border-indigo-200">
        <h1 className="text-center text-4xl font-bold text-indigo-700 mb-8">🛡️ Admin Access</h1>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">🧾 Create Admin Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-indigo-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-indigo-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create a secure password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-indigo-400"
            required
          />

          {/* 🔒 Hidden field for role */}
          <input type="hidden" name="role" value="admin" />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            🚀 Register Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
