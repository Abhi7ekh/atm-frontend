import { useNavigate } from "react-router-dom";
import { getUserRole, logout } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const role = getUserRole();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div className="flex items-center gap-4">
        <span className="capitalize">Role: {role}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
