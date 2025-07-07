// client/src/pages/StudentListPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentListPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔒 Route protection
  useEffect(() => {
    if (!token || role !== "admin") {
      toast.error("❌ Unauthorized access");
      navigate("/");
    } else {
      fetchStudents();
    }
  }, []);

  // 📥 Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getStudents(token);
      if (res.success) {
        setStudents(res.students || []);
      } else {
        toast.error(res.message || "❌ Failed to load students");
      }
    } catch (err) {
      toast.error("❌ Server error while fetching students");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 py-10 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-yellow-200">
        <h1 className="text-3xl font-extrabold text-yellow-700 mb-6 text-center">
          📚 Registered Students
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">⏳ Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-500 italic">📭 No students found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-yellow-200 text-yellow-800">
                <tr>
                  <th className="py-2 px-4 border-b text-left">👤 Name</th>
                  <th className="py-2 px-4 border-b text-left">📧 Email</th>
                  <th className="py-2 px-4 border-b text-left">🎓 Role</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-yellow-50 transition">
                    <td className="py-2 px-4 border-b">{student.name}</td>
                    <td className="py-2 px-4 border-b">{student.email}</td>
                    <td className="py-2 px-4 border-b capitalize">{student.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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

export default StudentListPage;
