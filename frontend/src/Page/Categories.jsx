
import React, { useState, useEffect } from "react";
import "./Css/categories.css";
import Footer from "../Component/Footer";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formData, setFormData] = useState({
    problem: "",
    priority: "",
    location: "",
    description: "",
    image: null
});

  const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");
const [error, setError] = useState("");
const [complaints, setComplaints] = useState([]);
const [complaintsLoading, setComplaintsLoading] = useState(true);

  const categories = [
    {
      icon: "bi-wifi",
      title: "Wi-Fi & Internet",
      description: "Report internet, Wi-Fi or network problems.",
      problems: [
        "No Internet Connection",
        "Slow Internet",
        "Wi-Fi Not Connecting",
        "Frequent Disconnection",
        "Weak Signal",
      ],
    },
    {
      icon: "bi-lightbulb",
      title: "Electricity",
      description: "Report problems with lights, fans and power.",
      problems: [
        "Fan Not Working",
        "Light Not Working",
        "Switch Problem",
        "Power Failure",
        "Other",
      ],
    },
    {
      icon: "bi-droplet",
      title: "Water & Plumbing",
      description: "Report water leakage and plumbing problems.",
      problems: [
        "Water Leakage",
        "Tap Problem",
        "Pipe Damage",
        "No Water",
        "Other",
      ],
    },
    {
      icon: "bi-building",
      title: "Classroom",
      description: "Report classroom infrastructure problems.",
      problems: [
        "Door Problem",
        "Window Problem",
        "Projector Problem",
        "AC Problem",
        "Other",
      ],
    },
    {
      icon: "bi-pc-display",
      title: "Computer Lab",
      description: "Report computer and laboratory equipment issues.",
      problems: [
        "Computer Not Working",
        "Printer Problem",
        "Software Problem",
        "Network Problem",
        "Other",
      ],
    },
    {
      icon: "bi-grid-3x3-gap",
      title: "Furniture",
      description: "Report broken desks, chairs and furniture.",
      problems: [
        "Broken Chair",
        "Broken Desk",
        "Damaged Bench",
        "Cabinet Problem",
        "Other",
      ],
    },
    {
      icon: "bi-trash",
      title: "Cleanliness",
      description: "Report cleaning and sanitation problems.",
      problems: [
        "Dirty Classroom",
        "Garbage Problem",
        "Washroom Cleaning",
        "Dustbin Problem",
        "Other",
      ],
    },
    {
      icon: "bi-three-dots",
      title: "Other Issues",
      description: "Report any other campus-related problem.",
      problems: ["General Maintenance", "Security", "Transport", "Other"],
    },
  ];

const loadComplaints = async () => {
    try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            setComplaints([]);
            setComplaintsLoading(false);
            return;
        }

        setComplaintsLoading(true);

        const response = await fetch(
            `https://localhost:7277/api/Complaint/student/${userId}`
        );

        if (!response.ok) {
            throw new Error("Failed to load complaints.");
        }

        const data = await response.json();

        setComplaints(data);
    } catch (error) {
        console.error("Complaint loading error:", error);
        setComplaints([]);
    } finally {
        setComplaintsLoading(false);
    }
};


useEffect(() => {
  loadComplaints();
}, []);



  const openComplaintModal = (category) => {
    setSelectedCategory(category);

    setFormData({
      problem: "",
      priority: "",
      location: "",
      description: "",
      image: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleComplaintSubmit = async (e) => {
  e.preventDefault();

  setSuccess("");
  setError("");

  if (!selectedCategory) {
    setError("Please select a complaint category.");
    return;
  }

  if (!formData.problem) {
    setError("Please select a problem.");
    return;
  }

  if (!formData.priority) {
    setError("Please select priority.");
    return;
  }

  if (!formData.location.trim()) {
    setError("Please enter location.");
    return;
  }

  if (!formData.description.trim()) {
    setError("Please enter description.");
    return;
  }

  try {
    setLoading(true);

    const userId = localStorage.getItem("userId");

if (!userId) {
    setError("Please login before submitting a complaint.");
    return;
}

const data = new FormData();

data.append("UserId", userId);
data.append("Category", selectedCategory.title);
data.append("Problem", formData.problem);
data.append("Priority", formData.priority);
data.append("Location", formData.location);
data.append("Description", formData.description);

if (formData.image) {
    data.append("Image", formData.image);
}

    const response = await fetch(
      "https://localhost:7277/api/Complaint",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();

    if (response.ok) {
  setSuccess(result.message || "Complaint submitted successfully!");

  // Reload complaints from database without refreshing page
  await loadComplaints();

  setFormData({
    problem: "",
    priority: "",
    location: "",
    description: "",
    image: null,
  });

  setSelectedCategory(null);

  const modalElement = document.getElementById("complaintModal");

  if (modalElement && window.bootstrap) {
    const modal = window.bootstrap.Modal.getInstance(modalElement);

    if (modal) {
      modal.hide();
    }
  }
}

  } catch (error) {
    console.error("Complaint Error:", error);

    setError(
      error.message || "Unable to submit complaint. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* HERO */}
      <div className="category-hero">
        <img
          src="https://www.econ.msu.ru/sys/raw.php?o=131254&p=Image&t=1758799780"
          alt="logo"
        />
      </div>

      {/* HOW IT WORKS */}
      <section className="py-5 bg-white top">
        <div className="container mt-5">
          <div className="text-center mb-5">
            <span className="px-3 py-2 hero-tag">
              SIMPLE PROCESS
            </span>

            <h2 className="fw-bold mt-3">How It Works</h2>

            <p className="text-secondary">
              Report and track your college complaint in four
              simple steps.
            </p>
          </div>

          <div className="row g-4 text-center">

            {/* STEP 1 */}
            <div className="col-6 col-lg-3">
              <div className="mb-3">
                <div
                  className="bg-dark text-warning rounded-circle mx-auto 
                  d-flex align-items-center justify-content-center"
                  style={{
                    width: "65px",
                    height: "65px",
                    fontSize: "25px",
                  }}
                >
                  <i className="bi bi-grid section-tag3"></i>
                </div>
              </div>

              <span className="section-tag2 fw-bold">
                STEP 01
              </span>

              <h5 className="fw-bold mt-2">
                Choose Category
              </h5>

              <p className="small text-secondary">
                Select the category that matches your problem.
              </p>
            </div>

            {/* STEP 2 */}
            <div className="col-6 col-lg-3">
              <div className="mb-3">
                <div
                  className="bg-dark text-warning rounded-circle mx-auto 
                  d-flex align-items-center justify-content-center"
                  style={{
                    width: "65px",
                    height: "65px",
                    fontSize: "25px",
                  }}
                >
                  <i className="bi bi-pencil-square section-tag3"></i>
                </div>
              </div>

              <span className="fw-bold section-tag2">
                STEP 02
              </span>

              <h5 className="fw-bold mt-2">
                Fill Details
              </h5>

              <p className="small text-secondary">
                Describe your problem and provide its location.
              </p>
            </div>

            {/* STEP 3 */}
            <div className="col-6 col-lg-3">
              <div className="mb-3">
                <div
                  className="bg-dark text-warning rounded-circle mx-auto 
                  d-flex align-items-center justify-content-center"
                  style={{
                    width: "65px",
                    height: "65px",
                    fontSize: "25px",
                  }}
                >
                  <i className="bi bi-send section-tag3"></i>
                </div>
              </div>

              <span className="section-tag2 fw-bold">
                STEP 03
              </span>

              <h5 className="fw-bold mt-2">
                Submit Complaint
              </h5>

              <p className="small text-secondary">
                Submit your complaint to the college system.
              </p>
            </div>

            {/* STEP 4 */}
            <div className="col-6 col-lg-3">
              <div className="mb-3">
                <div
                  className="bg-dark text-warning rounded-circle mx-auto 
                  d-flex align-items-center justify-content-center"
                  style={{
                    width: "65px",
                    height: "65px",
                    fontSize: "25px",
                  }}
                >
                  <i className="bi bi-graph-up section-tag3"></i>
                </div>
              </div>

              <span className="section-tag2 fw-bold">
                STEP 04
              </span>

              <h5 className="fw-bold mt-2">
                Track Status
              </h5>

              <p className="small text-secondary">
                Track your complaint until it is resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-5">
        <div className="container-fluid cd2 py-5 p-5">

          <div className="text-center mb-5">
            <span className="px-3 py-2 section-tag2">
              COMPLAINT CATEGORIES
            </span>

            <h2 className="fw-bold mt-3">
              What Problem Are You Facing?
            </h2>

            <p className="text-secondary">
              Select a category to report your campus problem.
            </p>
          </div>

          <div className="row g-4 mb-5">

            {categories.map((category, index) => (
              <div
                className="col-12 col-sm-6 col-lg-3 d-flex"
                key={index}
              >
                <div className="card cd1 h-100 w-100 border-0 shadow-sm">

                  <div className="card-body text-center p-4 d-flex flex-column">

                    {/* ICON */}
                    <div
                      className="border rounded-5 mx-auto mb-4 
                      d-flex align-items-center justify-content-center"
                      style={{
                        width: "70px",
                        height: "70px",
                        fontSize: "28px",
                      }}
                    >
                      <i
                        className={`bi ${category.icon} icon4`}
                      ></i>
                    </div>

                    {/* TITLE */}
                    <h5 className="fw-bold mb-2">
                      {category.title}
                    </h5>

                    {/* DESCRIPTION */}
                    <p className="text-secondary small">
                      {category.description}
                    </p>

                    {/* BUTTON */}
                    <button
                      type="button"
                      className="btn mb-3 mt-3 report"
                      data-bs-toggle="modal"
                      data-bs-target="#complaintModal"
                      onClick={() =>
                        openComplaintModal(category)
                      }
                    >
                      Report Issue
                      <i className="bi bi-arrow-right ms-2"></i>
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* COMMON ISSUES */}
      <section className="py-4 b5">
        <div className="container py-5">

          <div className="text-center mb-4">

            <span className="section-tag2 px-3 py-2 mb-4">
              COMMON ISSUES
            </span>

            <h2 className="fw-bold mt-3 mb-5 text-white">
              Frequently Reported Problems
            </h2>

          </div>

          <div className="row py-4 g-4">

            {/* WIFI */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="tag4 p-3 h-100">

                <i className="bi bi-wifi fs-3 section-tag3"></i>

                <h6 className="fw-bold mt-2">
                  Wi-Fi Not Working
                </h6>

                <small className="text-secondary">
                  Wi-Fi & Internet
                </small>

              </div>
            </div>

            {/* ELECTRICITY */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="tag4 p-3 h-100">

                <i className="bi bi-lightbulb fs-3 section-tag3"></i>

                <h6 className="fw-bold mt-2">
                  Fan / Light Problem
                </h6>

                <small className="text-secondary">
                  Electricity
                </small>

              </div>
            </div>

            {/* WATER */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="tag4 p-3 h-100">

                <i className="bi bi-droplet fs-3 section-tag3"></i>

                <h6 className="fw-bold mt-2">
                  Water Leakage
                </h6>

                <small className="text-secondary">
                  Water & Plumbing
                </small>

              </div>
            </div>

            {/* COMPUTER */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="tag4 p-3 h-100">

                <i className="bi bi-pc-display fs-3 section-tag3"></i>

                <h6 className="fw-bold mt-2">
                  Computer Not Working
                </h6>

                <small className="text-secondary">
                  Computer Lab
                </small>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RECENT COMPLAINTS */}
      <section className="py-5 mt-5">
        <div className="container p-0">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <span className="section-tag2 fw-bold">
                YOUR ACTIVITY
              </span>

              <h3 className="fw-bold mt-2 mb-0">
                Recent Complaints
              </h3>

            </div>

            <button className="btn btn-outline-dark btn-sm">
              View All
            </button>

          </div>

          <div className="table-responsive mb-5">

            <table className="table table-hover align-middle bg-white">

              <thead className="table-dark">

                <tr>
                  <th>Complaint ID</th>
                  <th>Category</th>
                  <th>Problem</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>

              </thead>

               <tbody>

            {complaintsLoading ? (
                <tr>
                    <td
                        colSpan="5"
                        className="text-center py-4"
                    >
                        Loading your complaints...
                    </td>
                </tr>
            ) : complaints.length === 0 ? (
                <tr>
                    <td
                        colSpan="5"
                        className="text-center py-4"
                    >
                        You have not submitted any complaints yet.
                    </td>
                </tr>
            ) : (
                complaints.slice(0, 3).map((complaint) => (
                    <tr key={complaint.id}>

                        <td>
                            <strong>
                                CMP-2026-
                                {String(complaint.id).padStart(3, "0")}
                            </strong>
                        </td>

                        <td>
                            {complaint.category}
                        </td>

                        <td>
                            {complaint.problem}
                        </td>

                        <td>
                            {complaint.priority}
                        </td>

                        <td>
                            {complaint.status}
                        </td>

                    </tr>
                ))
            )}

        </tbody>

            </table>

          </div>
        </div>
      </section>

      {/* TRACK COMPLAINT */}
      <section className="py-5 b4 text-white mb-5 mt-5">

        <div className="container py-2">

          <div className="row justify-content-center text-center">

            <div className="col-lg-7">

              <i className="bi bi-search fs-1 text-warning"></i>

              <h2 className="fw-bold mt-3">
                Track Your Complaint
              </h2>

              <p className="text-white-50">
                Enter your complaint ID to check the current status.
              </p>

              <div className="input-group">

                <input
                  type="text"
                  className="form-control"
                  placeholder="CMP-2026-00123"
                />

                <button className="btn btn-warning fw-semibold">

                  <i className="bi bi-search me-2"></i>

                  Track

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FAQ */}
      <section className="faq-section pb-5">

        <div className="container">

          <div className="section-heading mb-5 mt-5">

            <h2>
              Frequently Asked Questions
            </h2>

            <p>
              A few things students often ask before filing a complaint
            </p>

          </div>

          <div className="accordion" id="faqAccordion">

            {/* FAQ 1 */}
            <div className="accordion-item">

              <h2 className="accordion-header">

                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq1"
                >
                  How do I choose the right category?
                </button>

              </h2>

              <div
                id="faq1"
                className="accordion-collapse collapse show"
                data-bs-parent="#faqAccordion"
              >

                <div className="accordion-body">

                  Pick the category that most closely matches the issue.
                  If nothing fits, use "Others" and describe the problem
                  in detail — an administrator will re-route it to the
                  right technician if needed.

                </div>

              </div>

            </div>

            {/* FAQ 2 */}
            <div className="accordion-item">

              <h2 className="accordion-header">

                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq2"
                >
                  What does the priority level mean?
                </button>

              </h2>

              <div
                id="faq2"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >

                <div className="accordion-body">

                  Priority is set automatically based on category and can
                  be adjusted by an administrator. High-priority issues like
                  electrical faults or water leakage can be handled faster.

                </div>

              </div>

            </div>

            {/* FAQ 3 */}
            <div className="accordion-item">

              <h2 className="accordion-header">

                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq3"
                >
                  Can I upload a photo with my complaint?
                </button>

              </h2>

              <div
                id="faq3"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >

                <div className="accordion-body">

                  Yes. When you report an issue under any category, you can
                  attach an image to help the technician understand the problem.

                </div>

              </div>

            </div>

            {/* FAQ 4 */}
            <div className="accordion-item">

              <h2 className="accordion-header">

                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq4"
                >
                  How will I know when my complaint is resolved?
                </button>

              </h2>

              <div
                id="faq4"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >

                <div className="accordion-body">

                  You'll get a status update on your dashboard as the technician
                  moves your complaint through Assigned, In Progress and Resolved.

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SUCCESS / ERROR POPUP */}

{error && (
  <div className="contact-alert">
    <strong>Error!</strong>

    <div className="alert-message">
      {error}
    </div>

    <button
      type="button"
      className="btn-close btn-close-white shadow-none"
      aria-label="Close"
      onClick={() => setError("")}
    ></button>
  </div>
)}

{success && (
  <div className="contact-alert">
    <strong>Success!</strong>

    <div className="alert-message">
      {success}
    </div>

    <button
      type="button"
      className="btn-close btn-close-white shadow-none"
      aria-label="Close"
      onClick={() => setSuccess("")}
    ></button>
  </div>
)}

      {/* COMPLAINT MODAL */}
      <div
        className="modal fade"
        id="complaintModal"
        tabIndex="-1"
        aria-hidden="true"
      >

        <div className="modal-dialog modal-lg modal-dialog-centered">

          <div className="modal-content border-0 shadow">

            {/* HEADER */}
            <div className="modal-header bg-dark text-white">

              <div>

                <h5 className="modal-title fw-bold">
                  Report a Complaint
                </h5>

                <small className="text-white-50">
                  Provide details about your problem
                </small>

              </div>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>

            </div>

            {/* BODY */}
            <div className="modal-body p-4">

              <form onSubmit={handleComplaintSubmit}>

                <div className="row g-3">

                  {/* CATEGORY */}
                  <div className="col-12">

                    <label className="form-label fw-semibold">
                      Complaint Category
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={selectedCategory?.title || ""}
                      readOnly
                    />

                  </div>

                  {/* PROBLEM */}
                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Problem Type
                    </label>

                    <select
                      className="form-select"
                      name="problem"
                      value={formData.problem}
                      onChange={handleInputChange}
                    >

                      <option value="">
                        Select Problem
                      </option>

                      {selectedCategory?.problems?.map(
                        (problem, index) => (
                          <option
                            key={index}
                            value={problem}
                          >
                            {problem}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* PRIORITY */}
                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Priority
                    </label>

                    <select
                      className="form-select"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                    >

                      <option value="">
                        Select Priority
                      </option>

                      <option value="Low">
                        Low
                      </option>

                      <option value="Medium">
                        Medium
                      </option>

                      <option value="High">
                        High
                      </option>

                    </select>

                  </div>

                  {/* LOCATION */}
                  <div className="col-12">

                    <label className="form-label fw-semibold">
                      Location
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Example: Computer Lab 2"
                    />

                  </div>

                  {/* DESCRIPTION */}
                  <div className="col-12">

                    <label className="form-label fw-semibold">
                      Description
                    </label>

                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Describe your problem..."
                    ></textarea>

                  </div>

                  {/* IMAGE */}
                  <div className="col-12">

                    <label className="form-label fw-semibold">

                      Upload Image

                      <span className="text-secondary fw-normal">
                        {" "}
                        (Optional)
                      </span>

                    </label>

                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleInputChange}
                      accept="image/*"
                    />

                  </div>

                </div>

                {/* FOOTER BUTTONS */}
                <div className="modal-footer px-0 pb-0 mt-4">

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-dark px-4"
                    disabled={loading}
                  >

                    <i className="bi bi-send me-2"></i>

                    {loading
                      ? "Submitting..."
                      : "Submit Complaint"}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Categories;

