import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  TicketCheck, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2,
  LayoutDashboard, ClipboardList, TrendingUp, ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

/**
 * /admin/login
 * Split-screen admin login: form on the left, an abstract
 * dashboard-style visual panel on the right. Uses the same navy / gold /
 * cream tokens as the rest of the admin console (see index.css :root).
 */
export default function AdminLogin() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already logged in -> skip the login page entirely.
  if (isAuthenticated) {
    const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  const validate = () => {
    const next = {};
    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Invalid email format";
    }
    if (!password) {
      next.password = "Password is required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (!validate()) return;

    setSubmitting(true);
    try {
      await login({ email, password, rememberMe });
      const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setAuthError(err.message || "Invalid login credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        {/* ---------------------------------------------------------- */}
        {/* Left: form                                                  */}
        {/* ---------------------------------------------------------- */}
        <div className="login-form-side">
          <div className="login-form-wrap">
            <div className="login-brand">
              <div className="login-brand-logo">
                <TicketCheck size={20} color="#0f1620" strokeWidth={2.3} />
              </div>
              <div>
                <div className="login-brand-title">CCMP</div>
                <div className="login-brand-subtitle">ADMIN CONSOLE</div>
              </div>
            </div>

            <h1 className="login-heading">Admin Login</h1>
            <p className="login-subheading">
              Welcome back! Sign in to access your admin dashboard.
            </p>

            {authError && (
              <div className="login-alert" role="alert">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="login-field">
                <label htmlFor="login-email">Email / Username</label>
                <div className={`login-input-group${errors.email ? " has-error" : ""}`}>
                  <Mail size={16} className="login-input-icon" />
                  <input
                    id="login-email"
                    type="text"
                    autoComplete="username"
                    placeholder="admin@college.edu"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "login-email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <span className="login-field-error" id="login-email-error">{errors.email}</span>
                )}
              </div>

              <div className="login-field">
                <div className="login-field-label-row">
                  <label htmlFor="login-password">Password</label>
                  <a href="#forgot-password" className="login-forgot-link">Forgot password?</a>
                </div>
                <div className={`login-input-group${errors.password ? " has-error" : ""}`}>
                  <Lock size={16} className="login-input-icon" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "login-password-error" : undefined}
                  />
                  <button
                    type="button"
                    className="login-toggle-visibility"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={0}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="login-field-error" id="login-password-error">{errors.password}</span>
                )}
              </div>

              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <button type="submit" className="login-submit-btn" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 size={16} className="login-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="login-hint">
              Demo credentials — admin.jay@college.edu / admin123
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Right: visual panel                                         */}
        {/* ---------------------------------------------------------- */}
        <div className="login-visual-side">
          <div className="login-visual-content">
            <div className="login-visual-badge">
              <ShieldCheck size={14} />
              Secure admin access
            </div>
            <h2 className="login-visual-heading">
              Manage every complaint,<br />technician and ticket<br />in one place.
            </h2>
            <p className="login-visual-copy">
              A single console for tracking campus maintenance requests from
              submission to resolution.
            </p>

            <div className="login-mock-card">
              <div className="login-mock-card-row">
                <LayoutDashboard size={16} />
                <div className="login-mock-bar" style={{ width: "70%" }} />
              </div>
              <div className="login-mock-card-row">
                <ClipboardList size={16} />
                <div className="login-mock-bar" style={{ width: "45%" }} />
              </div>
              <div className="login-mock-card-row">
                <TrendingUp size={16} />
                <div className="login-mock-bar" style={{ width: "58%" }} />
              </div>
            </div>

            <div className="login-visual-quote">
              “Resolution time dropped noticeably after we moved everything
              into one dashboard.”
              <div className="login-visual-quote-author">Facilities Team Lead</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
