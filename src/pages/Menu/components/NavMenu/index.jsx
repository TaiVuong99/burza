import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

NavMenu.propTypes = {
  onNavClick: PropTypes.func,
};

NavMenu.defaultProps = {
  onNavClick: null,
};

function NavMenu(props) {
  const { onNavClick } = props;
  const cate = useSelector((state) => state.cate);

  const handleClick = (nav) => {
    if (onNavClick) onNavClick(nav.cateName);
  };

  return (
    <ul className="nav-menu">
      <NavLink
        to="/menu/all"
        className={({ isActive }) => (isActive ? "menu-active" : "menu")}
        onClick={handleClick}
      >
        All
      </NavLink>

      {cate.map((item, index) => (
        <NavLink
          key={index}
          to={`/menu/${item.cateName.toLowerCase()}`}
          className={({ isActive }) => (isActive ? "menu-active" : "menu")}
          onClick={() => handleClick(item)}
        >
          {item.cateName}
        </NavLink>
      ))}
    </ul>
  );
}

export default NavMenu;
