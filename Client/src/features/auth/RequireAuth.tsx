import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";

interface RequireAuthProps {
  allowedRoles?: string[];
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  // 1. If not logged in at all, send them to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If logged in but doesn't have the required role, send to unauthorized/home
  // (Assuming your user object looks like: { username: "...", role: "Teacher" })
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // 3. If everything passes, render the child routes via <Outlet />
  return <Outlet />;
};

export default RequireAuth;