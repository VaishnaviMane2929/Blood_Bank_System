
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({
  children,
}) {
  const admin =
    localStorage.getItem("admin");

  return admin ? (
    children
  ) : (
    <Navigate to="/admin-login" />
  );
}

export default AdminProtectedRoute;