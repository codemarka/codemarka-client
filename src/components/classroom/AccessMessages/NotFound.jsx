/** @format */

// yet to start

import React from 'react'
import notFoundImg from '../../../media/images/vectors/hugo-fatal-error.png'

function NotFoundAlertMessage(props) {
   
    return (
        <div>
            <section class="vh-100 d-flex align-items-center">
                <div
                    class="position-absolute h-100 top-0 right-0 zindex-110 col-lg-6 col-xl-6 zindex-100 d-none d-lg-flex flex-column justify-content-end rounded-bottom-left"
                    data-bg-size="cover"
                    data-bg-position="center">
                    <img
                        src={ notFoundImg }
                        alt="Image"
                        class="img-as-bg rounded-bottom-left"
                    />
                </div>
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-sm-7 col-lg-6 col-xl-6 mx-auto ml-lg-0">
                            <div class="row justify-content-center">
                                <div class="col-11 col-lg-10 col-xl-6 py-5">
                                    <h6 class="display-1 mb-3 font-weight-600 text-warning">
                                        Oops!
                                    </h6>
                                    <p class="lead text-lg mb-3">Not Found!</p>

                                    <a
                                        href="/"
                                        class="btn btn-dark btn-icon hover-translate-y-n3 mt-3">
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
                                                class="feather feather-home">
                                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                            </svg>
                                        </span>{' '}
                                        <span class="btn-inner--text">
                                            Return home
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NotFoundAlertMessage
