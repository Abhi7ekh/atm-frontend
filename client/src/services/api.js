console.log("🌍 VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

// 🌐 Set Base URL from Environment (Vite Compatible)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 🔐 Login User
export const loginUser = async (email, password) => {
  return await sendPost("/auth/login", { email, password });
};

// 📝 Register Admin
export const registerUser = async (userData) => {
  return await sendPost("/auth/register", userData);
};

// ✅ Register Student (Admin Only)
export const registerStudent = async (studentData, token) => {
  return await sendPost("/auth/register-student", studentData, token);
};

// 🧑‍🎓 Student: Get Assigned Tasks
export const getMyTasks = async (token) => {
  return await sendGet("/tasks/my", token);
};

// 🧑‍💼 Admin: Get All Tasks
export const getAllTasks = async (token) => {
  return await sendGet("/tasks/all", token);
};

// ➕ Admin: Create Task
export const createTask = async (token, taskData) => {
  return await sendPost("/tasks", taskData, token);
};

// ✏️ Admin: Update Task
export const updateTask = async (taskId, updatedData, token) => {
  return await sendPut(`/tasks/${taskId}`, updatedData, token);
};

// ✅ Student: Update Task Status
export const updateTaskStatus = async (taskId, newStatus, token) => {
  return await sendPut(`/tasks/status/${taskId}`, { status: newStatus }, token);
};

// ❌ Admin: Delete Task
export const deleteTask = async (taskId, token) => {
  return await sendDelete(`/tasks/${taskId}`, token);
};

// 👥 Admin: Get All Students
export const getStudents = async (token) => {
  return await sendGet("/students", token);
};

// =====================================================
// 📦 Unified API Helpers for Clean Code
// =====================================================

const sendGet = async (endpoint, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: "GET request failed." };
  }
};

const sendPost = async (endpoint, data, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: "POST request failed." };
  }
};

const sendPut = async (endpoint, data, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: "PUT request failed." };
  }
};

const sendDelete = async (endpoint, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: "DELETE request failed." };
  }
};
