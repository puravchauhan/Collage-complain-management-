import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg2 text-white pt-5 pb-3 ">
      <div className="container">
        {/* Footer Columns */}
        <div className="row g-4">
          {/* Quick Links */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-4">Quick Links</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>

              <li className="mb-2">
                <a href="/about" className="text-light text-decoration-none">
                  About
                </a>
              </li>

              <li className="mb-2">
                <a href="/contact" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>

              <li className="mb-2">
                <a href="/privacy" className="text-light text-decoration-none">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-4">Services</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="/complaint"
                  className="text-light text-decoration-none"
                >
                  Complaint
                </a>
              </li>

              <li className="mb-2">
                <a href="/tracking" className="text-light text-decoration-none">
                  Tracking
                </a>
              </li>

              <li className="mb-2">
                <a href="/reports" className="text-light text-decoration-none">
                  Reports
                </a>
              </li>

              <li className="mb-2">
                <a href="/support" className="text-light text-decoration-none">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-4">Follow Us</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  <i className="bi bi-facebook me-2"></i>
                  Facebook
                </a>
              </li>

              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  <i className="bi bi-instagram me-2"></i>
                  Instagram
                </a>
              </li>

              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  <i className="bi bi-linkedin me-2"></i>
                  LinkedIn
                </a>
              </li>

              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  <i className="bi bi-github me-2"></i>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-secondary my-4" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-light mb-0">
            © 2026 College Complaint & Maintenance Portal
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
