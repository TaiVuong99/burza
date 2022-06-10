import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { cancelOrder, getOrder } from "../../../../redux/orderSlice";

function History() {
  const location = useLocation();
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  const handleCancel = (item) => {
    if (window.confirm("Do you want to cancel order ?"))
      dispatch(cancelOrder(item));
  };

  const handleDetail = (item) => {
    navigate(`${location.pathname}/${item.orderId}`, { state: { ...item } });
  };

  return (
    <>
      {order.length > 0 ? (
        <div className="w-full border-2">
          <li className="grid grid-cols-4 font-bold uppercase text-center border-b-2">
            <div className="col-span-2 py-2">Order Id</div>
            <div className="col-span-1 py-2 border-x-2">Status</div>
            <div className="col-span-1 py-2">Action</div>
          </li>

          {order.map((item, index) => (
            <li className="grid grid-cols-4" key={index}>
              <div className="col-span-2 p-2 self-center">{item.orderId}</div>
              <div className="col-span-1 py-2 border-x-2 capitalize flex items-center justify-center">
                {item.status}
              </div>
              <div className="col-span-1 py-2 flex justify-evenly items-center text-white">
                <button
                  className="p-2 border-2 rounded-md bg-primary hover:opacity-50"
                  onClick={() => handleDetail(item)}
                >
                  Detail
                </button>

                <button
                  className={`p-2 border-2 rounded-md bg-red-600 ${
                    item.status === "cancel"
                      ? "opacity-50 pointer-events-none"
                      : ""
                  } hover:opacity-50`}
                  onClick={() => handleCancel(item)}
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </div>
      ): (
          <div className="text-xl font-bold text-center uppercase">
              You don't have any order
          </div>
      )}
    </>
  );
}

export default History;
