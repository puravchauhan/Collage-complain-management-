import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/About.css";
import Footer from "../Component/Footer";




const aboutFeatures = [
  {
    icon: "bi-file-earmark-plus",
    title: "Easy Reporting",
    text: "Students can report campus problems quickly."
  },
  {
    icon: "bi-search",
    title: "Complaint Tracking",
    text: "Track your complaint status at every stage."
  },
  {
    icon: "bi-person-check",
    title: "Technician Assignment",
    text: "Complaints are assigned to the right technician."
  },
  {
    icon: "bi-check-circle",
    title: "Faster Resolution",
    text: "Help the college resolve problems efficiently."
  }
];

const aboutSteps = [
  ["01", "bi-grid", "Choose Category", "Select the type of campus problem."],
  ["02", "bi-pencil-square", "Report Issue", "Enter the problem and location."],
  ["03", "bi-person-gear", "Get Assigned", "Admin assigns the complaint."],
  ["04", "bi-check2-circle", "Get Resolved", "Track the complaint until completion."]
];

function About() {
    
useEffect(() => {

  const feedbackSwiper = new window.Swiper(
    ".aboutFeedbackSwiper",
    {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      breakpoints: {
        768: {
          slidesPerView: 2,
        },

        992: {
          slidesPerView: 3,
        },
      },
    }
  );

  return () => {
    feedbackSwiper.destroy();
  };

}, []);

useEffect(() => {

  const swiper = new window.Swiper(".aboutHeroSwiper", {

    slidesPerView: 1,

    loop: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

  });

  return () => {
    swiper.destroy();
  };

}, []);

  return (
 
      <>
    
     <div className="aboutWrap">

      {/* ================= HERO ================= */}
      <section className="aboutHero text-white">
        <div className="container py-5">

          <div className="row align-items-center">

            <div className="col-lg-7">

              <span className="aboutBadge">
                ABOUT CAMPUSCARE
              </span>

              <h1 className="display-6 fw-bold mt-4">
                Making Campus
                <br />
                Better & Smarter.
              </h1>

              <p className="lead mt-4 heroDescription">
                CampusCARE is a digital complaint and maintenance
                management platform that makes campus problem reporting
                simple, transparent and organized.
              </p>

              <div className="mt-4">

                

                <a
                  href="/track"
                  className="btn btn-outline-light px-4"
                >
                  Track Complaint
                </a>

              </div>

            </div>

<div className="col-lg-5 mt-5 mt-lg-0">

  <div className="swiper aboutHeroSwiper mt-5">

    <div className="swiper-wrapper">

      <div className="swiper-slide">
        <img
          src="https://staloysiuspuc.edu.in/assets/images/facility/collegecampus.webp"
          alt="College Campus"
          className="aboutSwiperImage"
        />
      </div>

      <div className="swiper-slide">
        <img
          src="https://img.jagranjosh.com/images/2023/January/212023/Universities.jpg"
          alt="College Campus"
          className="aboutSwiperImage"
        />
      </div>

      <div className="swiper-slide">
        <img
          src="https://staloysiuspuc.edu.in/assets/images/facility/collegecampus.webp"
          alt="College Campus"
          className="aboutSwiperImage"
        />
      </div>

    </div>

   

  </div>

</div>

          </div>

        </div>
      </section>

       <section className="about-intro">
        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="about-label">
                OUR PURPOSE
              </div>

              <h2>
                A better way to
                <br />
                manage campus issues.
              </h2>
            </div>

            <div className="col-lg-7">
              <p className="intro-large">
                Campus CARE connects students, administrators and maintenance
                teams through one simple complaint management system.
              </p>

              <p className="intro-small">
                Instead of visiting different offices or repeatedly asking
                about the status of a complaint, students can submit an issue,
                receive a complaint ID and follow its progress online.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= WHAT IS CAMPUSFIX ================= */}
      <section className="aboutPaperSection py-5">

        <div className="container py-4">

          <div className="row align-items-center">

            <div className="col-lg-6">

              <span className="aboutBadgeDark">
                OUR PLATFORM
              </span>

              <h2 className="fw-bold mt-3">
                What is CampusCare?
              </h2>

              <h6 className="text-secondary mt-4">
                CampusCare is a centralized platform designed to
                simplify the process of reporting and managing
                maintenance problems inside a college campus.
              </h6>

              <p className="text-secondary">
                Students can report Wi-Fi problems, electricity
                issues, water leakage, classroom problems and
                other campus-related issues.
              </p>

              <p className="text-secondary">
                Administrators can assign complaints to technicians,
                while students can track the progress until the
                problem is resolved.
              </p>

            </div>


            <div className="col-lg-6 mt-4 mt-lg-0">

              <div className="row g-3">

                {aboutFeatures.map((item, index) => (

                  <div className="col-6" key={index}>

                    <div className="aboutInfoCard p-4 rounded-3 h-100">

                      <i className={`bi ${item.icon} aboutIcon fs-2`}></i>

                      <h5 className="fw-bold mt-3">
                        {item.title}
                      </h5>

                      <h6 className="small text-secondary mb-0">
                        {item.text}
                      </h6>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHY CAMPUSFIX ================= */}
      <section className="aboutWhiteSection py-5">

        <div className="container py-4">

          <div className="text-center mb-5">

            <span className="aboutBadgeDark">
              WHY CAMPUSCARE?
            </span>

            <h2 className="fw-bold mt-3">
              A Better Way to Handle Campus Problems
            </h2>

            <p className="text-secondary">
              Simple for students. Useful for administrators.
              Efficient for technicians.
            </p>

          </div>


          <div className="row g-4">

            {/* Card 1 */}
            <div className="col-md-4">

              <div className="aboutReasonCard p-4 rounded-3 h-100">

                <i className="bi bi-clock aboutIcon fs-1"></i>

                <h5 className="fw-bold mt-3">
                  Save Time
                </h5>

                <p className="text-secondary mb-0">
                  Report problems digitally without visiting
                  different offices or submitting paperwork.
                </p>

              </div>

            </div>


            {/* Card 2 */}
            <div className="col-md-4">

              <div className="aboutReasonCard p-4 rounded-3 h-100">

                <i className="bi bi-eye aboutIcon fs-1"></i>

                <h5 className="fw-bold mt-3">
                  Transparency
                </h5>

                <p className="text-secondary mb-0">
                  Students can see the current status of
                  their complaints.
                </p>

              </div>

            </div>


            {/* Card 3 */}
            <div className="col-md-4">

              <div className="aboutReasonCard p-4 rounded-3 h-100">

                <i className="bi bi-lightning-charge aboutIcon fs-1"></i>

                <h5 className="fw-bold mt-3">
                  Faster Action
                </h5>

                <p className="text-secondary mb-0">
                  Admins can assign complaints directly to
                  the appropriate technicians.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="aboutPaperSection py-5">

        <div className="container py-4">

          <div className="text-center mb-5">

            <span className="aboutBadgeDark">
              HOW IT WORKS
            </span>

            <h2 className="fw-bold mt-3">
              From Problem to Solution
            </h2>

          </div>


          <div className="row g-4">

            {aboutSteps.map((step, index) => (

              <div className="col-6 col-lg-3" key={index}>

                <div className="aboutStepCard bg-white p-4 rounded-3 h-100">

                  <small className="aboutStepNumber fw-bold">
                    {step[0]}
                  </small>

                  <div className="mt-3">

                    <i className={`bi ${step[1]} aboutIcon fs-2`}></i>

                  </div>

                  <h6 className="fw-bold mt-3">
                    {step[2]}
                  </h6>

                  <p className="small text-secondary mb-0">
                    {step[3]}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* ================= USERS ================= */}
      <section className="aboutUsersSection py-5 text-white">

        <div className="container py-4">

          <div className="text-center mb-5">

            <span className="aboutBadge">
              ONE PLATFORM
            </span>

            <h2 className="fw-bold mt-3">
              Built for Everyone on Campus
            </h2>

          </div>


          <div className="row g-4">

            {/* Student */}
            <div className="col-md-4">

              <div className="aboutUserCard p-4 rounded-3 h-100">

                <i className="bi bi-mortarboard aboutIcon fs-1"></i>

                <h5 className="fw-bold mt-3">
                  Students
                </h5>

                <p className="text-white-50 mb-0">
                  Report campus problems, track complaints
                  and provide feedback.
                </p>

              </div>

            </div>


            {/* Technician */}
            <div className="col-md-4">

              <div className="aboutUserCard p-4 rounded-3 h-100">

                <i className="bi bi-person-gear aboutIcon fs-1"></i>

                <h5 className="fw-bold mt-3">
                  Technicians
                </h5>

                <p className="text-white-50 mb-0">
                  View assigned complaints, update status
                  and complete maintenance tasks.
                </p>

              </div>

            </div>


            {/* Admin */}
            <div className="col-md-4">

              <div className="aboutUserCard p-4 rounded-3 h-100">

                <i className="bi bi-speedometer2 aboutIcon fs-1"></i>

                <h5 className="fw-bold mt-3">
                  Administrators
                </h5>

                <p className="text-white-50 mb-0">
                  Manage complaints, assign technicians
                  and monitor maintenance.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="aboutCta py-5 text-center">

        <div className="container py-4">

          <i className="bi bi-tools aboutIcon fs-1"></i>

          <h2 className="fw-bold mt-3">
            Have a Problem on Campus?
          </h2>

          <p className="text-secondary">
            Report the issue and help make your campus better.
          </p>

          <a
            href="/categories"
            className="btn aboutDarkButton px-4 mt-2"
          >
            Report an Issue
            <i className="bi bi-arrow-right ms-2"></i>
          </a>

        </div>

      </section>

    </div>


    {/* ================= STUDENT FEEDBACK ================= */}
<section className="aboutPaperSection py-5">

  <div className="container py-4">

    {/* Heading */}
    <div className="text-center mb-5">

      <span className="aboutBadgeDark">
        STUDENT FEEDBACK
      </span>

      <h2 className="fw-bold mt-3">
        What Students Say
      </h2>

      <p className="text-secondary">
        Hear from students who use CampusFix.
      </p>

    </div>


    {/* Swiper */}
    <div className="swiper aboutFeedbackSwiper">

      <div className="swiper-wrapper">

        {/* Feedback 1 */}
        <div className="swiper-slide">

          <div className="aboutFeedbackCard">

            <div className="aboutFeedbackStars">
              ★★★★★
            </div>

            <p className="text-secondary mt-3">
              "CampusCare made it very easy to report
              a classroom problem. The issue was
              resolved quickly."
            </p>

            <div className="d-flex align-items-center mt-4">

              <div className="aboutFeedbackAvatar">
                R
              </div>

              <div className="ms-3">

                <h6 className="fw-bold mb-1">
                  Rahul Patel
                </h6>

                <small className="text-secondary">
                  Computer Engineering
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* Feedback 2 */}
        <div className="swiper-slide">

          <div className="aboutFeedbackCard">

            <div className="aboutFeedbackStars">
              ★★★★★
            </div>

            <p className="text-secondary mt-3">
              "I can easily track my complaint without
              visiting the maintenance office. The
              tracking feature is very useful."
            </p>

            <div className="d-flex align-items-center mt-4">

              <div className="aboutFeedbackAvatar">
                P
              </div>

              <div className="ms-3">

                <h6 className="fw-bold mb-1">
                  Priya Shah
                </h6>

                <small className="text-secondary">
                  Information Technology
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* Feedback 3 */}
        <div className="swiper-slide">

          <div className="aboutFeedbackCard">

            <div className="aboutFeedbackStars">
              ★★★★☆
            </div>

            <p className="text-secondary mt-3">
              "The complaint process is simple and
              easy to understand. I can submit an issue
              within a few minutes."
            </p>

            <div className="d-flex align-items-center mt-4">

              <div className="aboutFeedbackAvatar">
                A
              </div>

              <div className="ms-3">

                <h6 className="fw-bold mb-1">
                  Aarav Mehta
                </h6>

                <small className="text-secondary">
                  Computer Science
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* Feedback 4 */}
        <div className="swiper-slide">

          <div className="aboutFeedbackCard">

            <div className="aboutFeedbackStars">
              ★★★★★
            </div>

            <p className="text-secondary mt-3">
              "The status tracking feature gives me
              a clear idea about what is happening
              with my complaint."
            </p>

            <div className="d-flex align-items-center mt-4">

              <div className="aboutFeedbackAvatar">
                N
              </div>

              <div className="ms-3">

                <h6 className="fw-bold mb-1">
                  Neha Joshi
                </h6>

                <small className="text-secondary">
                  Electronics Engineering
                </small>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Pagination */}
      <div className="swiper-pagination"></div>

    </div>

  </div>

</section>

<Footer/>
      </>
  );
}



export default About;