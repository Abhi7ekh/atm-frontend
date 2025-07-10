import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);

      if (res && res.token) {
        const { token, user } = res;

        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("email", user.email);
        localStorage.setItem("username", user.username);

        toast.success("✅ Login successful!", { autoClose: 1500 });

        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/student/dashboard");
          }
        }, 1500);
      } else {
        toast.error(res.error || "❌ Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-secondary/5 px-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-center text-4xl font-display font-bold text-primary mb-8">📝 Task Manager</h1>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">🔐 Login to your account</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" className="w-full py-3">
            🔓 Login
          </Button>
        </form>

        {/* 🔧 Create Admin Button */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 mb-2">Need admin access?</p>
          <Button
            variant="ghost"
            onClick={() => navigate('/register-admin')}
            className="font-medium"
          >
            ➕ Create Admin Account
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
