import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to load tasks");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/students", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load students");
    }
  };

  const handleChange = (e) => {
    setTaskData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/tasks", taskData, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success("Task created");
      setTaskData({ title: "", description: "", assignedTo: "" });
      fetchTasks();
    } catch (err) {
      toast.error("Task creation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Admin Dashboard</h2>

        <form onSubmit={handleCreateTask} className="mb-6">
          <div className="flex flex-col gap-2 max-w-md">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={taskData.title}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Task Description"
              value={taskData.description}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
            <select
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            >
              <option value="">Select Student</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Create Task
            </button>
          </div>
        </form>

        <h3 className="text-xl font-semibold mb-2">All Tasks</h3>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task._id} className="border p-4 rounded flex justify-between">
              <div>
                <h4 className="font-bold">{task.title}</h4>
                <p>{task.description}</p>
              </div>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AdminDashboard;
