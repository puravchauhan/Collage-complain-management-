import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Home.css";
import Footer from "../Component/Footer";

<link
  href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>;

const Home = () => {
  return (
    <>
      <section className="hero py-5">
        <div className="container">
          <div className="row align-items-center gy-5">
            {/* Left Side */}
            <div className="col-lg-6">
              <small className="hero-tag">CAMPUS GRIEVANCE REGISTRY</small>

              <h1 className="hero-title mt-3">
                Every complaint gets a
                <br />
                case number. Every
                <br />
                case gets an answer.
              </h1>

              <p className="hero-text mt-4">
                File a grievance about academics, hostel life, faculty conduct,
                or campus infrastructure — and follow it, step by logged step,
                until it's closed.
              </p>

              <div className="mt-4 d-flex gap-3 flex-wrap">
                <Link to="/complaint" className="btn btn-dark px-4 py-3">
                  File a complaint
                </Link>

                <Link to="/track" className="btn btn-outline-dark px-4 py-3">
                  {" "}
                  Track a case
                </Link>
              </div>
            </div>

            {/* Right Side */}

            <div className="col-lg-6">
              <div className="cards-area">
                <div className="case-card resolved">
                  <small>CGR-2288</small>
                  <small className="d-block text-muted">ACADEMICS</small>
                  <span className="status green">RESOLVED</span>
                  <h5 className="mt-4">Grade dispute in Applied Statistics</h5>
                </div>

                <div className="case-card review">
                  <small>CGR-2291</small>
                  <small className="d-block text-muted">COLLAGE</small>
                  <span className="status orange">IN REVIEW</span>
                  <h5 className="mt-4">
                    Water leakage, Block C third floor, unresolved for 2 days
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <div className="container-fluid bor ">
        <div className="row text-center border-top border-bottom py-4  space ">
          <div className="col-md-3 border-end border-black font">
            <h2 className="fw-bold">1200 + </h2>
            <p className="text-muted mb-0 text-center"> Students</p>
          </div>

          <div className="col-md-3 border-end border-black font">
            <h2 className="fw-bold">50 +</h2>
            <p className="text-muted mb-0">Complaints</p>
          </div>

          <div className="col-md-3 border-end  border-black font">
            <h2 className="fw-bold">10</h2>
            <p className="text-muted mb-0"> Technicians </p>
          </div>

          <div className="col-md-3 border-black font">
            <h2 className="fw-bold">95% </h2>
            <p className="text-muted mb-0">Resolved </p>
          </div>
        </div>
      </div>
      <section className="work-section py-5 ">
        <div className="container">
          <div className="mt-5">
            <small className="text-uppercase  how">How It Works</small>

            <h1 className="display-5 fw-bold mt-3">
              Three steps from filed to closed
            </h1>
          </div>

          {/* Steps */}

          <div className="row mt-5 ">
            <div className="col-lg-4 ">
              <div className="step-card">
                <div className="line"></div>

                <small className="text-muted">01</small>

                <h3 className="mt-3">Report an Issue</h3>

                <p>
                  Submit your complaint - Students can report problems such as
                  Wi-Fi, electricity, water leakage, classroom issues, etc.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="step-card">
                <div className="line"></div>

                <small className="text-muted">02</small>

                <h3 className="mt-3">Track & Assign</h3>

                <p>
                  The admin reviews the complaint, sets the priority, and
                  assigns it to the appropriate technician.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="step-card">
                <div className="line"></div>

                <small className="text-muted">03</small>

                <h3 className="mt-3">Get It Resolved</h3>

                <p>
                  The technician works on the complaint and updates the status.
                  Students can track the progress until it is resolved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories py-5">
        <div className="container p-4 mb-5 mt-5">
          <small className="section-tag">CATEGORIES</small>

          <h2 className="section-title mb-5">
            Filed under the right desk from day one
          </h2>

          <div className="row g-4">
            {/* Academics */}
            <div className="col-lg-4 col-md-6">
              <div className="category-card">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="icon-box">
                    <i className="bi bi-mortarboard-fill"></i>
                  </div>
                  <small>184 open</small>
                </div>

                <h4>Academics</h4>
                <p>Grades, exams, curriculum</p>
              </div>
            </div>

            {/* Hostel */}
            <div className="col-lg-4 col-md-6">
              <div className="category-card">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="icon-box">
                    <i className="bi bi-house-door-fill"></i>
                  </div>
                  <small>231 open</small>
                </div>

                <h4>Hostel & Mess</h4>
                <p>Rooms, food, maintenance</p>
              </div>
            </div>

            {/* Faculty */}
            <div className="col-lg-4 col-md-6">
              <div className="category-card">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="icon-box">
                    <i className="bi bi-person-workspace"></i>
                  </div>
                  <small>47 open</small>
                </div>

                <h4>Faculty Conduct</h4>
                <p>Bias, grading disputes</p>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="col-lg-4 col-md-6">
              <div className="category-card">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="icon-box">
                    <i className="bi bi-building-fill-gear"></i>
                  </div>
                  <small>96 open</small>
                </div>

                <h4>Infrastructure</h4>
                <p>Labs, Wi-Fi, classrooms</p>
              </div>
            </div>

            {/* Safety */}
            <div className="col-lg-4 col-md-6">
              <div className="category-card">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="icon-box">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <small>22 open</small>
                </div>

                <h4>Harassment & Safety</h4>
                <p>Confidential, escalated directly</p>
              </div>
            </div>

            {/* Administration */}
            <div className="col-lg-4 col-md-6">
              <div className="category-card">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="icon-box">
                    <i className="bi bi-file-earmark-text-fill"></i>
                  </div>
                  <small>68 open</small>
                </div>

                <h4>Administration</h4>
                <p>Fees, records, scheduling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light Track-2">
        <div className="container py-5 Track">
          <div className="row align-items-center g-4">
            {/* Left Side */}
            <div className="col-lg-6">
              <small className="hero-tag ">TRACK YOUR COMPLAINT</small>

              <h2 className="display-6 fw-bold mt-3 text-dark">
                Know what's happening
                <br />
                with your complaint.
              </h2>

              <p className="text-secondary mt-3">
                Enter your complaint ID to quickly check the current status of
                your complaint without logging in.
              </p>
            </div>

            {/* Right Side */}
            <div className="col-lg-6">
              <div className="bg-white border rounded-3 shadow-sm p-4">
                <label className="form-label fw-semibold">
                  Enter Complaint ID
                </label>

                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="CMP-2026-00123"
                  />

                  <button className="btn complaint-btn fw-semibold px-4">
                    Track
                  </button>
                </div>

                <small className="text-secondary">
                  Example: CMP-2026-00123
                </small>

                <div className="d-flex align-items-center gap-2 mt-4 text-secondary">
                  <i className="bi bi-search text-warning"></i>

                  <small>See your complaint status without logging in.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CAMPUSFIX ================= */}
      <section className="py-5 b1 Track ">
        <div className="container py-5  ">
          <div className="text-center mb-5">
            <small className="section-tag fw-bold ">WHY CAMPUSFIX?</small>

            <h2 className="display-6 fw-bold text-white mt-3 font-style">
              A smarter way to manage <br />
              campus problems.
            </h2>
          </div>

          <div className="row g-4 mb-5 mt-5">
            {/* Card 1 */}
            <div className="col-12 col-sm-6 col-lg-3 ">
              <div className="card h-100 category-card  text-white p-3 mb-4">
                <div className="fs-2 text-warning mb-3">
                  <i className="bi bi-file-earmark-text icon-box1"></i>
                </div>

                <h5 className="fw-bold font-style">No Paperwork</h5>

                <p className="text-secondary mb-0">
                  Submit complaints digitally without filling out physical
                  forms.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 category-card text-white p-3">
                <div className="fs-2 text-warning mb-3">
                  <i className="bi bi-send icon-box1"></i>
                </div>

                <h5 className="fw-bold font-style">Easy Submission</h5>

                <p className="text-secondary mb-0 font-style">
                  Report campus problems quickly from anywhere.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 category-card text-white p-3">
                <div className="fs-2 text-warning mb-3">
                  <i className="bi bi-graph-up-arrow icon-box1"></i>
                </div>

                <h5 className=" fw-bold font-style">Transparent Tracking</h5>

                <p className="text-secondary mb-0 font-style">
                  Track your complaint and know exactly what is happening.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 category-card text-white p-3">
                <div className="fs-2 text-warning mb-3">
                  <i className="bi bi-lightning-charge icon-box1"></i>
                </div>

                <h5 className="fw-bold font-style ">Faster Resolution</h5>

                <p className="text-secondary mb-0 font-style">
                  Complaints reach the right technician for quicker resolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="py-5 bg-light mt-5">
        <div className="container py-4 ">
          <div className="row g-5">
            {/* Contact Information */}
            <div className="col-lg-5 d-flex justify-content-center flex-column ">
              <small className="hero-tag fw-bold ">CONTACT US</small>

              <h2 className="display-6 fw-bold mt-3 mb-4 text-dark section-title">
                Need help?
                <br />
                We're here for you.
              </h2>

              <p className="text-secondary mt-1 ">
                For maintenance issues, technical support, or general
                assistance, contact the appropriate department.
              </p>

              {/* Maintenance */}
              <div className="d-flex gap-3 mt-4">
                <div className="contact-icon bg-dark text-warning rounded">
                  <i className="bi bi-tools icon-box1"></i>
                </div>

                <div>
                  <h6 className="fw-bold mb-1 font-style">
                    Maintenance Office
                  </h6>

                  <p className="text-secondary small mb-0 font-style">
                    For campus maintenance and repair issues.
                  </p>
                </div>
              </div>

              {/* IT Support */}
              <div className="d-flex gap-3 mt-5">
                <div className="contact-icon bg-dark text-warning rounded">
                  <i className="bi bi-pc-display icon-box1"></i>
                </div>

                <div>
                  <h6 className="fw-bold mb-1  font-style">IT Support</h6>

                  <p className="text-secondary small mb-0 font-style">
                    For Wi-Fi, computer and technical problems.
                  </p>
                </div>
              </div>

              {/* Administration */}
              <div className="d-flex gap-3 mt-5 ">
                <div className="contact-icon bg-dark text-warning rounded">
                  <i className="bi bi-building icon-box1"></i>
                </div>

                <div>
                  <h6 className="fw-bold mb-1 font-style">
                    College Administration
                  </h6>

                  <p className="text-secondary small mb-0 font-style">
                    For general college-related assistance.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7 ">
              <div className="bg-white border rounded-3 shadow-sm p-3 p-md-5">
                <h4 className="fw-bold font-style"> Send us a message </h4>

                <p className="text-secondary font-style">
                  Have a question? Send a message to our team.
                </p>

                <div className="row g-3 mt-2">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold"> Email </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold"> Subject </label>

                    <input
                      type="text"
                      className="form-control "
                      placeholder="How can we help?"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold"> Message </label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Write your message..."
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button className="btn btn-dark px-4 py-2 font-style">
                      {" "}
                      Send Message
                      <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <Footer />
    </>
  );
};

export default Home;
