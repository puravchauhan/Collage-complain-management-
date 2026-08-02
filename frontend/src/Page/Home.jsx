import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Home.css";

<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>

const Home = () => {
    return(
        <>
        
         <section className="hero py-5">
      <div className="container">
        <div className="row align-items-center gy-5">

          {/* Left Side */}
          <div className="col-lg-6">

            <small className="hero-tag">
              CAMPUS GRIEVANCE REGISTRY
            </small>

            <h1 className="hero-title mt-3">
              Every complaint gets a
              <br />
              case number. Every
              <br />
              case gets an answer.
            </h1>

            <p className="hero-text mt-4">
              File a grievance about academics, hostel life,
              faculty conduct, or campus infrastructure —
              and follow it, step by logged step,
              until it's closed.
            </p>

            <div className="mt-4 d-flex gap-3 flex-wrap">

              <Link to="/complaint" className="btn btn-dark px-4 py-3">
                File a complaint
              </Link>

              <Link to="/track" className="btn btn-outline-dark px-4 py-3">  Track a case</Link>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6">
            <div className="cards-area">
              <div className="case-card resolved">
                <small>CGR-2288</small>
                <small className="d-block text-muted">
                  ACADEMICS
                </small>
                <span className="status green">
                  RESOLVED
                </span>
                <h5 className="mt-4">
                  Grade dispute in Applied Statistics
                </h5>
              </div>

              <div className="case-card review">
                <small>CGR-2291</small>
                <small className="d-block text-muted">
                  COLLAGE 
                </small>
                <span className="status orange">
                  IN REVIEW
                </span>
                <h5 className="mt-4">
                  Water leakage, Block C third floor,
                  unresolved for 2 days
                </h5>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>


<section className="work-section py-5">

  <div className="container-fluid ">

    {/* Statistics */}
    <div className="row text-center border-top border-bottom py-4 space ">

      <div className="col-md-3 border-end font">
        <h2 className="fw-bold">1200 + </h2>
        <p className="text-muted mb-0 text-center"> Students</p>
      </div>

      <div className="col-md-3 border-end font">
        <h2 className="fw-bold">50 +</h2>
        <p className="text-muted mb-0">Complaints</p>
      </div>

      <div className="col-md-3 border-end font">
        <h2 className="fw-bold">10</h2>
        <p className="text-muted mb-0"> Technicians </p>
      </div>

      <div className="col-md-3 font">
        <h2 className="fw-bold">95% </h2>
        <p className="text-muted mb-0">Resolved </p>
      </div>

    </div>
    </div>

    {/* Heading */}

<div className="container">

    <div className="mt-5">

      <small className="text-uppercase  how">
        How It Works
      </small>

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

          <h3 className="mt-3">
            Report an Issue
          </h3>

          <p>
            Submit your complaint - Students can report problems such as Wi-Fi, electricity, water leakage, classroom issues, etc.
          </p>

        </div>

      </div>

      <div className="col-lg-4">

        <div className="step-card">

          <div className="line"></div>

          <small className="text-muted">02</small>

          <h3 className="mt-3">
            Track & Assign
          </h3>

          <p>

The admin reviews the complaint, sets the priority, and assigns it to the appropriate technician.
          </p>

        </div>

      </div>

      <div className="col-lg-4">

        <div className="step-card">

          <div className="line"></div>

          <small className="text-muted">03</small>

          <h3 className="mt-3">
            Get It Resolved
          </h3>

          <p>
            The technician works on the complaint and updates the status. Students can track the progress until it is resolved.
          </p>

        </div>

      </div>

      

    </div>

  </div>

</section>

 <section className="categories py-5">
  <div className="container p-3">

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
        
        
        
        </>
    )
}

export default Home