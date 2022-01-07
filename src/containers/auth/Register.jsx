import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

// import Github from '../../components/Partials/Auth/Button/Github';
// import Google from '../../components/Partials/Auth/Button/Google';

import Button from '../../components/Partials/Button';
import Input from '../../components/Partials/Input';
import Helmet from '../../components/SEO/helmet';
import Spinner from '../../components/Partials/Preloader';
import Alert from '../../components/Partials/Alert/Alert';

import { checkValidity } from '../../utility/shared'

import * as URLS from '../../config/url';
// import * as APIURLS from '../../config/api_url';

import * as action from '../../store/actions';

import * as APPURLS from '../../config/url'
import { updateObject } from '../../utility/shared'
import envelop from '../../media/images/envelop.png'
import './style.css'

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
    className="feather feather-at-sign"
  >
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
);

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
    className="feather feather-key"
  >
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);

const userIconSvg = (
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
    className="feather feather-user"
  >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

function Register(props) {
  const [state, setState] = useState({
      controls: {
          username: {
              value: '',
              required: true,
              validation: {
                  required: true,
                  notwhitespace: true,
                  minLength: 3
              },
              valid: false,
              touched: false,
              display: true,
          },
          email: {
              value: '',
              required: true,
              validation: {
                  required: true,
                  minLength: 4,
                  isEmail: true,
              },
              valid: false,
              touched: false,
              display: true,
          },
          password: {
              label: 'Password',
              elementType: 'input',
              elementConfig: {
                  type: 'password',
                  placeholder: '',
              },
              value: '',
              validation: {
                  required: true,
                  minLength: 8,
                  notwhitespace: true,
              },
              valid: false,
              touched: false,
              display: true,
          },
      },
      formIsValid: false,
      formSubmitted: false,
      alertMessage: props.message,
      alertType: Boolean(props.error) === true ? 'danger' : 'success',
  })
   const { onClassroomSwitch, onResetAll } = props
   const [mounted, setMounted] = useState(false)
   useEffect(() => {
       setMounted(true)
       if (!mounted) {
           onResetAll()
           onClassroomSwitch('classroom')
       }
   }, [mounted, onClassroomSwitch, onResetAll])
    
  const handleInputChange = (e,controlName) => {
    e.preventDefault()

      const updatedControls = {
          ...state.controls,
          [controlName]: {
              ...state.controls[controlName],
              value: e.target.value,
              valid: checkValidity(
                  e.target.value,
                  state.controls[controlName].validation
              ),
              touched: true,
          },
      }

      let formIsValid = true
      for (const inputIdentifier in updatedControls) {
          formIsValid = updatedControls[inputIdentifier].valid && formIsValid
      }
   
        setState({ ...state, controls: updatedControls, formIsValid })
  }

  useLayoutEffect(() => {
      if(props.message || props.error){
         document.getElementById('register_form').scrollTop = 0;
      }
  }, [props.message,props.error])
  const submitHandler = event => {
    event.preventDefault();

    const formSubmitted = true;
    setState(updateObject(state,formSubmitted));
    const formData = {};

    if (formSubmitted) {

      for (const formElementIdentifier in state.controls) {
        formData[ formElementIdentifier ] =
          state.controls[ formElementIdentifier ].value;
      }
      props.onAuth(formData)

    } else {

      setState({
        ...state,
        alertType: 'danger',
        formErrored: true,
        formErrorMessage:
          'Form Validation Failed, please check inputs and try again'
      });
      return false;
    }
  };

//   const handleAlertClick = (e) => {
//        e.preventDefault();
//       props.onAlertClose()
//   }

  let alert = (
      <Alert 
              display={ props.message }
              type={ props.error ? 'danger':'success' }
              >
          {props.message ? `${ props.message }` : ''}
      </Alert>
);
let redct;

if(props.isAuthenticated){

const host = window.location.href
const url = new URLSearchParams(host)
const redirectPath = url.get('redir')
if (redirectPath) {
    redct = <Redirect to={ `${ redirectPath }` } />
} else {
    redct = <Redirect to="/?auth_rdir=r" />
}
}

if (props.authRegistrationSuccess) {
    alert = (
        <Alert display={ true } type="success">
            {props.message ? `${ props.message }` : ''}
        </Alert>
    )
}
  return (
      <div>
          <Helmet
              title="Signup to codemarka"
              metaDescription="Get started today by creating a free account on codemarka."
          />
          {redct}

          <section className="container-fluid h-100vh">
              <div className="row h-100" style={ { overflow: 'hidden' } }>
                  <div
                      style={ { minHeight: '100%' } }
                      className="comm_bg_img col-md-8 col-xl-8 col-lg-8 py-6 py-md-0 d-none d-md-flex d-lg-flex d-xl-flex">
                      <div className="details_container">
                          <div className="logo_container">
                              <h1 className="h1 text-white">Need more flex??</h1>
                          </div>
                          <div className="mb-2">
                              <p className="float-left text-white line-height-1">
                                  Get the best out of every classrom and enjoy
                                  <br />
                                  all our exciting features by getting
                                  <br />  a community lisence today.
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
                      id="register_form"
                      className="mt-3 p-3 pb-4 col-md-4 col-lg-4 col-xl-4 py-6 h-100 py-md-0"
                      style={ { overflow: 'auto' } }>
                      {props.authRegistrationSuccess ? (
                          <div style={ {flexDirection: 'column'} } className="h-100vh d-flex text-center justify-content-center align-items-center">
                              <img className="img-responsive" style={ {height:100} } src={ envelop }/>
                              <h3>Confirm Your email!</h3>
                              <p>Your account has been successfully registered. To complete the process please check your 
                                  email for a validation request.</p>
                          </div>
                      ) : (
                          <div>
                              <div className="mb-5 text-center">
                                  <h6 className="h3 mb-1 mt-3">
                                      Join Codemarka
                                  </h6>
                                  <p className="text-muted mb-0">
                                      Made with love for developers
                                  </p>
                                  {alert}
                              </div>
                              <span className="clearfix" />
                              <form onSubmit={ submitHandler } autoComplete="off">
                                  {/* username input */}
                                  <Input
                                      type="text"
                                      placeholder="doejonny"
                                      label="username"
                                      elementType="input"
                                      valid={ state.controls.username.valid }
                                      touched={ state.controls.username.touched }
                                      initialPrepend
                                      initialPrependsvg={ userIconSvg }
                                      value={ state.controls.username.value }
                                      changed={ (e) =>
                                          handleInputChange(e, 'username')
                                      }
                                  />

                                  {/* email input */}
                                  <Input
                                      type="email"
                                      elementType="input"
                                      placeholder="someone@someserver.com"
                                      label="Email address"
                                      valid={ state.controls.email.valid }
                                      touched={ state.controls.email.touched }
                                      initialPrepend
                                      initialPrependsvg={ emailIconSvg }
                                      value={ state.controls.email.value }
                                      changed={ (e) =>
                                          handleInputChange(e, 'email')
                                      }
                                  />
                                  {/* pasword input */}
                                  <Input
                                      type="password"
                                      elementType="input"
                                      placeholder="******"
                                      valid={ state.controls.password.valid }
                                      touched={ state.controls.password.touched }
                                      label={ state.controls.password.label }
                                      isLoginPasswordInput={ false }
                                      initialPrepend
                                      initialPrependsvg={ initialPrependsvg }
                                      value={ state.controls.password.value }
                                      changed={ (e) =>
                                          handleInputChange(e, 'password')
                                      }
                                  />

                                  <div
                                      className="mt-5"
                                      style={ {
                                          color: 'rgb(163 154 154)',
                                          fontSize: 'small',
                                      } }>
                                      <b>
                                          - Username should not contain white
                                          space
                                          <br />
                                          - only alpha numberic characters at
                                          least 3 characters and a maximum of
                                          20.
                                          <br />- Password should be at least 8
                                          character long.
                                      </b>
                                  </div>

                                  <div className="mt-4">
                                      {/* {} */}
                                      <Button
                                          type="submit"
                                          clicked={ submitHandler }
                                          disabled={ !state.formIsValid }
                                          textColor="#fff"
                                          block
                                          color="primary">
                                          {props.loading ? (
                                              <Spinner />
                                          ) : (
                                              'Create  account'
                                          )}
                                      </Button>
                                  </div>

                                  <div className="mt-5">
                                      <small>
                                          By creating an account, you agree to
                                          the
                                          <Link to="/terms-and-conditions">
                                              {' '}
                                              Terms of Service
                                          </Link>
                                          . For more information about
                                          Codemarka's privacy practices, see the
                                          Codemarka{' '}
                                          <Link to="/privacy-and-policy">
                                              Privacy Statement.
                                          </Link>{' '}
                                          We'll occasionally send you
                                          account-related emails.
                                      </small>
                                  </div>
                              </form>
                              {/* <div className="py-3 text-center">
                              <span className="text-xs text-uppercase">or</span>
                          </div> */}

                              {/* <div className="row">
                              <div className=" col-sm-6">
                                  <Github
                                      link={
                                          APIURLS.GITHUB_AUTH_URL +
                                          '?auth=signup&vendor=github'
                                      }
                                  />
                              </div>
                              <div className="col-sm-6">
                                  <Google
                                      link={
                                          APIURLS.GOOGLE_AUTH_URL +
                                          '?auth=signup&vendor=google'
                                      }
                                  />
                              </div>
                          </div> */}
                              <div className="mb-4 mt-2 text-center">
                                  <small>Already have an account?</small>{' '}
                                  <Link
                                      to={ URLS.AUTH_SIGN_IN }
                                      className="small font-weight-bold">
                                      signin
                                  </Link>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </section>
      </div>
  )
}

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.user.token !== null,
      message: state.auth.message,
      authRegistrationSuccess: state.auth.Registrationsuccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (data) =>
          dispatch(
              action.authRegisterUser({...data})
          ),
      onAlertClose: () => dispatch(action.ClearMessage()),
      onResetAll: () => dispatch(action.authResetAll()),
      onClassroomSwitch: (state) =>
          dispatch(action.dispatchAppEnvironment(state)),
  }
};
export default connect( mapStateToProps, mapDispatchToProps )(Register)