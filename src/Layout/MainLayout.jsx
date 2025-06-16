import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";

const MainLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleToggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarVisible(true); // Always show on desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
        {!isMobile && (
          <div className="col-md-3 col-lg-2 p-0">
            <Sidebar isMobile={false} />
          </div>
        )}

        {/* Main Content */}
        <div
          className={`${isMobile ? "col-12" : "col-md-9 col-lg-10 "
            } bg-light`}
        >
          <div className="p-4 ">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Offcanvas Sidebar for Mobile */}
      {isMobile && (
<div
  className="offcanvas offcanvas-start w-100"
  tabIndex="-1"
  id="mobileSidebar"
  aria-labelledby="mobileSidebarLabel"
>
  {/* Close Button Positioned at Top-Right */}
  <button
    type="button"
    className="btn-close position-absolute top-0 end-0 m-3 z-3"
    data-bs-dismiss="offcanvas"
    aria-label="Close"
  ></button>

  <div className="offcanvas-body p-0">
    <Sidebar
      isMobile={true}
      onLinkClick={() => {
        const offcanvasEl = document.getElementById("mobileSidebar");
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (bsOffcanvas) bsOffcanvas.hide();
      }}
    />
  </div>
</div>


      )}
    </div>
  );
};

export default MainLayout;
