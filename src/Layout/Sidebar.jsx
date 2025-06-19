import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './Sidebar.css';

const Sidebar = ({ isMobile, onLinkClick }) => {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);
    const [role, setRole] = useState("");

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
    }, []);

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

    // 👇 Role-based menu setup
    const getMenuItems = () => {
        switch (role) {
            case "Admin":
                return (
                    <>
                        {navItem("/dashboard", "fas fa-th-large", "Dashboard")}
                        {navItem("/dealershipmanagement", "fas fa-store", "Dealership Management")}
                        {navItem("/inventorymanagement", "fas fa-users-cog", "User Management")}
                        {navItem("/ordermanagement", "fas fa-industry", "Order Management")}
                        {navItem("/inventorymanagement", "fas fa-boxes-stacked", "Inventory Management")}
                        {navItem("/reporting", "fas fa-chart-line", "Reporting")}
                        {navItem("/settings", "fas fa-sliders-h", "Settings")}
                    </>
                );
            case "Manager":
                return (
                    <>
                        {navItem("/ordermanagement", "fas fa-shopping-cart", "Finance Department")}
                        {navItem("/userpreferences", "fas fa-sliders-h", "Preferences")}
                    </>
                );
            case "Salesperson":
                return (
                    <>
                        {navItem("/salesrecords", "fas fa-chart-line", "Sales Record")}
                        {navItem("/helpsupport", "fas fa-question-circle", "Support")}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="sidebar d-flex flex-column vh-100 position-fixed start-0">
            {/* Header Row */}
            <div className="d-flex justify-content-between align-items-center py-2">
               
                <button
                    type="button"
                    className="btn btn-outline-light ms-auto d-lg-none"
                    onClick={handleCloseSidebar}
                    style={{ padding: '4px 10px', borderRadius: '6px' }}
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>

            {/* Role-specific Navigation */}
            <div className="flex-grow-1 px-3 mt-4">
                {/* <div className="text-uppercase text-secondary small mb-2">Main Menu</div> */}
                <ul className="nav flex-column mb-4">
                    {getMenuItems()}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
