import React from 'react';
import Button from '../../../components/Partials/Button';
import { Link } from 'react-router-dom';
import Macbook from '../../../media/images/svg/devices/macbook.svg';

import '../styles.css';
import * as url from '../../../config/url';
import laptopImg from '../../../media/images/ss.png';
import './home.css';

export default function Home() {
  return (
      <>
          <div className="header-container-fluid d-lex justify-content-center align-items-center" style={ {height:'100vh'} }>
              <section className="header-bg slice py-8 bg-dark bg-cover bg-size--cover" style={ {height:'100%'} }>
                  <span className="mask bg-gradient-dark opacity-9 h-100"/>
                  <div className="container d-flex align-items-center text-lg-left py-5">
                      <div className="col px-0">
                          <div className="row row-grid align-items-center">
                              <div className="col-lg-8 text-center text-lg-left">
                                  <h1 className="text-white mb-4 text-left">
                                      Remote Technical workshops, Interviews, Meetups on the cloud leveraging real time technology.
                                  </h1>
                                  <h4 className="text-white text-left">communicate in style with text, audio or video</h4>
                                  <div className="mt-5">
                                      <Link
                                          to={ url.AUTH_SIGN_UP }
                                          className="btn-inner--text text-white">
                                          <Button
                                              color="primary"
                                              size="md"
                                              icon="btn-icon">
                                              <span className="btn-inner--icon" />
                                              Get Started
                                          </Button>
                                      </Link>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
          </div>
          <div class="container mt-4">
              <div class="row row-grid align-items-center justify-content-between">
                  <div class="col-lg-5 col-md-6 order-md-2">
                      <div class="pr-md-4">
                          <h3 class="h2 mt-4">
                              Change the way you build softwares.
                          </h3>
                          <p class="lead my-4 lh-190">
                              You can combine the power of real time programming
                              and communication, linting, deployments and more.
                          </p>
                          <strong class="text-warning text-underline--dashed">
                              Modularity at its best
                          </strong>
                      </div>
                  </div>
                  <div class="col-md-6 col-lg-7 order-md-1">
                      <div class="frame-laptop">
                          <img
                              alt="Macbook"
                              src={ Macbook }
                              className="img-fluid"
                          />
                          <div class="frame-inner">
                              <img
                                  style={ { height: '90%' } }
                                  alt="placeholder"
                                  src={ laptopImg }
                                  className="img-fluid"
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <section class="slice slice-xl bg-primary" id="features">
              <div class="container">
                  <div class="row justify-content-center mb-6">
                      <div class="col-lg-7 text-center">
                          <h1 class="mb-4 text-white">
                              Features that you really need
                          </h1>
                          <p class="lh-190 text-white opacity-8">
                              With an intuitive markup, powerful and lightning
                              fast build tools, codemarka has everything you
                              need to turn your ideas into incredible products.
                          </p>
                      </div>
                  </div>
                  <div class="row mx-lg-n4">
                      <div class="col-lg-4 col-md-6 px-lg-4">
                          <div class="card shadow-none">
                              <div class="p-3 d-flex">
                                  <div>
                                      <div class="icon icon-shape rounded-circle bg-warning text-white mr-4">
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
                                              class="feather feather-check">
                                              <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                      </div>
                                  </div>
                                  <div>
                                      <span class="h6">
                                          Real Time Communication
                                      </span>
                                      <p class="text-sm text-muted mb-0">
                                          Time is precious
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <div class="card shadow-none">
                              <div class="p-3 d-flex">
                                  <div>
                                      <div class="icon icon-shape rounded-circle bg-primary text-white mr-4">
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
                                              class="feather feather-check">
                                              <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                      </div>
                                  </div>
                                  <div>
                                      <span class="h6">Code Liniting</span>
                                      <p class="text-sm text-muted mb-0">
                                          Faster build time.
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <div class="card shadow-none">
                              <div class="p-3 d-flex">
                                  <div>
                                      <div class="icon icon-shape rounded-circle bg-danger text-white mr-4">
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
                                              class="feather feather-check">
                                              <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                      </div>
                                  </div>
                                  <div>
                                      <span class="h6">Live Preview</span>
                                      <p class="text-sm text-muted mb-0">
                                          Bringing your project to life.
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div class="col-lg-4 col-md-6 px-lg-4">
                          <div class="card shadow-none">
                              <div class="p-3 d-flex">
                                  <div>
                                      <div class="icon icon-shape rounded-circle bg-warning text-white mr-4">
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
                                              class="feather feather-check">
                                              <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                      </div>
                                  </div>
                                  <div>
                                      <span class="h6">
                                          Classroom monitoring
                                      </span>
                                      <p class="text-sm text-muted mb-0">
                                          Know when, why and how it happened.
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <div class="card shadow-none">
                              <div class="p-3 d-flex">
                                  <div>
                                      <div class="icon icon-shape rounded-circle bg-primary text-white mr-4">
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
                                              class="feather feather-check">
                                              <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                      </div>
                                  </div>
                                  <div>
                                      <span class="h6">Github Integration</span>
                                      <p class="text-sm text-muted mb-0">
                                          Export class files to github.
                                      </p>
                                  </div>
                              </div>
                          </div>

                          <div class="card shadow-none">
                              <div class="p-3 d-flex">
                                  <div>
                                      <div class="icon icon-shape rounded-circle bg-danger text-white mr-4">
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
                                              class="feather feather-check">
                                              <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                      </div>
                                  </div>
                                  <div>
                                      <span class="h6">Audio Broadcast</span>
                                      <p class="text-sm text-muted mb-0">
                                          If texts don't hit hard,voices might.
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div class="col-lg-4 col-md-6 px-lg-4">
                          <div class="card shadow-none">
                              <div class="p-3 d-flex">
                                  <div>
                                      <div class="icon icon-shape rounded-circle bg-success text-white mr-4">
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
                                              class="feather feather-check">
                                              <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                      </div>
                                  </div>
                                  <div>
                                      <span class="h6">
                                          20+ Language Support
                                      </span>
                                      <p class="text-sm text-muted mb-0">
                                          Built for everyone.
                                      </p>
                                  </div>
                              </div>
                          </div>

                          <div class="card shadow-none">
                              <div class="p-3 d-flex">
                                  <div>
                                      <div class="icon icon-shape rounded-circle bg-info text-white mr-4">
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              class="feather feather-check">
                                              <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                      </div>
                                  </div>
                                  <div>
                                      <span class="h6">Cool widgets</span>
                                      <p class="text-sm text-muted mb-0">
                                          A boost to your project.
                                      </p>
                                  </div>
                              </div>
                          </div>

                          <div class="card shadow-none">
                              <div class="p-3 d-flex">
                                  <div>
                                      <div class="icon icon-shape rounded-circle bg-warning text-white mr-4">
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
                                              class="feather feather-check">
                                              <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                      </div>
                                  </div>
                                  <div>
                                      <span class="h6">Beautiful Layout</span>
                                      <p class="text-sm text-muted mb-0">
                                          Interface Matters to us.
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <section className="slice slice-md bg-secondary">
              <div className="container-fluid">
                  <div className="row justify-content-center text-center">
                      <div className="mt-2 mb-4 col-12">
                          <h2 className="heading how_it_works_header">
                              How It works?
                          </h2>
                      </div>
                      <div className="col-md-4 mb-sm-4 col-sm-12">
                          <div className="icon_container how_it_works">
                              <span className="font-weight-bold mt-2 mb-2">
                                  <i className="fas how_it_works_icono fa-fingerprint mb-3 mt-3 fa-3x"></i>
                              </span>
                              <p className="lead lh-120">
                                  Create an account, with your email, google or
                                  github account.
                              </p>
                          </div>
                      </div>

                      <div className="col-md-4 col-sm-12">
                          <div className="icon_container how_it_works">
                              <span className="font-weight-bold mt-2 mb-2">
                                  <i className="fab how_it_works_icono fa-wpforms mb-3 mt-3 fa-3x"></i>
                              </span>
                              <p className="lead lh-120">
                                  Get a free public or private classroom by
                                  filling a simple form.
                              </p>
                          </div>
                      </div>

                      <div className="col-md-4 col-sm-12">
                          <div className="icon_container how_it_works">
                              <span className="font-weight-bold mt-2 mb-2">
                                  <i className="fas how_it_works_icono fa-users mt-3 mb-3 fa-3x"></i>
                              </span>
                              <p className="lead lh-120">
                                  Start the session ,Invite people to your class
                                  session and end whenever.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <section className="slice slice-lg bg-section-secondary">
              <div className="container">
                  <div className="row mb-6 justify-content-center text-center">
                      <div className="col-lg-8 col-md-10">
                          <h2 className="mt-4">Simple, Straight Pricing</h2>
                          <div className="mt-3">
                              <p className="lead lh-180">
                                  Thousands of developers and communities around
                                  the world have already made codemarka the main
                                  tool for collaboration and learning while
                                  building semantic websites.
                              </p>
                          </div>
                      </div>
                  </div>
                  <div className="row justify-content-center" id="pricing">
                      <div className="col-lg-4 col-md">
                          <div className="card card-pricing text-center px-3 shadow hover-scale-110">
                              <div className="card-header py-5 border-0 delimiter-bottom">
                                  <div className="h1 text-center mb-0">
                                      $
                                      <span className="price font-weight-bolder">
                                          0
                                      </span>
                                  </div>
                                  <span className="h6 text-muted">
                                      Personal Account
                                  </span>
                              </div>
                              <div className="card-body">
                                  <ul className="list-unstyled text-sm mb-4">
                                      <li>10 classrooms Max</li>
                                      <li>Use for personal or a comunity</li>
                                      <li>35 Max classroom students</li>
                                      <li>Code Linting</li>
                                      <li>Download Files</li>
                                      <li>Text-to-speech</li>
                                      <li>Live preveiew</li>
                                      <li>3 language Support</li>
                                  </ul>
                                  <Link
                                      to="/auth/signup?ref=home&auth=falseup"
                                      className="btn btn-sm btn-warning hover-translate-y-n3 hover-shadow-lg mb-3"
                                      target="_blank">
                                      Get started
                                  </Link>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md">
                          <div className="card card-pricing bg-primary text-center px-3 shadow hover-scale-110">
                              <div className="card-header py-5 border-0 delimiter-bottom">
                                  <div className="h1 text-white text-center mb-0">
                                      <span className="price font-weight-bolder">
                                          FREE
                                      </span>
                                  </div>
                                  <span className="h6 text-white">
                                      Community License
                                  </span>
                              </div>
                              <div className="card-body">
                                  <ul className="list-unstyled text-white text-sm opacity-8 mb-4">
                                      <li>100 classrooms Max</li>
                                      <li>Use for personal or a comunity</li>
                                      <li>300 Max classroom students</li>
                                      <li>Code Linting</li>
                                      <li>Download Files</li>
                                      <li>Audio Broadcast</li>
                                      <li>Text-to-speech</li>
                                      <li>Record class session</li>
                                      <li>Custom Domain</li>
                                      <li>Quiz Mode</li>
                                      <li>Github File Export</li>
                                  </ul>
                                  <Link  to={ url.COMMUNITY_ACCOUNT_SIGNUP_PAGE }
                                      className="btn btn-sm btn-white hover-translate-y-n3 hover-shadow-lg mb-3"
                                      target="_blank">
                                      Get started
                                  </Link>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="mt-5 text-center">
                      <p className="mb-2">
                          <i className="fa fa-info-circle"></i> codemarka is
                          still in development mode, not every feature for free
                          or paid accounts are available, once this features are
                          deployed they would be enabled for your respective
                          account types.
                      </p>
                      <p className="mb-2">
                          Both pricings contains all 6 months free support. Need
                          more?
                      </p>
                      <Link
                          to="/public/contact-us"
                          className="text-primary text-underline--dashed">
                          Contact us
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-arrow-right ml-2">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                      </Link>
                  </div>
              </div>
          </section>
      </>
  )
}
