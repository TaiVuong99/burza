import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";

UserList.propTypes = {
  show: PropTypes.string,
  onEditSubmit: PropTypes.func,
  onRemove: PropTypes.func,
  onAddNew: PropTypes.func,
};

UserList.defaultProps = {
  show: "5",
  onEditSubmit: null,
  onRemove: null,
  onAddNew: null,
};

function UserList(props) {
  const { show, onEditSubmit, onRemove, onAddNew } = props;

  const users = useSelector((state) => state.user.users);

  const [editIndex, setEditIndex] = useState(-1);
  const [addNew, setAddNew] = useState(false);
  const [getNewUserId, setGetNewUserId] = useState(null);

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      phone: editIndex > -1 ? users[editIndex].phone : "",
      password: editIndex > -1 ? users[editIndex].password : "",
      userId:
        editIndex > -1
          ? users[editIndex].userId
          : getNewUserId
          ? getNewUserId
          : "",
      address: editIndex > -1 ? users[editIndex].address : "",
      name: editIndex > -1 ? users[editIndex].name : "",
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

      userId: Yup.string(),
      address: Yup.string(),
      name: Yup.string(),
    }),

    onSubmit: (values) => {
      if (addNew) {
        let isExist = false;
        users.map((user) => {
          if (user.phone === values.phone) {
            isExist = true;
          }
        });

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
          return;
        } else {
          if (onAddNew) {
            toast.success(`Create Successfully!!!`, {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            onAddNew(values);
            handleCancelAddClick()

          }
        }
      }
      //     if (values.cateName === cate[editIndex].cateName) {
      //     toast.error("Data isn't changed", {
      //       position: "bottom-right",
      //       autoClose: 2000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //     return;
      //   }

      //     const formUpdate = {
      //       ...cate[editIndex],
      //       ...values,
      //     };

      //     if (onEditSubmit) {
      //       onEditSubmit(formUpdate);
      //       setEditIndex(-1);
      //     }
      //   }
    },
  });

  const handleEditClick = (index) => {
    setEditIndex(index);
    setAddNew(false);
  };

  const handleCancelEditClick = () => {
    formik.setFieldValue("phone", users[editIndex].phone);
    formik.setFieldValue("password", users[editIndex].password);
    formik.setFieldValue("userId", users[editIndex].userId);
    formik.setFieldValue("name", users[editIndex].name);
    formik.setFieldValue("address", users[editIndex].address);
    setEditIndex(-1);
  };

  const handleCancelAddClick = () => {
    setAddNew(false);
    formik.setFieldValue("phone", "");
    formik.setFieldValue("password", "");
    formik.setFieldValue("userId", "");
    formik.setFieldValue("name", "");
    formik.setFieldValue("address", "");
    setGetNewUserId(null);
  };

  const handleRemoveClick = (user) => {
    if (window.confirm(`Do you want to remove "${user.phone}"`)) {
      if (onRemove) onRemove(user);
    }
  };

  const handleAddNew = () => {
    setAddNew(true);
    setEditIndex(-1);
  };

  const handleNewId = () => {
    setGetNewUserId(uuid().split("-")[0]);
    formik.setFieldValue("phone", formik.values.phone);
    formik.setFieldValue("password", formik.values.password);
    formik.setFieldValue("userId", getNewUserId);
  };

  return (
    <ul className="admin-list">
      <div className="admin-items">
        <div className="col-span-1 py-1 border-r-2 admin-title">#</div>
        <div className="col-span-2 border-r-2 admin-title">Phone</div>
        <div className="col-span-2 border-r-2 admin-title">Password</div>
        <div className="col-span-2 border-r-2 admin-title">User Id</div>
        <div className="col-span-1 border-r-2 admin-title">Name</div>
        <div className="col-span-2 border-r-2 admin-title">Address</div>
        <div className="col-span-2 admin-title">Action</div>
      </div>

      {users.map((item, index) => (
        <>
          {index < show && (
            <>
              {index === editIndex ? (
                <form onSubmit={formik.handleSubmit}>
                  <li className="admin-items border-t-2" key={item.id}>
                    <div className="col-span-1 py-1 border-r-2 flex items-center justify-center">
                      {item.id}
                    </div>

                    <div className="col-span-2 border-r-2 flex flex-col justify-center px-2">
                      <input
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        className="w-full border-[1px] cursor-not-allowed"
                        readOnly
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="form-error">{formik.errors.phone}</div>
                      ) : null}
                    </div>

                    <div className="col-span-2 border-r-2 flex flex-col justify-center px-2">
                      <input
                        type="text"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className="w-full border-[1px]"
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="form-error">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-span-2 border-r-2 flex flex-col justify-center px-2">
                      <div name="userId" value={formik.values.userId}>
                        {item.userId}
                      </div>
                    </div>

                    <div className="col-span-1 border-r-2 flex flex-col justify-center px-2">
                      <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className="w-full border-[1px]"
                      />
                    </div>

                    <div className="col-span-2 border-r-2 flex flex-col justify-center px-2">
                      <textarea
                        type="text"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        className="w-full border-[1px]"
                      />
                    </div>

                    <div className="col-span-2 flex justify-evenly items-center">
                      <div
                        className="cursor-pointer hover:underline hover:font-bold"
                        onClick={handleCancelEditClick}
                      >
                        Cancel
                      </div>

                      <button
                        type="submit"
                        className="text-green-600 hover:underline hover:font-bold"
                      >
                        Save
                      </button>
                    </div>
                  </li>
                </form>
              ) : (
                <li className="admin-items border-t-2" key={item.id}>
                  <div className="col-span-1 py-1 border-r-2 flex items-center justify-center">
                    {item.id}
                  </div>

                  <div className="col-span-2 border-r-2 selection:pl-2 flex items-center justify-center">
                    {item.phone}
                  </div>

                  <div className="col-span-2 border-r-2 selection:pl-2 flex items-center justify-center">
                    {item.password}
                  </div>

                  <div className="col-span-2 border-r-2 selection:pl-2 flex items-center justify-center">
                    {item.userId}
                  </div>

                  <div className="col-span-1 border-r-2 selection:pl-2 flex items-center justify-center">
                    {item.name}
                  </div>

                  <div className="col-span-2 border-r-2 selection:pl-2 flex items-center justify-center">
                    {item.address}
                  </div>

                  <div className="col-span-2 flex justify-evenly items-center">
                    <button
                      className="hover:underline  hover:font-bold text-primary"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:underline  hover:font-bold text-redd"
                      onClick={() => handleRemoveClick(item)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              )}
            </>
          )}
        </>
      ))}

      {addNew ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="admin-items border-t-2">
            <div className="col-span-1 py-1 border-r-2 flex items-center justify-center">
              {users[users.length - 1].id + 1}
            </div>

            <div className="col-span-2 border-r-2 flex flex-col justify-center px-2">
              <input
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                className="w-full border-[1px]"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="form-error">{formik.errors.phone}</div>
              ) : null}
            </div>

            <div className="col-span-2 border-r-2 flex flex-col justify-center px-2">
              <input
                type="text"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-full border-[1px]"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="form-error">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="col-span-2 border-r-2 flex justify-center items-center px-2">
              {getNewUserId ? (
                <div>{getNewUserId}</div>
              ) : (
                <button
                  onClick={handleNewId}
                  className="py-1 px-2 bg-green-600 rounded-md text-white my-1 hover:opacity-50"
                >
                  Get New
                </button>
              )}
            </div>

            <div className="col-span-1 border-r-2 flex flex-col justify-center px-2">
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full border-[1px]"
              />
            </div>

            <div className="col-span-2 border-r-2 flex flex-col justify-center px-2">
              <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                className="w-full border-[1px]"
              />
            </div>

            <div className="col-span-2 flex justify-evenly items-center">
              <div
                className="cursor-pointer hover:underline hover:font-bold"
                onClick={handleCancelAddClick}
              >
                Cancel
              </div>

              <button
                type="submit"
                className="text-green-600 hover:underline hover:font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="admin-items border-t-2">
          <div
            className="col-span-1 py-1 border-r-2 flex items-center justify-center cursor-pointer hover:text-green-600"
            onClick={handleAddNew}
          >
            <MdAddCircleOutline />
          </div>
        </div>
      )}
    </ul>
  );
}

export default UserList;
