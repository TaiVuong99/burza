import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Checkout() {
  const order = useSelector((state) => state.order);

  return (
    <div className="w-full h-auto mt-[10vh] pt-10 px-80">
      <div className="text-center font-bold uppercase text-xl text-[#fd0304] mb-4">❤ Thank you very much for your support and see you next time ❤ </div>
      {Object.keys(order).length === 0 && order.constructor === Object ? <Navigate to="/home" /> : (
        <div className="order-bill">
        <div>
          <div className="text-2xl font-bold">Order Id: {order.orderId}</div>
          <div class="order-time">Order at: {order.dateTime}</div>
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
    </div>
  );
}

export default Checkout;
