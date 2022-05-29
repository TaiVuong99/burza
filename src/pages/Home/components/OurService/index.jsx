import React from "react";
import { IoFastFood } from "react-icons/io5";
import { AiFillThunderbolt, AiFillHeart } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";

function OurService(props) {
  return (
    <div className="w-full h-[50vh] px-40 pt-10 flex flex-col items-center">
      <div className="text-4xl font-light uppercase">
        <span className="mb-2 border-b-2 border-red-500 font-medium">Our</span> service
      </div>

      <div className="grid grid-cols-4 w-full h-full mt-4">
        <div className="col-container">
          <div className="icon text-lime-500 border-lime-500">
            <IoFastFood />
          </div>

          <div className="icon-description text-lime-500">
            Fresh and hygienic food
          </div>
        </div>

        <div className="col-container">
          <div className="icon text-red-600 border-red-600">
            <AiFillHeart />
          </div>

          <div className="icon-description text-red-600">
            favorite store
          </div>
        </div>

        <div className="col-container">
          <div className="icon text-primary border-primary">
            <GiReceiveMoney />
          </div>

          <div className="icon-description text-primary">
            good price
          </div>
        </div>

        <div className="col-container">
          <div className="icon text-yellow-400 border-yellow-400">
            <AiFillThunderbolt />
          </div>

          <div className="icon-description text-yellow-400">
            fast delivery
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurService;
