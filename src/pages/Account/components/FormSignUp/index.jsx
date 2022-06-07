import { useFormik } from "formik";
import React, { useState } from "react";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FaLock, FaRegEye, FaRegEyeSlash, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { createUser } from "../../../../redux/userSlice";

FormSignUp.propTypes = {};

function FormSignUp() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const navigate = useNavigate();

  const WRONG = "text-red-600";
  const VALID = "text-green-600";

  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  const handlePasswordChange = () => {
    setShowPass(!showPass);
  };

  const handlePasswordConfirmChange = () => {
    setShowPassConfirm(!showPassConfirm);
  };

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
    formik.setFieldValue("password", e.target.value);

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
      PASS_VALID.classList.remove("hidden");

      FORM_REQUIRED.classList.remove(`bg-red-600/40`);
      FORM_REQUIRED.classList.add(`bg-green-600/40`);
    } else {
      PASS_VALID.classList.add("hidden");

      FORM_REQUIRED.classList.add(`bg-red-600/40`);
      FORM_REQUIRED.classList.remove(`bg-green-600/40`);
    }
  };

  /*
    (?=.*[a-z]): 1 lowercase
    (?=.*[A-Z]): 1 uppercase
    (?=.*[0-9]): 1 number
    (?=.[!@#$%^&]): 1 special
    (?=.{8,}): at least 8 characters or longer
  */
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("This field is required."),

      password: Yup.string()
        .matches(
          strongRegex,
          "Your password must be at least 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
        )
        .required("This field is required."),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password doesn't match")
        .required("This field is required."),
    }),

    onSubmit: (values) => {
      let isExist = false;
      users.map((user) => {
        if (user.phone === values.phone) {
          isExist = true;
        }
      });

      const formSignUp = {
        phone: values.phone,
        password: values.password,
        address: "",
      };

      if (isExist) {
        toast.error("Phone number already exists", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success(`Create Successfully!!!`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        dispatch(createUser(formSignUp));
        navigate("", {state: formSignUp});
      }
    },
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form-title">Sign-up</div>

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

        <div className="form-input  relative">
          <div id="form-required" className="hidden bg-red-600/40">
            <div className="flex flex-col gap-0">
              Password security requirements:
              <div id="pass-length" className="text-red-600 form-required-item">
                <AiOutlineCheckCircle />
                use at least 8 characters
              </div>
              <div id="pass-number" className="text-red-600 form-required-item">
                <AiOutlineCheckCircle />
                mix letters and numbers
              </div>
              <div id="pass-letter" className="text-red-600 form-required-item">
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

          <FaLock />

          <input
            type={showPass ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={(e) => handleOnChange(e)}
            placeholder="Password"
            className="form-type"
            onFocus={() => handleCheckPass()}
            onBlur={() => handleOnBlur()}
          />
          <AiFillCheckCircle
            id="pass-valid"
            className="hidden text-green-700 text-2xl"
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
        <label htmlFor="password">Confirm Password:</label>
        <div className="form-input">
          <FaLock />
          <input
            type={showPassConfirm ? "text" : "password"}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder="Confirm Password"
            className="form-type"
          />
          {!showPassConfirm && (
            <FaRegEye
              className="form-show"
              onClick={handlePasswordConfirmChange}
            />
          )}
          {showPassConfirm && (
            <FaRegEyeSlash
              className="form-show"
              onClick={handlePasswordConfirmChange}
            />
          )}
        </div>

        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="form-error">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>

      <div className="form-container">
        <div>
          Already have an account?{" "}
          <NavLink to="" className="form-nav">
            Log in
          </NavLink>
        </div>
      </div>

      <div className="form-container">
        <button
          type="submit"
          className="form-btn rounded-full"
          style={{ backgroundColor: "#34a853" }}
        >
          Create Account
        </button>
      </div>
    </form>
  );
}

export default FormSignUp;
