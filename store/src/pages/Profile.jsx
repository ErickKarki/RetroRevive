import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AdminDashboard from "../components/AdminDashboard";
import UserProductList from "../components/UserProductList";
import Messages from "../components/Messages";
import Settings from "../components/Settings";
import { Announcement } from "@material-ui/icons";
import "../Admin.css";

const Profile = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div>
      <Navbar />
      <Announcement />
      <div className="grid-container">
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/products" element={<UserProductList />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<AdminDashboard />} />{" "}
            {/* Default route */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;
