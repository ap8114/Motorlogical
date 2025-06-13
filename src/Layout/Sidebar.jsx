import React, { useEffect } from 'react';
import './Layout.css';

const Sidebar = () => {

  useEffect(() => {
    const links = document.querySelectorAll('.mj-nav-link');
    const overlay = document.querySelector('.mj-sidebar-overlay');

    const closeSidebar = () => {
      document.getElementById('mjSidebar').classList.remove('mj-sidebar-open');
      overlay.classList.remove('mj-overlay-show');
    };

    links.forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          document.querySelectorAll('.mj-nav-link').forEach(l => l.classList.remove('mj-nav-active'));
          this.classList.add('mj-nav-active');
          closeSidebar();
        }
      });
    });

    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeSidebar();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      links.forEach(link => link.removeEventListener('click', () => {}));
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    const sidebar = document.getElementById('mjSidebar');
    const overlay = document.querySelector('.mj-sidebar-overlay');
    sidebar.classList.toggle('mj-sidebar-open');
    overlay.classList.toggle('mj-overlay-show');
  };

  const closeSidebar = () => {
    const sidebar = document.getElementById('mjSidebar');
    const overlay = document.querySelector('.mj-sidebar-overlay');
    sidebar.classList.remove('mj-sidebar-open');
    overlay.classList.remove('mj-overlay-show');
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="mj-mobile-toggle" onClick={toggleSidebar}>
        <i className="fas fa-bars" />
      </button>

      {/* Sidebar Overlay for Mobile */}
      <div className="mj-sidebar-overlay" onClick={closeSidebar} />

      {/* Sidebar */}
      <nav className="mj-sidebar-container" id="mjSidebar">
        <div className="mj-logo-section">
          <div className="mj-logo-icon">
            <div className="mj-logo-bars">
              <div className="mj-logo-bar" />
              <div className="mj-logo-bar" />
              <div className="mj-logo-bar" />
            </div>
          </div>
          <p className="mj-logo-text">Motorlogical</p>
        </div>

        {/* Main Menu Section */}
        <div className="mj-menu-section">
          <h6 className="mj-section-title">Main Menu</h6>
          <ul className="mj-nav-list">
            <li className="mj-nav-item">
              <a href="#" className="mj-nav-link mj-nav-active">
                <i className="fas fa-th-large mj-nav-icon" /> Dashboard
              </a>
            </li>
            <li className="mj-nav-item">
              <a href="#" className="mj-nav-link">
                <i className="fas fa-shopping-cart mj-nav-icon" /> Orders
              </a>
            </li>
            <li className="mj-nav-item">
              <a href="#" className="mj-nav-link">
                <i className="fas fa-boxes mj-nav-icon" /> Inventory
              </a>
            </li>
            <li className="mj-nav-item">
              <a href="#" className="mj-nav-link">
                <i className="fas fa-cogs mj-nav-icon" /> Production Status
              </a>
            </li>
            <li className="mj-nav-item">
              <a href="#" className="mj-nav-link">
                <i className="fas fa-chart-line mj-nav-icon" /> Sales Record
              </a>
            </li>
          </ul>
        </div>

        {/* Settings Section */}
        <div className="mj-menu-section">
          <h6 className="mj-section-title">Settings</h6>
          <ul className="mj-nav-list">
            <li className="mj-nav-item">
              <a href="#" className="mj-nav-link">
                <i className="fas fa-user mj-nav-icon" /> Account
              </a>
            </li>
            <li className="mj-nav-item">
              <a href="#" className="mj-nav-link">
                <i className="fas fa-sliders-h mj-nav-icon" /> Preferences
              </a>
            </li>
            <li className="mj-nav-item">
              <a href="#" className="mj-nav-link">
                <i className="fas fa-question-circle mj-nav-icon" /> Help & Support
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
