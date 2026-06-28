import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-semibold">

        Pharmacy Inventory System

      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
      >
        Logout
      </button>

    </header>
  );
}

export default Navbar;