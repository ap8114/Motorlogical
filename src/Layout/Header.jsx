import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../assets/image.png";

import axios from "axios";
import BASE_URL from "../../utils/Config";
import api from "../../utils/axiosInterceptor";
const Header = ({ onToggleSidebar }) => {
  return (
    <header className="py-4 px-3 header position-relative">
      <div className="d-flex align-items-center justify-content-between">
        {/* Toggle button - visible on mobile and tablet */}
        <button
          className="btn d-lg-none"
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <i className="fas fa-bars text-white"></i>
        </button>

        {/* Welcome message - hidden on mobile, visible on tablet and up */}
        <div className="d-none d-md-block">
          <img
                    src={logo}
                    alt="Motorlogical Logo"
                    className="img-fluid sidebar-logo"
                   
                />
        </div>

        {/* Synced button */}
        <div>
         
        </div>

        {/* Right section */}
        <div className="d-flex align-items-center gap-3">
          {/* synced status  */}
           <button className="synced-btn">
            <span className="synced-icon"></span>
            <span className="d-none d-sm-inline text-dark">Synced</span>
          </button>

          {/* notification */}
          <button className="btn position-relative">
            <i className="far fa-bell text-light"></i>
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle"></span>
          </button>
          

          {/* User profile */}
          <div className="d-flex align-items-center me-3 ms-2">
            <div
              className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
              style={{ width: "35px", height: "35px" }}
            >
              M
            </div>
            <div className="ms-2 d-none d-md-block">
              <div className="fw-bold">Michael Johnson</div>
              <div className="text-light small">Admin</div>
            </div>
          </div>

          {/* Chevron down - hidden on mobile */}
          {/* <button className="btn d-none d-md-inline-block">
            <i className="fas fa-chevron-down text-light"></i>
          </button> */}

          {/* Logout - icon only on mobile */}
         
          <Link to="/">
          <button className="btn btn-outline-warning">
            <i className="fas fa-sign-out-alt me-1"></i> Logout
          </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
