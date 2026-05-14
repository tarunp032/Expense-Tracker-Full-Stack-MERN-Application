import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);

      console.log("Login response:", response?.data);

      const userId = response?.data?.userId;
      const email = response?.data?.email;
      const message = response?.data?.message;

      if (userId && email) {
        navigate("/verify-otp", {
          state: { userId, email },
        });
      } else {
        setError(message || "Login failed. No user found.");
      }
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err?.response?.data?.message ||
          "Login failed. Please check credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">💎</div>
          <h1>FinTrack Pro</h1>
          <p>Manage Your Finances Smartly</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login to Your Account</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <span className="auth-link" onClick={() => navigate("/signup")}>
              Signup Here
            </span>
          </p>
        </div>
      </div>

      <div className="auth-decoration">
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
      </div>
    </div>
  );
};

export default Login;
