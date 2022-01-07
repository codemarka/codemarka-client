/* eslint-disable no-undef */
/**
 * /* eslint-disable no-undef
 *
 * @format
 */

/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import Github from '../../components/Partials/Auth/Button/Github'
import Google from '../../components/Partials/Auth/Button/Google'
import Button from '../../components/Partials/Button'
import Input from '../../components/Partials/Input'
import Helmet from '../../components/SEO/helmet'
import Spinner from '../../components/Partials/Preloader'
import Alert from '../../components/Partials/Alert/Alert'

import * as action from '../../store/actions'
import * as APPURLS from '../../config/url';
import { updateObject } from '../../utility/shared';
import Logo from '../../media/images/logo/codemark__logo.png'
import './style.css';

const initialPrependsvg = (
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
        className="feather feather-key">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
)

const emailIconSvg = (
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
        className="feather feather-at-sign">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
    </svg>
)

function Login(props) {
    const { onClassroomSwitch, onResetAll } = props
   const [mounted, setMounted] = useState(false)
   
   useEffect(() => {
       setMounted(true)
       if (!mounted) {
           onResetAll()
           onClassroomSwitch('classroom')
       }
   }, [mounted, onClassroomSwitch, onResetAll])
    
    const [state, setState] = useState({
        controls: {
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        },
        formSubmitted: false,
        alertMessage: props.message,
        alertType: props.error && props.message ? 'success' : 'danger'
    })

    /**
     * Handle input changes
     * @returns void
     */
    const handleInputChange = (e, controlName) => {
        e.preventDefault()
        const value = e.target.value
        const updatedControls = {
            ...state.controls,
            [controlName]: {
                ...state.controls[controlName],
                value
            }
        }
        setState({ ...state, controls: updatedControls })
    }

    const submitHandler = event => {
        event.preventDefault()

        const formSubmitted = true
        setState(updateObject(state, formSubmitted))
        const formData = {}

        if (formSubmitted) {
            for (const formElementIdentifier in state.controls) {
                formData[formElementIdentifier] =
                    state.controls[formElementIdentifier].value
            }
            // dispatch(action.authLoginUser(formData));
            props.onAuth({ ...formData })
        } else {
            setState({
                ...state,
                alertType: 'danger',
                formErrored: true,
                formErrorMessage:
                    'Form Validation Failed, please check inputs and try again'
            })
            return false
        }
    }

    const alert = (
        <Alert display={ props.message } type={ props.error ? 'danger':'success' }>
            {props.message ? `${ props.message }` : ''}
        </Alert>
    )
    let redct

    if (props.isAuthenticated) {
        const params = new URLSearchParams(window.location.search)
      
        if (params.has('redir')) {
            var protocol = new RegExp('^(?:[a-z]+:)?//', 'i')

            if (protocol.test(params.get('redir'))) {
                window.location.href = `${ params.get(
                    'redir'
                ) }?token=${ localStorage.getItem(
                    'wx1298'
                ) }&user=${ localStorage.getItem('u342345') }`
            } else {
                redct = <Redirect to={ params.get('redir') } />
            }
        } else {
            window.location.href = window.location.origin
        }
    }

    return (
        <div>
            <Helmet
                title="Sign Into your account"
                metaDescription="Return back to learn or host classrooms in real time"
            />
            {redct}
            <section className="container-fluid">
                <div className="row min-vh-100" style={ { overflow: 'auto' } }>
                    <div
                        style={ { minHeight: '100%' } }
                        className="comm_bg_img col-md-8 col-xl-8 col-lg-8 py-6 py-md-0 d-none d-md-flex d-lg-flex d-xl-flex">
                        <div className="details_container">
                            <div className="logo_container">
                                <h1 className="h1 text-white">
                                    Need more flex??
                                </h1>
                            </div>
                            <div className="mb-2">
                                <p className="float-left text-white line-height-1">
                                    Get the best out of every classrom and enjoy
                                    <br />
                                    all our exciting features by getting
                                    <br /> a community lisence today.
                                </p>
                            </div>
                            <Link to={ APPURLS.COMMUNITY_ACCOUNT_SIGNUP_PAGE }>
                                <button
                                    type="button"
                                    class="btn btn-animated btn-success btn-sm btn-animated-x">
                                    <span class="btn-inner--visible">
                                        SIGN UP
                                    </span>
                                    <span class="btn-inner--hidden">
                                        <i className="fa fa-arrow-alt-circle-right"></i>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div
                        className="col-md-4 col-lg-4 col-xl-4oveflow-auto"
                        style={ {
                            height: '97vh!important',
                            overflow: 'auto',
                            display: 'flex',
                            flexDorient: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        } }>
                        <div style={ { width: '91%' } }>
                            <div className="mb-5 text-center">
                                <h6 className="h3 mb-1">Welcome back!</h6>
                                <p className="text-muted mb-0">
                                    Sign in to your account to continue.
                                </p>
                            </div>
                            <span className="clearfix" />
                            {alert}
                            <form onSubmit={ submitHandler }>
                                <Input
                                    type="email"
                                    id="emailinput"
                                    placeholder="someone@someserver.com"
                                    label="Email address"
                                    initialPrepend
                                    initialPrependsvg={ emailIconSvg }
                                    value={ state.controls.email.value }
                                    changed={ (event) =>
                                        handleInputChange(event, 'email')
                                    }
                                />
                                {/* pasword input */}
                                <Input
                                    type="password"
                                    id="passwordinput"
                                    placeholder="Secret password"
                                    label="password"
                                    isLoginPasswordInput
                                    initialPrepend
                                    forgotPassword={ true }
                                    initialPrependsvg={ initialPrependsvg }
                                    value={ state.controls.password.value }
                                    finalAppend={ false }
                                    changed={ (event) =>
                                        handleInputChange(event, 'password')
                                    }
                                />
                                <div className="mt-4">
                                    <Button
                                        type="submit"
                                        clicked={ submitHandler }
                                        disabled={ props.loading }
                                        textColor="#fff"
                                        block
                                        color="primary">
                                        {props.loading ? (
                                            <Spinner />
                                        ) : (
                                            'Sign In'
                                        )}
                                    </Button>
                                </div>
                            </form>

                            {/* <div className="py-3 text-center">
                                <span className="text-xs text-uppercase">
                                    or
                                </span>
                            </div> */}

                            {/* <div className="row">
                                <div className="col-6">
                                    <Github
                                        link={
                                            APIURLS.GITHUB_AUTH_URL +
                                            '?auth=login&vendor=github'
                                        }
                                    />
                                </div>
                                <div className="col-6">
                                    <Google
                                        link={
                                            APIURLS.GOOGLE_AUTH_URL +
                                            '?auth=login&vendor=google'
                                        }
                                    />
                                </div>
                            </div> */}
                            <div className="mt-4 text-center">
                                <small>Not registered?</small>
                                <Link
                                    to="/auth/signup"
                                    className="small font-weight-bold ml-1">
                                    Create account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.message,
        isAuthenticated: state.auth.user.token !== null,
        message: state.auth.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetAll: () => dispatch(action.authResetAll()),
        onAuth: (email, password) =>
            dispatch(action.authLoginUser(email, password)),
        onClassroomSwitch: (state) => dispatch(action.dispatchAppEnvironment(state))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
