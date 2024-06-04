import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "@auth/cookie";
import { useAuth } from "@auth/AuthContext";

export const ProtectedRoute: React.FC = () => {
  const cookieValue = getCookie("site");

  if (!cookieValue) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const ProtectedRouteByRoot: React.FC = () => {
  const cookieValue = getCookie("site");
  const {user} = useAuth();

  if (!cookieValue || !user?.is_superadmin) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
