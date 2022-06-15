import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DashBoard from "./components/DashBoard";
import FormLogin from "./components/FormLogin";

function Admin() {
  const location = useLocation();
  const { adminTask } = useParams();

  return (
    <div
      className={`w-full ${
        location.pathname !== "/admin" ? "h-auto" : "h-screen"
      } flex justify-center items-center`}
    >
      {location.pathname === "/admin" && <FormLogin />}
      {location.pathname === `/admin/${adminTask}` && <DashBoard />}
      <ToastContainer newestOnTop />
    </div>
  );
}

export default Admin;
