import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Sidebar.css';
import { Button } from 'react-bootstrap';

const Sidebar = ({ isMobile, onLinkClick }) => {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    const handleCloseSidebar = () => {
        const sidebar = document.getElementById('mobileSidebar');
        const offcanvas = window.bootstrap?.Offcanvas.getInstance(sidebar);
        if (offcanvas) {
            offcanvas.hide();
        }
    };

    const handleMenuClick = (path) => {
        setActivePath(path);
        if (isMobile) {
            const offcanvasElement = document.getElementById('mobileSidebar');
            const offcanvasInstance = window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
            if (offcanvasInstance) offcanvasInstance.hide();
        }

        if (onLinkClick) onLinkClick();
    };

    const navItem = (to, icon, label) => (
        <li className="nav-item" key={to}>
            <Link
                to={to}
                onClick={() => handleMenuClick(to)}
                className={`nav-link d-flex align-items-center sidebar-link px-3 py-2 ${activePath === to ? "active-link" : ""}`}
            >
                <i className={`me-2 ${icon}`}></i> {label}
            </Link>
        </li>
    );

    return (
        <div className="sidebar d-flex flex-column vh-100 position-fixed start-0">

            {/* Header Row with Close Button and Logo */}
            <div className="d-flex justify-content-between align-items-center py-2">
                <img
                    src="https://i.postimg.cc/T37mZZ0p/89b720af-5154-4d70-bb52-6882c2d51803.png"
                    alt="Motorlogical Logo"
                    className="img-fluid sidebar-logo"
                    style={{ maxHeight: '60px' }}
                />
                <button
                    type="button"
                    className="btn btn-outline-light ms-auto d-lg-none"  // 👈 Only visible on small screens
                    onClick={handleCloseSidebar}
                    aria-label="Close"
                    style={{
                        padding: '4px 10px',
                        borderRadius: '6px'
                    }}
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-grow-1 px-3">
                <div className="text-uppercase text-secondary small mb-2">Main Menu</div>
                <ul className="nav flex-column mb-4">
                    {navItem("/dashboard", "fas fa-th-large", "Dashboard")}
                    {navItem("/dealershipmanagement", "fas fa-store", "Dealership Management")}
                    {navItem("/inventorymanagement", "fas fa-users-cog", "User Management")}
                    {navItem("/productionstatus", "fas fa-industry", "Order Management")}
                    {navItem("/inventory", "fas fa-boxes-stacked", "Inventory Management")}
                    {navItem("/reporting", "fas fa-chart-line", "Reporting")}
                    {navItem("/settings", "fas fa-sliders-h", "Settings")}
                </ul>




            </div>
        </div>
    );
};

export default Sidebar;
