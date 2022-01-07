/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
function DashboardTab(props) {

    return (
        <div>
            <section className="pt-5 bg-section-secondary">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="row align-items-center">
                                <div className="col-auto w-100">
                                    {props.children}
                                </div>
                            </div>
                            <div className="mt-4">
                                <ul className="nav nav-tabs overflow-x">
                                    {/* <li className="nav-item">
                                        <NavLink
                                            activeClassName="active"
                                            to={
                                                APP_URL.USER_PROFILE +
                                                auth.user.displayName
                                            }
                                            className="nav-link">
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            activeClassName="active"
                                            to={ APP_URL.USER_PROFILE_EDIT }
                                            className="nav-link">
                                            Settings
                                        </NavLink>
                                    </li> */}
                                    {/* <li className="nav-item">
                                        <a
                                            href="billing.html"
                                            className="nav-link">
                                            Billing
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="cards.html"
                                            className="nav-link">
                                            Cards
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="security.html"
                                            className="nav-link">
                                            Security
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="users.html"
                                            className="nav-link">
                                            Followers
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href=""
                                            className="nav-link">
                                            Classrooms
                                        </a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
DashboardTab.propTypes = {
    children: PropTypes.any.isRequired,
}
export default DashboardTab
