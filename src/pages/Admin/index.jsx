import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaLock, FaRegEye, FaRegEyeSlash, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import DashBoard from "./components/DashBoard";
import FormLogin from "./components/FormLogin";

function Admin() {

    const location = useLocation()
    const {adminTask} = useParams()
    console.log(adminTask)
  return (
    <div className={`w-full ${location.pathname !== "/admin" ? "h-auto" : "h-screen"} flex justify-center items-center`}>
        {location.pathname === "/admin" && <FormLogin />}
        {location.pathname === `/admin/${adminTask}` && <DashBoard/>}
        <ToastContainer newestOnTop />
    </div>
  );
}

export default Admin;
