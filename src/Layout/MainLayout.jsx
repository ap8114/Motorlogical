import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";


const MainLayout = () => (
  <div className="d-flex" style={{ minHeight: "100vh" }}>
    <div>
      <Sidebar />
    </div>
    <div className="flex-grow-1" style={{ background: "#f8fafc" }}>
      <Header />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  </div>
);

export default MainLayout;