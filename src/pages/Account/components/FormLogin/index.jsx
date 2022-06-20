import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaLock, FaRegEye, FaRegEyeSlash, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { getListUser, userLogin } from "../../../../redux/userSlice";

FormLogin.propTypes = {};

function FormLogin() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.user.users);
  const isLogin = useSelector((state) => state.user.isLogin)

  useEffect(() => {
    if(isLogin) navigate("info")
    dispatch(getListUser());
  },[]);


  const [showPass, setShowPass] = useState(false);

  const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  const handlePasswordChange = () => {
    setShowPass(!showPass);
  };

  const formik = useFormik({
    initialValues: {
      phone: location.state == null ? "" : location.state.phone,
      password: "",
    },

    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("This field is required."),

      password: Yup.string().required("This field is required."),
    }),
    onSubmit: (values) => {
      const indexUser = users.findIndex((user) => user.phone === values.phone);
      if (indexUser < 0) {
        toast.error("The Phone or Password you entered are incorrect", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      } 
      if (values.password === users[indexUser].password) {
        toast.success(`Login Successfully!!!`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        dispatch(userLogin(users[indexUser]));
        navigate("info");
      } else {
        toast.error("The Phone or Password you entered are incorrect", {
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
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form-title">login</div>

      <div className="form-container">
        <label htmlFor="phone">Phone:</label>
        <div className="form-input">
          <FaUserAlt />
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="Phone Number"
            className="form-type"
          />
        </div>
        {formik.touched.phone && formik.errors.phone ? (
          <div className="form-error">{formik.errors.phone}</div>
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
        <div>
          Don't have an account?{" "}
          <NavLink to="signup" className="form-nav">
            Sign up
          </NavLink>
        </div>
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
