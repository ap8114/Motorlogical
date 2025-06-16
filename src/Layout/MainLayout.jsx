import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";
import './Sidebar.css'

const MainLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarOpen, setSidebarOpen] = useState(false); // New state for mobile sidebar

  const handleToggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(prev => !prev); // Toggle mobile sidebar state
      const offcanvasEl = document.getElementById("mobileSidebar");
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      
      if (bsOffcanvas) {
        if (!sidebarOpen) {
          bsOffcanvas.show();
        } else {
          bsOffcanvas.hide();
        }
      } else {
        new bootstrap.Offcanvas(offcanvasEl).show();
      }
    } else {
      setSidebarVisible(prev => !prev); // Toggle desktop sidebar
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarVisible(true); // Always show on desktop
        setSidebarOpen(false); // Ensure mobile sidebar is closed
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row fixed-top bg-white shadow-sm">
        <div className="col-12">
          <Header onToggleSidebar={handleToggleSidebar} />
        </div>
      </div>

      {/* Content Row */}
      <div className="row" style={{ paddingTop: "65px" }}>
        {/* Sidebar for Desktop */}
        {!isMobile && sidebarVisible && (
          <div className="col-lg-2 p-0 d-none d-lg-block">
            <Sidebar isMobile={false} />
          </div>
        )}

        {/* Main Content */}
        <div
          className={`${isMobile ? "col-12" : sidebarVisible ? "col-lg-10 offset-lg-2" : "col-12"} bg-light`}
        >
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Offcanvas Sidebar for Mobile/Tablet */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
        data-bs-scroll="true"
        data-bs-backdrop="false"
      >
        <div className="offcanvas-body p-0">
          <Sidebar
            isMobile={true}
            onLinkClick={() => {
              const offcanvasEl = document.getElementById("mobileSidebar");
              const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
              if (bsOffcanvas) bsOffcanvas.hide();
              setSidebarOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;