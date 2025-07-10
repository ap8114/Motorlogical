import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";
import './Sidebar.css';
import { Button } from "react-bootstrap";

const MainLayout = () => {
  const [screenSize, setScreenSize] = useState(getScreenCategory());
  const [sidebarVisible, setSidebarVisible] = useState(screenSize === 'desktop');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function getScreenCategory() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width >= 768 && width < 992) return 'tablet';
    return 'desktop';
  }

  const handleToggleSidebar = () => {
    if (screenSize === 'mobile' || screenSize === 'tablet') {
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
    if (screenSize === 'mobile' || screenSize === 'tablet') {
      setSidebarOpen(false);
      const offcanvasEl = document.getElementById("mobileSidebar");
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const currentScreen = getScreenCategory();
      setScreenSize(currentScreen);
      if (currentScreen === 'desktop') {
        setSidebarVisible(true);
        setSidebarOpen(false);
      } else {
        setSidebarVisible(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="fixed-top bg-white shadow-sm w-100" style={{ zIndex: 1030 }}>
        <Header onToggleSidebar={handleToggleSidebar} />
      </div>

      {/* Content Area */}
      <div
        className="d-flex"
        style={{
          paddingTop: "65px",
          minHeight: "100vh",
        }}
      >
        {/* Sidebar (Desktop) */}
        {screenSize === 'desktop' && sidebarVisible && (
          <div style={{ width: "250px", flexShrink: 0 }}>
            <Sidebar isMobile={false} onClose={handleCloseSidebar} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-grow-1 bg-light">
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Offcanvas Sidebar (Mobile/Tablet) */}
      {(screenSize === 'mobile' || screenSize === 'tablet') && (
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="mobileSidebar"
          aria-labelledby="mobileSidebarLabel"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          style={{ width: "250px" }}
        >
          <div className="offcanvas-body p-0">
            <Sidebar isMobile={true} onLinkClick={() => handleCloseSidebar()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
