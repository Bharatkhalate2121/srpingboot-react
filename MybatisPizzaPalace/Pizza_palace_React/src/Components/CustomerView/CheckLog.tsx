
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ctx } from "../../Utils/FetchData";

export default function CheckLog() {
  const appContext = useContext(ctx);

  // Wait for context to load
  if (!appContext || !appContext.user) {
    return <div>Loading...</div>; // or return null;
  }

 
  if (appContext.user === null) {
    return <Navigate to="/login" replace />;
  }

 
  return <Outlet />;
}
