import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute() {
  const { state } = useAuth();
  return <div>{state.user ? <Outlet /> : <Navigate to="/signin" />}</div>;
}

export default ProtectedRoute;
