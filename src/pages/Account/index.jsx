import React from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FormInfo from "./components/FormInfo";
import FormLogin from "./components/FormLogin";
import FormSignUp from "./components/FormSignUp";


function Account() {
  const location = useLocation();

  return (
    <div className="account-container">
      {location.pathname === "/account" && <FormLogin />}

      {location.pathname === "/account/signup" && <FormSignUp />}

      {location.pathname === "/account/info" && <FormInfo />}

      <ToastContainer />
    </div>
  );
}

export default Account;
