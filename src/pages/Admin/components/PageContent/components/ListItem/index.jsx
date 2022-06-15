import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addProduct,
  removeProduct,
  updateProduct,
} from "../../../../../../redux/productSlice";
import ProductList from "./components/ProductList";
import CateList from "./components/CateList";
import { addCate, removeCate, updateCate } from "../../../../../../redux/cateSlice";

ListItem.propsType = {
  show: PropTypes.string,
};

ListItem.defaultProps = {
  show: "5",
};

function ListItem(props) {
  const { show } = props;
  const { adminTask } = useParams();
  const dispatch = useDispatch();

  /*Handle product action */
  const handleAddNewProduct = (form) => {
    const formAdd = {
      ...form,
      cateId: +form.cateId,
      imageUrl: "",
      notes: "",
    };

    dispatch(addProduct(formAdd));
  };

  const handleEditProductSubmit = (form) => dispatch(updateProduct(form));

  const handleRemoveProduct = (item) => dispatch(removeProduct(item));

  /*Handle cate action */
  const handleAddNewCate = (form) => {
    dispatch(addCate(form));
  };

  const handleEditCateSubmit = (form) => dispatch(updateCate(form));
  const handleRemoveCate = (item) => dispatch(removeCate(item));

  //   console.log({ productCate, users, orders });
  return (
    <>
      {adminTask === "products" && (
        <ProductList
          show={show}
          onEditSubmit={handleEditProductSubmit}
          onRemove={handleRemoveProduct}
          onAddNew={handleAddNewProduct}
        />
      )}

      {adminTask === "categories" && (
        <CateList
          show={show}
          onEditSubmit={handleEditCateSubmit}
          onRemove={handleRemoveCate}
          onAddNew={handleAddNewCate}
        />
      )}

      {adminTask === "users" && <div>user</div>}

      {adminTask === "orders" && <div>order</div>}
    </>
  );
}

export default ListItem;
