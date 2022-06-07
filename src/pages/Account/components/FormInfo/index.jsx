import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  FaLock,
  FaRegEye,
  FaRegEyeSlash,
  FaUserAlt,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { ImExit, ImHome } from "react-icons/im";
import { HiIdentification } from "react-icons/hi";
import { NavLink, useLocation } from "react-router-dom";
import * as Yup from "yup";
FormInfo.propTypes = {};

function FormInfo(props) {
  const user = useSelector((state) => state.user.user);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showChange, setShowChange] = useState(false);

  //   const location = useLocation();

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleChangePassword = () => {
    setShowChange(!showChange);

    const NEW_PASS = document.getElementById("new-pass");
    const CONFIRM_PASS = document.getElementById("confirm-pass");

    if (showChange) {
      NEW_PASS.classList.remove("hidden");
      CONFIRM_PASS.classList.remove("hidden");
    } else {
      NEW_PASS.classList.add("hidden");
      CONFIRM_PASS.classList.add("hidden");
    }
  };

  const formik = useFormik({
    initialValues: {
      phone: user.phone,
      password: user.password,
      newPassword: "",
      confirmPassword: "",
      name: "",
      address: "",
    },

    validationSchema: Yup.object({
      phone: Yup.string(),

      password: Yup.string(),

      newPassword: Yup.string().when("showChange", {
        is: showChange,
        then: Yup.string().required("This field is required."),
        otherwise: Yup.string(),
      }),

      confirmPassword: Yup.string().when("showChange", {
        is: showChange,
        then: Yup.string().required("This field is required."),
        otherwise: Yup.string(),
      }),

      name: Yup.string().required("This field is required."),

      address: Yup.string().required("This field is required."),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form-title">
        hello,{" "}
        <span className="underline text-red-600">
          {user.name || user.phone}
        </span>{" "}
        !!
      </div>

      <div className="form-container">
        <label htmlFor="phone">Phone:</label>
        <div className="form-input">
          <FaUserAlt />
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            placeholder="Phone Number"
            className="form-read"
            readOnly
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
            placeholder="Password"
            className="form-read"
            readOnly
          />

          <FaEdit
            className="text-2xl cursor-pointer hover:opacity-50"
            onClick={handleChangePassword}
          />

          {!showPass && (
            <FaRegEye className="form-show" onClick={handleShowPassword} />
          )}
          {showPass && (
            <FaRegEyeSlash className="form-show" onClick={handleShowPassword} />
          )}
        </div>
      </div>

      <div id="new-pass" className="form-container hidden">
        <label htmlFor="newPassword">New Password:</label>
        <div className="form-input">
          <RiLockPasswordFill className="text-xl" />
          <input
            type={showNewPass ? "text" : "password"}
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            placeholder="New Password"
            className="form-type"
          />

          {!showNewPass && (
            <FaRegEye
              className="form-show"
              onClick={() => setShowNewPass(!showNewPass)}
            />
          )}
          {showNewPass && (
            <FaRegEyeSlash
              className="form-show"
              onClick={() => setShowNewPass(!showNewPass)}
            />
          )}
        </div>
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div className="form-error">{formik.errors.newPassword}</div>
        ) : null}
      </div>

      <div id="confirm-pass" className="form-container hidden">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <div className="form-input">
          <RiLockPasswordFill className="text-xl" />
          <input
            type={showConfirmPass ? "text" : "password"}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder="Confirm Password"
            className="form-type"
          />

          {!showConfirmPass && (
            <FaRegEye
              className="form-show"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            />
          )}
          {showConfirmPass && (
            <FaRegEyeSlash
              className="form-show"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            />
          )}
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="form-error">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>

      <div className="form-container">
        <label htmlFor="name">Name:</label>
        <div className="form-input">
          <HiIdentification className="text-xl" />
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="What's your name ?"
            className="form-type"
          />
        </div>

        {formik.touched.name && formik.errors.name ? (
          <div className="form-error">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="form-container">
        <label htmlFor="address">Address:</label>
        <div className="form-input">
          <ImHome className="text-xl" />
          <textarea
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            placeholder="What's your address ?"
            className="form-type"
          />
        </div>
        {formik.touched.address && formik.errors.address ? (
          <div className="form-error">{formik.errors.address}</div>
        ) : null}
      </div>

      <div className="form-container flex-row items-center justify-evenly">
        <NavLink to="" className="form-btn flex items-center gap-2 bg-red-600">
          <ImExit />
          Sign Out
        </NavLink>

        <button
          id="btn-save"
          type="submit"
          className="py-2 px-4 rounded-md text-white font-bold flex items-center gap-2 hover:opacity-50"
          style={{ backgroundColor: "#1D4ED8" }}
        >
          <FaSave />
          Save
        </button>
      </div>
    </form>
  );
}

export default FormInfo;
