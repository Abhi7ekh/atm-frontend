const API_BASE_URL = "http://localhost:5000/api";

// 🔐 Login
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (error) {
    return { error: "Login failed. Please try again later." };
  }
};

// 📝 Register
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (error) {
    return { error: "Registration failed. Please try again later." };
  }
};

// 🎓 Get Tasks for Logged-in Student
export const getMyTasks = async (token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return { success: true, tasks: data.tasks || data }; // handles both shapes
  } catch (error) {
    return { success: false, message: "Unable to fetch student tasks." };
  }
};

// 🧑‍💼 Get All Tasks (Admin Only)
export const getAllTasks = async (token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return { success: true, tasks: data.tasks || data }; // consistent shape
  } catch (error) {
    return { success: false, message: "Unable to fetch tasks." };
  }
};

// ➕ Create Task (Admin Only)
export const createTask = async (taskData, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    return await res.json();
  } catch (error) {
    return { error: "Task creation failed." };
  }
};

// ✏️ Update Task (Optional – Backend not implemented yet)
export const updateTask = async (taskId, updatedData, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    return await res.json();
  } catch (error) {
    return { error: "Task update failed." };
  }
};

// ❌ Delete Task (Admin Only – Optional)
export const deleteTask = async (taskId, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    return { error: "Task deletion failed." };
  }
};
