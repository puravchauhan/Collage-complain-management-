import React from "react";
import { BrowserRouter, Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './Nav.css'

const Navbar = () => {
    return(
        <>

      <nav className="navbar custom-navbar navbar-md fixed-top">
        <div className="container-fluid ms-4 me-4">

          
          <Link className="navbar-brand d-flex align-items-center" to="/">
  <img src="src/assets/4.png"  alt="logo" width="195" height="60" />
</Link>

          {/* Desktop Menu */}
          <div className="d-none d-lg-flex align-items-center ms-auto">
            <Link className="nav-link" to="/">
              How it works
            </Link>
            

            <Link className="nav-link" to="/categories">
              Categories
            </Link>

            <Link className="nav-link me-3" to="/track">
              Track a case
            </Link>

            <Link className="nav-link me-3 ms-3"  to="/about">
             About
            </Link>


            <Link className="btn complaint-btn me-2 ms-3" to="/login">
             Login
            </Link>

            <Link className="btn complaint-btn1 ms-3" to="/register">
              Register
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="btn menu-btn d-lg-none"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mobileMenu"
      >
        <div className="offcanvas-header">
          <h5 className="fw-bold">Campus Registry</h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">

          <Link
            className="mobile-link"
            to="/how-it-works"
            data-bs-dismiss="offcanvas"
          >
            How it works
          </Link>

          <Link
            className="mobile-link"
            to="/categories"
            data-bs-dismiss="offcanvas"
          >
            Categories
          </Link>

          <Link
            className="mobile-link"
            to="/track"
            data-bs-dismiss="offcanvas"
          >
            Track a case
          </Link>

          <Link
            className="btn complaint-btn w-100 mt-4"
            to="/complaint"
            data-bs-dismiss="offcanvas"
          >
            File a complaint
          </Link>

        </div>
      </div>
    
        </>
    )
}

export default Navbar 