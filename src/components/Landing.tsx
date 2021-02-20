import React, { ReactNode } from "react";
import "./Landing.scss";
import { Link } from "react-router-dom";

function Landing(): ReactNode {
  return (
    <section className="hero is-info is-fullheight">
      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <span className="navbar-burger burger" data-target="navbarMenu">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenu" className="navbar-menu">
              <div className="navbar-end">
                <span className="navbar-item"></span>
                <span className="navbar-item"></span>
                <span className="navbar-item">
                  <Link
                    className="button is-white is-medium is-outlined"
                    to="/signin"
                  >
                    <span className="icon">
                      <i className="fas fa-user"></i>
                    </span>
                    <span>Sign In</span>
                  </Link>
                </span>
                <span className="navbar-item">
                  <a
                    className="button is-white is-outlined is-medium"
                    href="https://github.com/sleples/virrium"
                  >
                    <span className="icon">
                      <i className="fa fa-github"></i>
                    </span>
                    <span>View Source</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-6 is-offset-3">
            <h1 className="title">Virrium</h1>
            <h2 className="subtitle">Quiz yourself</h2>
            <Link
              className="button is-large is-white is-outlined start"
              to="/signin"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
