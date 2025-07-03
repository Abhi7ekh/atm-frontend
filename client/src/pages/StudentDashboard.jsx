import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function StudentDashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchMyTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks/my", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to load your tasks");
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Student Dashboard</h2>

        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks assigned yet.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task._id} className="border rounded p-4 shadow">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-700">{task.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default StudentDashboard;
