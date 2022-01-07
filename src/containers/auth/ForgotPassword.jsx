/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Button from '../../components/Partials/Button';
import Input from '../../components/Partials/Input';
import Helmet from '../../components/SEO/helmet';
import Alert from '../../components/Partials/Alert/Alert';

import * as action from '../../store/actions';
import Spinner from '../../components/Partials/Preloader';

const emailIconSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94">
        </path>
    </svg>
)

function ForgotPassword(props) {
         const { onResetAll } = props

         useEffect(() => {
             return () => {
                 onResetAll()
             }
         }, [onResetAll])

     const [state, setState] = useState({
         value: '',
         formSubmitted: false,
         alertMessage: props.message,
         alertType: Boolean(props.error) !== true ? 'success' : 'danger'
     })

    const handleInputChange = e => {
        e.preventDefault();
        setState({...state,value: e.target.value});
    }

    const handleFormSubmission = e => {
        e.preventDefault();
        const email = state.value;
        setState({...state,formSubmitted: true});

        props.onAccountRecovery(email);
    }
    let redct;
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
             {props.message ? `${ props.message }` : ''}
         </Alert>
     )
  return (
      <div>
          <Helmet
              title="Account Recovery - codemarka"
              metaDescription=""
          />

          <section>
              <div class="row align-items-center justify-content-center min-vh-100">
                  <div class="col-md-6 col-lg-5 col-xl-4 py-6 py-md-0 px-sm-5 mx-3">
                      <div>
                          <div class="mb-5 text-center">
                              <h6 class="h3 mb-1">Account Recovery</h6>
                              <p class="text-muted mb-0">
                                  We would help you recover your account if you
                                  know the email associated with your account.
                              </p>
                              {alert}
                          </div>
                          {redct}
                          <span class="clearfix" />
                          <form onSubmit={ handleFormSubmission }>
                              <Input
                                  type="email"
                                  placeholder="someone@someserver.com"
                                  label="Email address"
                                  initialPrepend
                                  initialPrependsvg={ emailIconSvg }
                                  value={ state.value }
                                  changed={ handleInputChange }
                              />

                              <div class="mt-4">
                                  <Button
                                      type="submit"
                                      onClick={ handleFormSubmission }
                                      textColor="#fff"
                                      block
                                      disabled={ props.loading ? true : false }
                                      color="primary">
                                      {state.formSubmitted && props.loading ? (
                                          <Spinner />
                                      ) : (
                                          'Go'
                                      )}
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
        onResetAll: () => dispatch(action.authResetAll()),
        onAccountRecovery: email =>
            dispatch(action.accountRecoveryInit(email))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)