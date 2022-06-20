import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { cancelOrder } from "../../../../redux/orderSlice";

function Checkout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  const handleCancel = (item) => {
    if (window.confirm("Do you want to cancel order ?")) {
      dispatch(cancelOrder(item));
      navigate("order");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center font-bold uppercase text-xl text-redd">
        ❤ Thank you very much for your support and see you next time ❤{" "}
      </div>

      {Object.keys(order).length === 0 && order.constructor === Object ? (
        <Navigate to="/home" />
      ) : (
        <div className="order-bill relative">
          {order.status === "cancel" && (
            <div className="absolute top-32 left-1/2 -translate-x-1/2  border-double border-2 p-4 uppercase text-redd border-redd font-bold text-2xl -rotate-45">
              Cancelled
            </div>
          )}

          {order.status === "complete" && (
            <div className="absolute top-32 left-1/2 -translate-x-1/2  border-double border-2 p-4 uppercase text-green-500 border-green-600 font-bold text-2xl -rotate-45">
              Completed
            </div>
          )}
          <div>
            <div className="text-2xl font-bold">Order Id: {order.orderId}</div>
            <div className="order-time">Order at: {order.dateTime}</div>
            <div className="order-time capitalize">Status: {order.status}</div>
          </div>

          <div>
            <div className="order-title">Customer info</div>

            <div className="flex justify-around items-center font-bold text-red-600">
              <div>Phone: {order.user.phone}</div>
              <div>Name: {order.user.name}</div>
            </div>

            <div>Address: {order.user.address}</div>
          </div>

          <div>
            <div className="order-title">Food order</div>
            <ul className="list-product">
              {order.foodOrder.map((food, index) => (
                <li key={index} className="product-item shadow-lg">
                  <div className="w-1/3 h-40 flex justify-center">
                    <img
                      src={food.imageUrl}
                      alt={food.productName}
                      className="bg-img"
                    />
                  </div>

                  <div className="w-2/3 flex flex-col gap-2">
                    <div className="font-bold text-2xl">{food.productName}</div>

                    <div className="w-full flex justify-between">
                      <div>Quantity: {food.quantity}</div>

                      <div>Price: $ {food.price}</div>
                    </div>

                    <div>Notes: {food.notes}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="order-title">Payment Info</div>
            <div className="flex justify-around items-center font-medium text-lg">
              <div>
                Subtotal: <span>$ {order.subtotal}</span>
              </div>

              <div>
                Shipping Fee: <span>$ {order.shipping}</span>
              </div>

              <div>
                Total: <span>$ {order.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-evenly items-center text-white">
        <button
          className="py-2 px-4 border-2 rounded-md bg-primary hover:opacity-50"
          onClick={() => navigate("order")}
        >
          Back
        </button>

        <button
          className={`py-2 px-4 border-2 rounded-md bg-red-600 ${
            order.status !== "order" ? "opacity-50 pointer-events-none" : ""
          } hover:opacity-50`}
          onClick={() => handleCancel(order)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Checkout;
