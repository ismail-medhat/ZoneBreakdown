import React, { useEffect, useState } from "react";
import { NavLink,Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';


//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";



function Navbar() {
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)
        //create a custom function that will change menucollapse state from false to true and true to false

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: "none",
      marginRight: "20px",
    };
  };

  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/admin" ||
    window.location.pathname === "/agent"
  ) {
    return null;
  }

  return (
  
    <nav className="navbar navbar-expand-sm navbar-light bg-light p-2">
      <NavLink style={navLinkStyles} className="nav-item" to="admin/zones">
        Zones
      </NavLink>
      <NavLink style={navLinkStyles} className="nav-item" to="admin/counties">
        Counties
      </NavLink>
      <NavLink style={navLinkStyles} className="nav-item" to="admin/agents">
        Agents
      </NavLink>
    </nav>
  );
}

export default Navbar;
