import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

ProductList.propTypes = {
  show: PropTypes.string,
  onEditSubmit: PropTypes.func,
  onRemove: PropTypes.func,
  onAddNew: PropTypes.func,
};

ProductList.defaultProps = {
  show: "5",
  onEditSubmit: null,
  onRemove: null,
  onAddNew: null,
};

function ProductList(props) {
  const { show, onEditSubmit, onRemove, onAddNew } = props;

  const products = useSelector((state) => state.products);
  const cate = useSelector((state) => state.cate);

  const productCate = products.map((product) => ({
    ...product,
    cateName: cate.find((item) => item.cateId === product.cateId).cateName,
  }));

  const [editIndex, setEditIndex] = useState(-1);
  const [addNew, setAddNew] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: editIndex > -1 ? productCate[editIndex].productName : "",
      cateId: editIndex > -1 ? productCate[editIndex].cateId : 1,
      price: editIndex > -1 ? productCate[editIndex].price : "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("This field is required."),

      cateId: Yup.number(),

      price: Yup.number().required("This field is required."),
    }),

    onSubmit: (values) => {
      if (addNew) {
        if (onAddNew) {
          onAddNew(values);
          setAddNew(false);
        }
      } else {
        if (
          values.productName === productCate[editIndex].productName &&
          values.cateId === productCate[editIndex].cateId &&
          values.price === productCate[editIndex].price
        ) {
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
          ...products[editIndex],
          ...values,
          cateId: +values.cateId,
          price: +values.price,
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
    formik.setFieldValue("productName", productCate[editIndex].productName);
    formik.setFieldValue("cateId", productCate[editIndex].cateName);
    formik.setFieldValue("price", productCate[editIndex].price);
    setEditIndex(-1);
  };

  const handleCancelAddClick = () => {
    setAddNew(false);
    formik.setFieldValue("productName", "");
    formik.setFieldValue("cateId", 1);
    formik.setFieldValue("price", "");
  };

  const handleRemoveClick = (product) => {
    if (window.confirm(`Do you want to remove "${product.productName}"`)) {
      if (onRemove) onRemove(product);
    }
  };

  const handleChange = (e) => {
    formik.setFieldValue("cateId", e.target.value);
  };

  const handleAddNew = () => {
    setAddNew(true);
    setEditIndex(-1);
  };

  return (
    <ul className="admin-list">
      <div className="admin-items">
        <div className="col-span-1 py-1 border-r-2 admin-title">#</div>

        <div className="col-span-3 border-r-2 admin-title">Product Name</div>

        <div className="col-span-3 border-r-2 admin-title">Category</div>

        <div className="col-span-2 border-r-2 admin-title">Price</div>

        <div className="col-span-3 admin-title">Action</div>
      </div>

      {productCate.map((product, index) => (
        <>
          {index < show && (
            <>
              {index === editIndex ? (
                <form onSubmit={formik.handleSubmit}>
                  <li className="admin-items border-t-2" key={product.id}>
                    <div className="col-span-1 py-1 border-r-2 flex items-center justify-center">
                      {product.id}
                    </div>

                    <div className="col-span-3 border-r-2 flex flex-col justify-center px-2">
                      <input
                        type="text"
                        name="productName"
                        value={formik.values.productName}
                        onChange={formik.handleChange}
                        className="w-full border-[1px]"
                      />
                      {formik.touched.productName &&
                      formik.errors.productName ? (
                        <div className="form-error">
                          {formik.errors.productName}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-span-3 border-r-2 flex items-center px-2">
                      <select
                        name="cate"
                        value={formik.values.cateId}
                        onChange={(e) => handleChange(e)}
                        className="w-full border-[1px]"
                      >
                        {cate.map((i) => (
                          <option value={i.cateId} key={i.cateId}>
                            {i.cateName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2 border-r-2 flex flex-col justify-center px-2">
                      <input
                        type="text"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        className="w-full border-[1px]"
                      />
                      {formik.touched.price && formik.errors.price ? (
                        <div className="form-error">{formik.errors.price}</div>
                      ) : null}
                    </div>

                    <div className="col-span-3 flex justify-evenly items-center">
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
                <li className="admin-items border-t-2" key={product.id}>
                  <div className="col-span-1 py-1 border-r-2 flex items-center justify-center">
                    {product.id}
                  </div>

                  <div className="col-span-3 border-r-2 pl-2 flex items-center">
                    {product.productName}
                  </div>

                  <div className="col-span-3 border-r-2 pl-2 flex items-center">
                    {product.cateName}
                  </div>

                  <div className="col-span-2 border-r-2 pl-2 flex items-center">
                    {product.price}
                  </div>

                  <div className="col-span-3 flex justify-evenly items-center">
                    <button
                      className="hover:underline  hover:font-bold text-primary"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:underline  hover:font-bold text-redd"
                      onClick={() => handleRemoveClick(product)}
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
              {productCate[productCate.length - 1].id + 1}
            </div>

            <div className="col-span-3 border-r-2 flex flex-col justify-center px-2">
              <input
                type="text"
                name="productName"
                value={formik.values.productName}
                onChange={formik.handleChange}
                className="w-full border-[1px]"
              />
              {formik.touched.productName && formik.errors.productName ? (
                <div className="form-error">{formik.errors.productName}</div>
              ) : null}
            </div>

            <div className="col-span-3 border-r-2 flex items-center px-2">
              <select
                name="cate"
                value={formik.values.cateId}
                onChange={(e) => handleChange(e)}
                className="w-full border-[1px]"
              >
                {cate.map((i) => (
                  <option value={i.cateId} key={i.cateId}>
                    {i.cateName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2 border-r-2 flex flex-col justify-center px-2">
              <input
                type="text"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                className="w-full border-[1px]"
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="form-error">{formik.errors.price}</div>
              ) : null}
            </div>

            <div className="col-span-3 flex justify-evenly items-center">
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

export default ProductList;
