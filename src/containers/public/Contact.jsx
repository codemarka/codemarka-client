/** @format */

import React from 'react'
import Helmet from '../../components/SEO/helmet'

export default function Contact() {
    return (
        <React.Fragment>
            <Helmet title="Contact-Us" />
            <section className="slice py-6 pt-lg-7 pb-lg-8 bg-gradient-primary">
                <div className="container d-flex align-items-center text-center text-lg-left">
                    <div className="col px-0">
                        <div className="row row-grid align-items-center">
                            <div className="col-lg-6">
                                <h1 className="h1 text-white text-center text-lg-left my-4">
                                    Have a feature <strong>in mind?</strong>
                                </h1>
                                <p className="lead text-white text-center text-lg-left opacity-8">
                                    We are out to satify everyone, if you need
                                    an extra feature on codemarka do let us
                                    know.
                                </p>
                                <div className="mt-5 text-center text-lg-left">
                                    <a
                                        href="#sct-form-contact"
                                        data-scroll-to=""
                                        className="btn btn-white btn-lg btn-icon">
                                        <span className="btn-inner--icon">
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
                                                className="feather feather-edit-2">
                                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                            </svg>{' '}
                                        </span>
                                        <span className="btn-inner--text">
                                            Write a message
                                        </span>
                                    </a>
                                </div>
                                <div className="d-flex align-items-center justify-content-center justify-content-lg-left mt-5">
                                    <div className="col-auto text-sm text-white pl-0 pr-4">
                                        Trusted by:
                                    </div>
                                    <div className="client-group col">
                                        <div className="row">
                                            <div className="client col-3 py-3">
                                                <img
                                                    src="../../media/images/gd_dsc_lockup_vertical_white.png"
                                                    alt="developer students club"
                                                />
                                            </div>
                                            <div className="client col-3 py-3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="slice slice-lg">
                <div className="container">
                    <div className="row row-grid justify-content-between align-items-center">
                        <div className="col-lg-5">
                            <h3>
                                Somewhere in the world
                                <br />
                                Nigeria to be precise
                            </h3>
                            <p className="lead my-4">
                                E:{' '}
                                <a href="mailto:codemarka.dev@gmail.com">
                                    codemarka.dev@gmail.com
                                </a>
                                <br />
                                T: (+234) 8160 583 193
                            </p>
                            <p>
                                Want to share any feedback with us, report a
                                technical issue or just ask us a question? Fill
                                free to contact us and we will get back to you
                                shortly.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <div
                                id="map-custom"
                                className="map-canvas rounded-left"
                                data-lat="25.7617"
                                data-lng="-80.1918"
                                data-color="#0c66ff"
                                style={ { height: '600px' } }></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="slice slice-lg" id="sct-form-contact">
                <div className="container position-relative zindex-100">
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-6 text-center">
                            <h3>Contact us</h3>
                            <p className="lh-190">
                                If there's something we can help you with, jut
                                let us know. We'll be more than happy to offer
                                you our help
                            </p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <form id="form-contact">
                                <div className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your name"
                                        required=""
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="email"
                                        placeholder="email@example.com"
                                        required=""
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="+(***) *** **"
                                        required=""
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        data-toggle="autosize"
                                        placeholder="Tell us a few words ..."
                                        rows="3"
                                        required=""></textarea>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="reset"
                                        className="btn-reset d-none"></button>{' '}
                                    <button
                                        type="button"
                                        className="btn btn-block btn-lg btn-primary mt-4">
                                        Send your message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
