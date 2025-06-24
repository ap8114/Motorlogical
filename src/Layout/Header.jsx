import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "../assets/image.png";

const Header = ({ onToggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

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
        <div></div>

        {/* Right section */}
        <div className="d-flex align-items-center gap-3">
          {/* Synced status */}
          <button className="synced-btn">
            <span className="synced-icon"></span>
            <span className="d-none d-sm-inline text-dark">Synced</span>
          </button>

          {/* Notification button */}
          <div className="position-relative">
            <button
              className="btn position-relative"
              onClick={toggleNotifications}
            >
              <i className="far fa-bell text-light"></i>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle"></span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div
                className="position-absolute end-0 mt-2 shadow p-3 bg-white rounded"
                style={{ width: "250px", zIndex: 1000 }}
              >
                <h6 className="fw-bold mb-2">Notifications</h6>
                <ul className="list-unstyled mb-0 small">
                  <li className="mb-2 border-bottom pb-1 text-dark">
                    🔔 New user signed up
                  </li>
                  <li className="mb-2 border-bottom pb-1 text-success">
                    📦 Order #1234 has been shipped
                  </li>
                  <li className="text-danger">⚠️ Server memory usage is high</li>
                </ul>
              </div>
            )}
          </div>

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

          {/* Logout */}
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
