import React from "react";
import { NavLink } from "react-router-dom";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import {
  MdMenuBook,
  MdManageAccounts,
  MdOutlineManageAccounts,
} from "react-icons/md";

function FooterMobile() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-item">
        {({ isActive }) =>
          isActive ? (
            <span className="flex flex-col justify-center items-center">
              <AiFillHome />
              Home
            </span>
          ) : (
            <span className="flex flex-col justify-center items-center">
              <AiOutlineHome />
              Home
            </span>
          )
        }
      </NavLink>

      <NavLink to="/menu" className="nav-item">
        {({ isActive }) =>
          isActive ? (
            <span className="flex flex-col justify-center items-center">
              <MdMenuBook />
              Menu
            </span>
          ) : (
            <span className="flex flex-col justify-center items-center">
              <BiFoodMenu />
              Menu
            </span>
          )
        }
      </NavLink>

      <NavLink to="/cart" className="nav-item">
        {({ isActive }) =>
          isActive ? (
            <span className="flex flex-col justify-center items-center">
              <RiShoppingCart2Fill />
              Cart
            </span>
          ) : (
            <span className="flex flex-col justify-center items-center">
              <RiShoppingCart2Line />
              Cart
            </span>
          )
        }
      </NavLink>

      <NavLink to="/account" className="nav-item">
        {({ isActive }) =>
          isActive ? (
            <span className="flex flex-col justify-center items-center">
              <MdManageAccounts />
              Account
            </span>
          ) : (
            <span className="flex flex-col justify-center items-center">
              <MdOutlineManageAccounts />
              Account
            </span>
          )
        }
      </NavLink>
    </nav>
  );
}

export default FooterMobile;
