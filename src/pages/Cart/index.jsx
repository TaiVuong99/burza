import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Bill from "./components/Bill";

import ListProduct from "./components/ListProduct";

function Cart() {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <>
          <ListProduct/>
          <Bill />
        </>
      ) : (
        <>
          <div className="col-span-3 text-xl font-bold text-center uppercase">
            You don't have any food
          </div>
        </>
      )}
      <ToastContainer newestOnTop />
    </div>
  );
}

export default Cart;
