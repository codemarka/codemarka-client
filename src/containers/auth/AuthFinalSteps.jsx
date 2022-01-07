/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

import Button from '../../components/Partials/Button'
import Input from '../../components/Partials/Input'
import Helmet from '../../components/SEO/helmet'
import Alert from '../../components/Partials/Alert/Alert'

import * as action from '../../store/actions'
import Spinner from '../../components/Partials/Preloader'
import * as API_URL from '../../config/api_url'

import './style.css'
function AuthFinalSteps({ onResetAll, match }) {
    const [verification, setVerification] = useState({
        verified: false,
        state: 'loading',
    })

    const [setup, setSetup] = useState({
        message: false,
        messageContent: '',
        messageType: null,
        formSubmitted: false,
        settingup: false,
        controls: {
            email: {
                value: '',
                error: false,
                errorMessage: '',
                touched: false,
                valid: true,
            },
            username: {
                value: '',
                error: false,
                errorMessage: '',
                touched: false,
                valid: true,
            },
        },
        usernameVerification: {
            loading: false,
            available: false,
            touched: false
        },
    })

    useEffect(() => {
        return () => {
            onResetAll()
        }
    }, [onResetAll])

    useEffect(() => {
        const token = match.params.auth_setup_token
        const userkid = match.params.user_kid

        const verifyToken =
            API_URL.VERIFY_FINAL_STEPS_TOKEN + token + '/' + userkid

        Axios.get(verifyToken)
            .then((response) => {
                const { data } = response
                if (data.data.ok) {
                    setSetup({
                        ...setup,
                        message: null,
                        messageContent: null,
                        messageType: null,
                        controls: {
                            email: {
                                ...setup.controls.email,
                                value: data.data.email,
                            },
                            username: {
                                ...setup.controls.username,
                                value: data.data.username,
                            },
                        },
                    })
                    setVerification({
                        ...verification,
                        state: 'done',
                        verified: true,
                    })
                }
            })
            .catch((error) => {
                setSetup({
                    ...setup,
                    message: true,
                    messageContent: 'Invalid or Expired Token',
                    messageType: 'danger',
                })
                setVerification({
                    ...verification,
                    state: 'done',
                    verified: false,
                })

                
            })
    }, [])

const alert = setup.message && (
    <Alert display={ setup.message } type={ setup.messageType }>
        {' '}
        {setup.messageContent}{' '}
    </Alert>
)
   async function handleInputChange(e) {
        
        const {value, name } = e.target;
        if(name === 'username' && value.length > 2){

         ;(await localStorage.getItem('usernameTO')) &&
             window.clearTimeout(localStorage.getItem('usernameTO'))

                      await setSetup({
                          ...setup,
                          usernameVerification: {
                              loading: true,
                              touched: true,
                          },
                      })
          const id = setTimeout(() => {
              const verifyUsername =
                  API_URL.CHECK_USERNAME + `?username=${ value }`

              Axios.get(verifyUsername).then(done => {
                const { data } = done;
                    setSetup({
                        ...setup,
                        controls: {
                          ...setup.controls,
                          username: {
                            ...setup.controls.username,
                            value
                          }
                        },
                        usernameVerification: {
                            loading: false,
                            available: data.message,
                            touched: true
                        },
                    })
              }).catch(err => {
                
              })
          }, 1500);
         localStorage.setItem('usernameTO', id)

        }

        setSetup({...setup, controls: {
          ...setup.controls,
          [name]: {
            ...setup.controls[name],
            value
          }
        }})

    }

    function handleFormSubmission(e) {
      e.preventDefault();
        
        setSetup({ ...setup, formSubmitted : true, message: false, messageContent: null})
        const token = match.params.auth_setup_token
        const userkid = match.params.user_kid

      const completeSetupUrl = API_URL.COMPLETE_ACCOUNT_OAUTH_SETUP + token + '/' + userkid;
      const data = {
        email: setup.controls.email.value,
        username: setup.controls.username.value
      }

      Axios.post(completeSetupUrl, data).then(response  => {
        setSetup({ ...setup, formSubmitted: false })
        if(response.data && response.status === 200){

          const token =  response.data.data.token;
          const userkid = response.data.data.kid;

          const userTokenAlias = 'wx1298'
          const userIdAlias = 'u342345'

          localStorage.setItem(userTokenAlias, token);
          localStorage.setItem(userIdAlias, userkid);

          window.location.href = '/?setup=1';
        }
      }).catch(err => {
        
        setSetup({ ...setup, formSubmitted: false, message: true, messageContent: 'Something went wrong,try again', type: 'danger' });
      })
    }
    return (
        <div className="container-custom-final-steps">
            <Helmet title="Final Steps - Codemarka" />
            {verification.state === 'loading' ? (
                <Spinner />
            ) : (
                <div className="col-md-6 col-lg-5 col-xl-4 py-6 py-md-0 px-sm-5 mx-3  bg-white">
                    <div className="mb-5">
                        <div className="mb-5 mt-5 text-center">
                            {!setup.message && (
                                <div>
                                    <h3 className="h2 mb-4">
                                        One last thing..
                                    </h3>
                                    <p className="text-white mb-3 bg-info p-3">
                                        Set your correct email and username to
                                        complete your account setup.
                                    </p>
                                </div>
                            )}

                            {alert}
                        </div>
                        <span className="clearfix" />
                        <form onSubmit={ handleFormSubmission }>
                            <Input
                                type="username"
                                placeholder=""
                                label="Username"
                                name="username"
                                id="username"
                                touched={ setup.controls.username.touched }
                                valid={ setup.controls.username.valid }
                                value={ setup.controls.username.value }
                                changed={ handleInputChange }
                            />
                            {setup.usernameVerification.touched &&
                                !setup.usernameVerification.available && (
                                    <b
                                        className="text-danger"
                                        style={ {
                                            marginTop: '-23px',
                                            display: 'block',
                                            marginBottom: '15px',
                                        } }>
                                        username is taken
                                    </b>
                                )}
                            {setup.usernameVerification.touched &&
                                setup.usernameVerification.available && (
                                    <b
                                        className="text-success"
                                        style={ {
                                            marginTop: '-23px',
                                            display: 'block',
                                            marginBottom: '15px',
                                        } }>
                                        username available
                                    </b>
                                )}

                            <Input
                                type="email"
                                placeholder=""
                                label="Email"
                                id="email"
                                touched={ setup.controls.email.touched }
                                valid={ setup.controls.email.valid }
                                name="email"
                                value={ setup.controls.email.value }
                                changed={ handleInputChange }
                            />
                            <div
                                className="mt-5"
                                style={ {
                                    color: 'rgb(163 154 154)',
                                } }>
                                <b>
                                    - Username should not contain white space.
                                    <br />- Should contain alpha nummeric
                                    characters, at least 3 characters and a
                                    maximum of 20.
                                </b>
                            </div>
                            <div className="mt-4">
                                <Button
                                    type="submit"
                                    onClick={ handleFormSubmission }
                                    textColor="#fff"
                                    block
                                    disabled={
                                        setup.formSubmitted ? true : false
                                    }
                                    color="success">
                                    {setup.formSubmitted ? (
                                        <Spinner />
                                    ) : (
                                        'Finish'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        isAuthenticated: auth.user.token !== null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onResetAll: () => dispatch(action.authResetAll()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthFinalSteps)
