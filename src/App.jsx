import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔓 Public Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin"; // ✅ New

// 🛡️ Protected Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

// 🧑‍🏫 Admin Pages
import RegisterStudent from "./pages/RegisterStudent";
import CreateTaskPage from "./pages/CreateTaskPage";
import AllTasksPage from "./pages/AllTasksPage";
import StudentListPage from "./pages/StudentListPage";

// 🛡️ Route Guard
import ProtectedRoute from "./components/ProtectedRoute";

// 🔔 Toast Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🟢 Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-admin" element={<RegisterAdmin />} /> {/* ✅ New */}

        {/* 🔒 Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-task"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateTaskPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-tasks"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllTasksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-list"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <StudentListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register-student"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <RegisterStudent />
            </ProtectedRoute>
          }
        />

        {/* 🎓 Student Route */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* 🔔 Global Toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
