import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import {
  FaEdit,
  FaLock,
  FaRegEye,
  FaRegEyeSlash,
  FaSave,
  FaUserAlt,
} from "react-icons/fa";
import { HiIdentification } from "react-icons/hi";
import { ImExit, ImHome } from "react-icons/im";
import { RiLockPasswordFill } from "react-icons/ri";
import { GoListUnordered } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { signOutUser, updateUser } from "../../../../redux/userSlice";
import { toast } from "react-toastify";

function FormInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const WRONG = `text-red-600`;
  const VALID = `text-green-600`;
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleSignOut = () => {
    if (window.confirm("Do you want to sign out ?") === true) {
      navigate("");
      dispatch(signOutUser());
      toast.success(`Sign Out Successfully !!!`, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleHistory = () => {
    navigate('order')
  }

  const handleCheckPass = () => {
    const FORM_REQUIRED = document.getElementById("form-required");
    FORM_REQUIRED.classList.remove("hidden");
  };

  const handleOnBlur = () => {
    const FORM_REQUIRED = document.getElementById("form-required");
    FORM_REQUIRED.classList.add("hidden");
  };

  const checkPassLength = (value, flag, element) => {
    if (value.length >= 8) {
      flag = true;
      element.classList.remove(`${WRONG}`);
      element.classList.add(`${VALID}`);
    } else {
      flag = false;
      element.classList.remove(`${VALID}`);
      element.classList.add(`${WRONG}`);
    }
    return flag;
  };

  const checkPassLetter = (value, flag, element) => {
    if (value.toLowerCase() == value) {
      flag = false;
      element.classList.add(`${WRONG}`);
      element.classList.remove(`${VALID}`);
    } else {
      flag = true;
      element.classList.remove(`${WRONG}`);
      element.classList.add(`${VALID}`);
    }
    return flag;
  };

  const checkPassNumber = (value, flag, element) => {
    const stringCompare = "0123456789";

    for (let i of stringCompare) {
      if (value.includes(i)) flag = true;
    }

    if (flag === true) {
      element.classList.remove(`${WRONG}`);
      element.classList.add(`${VALID}`);
    } else {
      element.classList.add(`${WRONG}`);
      element.classList.remove(`${VALID}`);
    }
    return flag;
  };

  const checkPassSpecial = (value, flag, element) => {
    const stringCompare = "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?`~";

    for (let i of stringCompare) {
      if (value.includes(i)) flag = true;
    }

    if (flag === true) {
      element.classList.add(`${VALID}`);
      element.classList.remove(`${WRONG}`);
    } else {
      element.classList.add(`${WRONG}`);
      element.classList.remove(`${VALID}`);
    }
    return flag;
  };

  const handleOnChange = (e) => {
    formik.setFieldValue("newPassword", e.target.value);

    const FORM_REQUIRED = document.getElementById("form-required");
    const PASS_LENGTH = document.getElementById("pass-length");
    const PASS_LETTER = document.getElementById("pass-letter");
    const PASS_NUMBER = document.getElementById("pass-number");
    const PASS_SPECIAL = document.getElementById("pass-special");
    const PASS_VALID = document.getElementById("pass-valid");

    let lengthCheck = false;
    let letterCheck = false;
    let numberCheck = false;
    let specialCheck = false;

    lengthCheck = checkPassLength(e.target.value, lengthCheck, PASS_LENGTH);
    letterCheck = checkPassLetter(e.target.value, letterCheck, PASS_LETTER);
    numberCheck = checkPassNumber(e.target.value, numberCheck, PASS_NUMBER);
    specialCheck = checkPassSpecial(e.target.value, specialCheck, PASS_SPECIAL);

    if (
      lengthCheck === true &&
      letterCheck === true &&
      numberCheck === true &&
      specialCheck === true
    ) {
      console.log('go here')
      PASS_VALID.classList.remove("hidden");

      FORM_REQUIRED.classList.remove(`bg-red-600/40`);
      FORM_REQUIRED.classList.add(`bg-green-600/40`);
    } else {
      PASS_VALID.classList.add("hidden");

      FORM_REQUIRED.classList.add(`bg-red-600/40`);
      FORM_REQUIRED.classList.remove(`bg-green-600/40`);
    }
  };

  const formik = useFormik({
    initialValues: {
      phone: user.phone,
      password: user.password,
      newPassword: "",
      confirmPassword: "",
      name: user.name ? user.name : "",
      address: user.address ? user.address : "",
      showChange: false,
    },

    validationSchema: Yup.object({
      phone: Yup.string(),

      password: Yup.string(),

      showChange: Yup.boolean(),

      newPassword: Yup.string().when("showChange", {
        is: true,
        then: Yup.string()
          .matches(
            strongRegex,
            "Your password must be at least 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
          )
          .required("This field is required."),
      }),

      confirmPassword: Yup.string().when("showChange", {
        is: true,
        then: Yup.string()
          .oneOf([Yup.ref("newPassword")], "Password doesn't match")
          .required("This field is required."),
      }),

      name: Yup.string(),

      address: Yup.string().required("This field is required."),
    }),
    onSubmit: (values) => {
      if(values.name === user.name && values.address === user.address && !formik.values.showChange) {
        toast.error(`Data isn't changed`, {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      }

      const formChange = {
        phone: values.phone,
        password: values.password,
        newPassword: values.newPassword,
        name: values.name,
        address: values.address,
      };

      dispatch(updateUser(formChange));

      if (formik.values.showChange) {
        formik.setFieldValue("password", formik.values.newPassword);
        formik.setFieldValue("showChange", false);
        formik.setFieldValue("newPassword", "");
        formik.setFieldValue("confirmPassword", "");
      }
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
            value={formik.values.showChange}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onClick={() => {
              formik.setFieldValue("showChange", !formik.values.showChange);
              if (!formik.values.showChange) {
                formik.setFieldValue("newPassword", "");
                formik.setFieldValue("confirmPassword", "");
              }
            }}
          />

          {!showPass && (
            <FaRegEye className="form-show" onClick={handleShowPassword} />
          )}
          {showPass && (
            <FaRegEyeSlash className="form-show" onClick={handleShowPassword} />
          )}
        </div>
      </div>

      {formik.values.showChange && (
        <>
          <div id="new-pass" className="form-container">
            <label htmlFor="newPassword">New Password:</label>

            <div className="form-input relative">
              <div
                id="form-required"
                className="hidden bg-red-600/40"
                style={{ right: "4rem" }}
              >
                <div className="flex flex-col gap-0">
                  Password security requirements:
                  <div
                    id="pass-length"
                    className="text-red-600 form-required-item"
                  >
                    <AiOutlineCheckCircle />
                    use at least 8 characters
                  </div>
                  <div
                    id="pass-number"
                    className="text-red-600 form-required-item"
                  >
                    <AiOutlineCheckCircle />
                    mix letters and numbers
                  </div>
                  <div
                    id="pass-letter"
                    className="text-red-600 form-required-item"
                  >
                    <AiOutlineCheckCircle />
                    mix lower and uppercase
                  </div>
                  <div
                    id="pass-special"
                    className="text-red-600 form-required-item"
                  >
                    <AiOutlineCheckCircle />
                    use special characters (e.g. @)
                  </div>
                </div>
              </div>

              <RiLockPasswordFill className="text-xl" />

              <input
                type={showNewPass ? "text" : "password"}
                name="newPassword"
                value={formik.values.newPassword}
                onChange={(e) => handleOnChange(e)}
                onFocus={() => handleCheckPass()}
                onBlur={() => handleOnBlur()}
                placeholder="New Password"
                className="form-type"
              />

              <AiFillCheckCircle
                id="pass-valid"
                className="hidden text-green-700 text-2xl"
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

          <div id="confirm-pass" className="form-container">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="form-input">
              <RiLockPasswordFill className="text-xl" />
              <input
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
        </>
      )}

      <div className="form-container">
        <label htmlFor="name">Name:</label>
        <div className="form-input">
          <HiIdentification className="text-xl" />
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
            placeholder="What's your address ?"
            className="form-type"
          />
        </div>
        {formik.touched.address && formik.errors.address ? (
          <div className="form-error">{formik.errors.address}</div>
        ) : null}
      </div>

      <div className="form-container flex-row items-center justify-evenly">
        <div
          className="form-btn flex items-center gap-2 bg-red-600 cursor-pointer"
          onClick={handleSignOut}
        >
          <ImExit />
          Sign Out
        </div>

        <div
          className="form-btn flex items-center gap-2 bg-green-600 cursor-pointer"
          onClick={handleHistory}
        >
          <GoListUnordered />
          Order History
        </div>

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
