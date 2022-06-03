import React from "react";

import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { deleteCart, updateCart } from "../../../../redux/cartSlice";
import { toast } from "react-toastify";


function ListProduct(props) {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleChangeNote = (e, product) => {
    const newProduct = {
      ...product,
      notes: e.target.value,
    };
    dispatch(updateCart(newProduct));
  };

  const pushEvent = (product) => {
    dispatch(deleteCart(product))

    toast.success(`Remove ${product.productName} Successfully!!!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }) 
  }

  const handleRemove = (product) => {
    const confirmBox = window.confirm(
      `Do you want to remove "${product.productName}"`
    );
    confirmBox ? pushEvent(product) : "";
  };

  const handleDecrease = (product) => {
    if (product.quantity === 1) handleRemove(product);
    else {
      const newProduct = {
        ...product,
        quantity: product.quantity - 1,
      };
      dispatch(updateCart(newProduct));
    }
  };

  const handleIncrease = (product) => {
    const newProduct = {
      ...product,
      quantity: product.quantity + 1,
    };

    dispatch(updateCart(newProduct));
  };

  return (
    <div className="list-container">
      <ul className="list-product">
        {cart.map((product, index) => (
          <li key={index} className="product-item">
            <div className="w-1/3 flex justify-center">
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="bg-img w-2/3"
              />
            </div>

            <div className="w-2/3 flex flex-col">
              <div className="product-item-info font-bold text-2xl">
                {product.productName}
              </div>

              <div className="product-item-info">
                Price: $ {product.price * product.quantity}
              </div>

              <div>
                <div>
                  <label forhtml="notes">Notes:</label>
                  <textarea
                    name="notes"
                    className="w-full border-2 p-2"
                    value={product.notes}
                    onChange={(e) => handleChangeNote(e, product)}
                  />
                </div>

                <div className="flex justify-evenly">
                  <div className="flex justify-around items-center gap-4">
                    <button
                      className="btn-quantity"
                      onClick={() => handleDecrease(product)}
                    >
                      -
                    </button>

                    <div
                      name="quantity"
                      className="font-bold pointer-events-none"
                    >
                      {product.quantity}
                    </div>

                    <button
                      className="btn-quantity"
                      onClick={() => handleIncrease(product)}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    <button
                      className="btn-del"
                      onClick={() => handleRemove(product)}
                    >
                      Remove
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListProduct;
