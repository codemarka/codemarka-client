import React,{ useState, useLayoutEffect } from 'react';
import axios from 'axios';

import { checkValidity } from '../../../../../utility/shared';
import Spinner from '../../../../../components/Partials/Preloader'
import Alert from '../../../../../components/Partials/Alert/Alert';
import * as APIURL from '../../../../../config/api_url'

function CommunityInfo(props) {
    const { isValidatedAndShouldProceed, returnToPreviousForm, oldData } = props

     const [formControls, setFormControlState] = useState({
         controls: {
             organizerOneEmail: {
                 touched: false,
                 value: '',
                 validation: {
                     required: true,
                     minLength: 5,
                     isEmail: true,
                 },
                 valid: false,
             },
             organizerTwoEmail: {
                 touched: false,
                 value: '',
                 validation: {
                     required: true,
                     minLength: 2,
                     isEmail: true,
                 },
                 valid: false,
             },
             organizerOneFullName: {
                 touched: false,
                 value: '',
                 validation: {
                     required: true,
                     minLength: 5,
                 },
                 valid: false,
             },
             organizerTwoFullName: {
                 touched: false,
                 value: '',
                 validation: {
                     required: true,
                     minLength: 5,
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
              formisvalid =
                  updatedControls[inputIdentifier].valid && formisvalid
          }
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
         returnToPreviousForm(1, formData)
      }
      
     useLayoutEffect(() => {
         if (oldData) {
              const updatedControls = formControls.controls
              for (const key in oldData) {
                  updatedControls[key].value = oldData[key]
                  updatedControls[key].valid = true
                  updatedControls[key].touched = true
              }
              setFormControlState(s => {
                let formisvalid = true
                for (const inputIdentifier in formControls.controls) {
                    formisvalid =
                        formControls.controls[inputIdentifier].valid &&
                        formisvalid
                }
                return {...s,controls:updatedControls,formisvalid}
              });
         }
     }, [oldData])

     /**
      * Handle Form Submission
      * @param event Event
      * @retrun void
      */
    const handleFormSubmission = (event) => {
        event.preventDefault();
        const formisSubmitted = true
        setFormControlState({ ...formControls, formisSubmitted })

        const formData = {};
        if (formControls.formisvalid) {
            for (const formElementIdentifier in formControls.controls) {
                formData[formElementIdentifier] =
                    formControls.controls[formElementIdentifier].value
            }
            
            axios
                .patch(APIURL.COMMUNITY_ACCOUNT_CREATE_ORGANIZERS_TEMP+`/${props.tempkid}`, formData)
                .then((data) => {
                    if (data.statusText === 'OK' && data.data.status) {

                        setTimeout(
                            () =>
                                isValidatedAndShouldProceed(
                                    3,
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
                formErrorMessage: 'Form Validation Failed, please check inputs and try again'
            });

            return false
        }
    }
  return (
      <div>
          <div class="row">
              <div className="mb-5 text-left" style={{ paddingLeft: '15px' }}>
                  <h6 className="h3 mb-1">
                      <b>Community Organizers</b>
                  </h6>
                  <p className="text-muted mb-0">
                      The heroes behind your community, the world would love to
                      know them.
                  </p>
                  <Alert
                      type={formControls.alertType}
                      display={formControls.formErrored}>
                      {formControls.formErrorMessage}
                  </Alert>
              </div>
              {/* Organixer One Start */}
              <h6 className="col-md-12 h5 mb-1">
                  <b>Organizer 1 (Lead) </b>
              </h6>
              <div class="col-md-6">
                  <div class="form-group">
                      <label class="form-control-label">
                          Full Name <span className="text-danger pl-1">*</span>
                      </label>
                      <input
                          class="form-control"
                          type="text"
                          name="organizerOneFullName"
                          value={formControls.controls.organizerOneFullName.value}
                          onChange={handleInputChage}
                          placeholder="John Doe"
                      />
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="form-group">
                      <label class="form-control-label">
                          Email
                          <span className="text-danger pl-1">*</span>
                      </label>
                      <input
                          class="form-control"
                          type="email"
                          name="organizerOneEmail"
                          value={formControls.controls.organizerOneEmail.value}
                          onChange={handleInputChage}
                          placeholder="name@somewebsite.com"
                      />
                  </div>
              </div>
              {/* Organixer One End */}

              {/* Organixer Two Start */}
              <h6 className="col-md-12 h5 mb-1">
                  <b>Organizer 2 (co-Lead) </b>
              </h6>
              <div class="col-md-6">
                  <div class="form-group">
                      <label class="form-control-label">
                          Full Name <span className="text-danger pl-1">*</span>
                      </label>
                      <input
                          class="form-control"
                          type="text"
                          name="organizerTwoFullName"
                          value={formControls.controls.organizerTwoFullName.value}
                          onChange={handleInputChage}
                          placeholder="John Doe"
                      />
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="form-group">
                      <label class="form-control-label">
                          Email
                          <span className="text-danger pl-1">*</span>
                      </label>
                      <input
                          class="form-control"
                          type="email"
                          name="organizerTwoEmail"
                          value={formControls.controls.organizerTwoEmail.value}
                          onChange={handleInputChage}
                          placeholder="name@somewebsite.com"
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

export default CommunityInfo
