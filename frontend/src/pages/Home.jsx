import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div
        className="home-container"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div style={{ fontSize: "24px" }}>⏳ Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <div className="logo">💎</div>
          <h1>FinTrack Pro</h1>
          <p className="tagline">Your Personal Finance Manager</p>
        </div>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Expenses</h3>
            <p>Monitor your income and expenses with ease</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Secure & Private</h3>
            <p>Your financial data is protected with encryption</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Smart Analytics</h3>
            <p>Get insights into your spending patterns</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Easy to Use</h3>
            <p>Simple and intuitive user interface</p>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to take control of your finances?</h2>
          <div className="cta-buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      <div className="home-decoration">
        <div className="decoration-blob blob-1"></div>
        <div className="decoration-blob blob-2"></div>
      </div>
    </div>
  );
};

export default Home;
