import { Navigate } from "react-router-dom";

function UserProtectedRoute({
  children,
}) {
  const token =
    localStorage.getItem("token");

  return token ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default UserProtectedRoute;