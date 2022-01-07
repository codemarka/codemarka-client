/** @format */

import React, { useState, useLayoutEffect } from 'react'
import axios from 'axios'

import { checkValidity } from '../../../../../utility/shared'
import Spinner from '../../../../../components/Partials/Preloader'
import Alert from '../../../../../components/Partials/Alert/Alert'
import * as APIURL from '../../../../../config/api_url'

export default function CommunitySocialMediaInfo(props) {
    const { isValidatedAndShouldProceed, returnToPreviousForm, oldData } = props

    const [formControls, setFormControlState] = useState({
        controls: {
            twitterUrl: {
                touched: false,
                value: '',
                validation: {
                    required: false,
                    url: true,
                },
                valid: false,
            },
            meetupUrl: {
                touched: false,
                value: '',
                validation: {
                    required: false,
                    url: true,
                },
                valid: false,
            },
            facebookUrl: {
                touched: false,
                value: '',
                validation: {
                    required: false,
                    url: true,
                },
                valid: false,
            },
            instagramUrl: {
                touched: false,
                value: '',
                validation: {
                    required: false,
                    url: true,
                },
                valid: false,
            },
        },
        formisvalid: true,
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
        if (updatedControls[controlName].value.trim() === '') {
            updatedControls[controlName].valid = true
        }

        let formisvalid = true && checkValidity(
            e.target.value,
            formControls.controls[controlName].validation
        );
        setFormControlState((formControl) => {
            return { ...formControl, controls: updatedControls, formisvalid }
        })
    }

    const handlePreviousForm = (e) => {
        const formData = {}

      for (const formElementIdentifier in formControls.controls) {
          formData[formElementIdentifier] =
              formControls.controls[formElementIdentifier].value
      }
        returnToPreviousForm(4,formData);
    }

    useLayoutEffect(() => {
        if (oldData) {
            const updatedControls = formControls.controls
            for (const key in oldData) {
                updatedControls[key].value = oldData[key]
                updatedControls[key].valid = true
                updatedControls[key].touched = true
            }
            setFormControlState(c => {
                let formisvalid = true
                for (const inputIdentifier in formControls.controls) {
                    formisvalid =
                        formControls.controls[inputIdentifier].valid &&
                        formisvalid
                }
               return { ...c, controls: updatedControls,formisvalid}
            })
        }
    }, [oldData, formControls.controls])

     /**
      * Handle Form Submission
      * @param event Event
      * @retrun void
      */
    const handleFormSubmission = (event) => {
       event.preventDefault()
       const formisSubmitted = true
       setFormControlState({ ...formControls, formisSubmitted })

       const formData = {}
       if (formControls.formisvalid) {
           const allowed = prompt("Are you sure you want to proceed? Yes or No");
            if(allowed.toLowerCase() === "no") return;
            
           for (const formElementIdentifier in formControls.controls) {
               formData[formElementIdentifier] =
                   formControls.controls[formElementIdentifier].value
           }

           axios
               .patch(
                   APIURL.COMMUNITY_ACCOUNT_CREATE_SOCIAL_MEDIA_INFO_TEMP +
                       `/${props.tempkid}`,
                   formData
               )
               .then((data) => {
                   if (data.statusText === 'OK' && data.data.status) {
                       setTimeout(
                           () =>
                               isValidatedAndShouldProceed(
                                   6,
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
                       formErrorMessage:
                           'Whoops!! Something went wrong,try again',
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
                <div className="col-md-12 mb-5 text-left" style={{ paddingLeft: '15px' }}>
                    <h6 className="h3 mb-1">
                        <b>Social Media</b>
                    </h6>
                    <p className="text-muted mb-0">
                        Let people find and follow you on any media.
                    </p>
                    <Alert
                        type={formControls.alertType}
                        display={formControls.formErrored}>
                        {formControls.formErrorMessage}
                    </Alert>
                </div>
                {/* Organixer One Start */}
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-control-label">
                            Twitter 
                        </label>
                        <input
                            class="form-control"
                            type="text"
                            name="twitterUrl"
                            value={formControls.controls.twitterUrl.value}
                            onChange={handleInputChage}
                            placeholder="https://twitter.com/"
                        />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-control-label">
                            Facebook
                        </label>
                        <input
                            class="form-control"
                            type="text"
                            name="facebookUrl"
                            value={formControls.controls.facebookUrl.value}
                            onChange={handleInputChage}
                            placeholder="https://facebook.com/"
                        />
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-control-label">
                            Instagram{' '}
                        </label>
                        <input
                            class="form-control"
                            type="text"
                            name="instagramUrl"
                            value={formControls.controls.instagramUrl.value}
                            onChange={handleInputChage}
                            placeholder="https://instagram.com/"
                        />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-control-label">
                            Meetup
                        </label>
                        <input
                            class="form-control"
                            type="text"
                            name="meetupUrl"
                            value={formControls.controls.meetupUrl.value}
                            onChange={handleInputChage}
                            placeholder="https://meetup.com/"
                        />
                    </div>
                </div>

                {/* Organixer Two End */}
                <div className="flex align-items-center d-flex w-100 justify-content-between">
                    <button
                        style={{ marginLeft: '15px' }}
                        type="button"
                        onClick={handlePreviousForm}
                        class="btn btn-primary hover-translate-y-n3 mr-2">
                        Back
                    </button>
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
                            'Next'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
