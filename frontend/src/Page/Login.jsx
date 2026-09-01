
import React, { useEffect, useState } from "react";
import "./Css/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ==============================
  // SWIPER
  // ==============================
  useEffect(() => {
    if (window.Swiper) {
      const swiper = new window.Swiper(".loginSwiper", {
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        effect: "fade",
        speed: 1000,
      });

      return () => {
        swiper.destroy();
      };
    }
  }, []);

  // ==============================
  // HANDLE INPUT
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      login: "",
    }));

    setSuccessMessage("");
  };

  // ==============================
  // VALIDATION
  // ==============================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // ==============================
  // LOGIN
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccessMessage("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      console.log("Sending login request...");

      const response = await fetch(
        "https://localhost:7277/api/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN STATUS:", response.status);
      console.log("LOGIN RESPONSE:", data);

      // ==============================
      // LOGIN FAILED
      // ==============================
      if (!response.ok) {
        setErrors({
          login: data.message || "Invalid email or password.",
        });

        return;
      }

      // ==============================
      // LOGIN SUCCESS
      // ==============================

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Save user ID separately
      localStorage.setItem(
        "userId",
        data.user.id.toString()
      );

      setSuccessMessage("Login successful! Redirecting...");

      // Wait 1 second so user can see success message
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setErrors({
        login:
          "Unable to connect to server. Please make sure the backend is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* ================= BACKGROUND SWIPER ================= */}

      <div className="swiper loginSwiper">

        <div className="swiper-wrapper">

          <div className="swiper-slide">
            <img
              src="https://img.jagranjosh.com/images/2023/January/212023/Universities.jpg"
              alt="University"
            />
          </div>

          <div className="swiper-slide">
            <img
              src="https://img.jagranjosh.com/images/2023/January/212023/Universities.jpg"
              alt="University"
            />
          </div>

          <div className="swiper-slide">
            <img
              src="https://img.jagranjosh.com/images/2023/January/212023/Universities.jpg"
              alt="University"
            />
          </div>

        </div>
      </div>

      {/* ================= DARK OVERLAY ================= */}

      <div className="login-overlay"></div>

      {/* ================= LOGIN FORM ================= */}

      <div className="login-box">

        {/* Brand */}

        <div className="brand">
          <span>■</span> CAMPUS CARE
        </div>

        {/* Heading */}

        <h2 className="fw-bold mb-2">
          WELCOME BACK
        </h2>

        <p className="text-secondary mb-4">
          Login to report and track your campus complaints.
        </p>

        {/* ================= LOGIN ERROR ================= */}

        {errors.login && (
          <div className="register-alert login-error-alert">

            <strong>Login Failed</strong>

            <div className="alert-message">
              {errors.login}
            </div>

          </div>
        )}

        {/* ================= LOGIN SUCCESS ================= */}

        {successMessage && (
          <div className="register-alert login-success-alert">

            <strong>Login Successful</strong>

            <div className="alert-message">
              {successMessage}
            </div>

          </div>
        )}

        {/* ================= FORM ================= */}

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}

          <div className="mb-3">

            <label className="form-label">
              COLLEGE EMAIL
            </label>

            <input
              type="email"
              name="email"
              className={`form-control ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <div className="invalid-feedback">
                {errors.email}
              </div>
            )}

          </div>

          {/* PASSWORD */}

          <div className="mb-2">

            <label className="form-label">
              PASSWORD
            </label>

            <input
              type="password"
              name="password"
              className={`form-control ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <div className="invalid-feedback">
                {errors.password}
              </div>
            )}

          </div>

          {/* FORGOT PASSWORD */}

          

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="btn login-btn w-100"
            disabled={loading}
          >

            {loading
              ? "LOGGING IN..."
              : "LOGIN →"}

          </button>

        </form>

        {/* REGISTER */}

        <div className="mt-4 text-secondary">

          Don't have an account?

          <a
            href="/register"
            className="register-link ms-1"
          >
            Create Account
          </a>

        </div>

      </div>

    </div>
  );
};

export default Login;