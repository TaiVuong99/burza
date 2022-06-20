import React from "react";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";


function Headminer() {
  const location = useLocation();
  
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  return (
    <>
      {location.pathname !== "/admin" &&
        (location.pathname !== `/admin/dashboard` && location.pathname !== `/admin/products` && location.pathname !== `/admin/categories` && location.pathname !== `/admin/orders` && location.pathname !== `/admin/users`
         && (
          <header className="header">
            <div className="flex justify-center items-center mr-4 ">
              <img src={logo} alt="logo" className="logo" />
              <div
                className="text-4xl font-bold text-primary cursor-pointer uppercase"
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
            </div>

            <div className="flex justify-around">
              <div className="flex gap-10 justify-center items-center text-xl font-light pr-4 border-r-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "tabActive" : "hover:font-bold"
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="menu"
                  className={({ isActive }) =>
                    isActive ? "tabActive" : "hover:font-bold"
                  }
                >
                  Menu
                </NavLink>

                <NavLink
                  to="account"
                  className={({ isActive }) =>
                    isActive ? "tabActive" : "hover:font-bold"
                  }
                >
                  Account
                </NavLink>
              </div>

              <div className="flex justify-center items-center p-3 relative">
                <NavLink to="cart" className="text-2xl">
                  {({ isActive }) =>
                    isActive ? (
                      <RiShoppingCart2Fill className="animate__bounceIn" />
                    ) : (
                      <RiShoppingCart2Line className="hover:opacity-50" />
                    )
                  }
                </NavLink>

                {cart.length > 0 && (
                  <div className="quantity">{cart.length}</div>
                )}
              </div>
            </div>
          </header>
        ))}
    </>
  );
}

export default Header;
