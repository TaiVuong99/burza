import React from "react";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";

import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";

function Header() {
    const navigate = useNavigate();
  return (
    <header className="header">
      <div className="flex justify-center items-center mr-4 ">
        <img src={logo} alt="logo" className="logo" />
        <div className="text-4xl font-bold text-primary cursor-pointer uppercase" onClick={() => {navigate("/")}}>
          <span className="text-red-600">B</span>
          <span className="text-yellow-400">U</span>
          <span className="text-lime-500">R</span>
          <span className="text-primary">Z</span>
          <span className="text-violet-800">A</span>
        </div>
      </div>

      <div className="flex justify-around">
        <div className="flex gap-10 justify-center items-center text-xl font-light pr-4 border-r-2">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "tabActive" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/Menu"
            className={({ isActive }) => (isActive ? "tabActive" : "")}
          >
            Menu
          </NavLink>
          <NavLink
            to="/Account"
            className={({ isActive }) => (isActive ? "tabActive" : "")}
          >
            Account
          </NavLink>
        </div>

        <div className="flex justify-center items-center p-3 relative">
          <NavLink to="/Cart" className="text-2xl">
            {({ isActive }) =>
              isActive ? <RiShoppingCart2Fill className="animate__bounceIn"/> : <RiShoppingCart2Line />
            }
          </NavLink>
          
          <div className="quantity">1</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
