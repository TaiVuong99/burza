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

  const handleEditProductSubmit = (form) => {
    dispatch(updateProduct(form));
  };

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };

  const handleAddNewProduct = (form) => {
    const formAdd = {
      ...form,
      cateId: +form.cateId,
      imageUrl: "",
      notes: "",
    };

    dispatch(addProduct(formAdd));
  };

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

      {adminTask === "categories" && <div>cate</div>}

      {adminTask === "users" && <div>user</div>}

      {adminTask === "orders" && <div>order</div>}
    </>
  );
}

export default ListItem;
