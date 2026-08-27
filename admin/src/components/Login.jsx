import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Temporary frontend login
    if (email === "admin@campusfix.com" && password === "admin123") {
      localStorage.setItem("adminToken", "admin-login-success");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin email or password.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">

          <div className="col-lg-10">
            <div className="card admin-login-card border-0 shadow-lg">
              <div className="row g-0">

                {/* Left Side */}
                <div className="col-md-6 admin-info-section">
                  <div>
                    <div className="admin-logo">
                      <span>CF</span>
                    </div>

                    <h1>CampusFix</h1>

                    <p className="subtitle">
                      College Complaint & Maintenance Portal
                    </p>

                    <hr />

                    <h3>Admin Dashboard</h3>

                    <p>
                      Manage complaints, students, technicians and campus
                      maintenance activities from one place.
                    </p>

                    <div className="admin-features">
                      <p>✓ Manage Student Complaints</p>
                      <p>✓ Assign Technicians</p>
                      <p>✓ Track Complaint Status</p>
                      <p>✓ Monitor Campus Issues</p>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="col-md-6 bg-white">
                  <div className="login-form-section">

                    <div className="text-center mb-4">
                      <div className="admin-icon">🔐</div>
                      <h2 className="fw-bold">Admin Login</h2>
                      <p className="text-muted">
                        Sign in to access your dashboard
                      </p>
                    </div>

                    {error && (
                      <div className="alert alert-danger">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>

                      <div className="mb-3">
                        <label className="form-label">
                          Admin Email
                        </label>

                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Enter admin email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Password
                        </label>

                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control form-control-lg"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />

                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() =>
                              setShowPassword(!showPassword)
                            }
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="remember"
                          />

                          <label
                            className="form-check-label"
                            htmlFor="remember"
                          >
                            Remember me
                          </label>
                        </div>

                        <a href="/" className="forgot-link">
                          Forgot Password?
                        </a>
                      </div>

                      <button
                        type="submit"
                        className="btn admin-login-btn w-100 py-3"
                      >
                        Login to Dashboard →
                      </button>

                    </form>

                    <div className="text-center mt-4">
                      <small className="text-muted">
                        Authorized personnel only
                      </small>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;