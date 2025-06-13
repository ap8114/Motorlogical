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
    <div className="d-flex" style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarCollapsed ? "0" : "250px",
          transition: "width 0.3s ease",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          toggleCollapse={toggleSidebar}
        />
      </div>

   {/* Main Content Area */}
<div
  className="flex-grow-1"
  style={{
    background: "#f8fafc",
    minHeight: "100vh",
    transition: "width 0.3s ease",
    width: sidebarCollapsed ? "100%" : "calc(100% - 250px)",
  }}
>
        <Header 
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
          sidebarCollapsed={sidebarCollapsed}
        />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;