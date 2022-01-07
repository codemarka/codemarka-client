/** @format */

import React, { useState } from 'react'
import axios from "axios";

import * as APIURL from '../../../../../config/api_url'
import { checkValidity } from '../../../../../utility/shared'

import Spinner from '../../../../../components/Partials/Preloader'
import Alert from '../../../../../components/Partials/Alert/Alert'

function CommunityLoginCredentials(props) {
    const { isValidatedAndShouldProceed } = props
   
    const [formControls, setFormControlState] = useState({
        controls: {
            communityEmail: {
                touched: false,
                value: (props.communitativeCommunityData[2].email),
                validation: {
                    required: true,
                    minLength: 5,
                    isEmail: true,
                },
                valid: true,
            },
            communityPassword: {
                touched: false,
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                },
                valid: false,
            },
        },
        formisvalid: false,
        formisSubmitted: false,
    })
    const handleInputChage = (e) => {
        const controlName = e.target.name
        const updatedControls = {
            ...formControls.controls,
            [controlName]: {
                ...formControls.controls[controlName],
                value: e.target.value,
                valid: checkValidity(
                    e.target.value,
                    formControls.controls[controlName].validation
                ),
                touched: true,
            },
        }

        
        if (
            updatedControls[controlName].valid &&
            updatedControls[controlName].touched
        ) {
            e.target.classList.add('is-valid')
            e.target.classList.remove('is-invalid')
        } else {
            e.target.classList.remove('is-valid')
            e.target.classList.add('is-invalid')
        }

        let formisvalid = true
        for (const inputIdentifier in updatedControls) {
            formisvalid = updatedControls[inputIdentifier].valid && formisvalid
        }
        setFormControlState((formControl) => {
            return { ...formControl, controls: updatedControls, formisvalid }
        })
    }

    const handleFormSubmission = (event) => {
        event.preventDefault()
        const formisSubmitted = true
        setFormControlState({ ...formControls, formisSubmitted,
                alertType: null,
                formErrored: null,
                formErrorMessage:null })
         
        const formData = {}
        if (formControls.formisvalid) {
            for (const formElementIdentifier in formControls.controls) {
                formData[formElementIdentifier] =
                    formControls.controls[formElementIdentifier].value
            }

            axios
                .post(
                    APIURL.COMMUNITY_ACCOUNT_CREATE_FINAL +
                        `/${props.tempkid}`,
                    formData
                )
                .then((data) => {
                    if (data.statusText === 'OK' && data.data.status) {
                        setTimeout(
                            () =>
                                isValidatedAndShouldProceed(
                                    7,
                                    formData,
                                    data.data.data
                                ),
                            500
                        )
                    }
                })
                .catch((err) => {
                    setFormControlState({
                        ...formControls,
                        formisSubmitted: false,
                        alertType: 'danger',
                        formErrored: true,
                        formErrorMessage: err.response.data.message,
                    })
                })
        } else {
            setFormControlState({
                ...formControls,
                alertType: 'danger',
                formErrored: true,
                formErrorMessage:
                    'Form Validation Failed, please check inputs and try again',
            })

            return false
        }
    }
    return (
        <div>
            <div class="row">
                <div className="mb-5 text-left" style={{ paddingLeft: '15px' }}>
                    <h6 className="h3 mb-1">
                        <b>Authentication Credentials</b>
                    </h6>
                    <p className="text-muted mb-0">
                        set-up your login details to access your dashboard.
                    </p>
                    <Alert
                        type={formControls.alertType}
                        display={formControls.formErrored}>
                        {formControls.formErrorMessage}
                    </Alert>
                </div>
                <div class="col-md-8 col-12">
                    <div class="form-group">
                        <label class="form-control-label">
                            Email <span className="text-danger pl-1">*</span>
                        </label>
                        <input
                            class="form-control"
                            type="email"
                            name="communityEmail"
                            value={formControls.controls.communityEmail.value}
                            onChange={handleInputChage}
                            placeholder="name@someserver.com"
                        />
                    </div>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-md-8 col-12">
                    <div class="form-group">
                        <label class="form-control-label">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            name="communityPassword"
                            value={formControls.controls.communityPassword.value}
                            onChange={handleInputChage}
                        />
                    </div>
                </div>
            </div>
            <div class="row">
                <div className="flex align-items-center d-flex w-100 justify-content-start">
                    <button
                        style={{ marginLeft: '15px' }}
                        type="button"
                        disabled={formControls.formisvalid ? false : true}
                        onClick={handleFormSubmission}
                        class="btn btn-primary hover-translate-y-n3 mr-2">
                        {formControls.formisSubmitted &&
                        formControls.formisvalid ? (
                            <Spinner />
                        ) : (
                            'Finish'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CommunityLoginCredentials
