import React from 'react'
import "./Layout.css"
const Header = () => {
  return (
    <div>
      <header className="mj-header-container">
        
  <div className="container-fluid">
    <div className="row align-items-center">
      {/* Welcome Section */}
      <div className="col-12 col-md-3 col-lg-2 mb-2 mb-md-0">
        <p className="mj-welcome-text">
          Welcome back, <span className="mj-welcome-name">Michael</span>
        </p>
      </div>
      {/* Dealership Section */}
      <div className="col-12 col-md-3 col-lg-3 mb-2 mb-md-0 d-none d-md-block">
        <div className="mj-dealership-section">
          <div className="mj-dealership-icon">
            <i className="fas fa-building" />
          </div>
          <span className="mj-dealership-text">Riverside Dealership</span>
        </div>
      </div>
      {/* Sync Section */}
      <div className="col-12 col-md-2 col-lg-2 mb-2 mb-md-0 d-none d-md-block">
        <div className="mj-sync-section">
          <i className="fas fa-sync-alt mj-sync-icon" />
          <span className="mj-sync-text">Synced</span>
        </div>
      </div>
      {/* Right Section */}
      <div className="col-12 col-md-4 col-lg-5">
        <div className="d-flex align-items-center justify-content-end gap-3">
          {/* Notification */}
          <button className="mj-notification-btn">
            <i className="far fa-bell mj-notification-icon" />
            <span className="mj-notification-badge" />
          </button>
          {/* User Section */}
          <div className="mj-user-section">
            <div className="mj-user-avatar">M</div>
            <div className="mj-user-info d-none d-md-block">
              <div className="mj-user-name">Michael Johnson</div>
              <div className="mj-user-role">Admin</div>
            </div>
            <button className="mj-user-dropdown d-none d-md-block">
              <i className="fas fa-chevron-down" />
            </button>
          </div>
          {/* Logout Button */}
          <button className="mj-logout-btn">
            <i className="fas fa-sign-out-alt mj-logout-icon" />
            <span className="mj-logout-text">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>

    </div>
  )
}

export default Header
