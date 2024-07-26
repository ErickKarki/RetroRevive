import React from "react";

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
          <a href="">
            <MdDashboard className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <AiOutlineProduct className="icon" /> Products
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <FaRegMessage className="icon" /> Messages
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="">
            <CiSettings className="icon" /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
