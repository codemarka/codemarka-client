import React from "react";
import { Link } from 'react-router-dom';

import Helmet from "../../components/SEO/helmet";
import "./notFound.css";

import Illustraion from "../../media/images/svg/illustrations/illustration-13.svg";

export default function NotFound() {
  return (
      <div>
          <Helmet title="Page Not Found"/>
          <section>
              <div className="container d-flex flex-column">

                  <div className="row align-items-center justify-content-between min-vh-100">
                      <div className="col-12 col-md-6 col-xl-7 order-md-2">
     
                          <img alt="placeholder" src={ Illustraion } className="img-fluid" />
                      </div>
                      <div className="col-12 col-md-6 col-xl-5 order-md-1 text-center text-md-left">
                          <h6 className="display-1 mb-3 font-weight-600 text-warning">
                              Ooops!
                          </h6>
                          <p className="lead text-lg mb-5">
                              The page you are looking for could not be found.
                          </p>
                          <Link
                to="/"
                className="btn btn-dark btn-icon hover-translate-y-n3"
              >
                              <span className="btn-inner--icon">
                                  <i data-feather="home" />
                              </span>{" "}
                              <span className="btn-inner--text">Return home</span>
                          </Link>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  );
}
