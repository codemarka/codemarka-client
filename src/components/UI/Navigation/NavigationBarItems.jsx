/** @format */

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as url from '../../../config/url'

function NavigationBarItems(props) {
    const { displayName } = props.user
    // const isCommunityAccount = accountType === 102 ? true : false

    if (props.isAuthenticated) {
        return (
            <ul className="navbar-nav ml-auto align-items-center">
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={ { fontWeight: 'normal' } }
                        to={ url.HOME }>
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={ { fontWeight: 'normal' } }
                        to={ url.BLOG }>
                        Blog
                    </Link>
                </li>

                <li className="nav-item ">
                    <Link
                        className="nav-link"
                        style={ { fontWeight: 'normal' } }
                        to={ url.COMMUNITY_INDEX }>
                        Communities
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link
                        className="nav-link btn btn-sm btn-success "
                        style={ { fontWeight: 'normal', borderRadius: '6px' } }
                        to={ url.CLASSROOM_NEW }>
                        Create
                    </Link>
                </li>

                <li class="nav-item dropdown dropdown-animate">
                    <a
                        class="nav-link nav-link-icon"
                        href="#!"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <span class="avatar rounded-circle">
                            <img
                                alt={ displayName }
                                src={ props.user.displayImg }
                            />
                        </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right dropdown-menu-arrow p-3">
                        <h6 class="dropdown-header px-0 mb-2 text-primary">
                            Hi, {displayName}
                        </h6>

                        <Link
                            to={ url.USER_PROFILE + `${ displayName }` }
                            class="dropdown-item">
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
                                class="feather feather-user">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>{' '}
                            <span>My profile</span>{' '}
                        </Link>

                        {/* <Link to={url.ACCOUNT_BILLING} class="dropdown-item">
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
                                class="feather feather-credit-card">
                                <rect
                                    x="1"
                                    y="4"
                                    width="22"
                                    height="16"
                                    rx="2"
                                    ry="2"></rect>
                                <line x1="1" y1="10" x2="23" y2="10"></line>
                            </svg>{' '}
                            <span>Billing</span>{' '}
                        </Link>
                        <div class="dropdown-divider"></div>
                        <Link to={url.ACCOUNT_SETTINGS} class="dropdown-item">
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
                                class="feather feather-settings">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>{' '}
                            <span>Settings</span>{' '}
                        </Link> */}
                        <a href={ url.AUTH_LOGOUT } class="dropdown-item">
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
                                class="feather feather-log-out">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>{' '}
                            <span>Logout</span>
                        </a>
                    </div>
                </li>
            </ul>
        )
    } else {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={ { fontWeight: 'normal' } }
                        to={ url.HOME }>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={ { fontWeight: 'normal' } }
                        to={ url.BLOG }>
                        Blog
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link
                        className="nav-link"
                        style={ { fontWeight: 'normal' } }
                        to={ url.ABOUT }>
                        About
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link
                        className="nav-link"
                        style={ { fontWeight: 'normal' } }
                        to="/#pricing">
                        Pricing
                    </Link>
                </li>

                <li className="nav-item ">
                    <Link
                        className="nav-link"
                        style={ { fontWeight: 'normal' } }
                        to={ url.AUTH_SIGN_IN }>
                        Login
                    </Link>
                </li>
            </ul>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        username: auth.user.username,
        isAuthenticated: auth.authenticated,
    }
}

export default connect(mapStateToProps, null)(NavigationBarItems)
