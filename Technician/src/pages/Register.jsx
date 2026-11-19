import React, { useState } from "react";

const API_URL = "https://localhost:7277/api/Technician/register";

export default function Register({ onRegister, onShowLogin }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (key, value) => {
    setForm(old => ({
      ...old,
      [key]: value
    }));
  };

  async function submit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate full name
    if (form.fullName.trim().length < 2) {
      return setError("Enter your full name.");
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return setError("Enter a valid email address.");
    }

    // Validate mobile number
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      return setError("Enter a valid 10-digit Indian mobile number.");
    }

    // Validate password
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    // Confirm password
    if (form.password !== form.confirmPassword) {
      return setError("Password and confirm password do not match.");
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.fullName.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.mobile,
          password: form.password
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Registration failed.");
        return;
      }

      setSuccess(
        data.message ||
        "Registration successful. Please wait for admin approval."
      );

      // Clear registration form
      setForm({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
      });

    } catch (err) {
      console.error("Registration error:", err);

      setError(
        "Unable to connect to server. Please check whether the backend is running."
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

          <div className="auth-form-content">

            <div className="auth-kicker">GET STARTED</div>

            <h1>Create your account</h1>

            <p className="auth-intro">
              Register as a technician to manage your campus maintenance jobs.
            </p>

            <form onSubmit={submit}>

              <div className="auth-grid">

                {/* Full Name */}
                <div className="auth-field auth-field-full">
                  <label htmlFor="fullName">Full name</label>

                  <div className="auth-input-wrap">
                    <i className="bi bi-person"></i>

                    <input
                      id="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={e =>
                        change("fullName", e.target.value)
                      }
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="auth-field">
                  <label htmlFor="regEmail">Email address</label>

                  <div className="auth-input-wrap">
                    <i className="bi bi-envelope"></i>

                    <input
                      id="regEmail"
                      type="email"
                      value={form.email}
                      onChange={e =>
                        change("email", e.target.value)
                      }
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="auth-field">
                  <label htmlFor="mobile">Mobile number</label>

                  <div className="auth-input-wrap">
                    <i className="bi bi-phone"></i>

                    <input
                      id="mobile"
                      type="tel"
                      inputMode="numeric"
                      maxLength="10"
                      value={form.mobile}
                      onChange={e =>
                        change(
                          "mobile",
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="10-digit mobile"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="auth-field">
                  <label htmlFor="regPassword">Password</label>

                  <div className="auth-input-wrap">
                    <i className="bi bi-lock"></i>

                    <input
                      id="regPassword"
                      type={show ? "text" : "password"}
                      value={form.password}
                      onChange={e =>
                        change("password", e.target.value)
                      }
                      placeholder="At least 6 characters"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="auth-field">
                  <label htmlFor="confirmPassword">
                    Confirm password
                  </label>

                  <div className="auth-input-wrap">
                    <i className="bi bi-shield-lock"></i>

                    <input
                      id="confirmPassword"
                      type={show ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={e =>
                        change("confirmPassword", e.target.value)
                      }
                      placeholder="Re-enter password"
                      required
                    />

                    <button
                      type="button"
                      className="auth-eye"
                      onClick={() => setShow(!show)}
                      aria-label="Show or hide passwords"
                    >
                      <i
                        className={`bi ${
                          show ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

              </div>

              {/* Error Message */}
              {error && (
                <div className="auth-error" role="alert">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div
                  role="status"
                  style={{
                    color: "#217a45",
                    background: "#eaf7ee",
                    padding: "12px",
                    borderRadius: "8px",
                    marginTop: "15px",
                    fontSize: "14px"
                  }}
                >
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                className="auth-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? "Registering..." : "Create Account"}
                <i className="bi bi-arrow-right"></i>
              </button>

            </form>

            <p className="auth-switch">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onShowLogin}
              >
                Sign in
              </button>
            </p>

          </div>

          <p className="auth-copyright">
            © {new Date().getFullYear()} Campus Maintenance Portal
          </p>

        </div>

        {/* Right Side Design */}
        <aside className="auth-visual">

          <span className="visual-pill">
            TECHNICIAN WORKSPACE
          </span>

          <div className="visual-copy">
            <p>ONE PORTAL. EVERY TASK.</p>

            <h2>
              Keep your campus<br />
              running smoothly.
            </h2>

            <span>
              Organise service requests, track job progress and stay
              connected with your maintenance team.
            </span>
          </div>

          <div className="visual-card">

            <b>Today's overview</b>

            <div className="visual-stats">

              <div>
                <strong>08</strong>
                <small>Assigned jobs</small>
              </div>

              <div>
                <strong>03</strong>
                <small>In progress</small>
              </div>

              <div>
                <strong>05</strong>
                <small>Completed</small>
              </div>

            </div>

            <div className="visual-progress">
              <span></span>
            </div>

            <small>✓ Your work makes a difference</small>

          </div>

          <div className="visual-footer">
            CAMPUS MAINTENANCE · SERVICE TEAM
          </div>

        </aside>

      </section>
    </main>
  );
}