import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUserAlt, FaLock } from "react-icons/fa";

FormLogin.propTypes = {};

function FormLogin(props) {
  const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(phoneRegExp, "* Phone number is not valid")
        .required("* required"),

      password: Yup.string().required("* required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form className="form-login" onSubmit={formik.handleSubmit}>
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
            placeholder="Type your phone number"
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
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Type your password"
            className="form-type"
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="form-error">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="form-btn">
        <div className="btn-sign">Sign-up</div>

            
        <button type="submit" className="btn-login" style={{ backgroundColor: "#1D4ED8" }}>Login</button>
      </div>
    </form>
  );
}

export default FormLogin;
