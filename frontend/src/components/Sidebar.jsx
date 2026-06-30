import {
  FaCapsules,
  FaChartBar,
  FaTruck,
  FaShoppingCart,
  FaCashRegister,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { MdWorkHistory } from "react-icons/md";

import { VscOrganization } from "react-icons/vsc";



import { NavLink } from "react-router-dom";

const menus = [
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
    icon: <VscOrganization />
,
  },
  
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },

];

function Sidebar() {
  return (
    <aside className="w-64 bg-blue-700 text-white">

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

    </aside>
  );
}

export default Sidebar;