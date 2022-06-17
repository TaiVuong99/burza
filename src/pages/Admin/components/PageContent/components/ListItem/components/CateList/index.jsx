import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

CateList.propTypes = {
  show: PropTypes.string,
  onEditSubmit: PropTypes.func,
  onRemove: PropTypes.func,
  onAddNew: PropTypes.func,
};

CateList.defaultProps = {
  show: "5",
  onEditSubmit: null,
  onRemove: null,
  onAddNew: null,
};

function CateList(props) {
  const { show, onEditSubmit, onRemove, onAddNew } = props;

  const products = useSelector((state) => state.products);
  const cate = useSelector((state) => state.cate);

  const productCate = products.map((product) => ({
    ...product,
    cateName: cate.find((item) => item.cateId === product.cateId).cateName,
  }))

  const [editIndex, setEditIndex] = useState(-1);
  const [addNew, setAddNew] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      cateName: editIndex > -1 ? cate[editIndex].cateName : "",
    },

    validationSchema: Yup.object({
      cateName: Yup.string().required("This field is required."),
    }),

    onSubmit: (values) => {
      if (addNew) {
        if (onAddNew) {
          const form = {
            cateId: cate[cate.length - 1].id + 1,
            cateName: values.cateName,
          };
          onAddNew(form);
          setAddNew(false);
        }
      } else {
        if (values.cateName === cate[editIndex].cateName) {
          toast.error("Data isn't changed", {
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

        const formUpdate = {
          ...cate[editIndex],
          ...values,
        };

        if (onEditSubmit) {
          onEditSubmit(formUpdate);
          setEditIndex(-1);
        }
      }
    },
  });

  const handleEditClick = (index) => {
    setEditIndex(index);
    setAddNew(false);
  };

  const handleCancelEditClick = () => {
    formik.setFieldValue("cateName", cate[editIndex].cateName);
    setEditIndex(-1);
  };

  const handleCancelAddClick = () => {
    setAddNew(false);
    formik.setFieldValue("cateName", "");
  };

  const handleRemoveClick = (cate) => {
    const number = numberOfProduct(cate.id);
    if (number !== 0) {
      toast.error("You just can remove empty category !?", {
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
      if (window.confirm(`Do you want to remove "${cate.cateName}"`)) {
        if (onRemove) onRemove(cate);
      }
    }
  };

  const handleAddNew = () => {
    setAddNew(true);
    setEditIndex(-1);
  };

  const numberOfProduct = (cateId) => {
    let number = productCate.filter((product) => product.cateId === cateId).length;
    return number;
  };

  return (
    <ul className="admin-list">
      <div className="admin-items">
        <div className="col-span-1 py-1 border-r-2 admin-title">#</div>

        <div className="col-span-4 border-r-2 admin-title">Category Name</div>

        <div className="col-span-3 border-r-2 admin-title">
          Number of Products
        </div>

        <div className="col-span-4 admin-title">Action</div>
      </div>

      {cate.map((item, index) => (
        <>
          {index < show && (
            <>
              {index === editIndex ? (
                <form onSubmit={formik.handleSubmit}>
                  <li className="admin-items border-t-2" key={item.id}>
                    <div className="col-span-1 py-1 border-r-2 flex items-center justify-center">
                      {item.id}
                    </div>

                    <div className="col-span-4 border-r-2 flex flex-col justify-center px-2">
                      <input
                        type="text"
                        name="cateName"
                        value={formik.values.cateName}
                        onChange={formik.handleChange}
                        className="w-full border-[1px]"
                      />
                      {formik.touched.cateName && formik.errors.cateName ? (
                        <div className="form-error">
                          {formik.errors.cateName}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-span-3 border-r-2 pl-2 flex items-center justify-center">
                      {numberOfProduct(item.cateId)}
                    </div>

                    <div className="col-span-4 flex justify-evenly items-center">
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

                  <div className="col-span-4 border-r-2 selection:pl-2 flex items-center justify-center">
                    {item.cateName}
                  </div>

                  <div className="col-span-3 border-r-2 pl-2 flex items-center justify-center">
                    {numberOfProduct(item.cateId)}
                  </div>

                  <div className="col-span-4 flex justify-evenly items-center">
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
              {cate[cate.length - 1].id + 1}
            </div>

            <div className="col-span-4 border-r-2 flex flex-col justify-center px-2">
              <input
                type="text"
                name="cateName"
                value={formik.values.cateName}
                onChange={formik.handleChange}
                className="w-full border-[1px]"
              />
              {formik.touched.cateName && formik.errors.cateName ? (
                <div className="form-error">{formik.errors.cateName}</div>
              ) : null}
            </div>

            <div className="col-span-3 border-r-2 pl-2 flex items-center justify-center">
              0
            </div>

            <div className="col-span-4 flex justify-evenly items-center">
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

export default CateList;
