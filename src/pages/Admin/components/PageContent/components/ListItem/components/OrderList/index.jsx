import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

OrderList.propTypes = {
  show: PropTypes.string,
  onComplete: PropTypes.func,
  onCancel: PropTypes.func,
};

OrderList.defaultProps = {
  show: "5",
  onComplete: null,
  onCancel: null,
};

function OrderList(props) {
  const { show, onComplete, onCancel } = props;

  const orders = useSelector((state) => state.order);

  const handleCompleteClick = (item) => {
    if (window.confirm(`Is the order "${item.orderId}" completed?`))
      onComplete(item);
  };

  const handleCancelClick = (item) => {
    if (window.confirm(`Do you want to cancel "${item.orderId}" order?`))
      onCancel(item);
  };

  const handleDetailClick = (item) => {
    console.log(item);
    alert(`Food Order: ${item.foodOrder.length}`);
  };

  return (
    <ul className="admin-list">
      <div className="admin-items">
        <div className="col-span-1 py-1 border-r-2 admin-title">#</div>

        <div className="col-span-3 border-r-2 admin-title">Order Id</div>

        <div className="col-span-2 border-r-2 admin-title">
          Customer's Phone
        </div>

        <div className="col-span-1 border-r-2 admin-title">Total</div>

        <div className="col-span-2 border-r-2 admin-title">Time Order</div>

        <div className="col-span-1 border-r-2 admin-title">Status</div>

        <div className="col-span-2 admin-title">Action</div>
      </div>

      {orders.map((item, index) => (
        <>
          {index < show && (
            <>
              <li
                className={`admin-items border-t-2 ${
                  item.status === "complete"
                    ? "animate__animated animate__shakeX bg-green-600/50"
                    : item.status === "cancel"
                    ? "animate__animated animate__shakeX bg-redd/50"
                    : ""
                }`}
                key={item.id}
              >
                <div className="col-span-1 py-1 border-r-2 flex items-center justify-center">
                  {item.id}
                </div>

                <div
                  className="col-span-3 border-r-2 selection:pl-2 flex items-center justify-center cursor-pointer hover:underline hover:text-primary"
                  onClick={() => handleDetailClick(item)}
                >
                  {item.orderId}
                </div>

                <div className="col-span-2 border-r-2 pl-2 flex items-center justify-center">
                  {item.user.phone}
                </div>

                <div className="col-span-1 border-r-2 pl-2 flex items-center justify-center">
                  {item.total}
                </div>

                <div className="col-span-2 border-r-2 pl-2 flex items-center justify-center">
                  {item.dateTime}
                </div>

                <div className="col-span-1 border-r-2 pl-2 flex items-center justify-center capitalize">
                  {item.status}
                </div>

                <div className="col-span-2 flex justify-evenly items-center">
                  {item.status !== "order" ? (
                    ""
                  ) : (
                    <>
                      <button
                        className="hover:underline  hover:font-bold text-green-600"
                        onClick={() => handleCompleteClick(item)}
                      >
                        Complete
                      </button>
                      <button
                        className="hover:underline  hover:font-bold text-redd"
                        onClick={() => handleCancelClick(item)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </li>
            </>
          )}
        </>
      ))}
    </ul>
  );
}

export default OrderList;
