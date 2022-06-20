import React from "react";
import { useSelector } from "react-redux";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
function DashBoard() {
  const orders = useSelector((state) => state.order);

  const completeOrder = orders.filter((order) => order.status === "complete");
  const inOrder = orders.filter((order) => order.status === "order");
  const cancelOrder = orders.filter((order) => order.status === "cancel");

  const sumTotal = orders.reduce((total, current) => total + current.total, 0);
  const missingTotal = cancelOrder.reduce((total, current) => total + current.total, 0);
  const completeTotal = completeOrder.reduce((total, current) => total + current.total, 0);

  const orderData = {
    labels: ["In Order", "Completed", "Canceled"],
    datasets: [
      {
        label: "Burza's orders",
        data: [inOrder.length, completeOrder.length, cancelOrder.length],
        backgroundColor: ["#ffea00", "#34a853", "#fd0304"],
        borderWidth: 1,
      },
    ],
  };

  const costData = {
    labels: ["Gross", "Missing", "Net"],
    datasets: [
      {
        label: "Revenue",
        data: [sumTotal, missingTotal, completeTotal],
        backgroundColor: ["#1d4ed8", "#fd0304", "#34a853"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-full h-auto flex flex-col gap-10">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full text-center uppercase text-2xl font-bold">
          burza's revenue
        </div>

        <div className="flex justify-around">
          <div>
            Gross: <span className="font-bold">${sumTotal}</span>
          </div>
          <div>
            Missing: <span className="font-bold">${missingTotal}</span>
          </div>
          <div>
            Net: <span className="font-bold">${completeTotal}</span>
          </div>
        </div>

        <div>
          <Chart type="bar" data={costData} redraw updateMode="resize" />
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <div className="w-full text-center uppercase text-2xl font-bold">
          burza's orders
        </div>
        <div className="w-full flex justify-evenly items-center text-lg">
          <div className="text-primary font-bold">Orders: {orders.length}</div>

          <div className="text-amber-500 font-bold">
            In-order: {inOrder.length}
          </div>

          <div className="text-green-600 font-bold">
            Completed: {completeOrder.length}
          </div>

          <div className="text-redd font-bold">
            Canceled: {cancelOrder.length}
          </div>
        </div>

        <div className="flex justify-center items-center w-1/3">
          <Chart type="doughnut" data={orderData} redraw updateMode="resize" />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
