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
          className={`${isMobile ? "col-12" : "col-md-9 col-lg-10 offset-md-3 offset-lg-2"
            } bg-light`}
        >
          <div className="p-3">
            <Outlet />
          </div>
        </div>
      </div>

   
      {isMobile && isMobileSidebarOpen && (
  <div
    className=""
    tabIndex="-1"
    id="mobileSidebar"
    aria-labelledby="mobileSidebarLabel"
  >
    <div className="">
      <h5 className="" id="mobileSidebarLabel">
        <img src="/logo.png" alt="Motorlogical Logo" height="30" />
      </h5>
      <button
        type="button"
        className="btn-close text-reset"
        aria-label="Close"
        onClick={() => setIsMobileSidebarOpen(false)} // ✅ THIS IS MISSING
      ></button>
    </div>
    <div className="">
      <Sidebar />
    </div>
  </div>
)}
    </div>
  );
};

export default MainLayout;
