import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

function NavMenu() {
  let location = useLocation();
  if (location.pathname === "/menu") location.pathname = "/menu/all";

  const cate = useSelector((state) => state.cate);

  return (
    <ul className="nav-menu">
      <NavLink
        to="/menu/all"
        className={({ isActive }) => (isActive ? "menu-active" : "menu")}
      >
        All
      </NavLink>

      {cate.map((item, index) => (
        <NavLink
          key={index}
          to={`/menu/${item.cateName.toLowerCase()}`}
          className={({ isActive }) => (isActive ? "menu-active" : "menu")}
        >
          {item.cateName}
        </NavLink>
      ))}
    </ul>
  );
}

export default NavMenu;
