import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  // ✅ si pas connecté, ou rôle non autorisé
  if (!isAuthenticated || (allowedRoles.length > 0 && !allowedRoles.includes(role))) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
