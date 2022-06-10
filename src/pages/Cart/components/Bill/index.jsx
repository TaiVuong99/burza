import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { postOrder } from "../../../../redux/orderSlice";

function Bill() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  const isLogin = useSelector((state) => state.user.isLogin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let subtotal = 0,
    shipping = 0,
    total = 0;

  if (cart.length > 0) {
    cart.map((product) => {
      subtotal += product.price * product.quantity;
    });
    shipping = 5;
    total = subtotal + shipping;
  }

  const handleCheckOut = () => {
    if (user.address === "") {
      toast.error('Please fill in the address before paying !?', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return;
    }

    if (window.confirm("Are you sure want to order ?") === true) {
      const formOrder = {
        user,
        foodOrder: cart,
        subtotal,
        shipping,
        total,
      };

      dispatch(postOrder(formOrder));

      toast.success(`Thank you for your order`, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate("/account/order");
      }, 2000);
    }
  };

  return (
    <div className="bill-container">
      <div className="info-container">
        <div className="info-title">Customer Info</div>

        {isLogin ? (
          <div>
            <div className="flex justify-between items-center">
              <div className="info-content">Phone: {user.phone}</div>
              <div className="info-content">Name: {user.name}</div>
            </div>

            <div className="info-content">Address: {user.address}</div>
          </div>
        ) : (
          <div>
            You must be
            <NavLink to="/account" className="form-nav">
              {" "}
              Logged in
            </NavLink>{" "}
            to checkout
          </div>
        )}
      </div>

      <div className="info-container">
        <div className="info-title">Payment Info</div>

        <div>
          <div className="info-content">
            Subtotal: <span>$ {subtotal}</span>
          </div>

          <div className="info-content">
            Shipping Fee: <span>$ {shipping}</span>
          </div>
        </div>

        <div className="info-total">
          Total: <span>$ {total}</span>
        </div>
      </div>

      {isLogin && (
        <div className="w-full p-2 flex flex-col gap-4 text-white">
          <button
            to="/account"
            className="info-btn bg-[#1D4ED8]"
            onClick={handleCheckOut}
          >
            Checkout
          </button>

          <NavLink to="/menu" className="info-btn bg-neutral-900">
            Continue Shopping
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Bill;
