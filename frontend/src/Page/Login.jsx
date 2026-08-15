import React, { useEffect, useState } from "react";
import "./Css/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Swiper
  useEffect(() => {
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
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Login Data:", formData);

    alert("Login successful!");
  };

  return (
    <div className="login-page">

      {/* ================= BACKGROUND SWIPER ================= */}

      <div className="swiper loginSwiper">

        <div className="swiper-wrapper">

          <div className="swiper-slide">
            <img
              src="https://img.jagranjosh.com/images/2023/January/212023/Universities.jpg"
              
            />
          </div>

          <div className="swiper-slide">
            <img
              src="https://img.jagranjosh.com/images/2023/January/212023/Universities.jpg"
              
            />
          </div>

          <div className="swiper-slide">
            <img
              src="https://img.jagranjosh.com/images/2023/January/212023/Universities.jpg"
             
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


        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
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
              placeholder="purav@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <div className="invalid-feedback">
                {errors.email}
              </div>
            )}

          </div>


          {/* Password */}
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
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <div className="invalid-feedback">
                {errors.password}
              </div>
            )}

          </div>


          {/* Forgot Password */}
          <div className="text-end mb-4">

            <a
              href="/forgot-password"
              className="forgot-link"
            >
              Forgot Password?
            </a>

          </div>


          {/* Login */}
          <button
            type="submit"
            className="btn login-btn w-100"
          >
            LOGIN →
          </button>

        </form>


        {/* Register */}
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