import React from 'react';

import './styles.css';
// import svg from '../../images/slider-primary1.svg';
import Helmet from '../../components/SEO/helmet';

export default function Home() {
  return (
      <div className="header-container-fluid">
          <Helmet title="About codemarka" metaDescription="" />
          <section class="slice py-8 bg-dark bg-cover bg-size--cover">
              <span class="mask bg-gradient-dark opacity-9"></span>
              <div
                  data-offset-top="#navbar-main"
                  style={ { paddingTop: '59px' } }>
                  <div class="container d-flex align-items-center text-center text-lg-left py-5">
                      <div class="col px-0">
                          <div class="row row-grid align-items-center">
                              <div class="col-lg-8 text-lg-left text-sm-left text-md-left">
                                  <h1 class="text-white mb-4 tal-sm font-weight-bold">
                                      We built codemarka for software developers
                                      &amp; engineers.
                                  </h1>
                                  <p class="lead text-white opaci ty-8 tal-sm font-weight-light">
                                      Real time communication is an integral
                                      part of Codemarka. You get to write code
                                      in the browser, and see updated real time
                                      results just as you code. Currently,
                                      Codemarka ships with just HTML, CSS and
                                      Javascript editors with more
                                      implementations in the future.
                                  </p>
                                  <div class="mt-5">
                                      <a
                                          href="/public/contact-us"
                                          class="btn btn-warning btn-lg btn-icon">
                                          <span class="btn-inner--icon">
                                              <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="1em"
                                                  height="1em"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  stroke-width="2"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  class="feather feather-edit-3">
                                                  <path d="M12 20h9"></path>

                                                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                              </svg>
                                          </span>
                                          <span class="btn-inner--text">
                                                  Contact us
                                          </span>
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="shape-container shape-line shape-position-bottom"></div>
          </section>

          <section class="slice slice-lg">
              <div class="container">
                  <span class="badge badge-primary badge-pill">
                      Our Mission
                  </span>
                  <div class="row mt-4">
                      <div class="col-lg-6 pr-lg-5">
                          <p class="h5 lh-180 mb-3">
                              Our mission is to help bridge the gap of remote
                              workshops and learning.
                          </p>
                      </div>
                      <div class="col-lg-6">
                          <p class="lead lh-180">
                              <h3 className="heading h3">
                                  What is codemarka used for?
                              </h3>
                              We built codemarak with the community in
                              mind, people use it for various reasons. Some use
                              our tool to host workshops on various web topics
                              for their communities. For an individual you might
                              want to debug with a team member remotely.
                          </p>
                          <p className="lead lh-180">
                              <h3 className="heading h3">
                                  Who is codemarka for?
                              </h3>
                              <p>
                                  We are out to make everyone happy, newbies,
                                  pros and the gods can use codemarka but
                                  particularly front-end engineers.
                              </p>
                          </p>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
};