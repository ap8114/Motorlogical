import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    const handleLinkClick = (path) => {
        setActivePath(path);
    };

    return (
        <div className="row g-0">
            {/* Sidebar */}
            <div className="col-md-auto">
                <nav className="ml-sidebar-container" id="mlSidebar">
                    {/* Brand Section */}
                    <div className="ml-brand-section d-none d-md-block">
                        <Link to="/" className="ml-brand-logo">
                            <div className="ml-brand-icon">
                                <i className="fas fa-chart-bar text-dark" />
                            </div>
                            Motorlogical
                        </Link>
                    </div>

                    {/* Main Menu */}
                    <div className="ml-menu-section">
                        <div className="ml-menu-title">Main Menu</div>
                        <ul className="ml-nav-list">
                            <li className="ml-nav-item">
                                <Link
                                    to="/"
                                    className={`ml-nav-link ${activePath === '/dashboard' ? 'ml-active' : ''}`}
                                    onClick={() => handleLinkClick('/dashboard')}
                                >
                                    <i className="fas fa-th-large ml-nav-icon" />
                                    Dashboard
                                </Link>
                            </li>
                            <li className="ml-nav-item">
                                <Link
                                    to="/ordermanagement"
                                    className={`ml-nav-link ${activePath === '/orders' ? 'ml-active' : ''}`}
                                    onClick={() => handleLinkClick('/orders')}
                                >
                                    <i className="fas fa-shopping-cart ml-nav-icon" />
                                    Orders
                                </Link>
                            </li>
                            <li className="ml-nav-item">
                                <Link
                                    to="/inventorymanagement"
                                    className={`ml-nav-link ${activePath === '/inventorymanagement' ? 'ml-active' : ''}`}
                                    onClick={() => handleLinkClick('/inventorymanagement')}
                                >
                                    <i className="fas fa-boxes ml-nav-icon" />
                                    Inventory
                                </Link>
                            </li>
                            <li className="ml-nav-item">
                                <Link
                                    to="/productionstatus"
                                    className={`ml-nav-link ${activePath === '/productionstatus' ? 'ml-active' : ''}`}
                                    onClick={() => handleLinkClick('/productionstatus')}
                                >
                                    <i className="fas fa-cog ml-nav-icon" />
                                    Production Status
                                </Link>
                            </li>
                            <li className="ml-nav-item">
                                <Link
                                    to="/salesrecord"
                                    className={`ml-nav-link ${activePath === '/salesrecord' ? 'ml-active' : ''}`}
                                    onClick={() => handleLinkClick('/salesrecord')}
                                >
                                    <i className="fas fa-chart-line ml-nav-icon" />
                                    Sales Record
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Settings Menu */}
                    <div className="ml-menu-section">
                        <div className="ml-menu-title">Settings</div>
                        <ul className="ml-nav-list">
                            <li className="ml-nav-item">
                                <Link
                                    to="/account"
                                    className={`ml-nav-link ${activePath === '/account' ? 'ml-active' : ''}`}
                                    onClick={() => handleLinkClick('/account')}
                                >
                                    <i className="fas fa-user ml-nav-icon" />
                                    Account
                                </Link>
                            </li>
                            <li className="ml-nav-item">
                                <Link
                                    to="/preferences"
                                    className={`ml-nav-link ${activePath === '/preferences' ? 'ml-active' : ''}`}
                                    onClick={() => handleLinkClick('/preferences')}
                                >
                                    <i className="fas fa-sliders-h ml-nav-icon" />
                                    Preferences
                                </Link>
                            </li>
                            <li className="ml-nav-item">
                                <Link
                                    to="/support"
                                    className={`ml-nav-link ${activePath === '/support' ? 'ml-active' : ''}`}
                                    onClick={() => handleLinkClick('/support')}
                                >
                                    <i className="fas fa-question-circle ml-nav-icon" />
                                    Help &amp; Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
