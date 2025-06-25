import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ctx } from "../../Utils/FetchData";

export default function Admin() {
  const appContext = useContext(ctx);

  // Wait for context to load
  if (!appContext || !appContext.user) {
    return <div>Loading...</div>; // or return null;
  }

  // If not admin, redirect
  if (appContext.user.type !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // If admin, show nested routes
  return <Outlet />;
}
