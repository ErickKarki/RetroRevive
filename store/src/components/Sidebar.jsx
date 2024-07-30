import React from "react";
import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { FaRegMessage } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/profile/dashboard">
            <MdDashboard className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/profile/products">
            <AiOutlineProduct className="icon" /> Products
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/profile/messages">
            <FaRegMessage className="icon" /> Messages
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/profile/settings">
            <CiSettings className="icon" /> Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
