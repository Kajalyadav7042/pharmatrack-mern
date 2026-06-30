import { useSelector } from "react-redux";

import AdminDashboard from "./dashboard/AdminDashboard";
import PharmacistDashboard from "./dashboard/PharmacistDashboard";

function Dashboard() {

  const { user } = useSelector(
    (state) => state.auth
  );

  return user?.role === "admin"
    ? <AdminDashboard />
    : <PharmacistDashboard />;
}

export default Dashboard;