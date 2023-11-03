import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./components/Loader";


function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if(isLoading) return <Loader />
  else if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
