import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Sidebar.css'; // Make sure to import the CSS file

const Sidebar = ({ isMobile, onLinkClick }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleMenuClick = (path) => {
    setActivePath(path);
    if (isMobile && onLinkClick) onLinkClick();
  };

  const navItem = (to, icon, label) => (
    <li className="nav-item">
      <Link
        to={to}
        onClick={() => handleMenuClick(to)}
        className={`nav-link d-flex align-items-center sidebar-link px-3 py-2 ${
          activePath === to ? "active-link" : ""
        }`}
      >
        <i className={`me-2 ${icon}`}></i> {label}
      </Link>
    </li>
  );

  return (
    <div className="sidebar d-flex flex-column vh-100 position-fixed top-0 start-0">
      <div className="sidebar-header p-4 text-center">
        <img
          src="https://i.postimg.cc/T37mZZ0p/89b720af-5154-4d70-bb52-6882c2d51803.png"
          alt="Motorlogical Logo"
          className="img-fluid sidebar-logo"
        />
      </div>

      <div className="flex-grow-1 px-3">
        <div className="text-uppercase text-secondary small mb-2">Main Menu</div>
        <ul className="nav flex-column mb-4">
          {navItem("/dashboard", "fas fa-th-large", "Dashboard")}
          {navItem("/ordermanagement", "fas fa-shopping-cart", "Orders")}
          {navItem("/inventorymanagement", "fas fa-boxes", "Inventory")}
          {navItem("/productionstatus", "fas fa-cog", "Production Status")}
          {navItem("/salesrecords", "fas fa-chart-line", "Sales Record")}
        </ul>

        <div className="text-uppercase text-secondary small mb-2">Settings</div>
        <ul className="nav flex-column">
          {navItem("/accountsetting", "fas fa-user", "Account")}
          {navItem("/userpreferences", "fas fa-sliders-h", "Preferences")}
          {navItem("/helpsupport", "fas fa-question-circle", "Help & Support")}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
