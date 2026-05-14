import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOTP } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const userId = location.state?.userId;
  const email = location.state?.email;

  useEffect(() => {
    if (!userId || !email) {
      navigate("/login");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setError("OTP has expired. Please login again.");
          navigate("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [userId, email, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await verifyOTP({
        userId,
        otp,
      });

      console.log("OTP response:", response.data);

      const { token, user, message } = response.data;

      if (token && user) {
        login(user, token);
        navigate("/dashboard");
      } else {
        setError(message || "Invalid OTP");
      }
    } catch (err) {
      console.error("OTP error:", err);

      setError(
        err.response?.data?.message ||
          "OTP verification failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">📧</div>
          <h1>Verify OTP</h1>
          <p>We've sent a code to {email}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="otp-section">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="otp">Enter 6-Digit OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleChange}
                placeholder="000000"
                maxLength="6"
                required
                disabled={loading}
                className="otp-input"
                autoFocus
              />
            </div>

            <div className="otp-timer">
              ⏱️ Expires in:{" "}
              <span className="timer">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Didn't receive the code?{" "}
            <span className="auth-link" onClick={() => navigate("/login")}>
              Try Again
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

export default VerifyOTP;
