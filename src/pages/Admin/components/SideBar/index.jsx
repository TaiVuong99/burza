import React from "react";
import { NavLink } from "react-router-dom";
import { IoFastFood } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";

function SideBar() {
  return (
    <div className="col-span-1 flex flex-col bg-cyan-600/40">
      <NavLink
        to="dashboard"
        className={({ isActive }) => (isActive ? " bg-cyan-600" : "")}
      >
        <div className="text-center uppercase text-2xl font-bold py-4 hover:bg-cyan-600">
        admin
        </div>
      </NavLink>

      <ul className="w-full flex flex-col border-y-2">
        <NavLink
          to="products"
          className={({ isActive }) => (isActive ? "font-bold bg-cyan-600/40" : "")}
        >
          <li className="admin-sidebar-item">
            <IoFastFood />
            products
          </li>
        </NavLink>

        <NavLink
          to="categories"
          className={({ isActive }) => (isActive ? "font-bold bg-cyan-600/40" : "")}
        >
          <li className="admin-sidebar-item">
            <BiCategory />
            Categories
          </li>
        </NavLink>

        <NavLink
          to="users"
          className={({ isActive }) => (isActive ? "font-bold bg-cyan-600/40" : "")}
        >
          <li className="admin-sidebar-item">
            <FaUsers />
            users
          </li>
        </NavLink>

        <NavLink
          to="orders"
          className={({ isActive }) => (isActive ? "font-bold bg-cyan-600/40" : "")}
        >
          <li className="admin-sidebar-item">
            <RiBillFill />
            orders
          </li>
        </NavLink>
      </ul>
    </div>
  );
}

export default SideBar;
