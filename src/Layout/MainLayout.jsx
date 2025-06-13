import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";

const MainLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* Sidebar - fixed height and width */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#0f2c43", // same dark blue
          minHeight: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000
        }}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: "250px", // equal to sidebar width
          background: "#f8fafc",
          minHeight: "100vh",
        }}
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
