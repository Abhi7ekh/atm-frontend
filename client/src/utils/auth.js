// Save token & role to localStorage
export const saveAuthData = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

// Get role (admin/student)
export const getUserRole = () => {
  return localStorage.getItem("role");
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
