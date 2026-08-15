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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Remove error when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
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
      newErrors.password =
        "Password must be at least 6 characters";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
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

    console.log("Registration Data:", formData);

    alert("Account created successfully!");

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
  };

  return (
    <div className="register-page">

      <div className="register-box">

        {/* Header */}
        <div className="brand">
          <span>■</span> CAMPUS CARE / WORK ORDER SYSTEM
        </div>

        <h2 className="text-center fw-bold mb-2">
          CREATE ACCOUNT
        </h2>

        <p className="text-center text-secondary mb-4">
          Register your student account to report and track
          complaints.
        </p>


        {/* Form */}
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
                placeholder="Purav Chauhan"
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
                placeholder="STU2026001"
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
                placeholder="9876543210"
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

                <option>
                  Computer Engineering
                </option>

                <option>
                  Information Technology
                </option>

                <option>
                  Electrical Engineering
                </option>

                <option>
                  Mechanical Engineering
                </option>

                <option>
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


            {/* Confirm Password */}
            <div className="col-12 col-md-6">

              <label className="form-label">
                CONFIRM PASSWORD
              </label>

              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword}
                </div>
              )}

            </div>


            {/* Button */}
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
        <div className="text-center mt-4 text-secondary ">

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