import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export const ProtectedRoutes = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/"></Navigate>;
  }
  const user = jwtDecode(token);
  if (allowedRole && allowedRole !== user.role) {
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/cashier"}></Navigate>
    );
  }

  return children;
};
