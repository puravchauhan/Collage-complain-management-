import React, { useState } from "react";

const API = "https://localhost:7277/api/Technician";

export default function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Send approved technician details to App.jsx
      onLogin(data.technician);

    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to server. Please try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-layout">

        <div className="auth-form-panel">
          <div className="auth-brand">
            <div className="auth-brand-mark">CM</div>
            <div>
              <b>Campus Maintenance</b>
              <small>TECHNICIAN PORTAL</small>
            </div>
          </div>

          <div className="auth-form-content login-content">
            <div className="auth-kicker">WELCOME BACK</div>
            <h1>Sign in to your account</h1>

            <p className="auth-intro">
              Use your registered email and password to open your technician dashboard.
            </p>

            <form onSubmit={submit}>
              <div className="auth-field auth-field-full">
                <label htmlFor="loginEmail">Email address</label>

                <div className="auth-input-wrap">
                  <i className="bi bi-envelope"></i>

                  <input
                    id="loginEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="auth-field auth-field-full login-password">
                <label htmlFor="loginPassword">Password</label>

                <div className="auth-input-wrap">
                  <i className="bi bi-lock"></i>

                  <input
                    id="loginPassword"
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="auth-eye"
                    onClick={() => setShow(!show)}
                    aria-label="Show or hide password"
                  >
                    <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
              </div>

              {error && (
                <div className="auth-error" role="alert">
                  {error}
                </div>
              )}

              <button
                className="auth-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
                <i className="bi bi-arrow-right"></i>
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account?{" "}
              <button type="button" onClick={onShowRegister}>
                Create account
              </button>
            </p>
          </div>

          <p className="auth-copyright">
            © {new Date().getFullYear()} Campus Maintenance Portal
          </p>
        </div>

        <aside className="auth-visual login-visual">
          <span className="visual-pill">TECHNICIAN WORKSPACE</span>

          <div className="visual-copy">
            <p>WELCOME TO YOUR WORKSPACE</p>
            <h2>Every repair<br />starts with you.</h2>
            <span>
              View assigned work, update job status and help create a better campus experience.
            </span>
          </div>

          <div className="visual-card">
            <b>Work order status</b>

            <div className="visual-task">
              <i className="bi bi-tools"></i>
              <div>
                <strong>Maintenance request</strong>
                <small>New task assigned to you</small>
              </div>
              <em>NEW</em>
            </div>

            <div className="visual-task">
              <i className="bi bi-check2-circle"></i>
              <div>
                <strong>Daily progress</strong>
                <small>Keep your work up to date</small>
              </div>
            </div>
          </div>

          <div className="visual-footer">
            CAMPUS MAINTENANCE · SERVICE TEAM
          </div>
        </aside>

      </section>
    </main>
  );
}