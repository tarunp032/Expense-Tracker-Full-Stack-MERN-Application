import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowMobileMenu(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setShowDropdown(false);
    setShowMobileMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
          <span className="logo-icon">💎</span>
          <span className="logo-text">FinTrack Pro</span>
        </div>

        {/* Hamburger Menu Button */}
        {isAuthenticated && user && (
          <button
            className="hamburger-btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            <span
              className={`hamburger-line ${showMobileMenu ? "active" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${showMobileMenu ? "active" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${showMobileMenu ? "active" : ""}`}
            ></span>
          </button>
        )}

        {/* Right Section */}
        {isAuthenticated && user && (
          <div
            className={`navbar-right ${showMobileMenu ? "mobile-open" : ""}`}
          >
            <div className="navbar-divider"></div>

            <div className="user-info">
              <span className="user-greeting">Welcome,</span>
              <span className="user-name">{user.fullName}</span>
            </div>

            {/* Action Buttons */}
            <button
              className="navbar-btn profile-menu-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="btn-icon">⚙️</span>
              Menu
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleProfile}>
                  👤 My Profile
                </button>
                <hr className="dropdown-divider" />
                <button
                  className="dropdown-item logout-btn"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
