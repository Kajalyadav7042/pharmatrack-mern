import {
  FaCapsules,
  FaChartBar,
  FaTruck,
  FaShoppingCart,
  FaCashRegister,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { MdWorkHistory } from "react-icons/md";

import { VscOrganization } from "react-icons/vsc";



import { NavLink } from "react-router-dom";

const adminMenus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaChartBar />,
  },
  {
    name: "Medicines",
    path: "/medicines",
    icon: <FaCapsules />,
  },
  {
    name: "Vendors",
    path: "/vendors",
    icon: <FaTruck />,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <FaShoppingCart />,
  },
  {
    name: "Sales",
    path: "/sales",
    icon: <FaCashRegister />,
  },
  {
    name: "Sale History",
    path: "/sales/history",
    icon: <MdWorkHistory />,
  },
  {
    name: "Users",
    path: "/users",
    icon: <VscOrganization />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
];

const pharmacistMenus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaChartBar />,
  },
  {
    name: "Medicines",
    path: "/medicines",
    icon: <FaCapsules />,
  },
  {
    name: "Sales",
    path: "/sales",
    icon: <FaCashRegister />,
  },
  {
    name: "Sale History",
    path: "/sales/history",
    icon: <MdWorkHistory />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
];

function Sidebar() {
  const { user } = useSelector(
  (state) => state.auth
);

const dispatch = useDispatch();

const navigate = useNavigate();

const menus =
  user?.role === "admin"
    ? adminMenus
    : pharmacistMenus;
  return (
    <aside className="w-64 min-h-screen bg-blue-700 text-white flex flex-col">

      <div className="text-3xl font-bold p-6 border-b border-blue-600">

        PharmaTrack

      </div>

      <nav className="mt-6">

        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-4 transition ${
                isActive
                  ? "bg-blue-900"
                  : "hover:bg-blue-600"
              }`
            }
          >
            {menu.icon}

            {menu.name}
          </NavLink>
        ))}

      </nav>

      <div className="mt-auto p-6">

  <button
    onClick={() => {
      dispatch(logout());

      navigate("/login");
    }}
    className="flex items-center gap-3 w-full bg-red-500 hover:bg-red-600 px-4 py-3 rounded-lg"
  >

    <FaSignOutAlt />

    Logout

  </button>

</div>

    </aside>
  );
}

export default Sidebar;