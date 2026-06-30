import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute({ children }) {
  const { user } = useSelector(
    (state) => state.auth
  );

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

export default AdminRoute;