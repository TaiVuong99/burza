import React from "react";
import logo from "../../logo.svg";

function HeaderMobile() {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      <div
        className="text-2xl md:text-4xl lg:text-4xl font-bold text-primary cursor-pointer uppercase"
        onClick={() => {
          navigate("/");
        }}
      >
        <span className="text-red-600">B</span>
        <span className="text-yellow-400">U</span>
        <span className="text-lime-500">R</span>
        <span className="text-primary">Z</span>
        <span className="text-violet-800">A</span>
      </div>
    </header>
  );
}

export default HeaderMobile;
