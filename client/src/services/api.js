const API_BASE_URL = "http://localhost:5000/api";

// 🔐 Login User
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: "Login failed. Please try again later." };
  }
};

// 📝 Register User
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: "Registration failed. Please try again later." };
  }
};

// ✅ Register Student (Admin Only)
export const registerStudent = async (studentData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(studentData),
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: "Student registration failed." };
  }
};

// 🎓 Get Tasks Assigned to Logged-in Student
export const getMyTasks = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return { success: true, tasks: data.tasks || data };
  } catch (error) {
    return { success: false, message: "Unable to fetch student tasks." };
  }
};

// 🧑‍💼 Get All Tasks (Admin Only)
export const getAllTasks = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return { success: true, tasks: data.tasks || data };
  } catch (error) {
    return { success: false, message: "Unable to fetch tasks." };
  }
};

// ➕ Create New Task (Admin Only)
export const createTask = async (token,taskData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: "Task creation failed." };
  }
};

// ✏️ Update Existing Task (Admin Only)
export const updateTask = async (taskId, updatedData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: "Task update failed." };
  }
};

// ✅ Update Task Status (Student Only)
export const updateTaskStatus = async (taskId, newStatus, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/status/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: "Status update failed." };
  }
};

// ❌ Delete Task (Admin Only)
export const deleteTask = async (taskId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: "Task deletion failed." };
  }
};


// 👥 Get All Students (Admin Only)
export const getStudents = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: "Failed to fetch students list." };
  }
};

