import { useFormik } from "formik";
import React, { useState } from "react";
import { FaLock, FaRegEye, FaRegEyeSlash, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

function FormLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);

  const handlePasswordChange = () => {
    setShowPass(!showPass);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },

    validationSchema: Yup.object({
      userName: Yup.string().required("This field is required."),

      password: Yup.string().required("This field is required."),
    }),
    
    onSubmit: (values) => {
      const adminUser = import.meta.env.VITE_ADMIN;
      const adminPass = import.meta.env.VITE_PASSWORD;
      if (values.userName === adminUser && values.password === adminPass) {
        toast.success("Welcome back Admin", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        navigate("dashboard")
      }
        
      else {
        toast.error("The User Name or Password you entered are incorrect", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });

  return (
    <form className="form w-1/3" onSubmit={formik.handleSubmit}>
      <div className="form-title">login</div>

      <div className="form-container">
        <label htmlFor="userName">User name:</label>
        <div className="form-input">
          <FaUserAlt />
          <input
            type="text"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            placeholder="User Name"
            className="form-type"
          />
        </div>
        {formik.touched.userName && formik.errors.userName ? (
          <div className="form-error">{formik.errors.userName}</div>
        ) : null}
      </div>

      <div className="form-container">
        <label htmlFor="password">Password:</label>
        <div className="form-input">
          <FaLock />
          <input
            type={showPass ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
            className="form-type"
          />
          {!showPass && (
            <FaRegEye className="form-show" onClick={handlePasswordChange} />
          )}
          {showPass && (
            <FaRegEyeSlash
              className="form-show"
              onClick={handlePasswordChange}
            />
          )}
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="form-error">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="form-container">
        <button
          type="submit"
          className="form-btn rounded-full"
          style={{ backgroundColor: "#1D4ED8" }}
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default FormLogin;
