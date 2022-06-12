import React from "react";
import { NavLink } from "react-router-dom";

function SideBar(props) {
  return (
    <div className="col-span-1 flex flex-col bg-cyan-600/60">
      <div className="text-center uppercase text-2xl font-bold py-4 bg-cyan-600">
        admin
      </div>

      <div className="w-full flex flex-col gap-4">
        <ul>
          <li className="py-4 px-2">
            <NavLink
              to="products"
              className={({ isActive }) =>
                isActive ? "uppercase text-lg font-bold underline" : "uppercase text-lg"
              }
            >
              products
            </NavLink>
          </li>

          <li className="py-4 px-2">
            <NavLink
              to="categories"
              className={({ isActive }) =>
                isActive ? "uppercase text-lg font-bold underline" : "uppercase text-lg"
              }
            >
              Categories
            </NavLink>
          </li>

          <li className="py-4 px-2">
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive ? "uppercase text-lg font-bold underline" : "uppercase text-lg"
              }
            >
              users
            </NavLink>
          </li>

          <li className="py-4 px-2">
            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive ? "uppercase text-lg font-bold underline" : "uppercase text-lg"
              }
            >
              orders
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
