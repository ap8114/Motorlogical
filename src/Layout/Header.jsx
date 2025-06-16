import React from "react";
import { Link } from "react-router-dom";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="py-2 px-3">
      <div className="d-flex align-items-center justify-content-between">
        {/* Toggle on mobile */}
     <button
  className="btn d-md-none"
  type="button"
  data-bs-toggle="offcanvas"
  data-bs-target="#mobileSidebar"
>
  <i className="fas fa-bars"></i>
</button>


        {/* Welcome message */}
        <div>
          <span className="fw-semibold">Welcome back, </span>
          <span className="fw-bold">Michael</span>
        </div>

        {/* Right section */}
        <div className="d-flex align-items-center gap-3">
          <button className="btn position-relative">
            <i className="far fa-bell"></i>
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle"></span>
          </button>

          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center" style={{ width: "35px", height: "35px" }}>
              M
            </div>
            <div className="ms-2 d-none d-md-block">
              <div className="fw-bold">Michael Johnson</div>
              <div className="text-muted small">Admin</div>
            </div>
          </div>

          <button className="btn d-none d-md-inline-block">
            <i className="fas fa-chevron-down"></i>
          </button>

          <Link to="/signup">
          <button className="btn btn-outline-danger">
            <i className="fas fa-sign-out-alt me-1"></i> Logout
          </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
