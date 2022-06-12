import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Checkout from "./components/Checkout";
import FormInfo from "./components/FormInfo";
import FormLogin from "./components/FormLogin";
import FormSignUp from "./components/FormSignUp";
import History from "./components/History";

function Account() {
  const location = useLocation();

  const {orderId} = useParams();

  return (
    <div className="account-container">
      {location.pathname === "/account" && <FormLogin />}

      {location.pathname === "/account/signup" && <FormSignUp />}

      {location.pathname === "/account/info" && <FormInfo />}

      {location.pathname === "/account/order" && <History />}

      {location.pathname === `/account/order/${orderId}` && <Checkout />}
      <ToastContainer newestOnTop/>
    </div>
  );
}

export default Account;
