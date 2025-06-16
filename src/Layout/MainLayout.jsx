import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";
import './Sidebar.css';

const MainLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(prev => !prev);
      const offcanvasEl = document.getElementById("mobileSidebar");
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      
      if (bsOffcanvas) {
        bsOffcanvas.toggle();
      } else {
        new bootstrap.Offcanvas(offcanvasEl).show();
      }
    } else {
      setSidebarVisible(prev => !prev);
    }
  };

  const handleCloseSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
      const offcanvasEl = document.getElementById("mobileSidebar");
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarVisible(true);
        setSidebarOpen(false);
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
            <Sidebar isMobile={false} onClose={handleCloseSidebar} />
          </div>
        )}

        {/* Main Content */}
        <div
          className={`${isMobile ? "col-12" : sidebarVisible ? "col-lg-10 " : "col-12"} bg-light`}
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
        <div className="offcanvas-header justify-content-end p-2">
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseSidebar}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <Sidebar
            isMobile={true}
            onLinkClick={() => {
              handleCloseSidebar();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;