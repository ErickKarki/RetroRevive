import React, { useState } from "react";

import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

import "../Admin.css";
import AdminDashboard from "../components/AdminDashboard";
const Profile = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div>
      <Navbar />
      <div className="grid-container">
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <AdminDashboard />
      </div>
    </div>
  );
};

export default Profile;
