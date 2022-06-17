import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addCate,
  removeCate,
  updateCate,
} from "../../../../../../redux/cateSlice";
import {
  addProduct,
  removeProduct,
  updateProduct,
} from "../../../../../../redux/productSlice";
import { createUser, removeUser } from "../../../../../../redux/userSlice";
import CateList from "./components/CateList";
import ProductList from "./components/ProductList";
import UserList from "./components/UserList";

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

  /*Handle user action */

  const handleAddNewUser = (form) => {
    dispatch(createUser(form));
  };

  const handleEditUserSubmit = (form) => dispatch(updateCate(form));
  const handleRemoveUser = (item) => dispatch(removeUser(item));

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

      {adminTask === "users" && (
        <UserList
          show={show}
          onEditSubmit={handleEditUserSubmit}
          onRemove={handleRemoveUser}
          onAddNew={handleAddNewUser}
        />
      )}

      {adminTask === "orders" && <div>order</div>}
    </>
  );
}

export default ListItem;
