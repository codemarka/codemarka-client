/* eslint-disable react/prop-types */
import React,{ useState } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Button from '../../components/Partials/Button';
import Input from '../../components/Partials/Input';
import Helmet from '../../components/SEO/helmet';
import Alert from '../../components/Partials/Alert/Alert'

import * as action from '../../store/actions'
import Spinner from '../../components/Partials/Preloader'

const initialPrependsvg = (
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
    class="feather feather-key"
  >
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);
function ChangePassword(props) {
     const {
         match: { params },
     } = props
     const token = params.token || null;
     const user = params.user || null;
    const [passwordResetControls, setPasswordReset] = useState({
        controls: {
            p1: {
                value: '',
                touched: false
            },
            p2: {
                value: '',
                touched: false
            }
        },
        formSubmitted: false,
        alertMessage: props.message,         
        alertType: Boolean(props.error) !== true ? 'success' : 'danger',
        passwordMatch: null,
        validationError:null
    })

    const handleInputChange = (event,controlName) => {
        event.preventDefault();
        
        const value = event.target.value
        const updatedControls = {
            ...passwordResetControls.controls,
            [controlName]: {
                ...passwordResetControls.controls[controlName],
                value,
                touched: true
            }
        }

        setPasswordReset({
            ...passwordResetControls,
            controls: updatedControls,
            validationError: null
        })
        
    }
    let redct
    if (props.isAuthenticated) {
        const host = window.location.href
        const url = new URLSearchParams(host)
        const redirectPath = url.get('redir')
        if (redirectPath) {
            redct = <Redirect to={ `${ redirectPath }` } />
        } else {
            window.location.href = window.location.origin
        }
    }

    const alert = (
        <Alert
            display={ props.message ? true : false }
            type={ !Boolean(props.error) ? 'success' : 'danger' }>
            {props.message && Boolean(props.error) !== true ? (
                <p>
                    Great! Your password has been updated,please{' '}
                    <a href="/auth/signin">login</a> to continue.
                </p>
            ) : (
                `${ props.message }`
            )}
        </Alert>
    )
    const validationErrorAlert = (
        <Alert
            display={
                passwordResetControls.validationError !== null ? true : false
            }
            type="danger">
            {passwordResetControls.validationError}
        </Alert>
    )

    const handlePasswordReset = (e) => {
        e.preventDefault();
          setPasswordReset({
              ...passwordResetControls,
              validationError: null
          })
        const data = {
            nPass: passwordResetControls.controls.p1.value,
            nPass2: passwordResetControls.controls.p2.value,
            user,token
        }

        if(data.nPass === '' || data.nPass2 === ''){
            setPasswordReset({
                ...passwordResetControls,
                validationError: 'Input Field cannot be left empty.'
            })
            return;
        }

        if(data.nPass !== data.nPass2){
            setPasswordReset({
                ...passwordResetControls,
                validationError: 'Passwords do not match, try again.'
            })
            return;
        }
        props.onAccountChangedPasswordInit(data)
    }

  return (
      <div>
          <Helmet title="Set a new password" metaDescription="" />

          <section>
              <div class="row align-items-center justify-content-center min-vh-100">
                  <div class="col-md-6 col-lg-5 col-xl-4 py-6 py-md-0 px-sm-5 mx-3">
                      <div>
                          <div class="mb-5 text-center">
                              <h6 class="h3 mb-1">Password Reset</h6>
                              <p class="text-muted mb-0">
                                  Hey! You can now set a new password for your
                                  account.
                              </p>
                          </div>
                          <span class="clearfix" />
                          {redct}
                          {alert}
                          {validationErrorAlert}
                          <form onSubmit={ handlePasswordReset }>
                              {/* pasword input */}
                              <Input
                                  type="password"
                                  placeholder="New password"
                                  label="password"
                                  isLoginPasswordInput
                                  initialPrepend
                                  initialPrependsvg={ initialPrependsvg }
                                  value={
                                      passwordResetControls.controls.p1.value
                                  }
                                  changed={ e => handleInputChange(e, 'p1') }
                                  //   finalAppend
                                  //   finalAppendsvg={ finalAppendsvg }
                              />
                              {/* pasword input */}
                              <Input
                                  type="password"
                                  placeholder="Confirm New password"
                                  label="password again"
                                  isLoginPasswordInput
                                  initialPrepend
                                  initialPrependsvg={ initialPrependsvg }
                                  value={
                                      passwordResetControls.controls.p2.value
                                  }
                                  changed={ e => handleInputChange(e, 'p2') }
                                  //   finalAppend
                                  //   finalAppendsvg={ finalAppendsvg }
                              />
                              <p className="text-danger">
                                  {passwordResetControls.passwordMatch !== null
                                      ? 'Password does not match'
                                      : ''}
                              </p>
                              <div class="mt-4">
                                  <Button
                                      type="submit"
                                      textColor="#fff"
                                      disabled={ props.loading ? true : false }
                                      block
                                      onClick={ handlePasswordReset }
                                      color="success">
                                      {props.loading ? <Spinner /> : 'Reset'}
                                  </Button>
                              </div>
                          </form>
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
        error: state.auth.error,
        isAuthenticated: state.auth.user.token !== null,
        message: state.auth.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAccountChangedPasswordInit: data => dispatch(action.passwordChangeInit(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)