import React, { useState } from "react";
import "./Css/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    department: "",
    semester: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Bootstrap Alert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    // Student ID
    if (!formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Department
    if (!formData.department) {
      newErrors.department = "Please select your department";
    }

    // Semester
    if (!formData.semester) {
      newErrors.semester = "Please select your semester";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous alert
    setAlertMessage("");
    setAlertType("");

    // Validate
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:7277/api/Auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName: formData.fullName,
            studentId: formData.studentId,
            email: formData.email,
            phone: formData.phone,
            department: formData.department,
            semester: formData.semester,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      // =========================
      // SUCCESS
      // =========================
      if (response.ok) {
        setAlertMessage(
          data.message ||
            "Registration successful. Please check your email to verify your account."
        );

        setAlertType("success");

        // Clear form
        setFormData({
          fullName: "",
          studentId: "",
          email: "",
          phone: "",
          department: "",
          semester: "",
          password: "",
          confirmPassword: "",
        });

        setErrors({});
      }

      // =========================
      // ERROR FROM BACKEND
      // =========================
      else {
        setAlertMessage(
          data.message || "Registration failed."
        );

        setAlertType("danger");
      }
    } catch (error) {
      console.error("Registration error:", error);

      setAlertMessage(
        "Cannot connect to backend. Make sure ASP.NET is running."
      );

      setAlertType("danger");
    }
  };

  return (
    <div className="register-page">

      {/* =================================
          BOOTSTRAP ALERT
          OUTSIDE REGISTER BOX
          ================================= */}
      {alertMessage && (
        <div
          className={`alert alert-${alertType} alert-dismissible fade show register-alert`}
          role="alert"
        >
          <strong>
            {alertType === "success"
              ? "Success!"
              : "Error!"}
          </strong>

          <div className="alert-message">
            {alertMessage}
          </div>

          <button
            type="button"
            className="btn-close btn-close-white shadow-none"
            aria-label="Close"
            onClick={(e) => {
              e.currentTarget.blur();
              setAlertMessage("");
              setAlertType("");
            }}
          ></button>
        </div>
      )}

      {/* =================================
          MAIN REGISTER BOX
          ================================= */}
      <div className="register-box">

        {/* Brand */}
        <div className="brand">
          <span>■</span> CAMPUS CARE / WORK ORDER SYSTEM
        </div>

        {/* Title */}
        <h2 className="text-center fw-bold mb-2">
          CREATE ACCOUNT
        </h2>

        <p className="text-center text-secondary mb-4">
          Register your student account to report and track
          complaints.
        </p>

        {/* =================================
            REGISTRATION FORM
            ================================= */}
        <form onSubmit={handleSubmit}>

          <div className="row g-3">

            {/* Full Name */}
            <div className="col-12 col-md-6">
              <label className="form-label">
                FULL NAME
              </label>

              <input
                type="text"
                name="fullName"
                className={`form-control ${
                  errors.fullName ? "is-invalid" : ""
                }`}
                placeholder="Enter Your Name"
                value={formData.fullName}
                onChange={handleChange}
              />

              {errors.fullName && (
                <div className="invalid-feedback">
                  {errors.fullName}
                </div>
              )}
            </div>

            {/* Student ID */}
            <div className="col-12 col-md-6">
              <label className="form-label">
                STUDENT ID
              </label>

              <input
                type="text"
                name="studentId"
                className={`form-control ${
                  errors.studentId ? "is-invalid" : ""
                }`}
                placeholder="Enter Your Student ID"
                value={formData.studentId}
                onChange={handleChange}
              />

              {errors.studentId && (
                <div className="invalid-feedback">
                  {errors.studentId}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="col-12 col-md-6">
              <label className="form-label">
                EMAIL
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

            {/* Phone */}
            <div className="col-12 col-md-6">
              <label className="form-label">
                PHONE
              </label>

              <input
                type="tel"
                name="phone"
                className={`form-control ${
                  errors.phone ? "is-invalid" : ""
                }`}
                placeholder="Enter Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
              />

              {errors.phone && (
                <div className="invalid-feedback">
                  {errors.phone}
                </div>
              )}
            </div>

            {/* Department */}
            <div className="col-12 col-md-6">
              <label className="form-label">
                DEPARTMENT
              </label>

              <select
                name="department"
                className={`form-select ${
                  errors.department ? "is-invalid" : ""
                }`}
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">
                  Select Department
                </option>

                <option value="Computer Engineering">
                  Computer Engineering
                </option>

                <option value="Information Technology">
                  Information Technology
                </option>

                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>

                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>

                <option value="Civil Engineering">
                  Civil Engineering
                </option>
              </select>

              {errors.department && (
                <div className="invalid-feedback">
                  {errors.department}
                </div>
              )}
            </div>

            {/* Semester */}
            <div className="col-12 col-md-6">
              <label className="form-label">
                SEMESTER
              </label>

              <select
                name="semester"
                className={`form-select ${
                  errors.semester ? "is-invalid" : ""
                }`}
                value={formData.semester}
                onChange={handleChange}
              >
                <option value="">
                  Select Semester
                </option>

                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>

              {errors.semester && (
                <div className="invalid-feedback">
                  {errors.semester}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="col-12 col-md-6">
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

            {/* Confirm Password */}
            <div className="col-12 col-md-6">
              <label className="form-label">
                CONFIRM PASSWORD
              </label>

              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${
                  errors.confirmPassword
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Confirm Your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Register Button */}
            <div className="col-12 text-center mt-4">
              <button
                type="submit"
                className="btn register-btn"
              >
                CREATE ACCOUNT →
              </button>
            </div>

          </div>
        </form>

        {/* Login */}
        <div className="text-center mt-4 text-secondary">
          Already have an account?

          <a
            href="/login"
            className="login-link ms-2"
          >
            Login
          </a>
        </div>

      </div>
    </div>
  );
};

export default Register;