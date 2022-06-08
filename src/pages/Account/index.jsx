import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getListUser } from "../../redux/userSlice";
import FormInfo from "./components/FormInfo";
import FormLogin from "./components/FormLogin";
import FormSignUp from "./components/FormSignUp";


function Account() {
  const location = useLocation();
  // const navigate = useNavigate();

  // const user = useSelector((state) => state.user.user);

  // if(user) {
  //   navigate("/account/info")
  // }
  // const dispatch = useDispatch()
  // const users = useSelector(state => state.user.users)

  // useEffect(() => {
  //   dispatch(getListUser())
  // }, [])

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
