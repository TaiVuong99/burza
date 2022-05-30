import React from "react";
import { BiFoodMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen mt-[10vh] relative">
      <div className="bg-img bg-banner blur-[2px]" />

      <div className="banner">
        choose your favorite food
        <div>
          <button className="btn-banner" onClick={() => navigate("./menu")}>
            Go to Menu <BiFoodMenu />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
