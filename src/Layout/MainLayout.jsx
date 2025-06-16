import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="d-flex">
      {/* Sidebar - fixed height and width */}
      <div>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div
        className="flex-grow-1 "
        // style={{
        //   marginLeft: "250px", // equal to sidebar width
        //   background: "#f8fafc",
        //   minHeight: "100vh",
        // }}
      >
        <Header />
        <div className="p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;