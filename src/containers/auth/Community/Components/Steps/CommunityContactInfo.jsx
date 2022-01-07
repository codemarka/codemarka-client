import React, { useState, useLayoutEffect } from 'react'
import axios from 'axios'

import { checkValidity } from '../../../../../utility/shared'
import Spinner from '../../../../../components/Partials/Preloader'
import Alert from '../../../../../components/Partials/Alert/Alert'
import * as APIURL from '../../../../../config/api_url'

export default function CommunityContactInfo(props) {
 const { isValidatedAndShouldProceed, returnToPreviousForm, oldData } = props

     const [formControls, setFormControlState] = useState({
         controls: {
             address: {
                 touched: false,
                 value: '',
                 validation: {
                     required: false,
                 },
                 valid: true,
             },
             telephone: {
                 touched: false,
                 value: '',
                 validation: {
                     required: true,
                     minLength: 2,
                 },
                 valid: false,
             },
             email: {
                 touched: false,
                 value: '',
                 validation: {
                     required: true,
                     minLength: 5,
                     isEmail: true
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
         returnToPreviousForm(2, formData)
      }
      
     useLayoutEffect(() => {
         if (oldData) {
             const updatedControls = formControls.controls
             for (const key in oldData) {
                 updatedControls[key].value = oldData[key]
                 updatedControls[key].valid = true
                 updatedControls[key].touched = true
             }
             let formisvalid = true
                  for (const inputIdentifier in formControls.controls) {
                      formisvalid =
                          formControls.controls[inputIdentifier].valid &&
                          formisvalid
            }
             setFormControlState(c => {
                 return {...c, controls: updatedControls,formisvalid}
             });
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
           for (const formElementIdentifier in formControls.controls) {
               formData[formElementIdentifier] =
                   formControls.controls[formElementIdentifier].value
           }

           axios
               .patch(
                   APIURL.COMMUNITY_ACCOUNT_CREATE_CONTACT_INFO_TEMP +
                       `/${props.tempkid}`,
                   formData
               )
               .then((data) => {
                   if (data.statusText === 'OK' && data.data.status) {
                       setTimeout(
                           () =>
                               isValidatedAndShouldProceed(
                                   4,
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
                       alertType: 'error',
                       formErrored: true,
                       formErrorMessage:
                           'Whoops!! Something went wrong,try again',
                   })
               })
       } else {
           setFormControlState({
               ...formControls,
               alertType: 'error',
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
              <div
                  className="mb-5 text-left col-md-12"
                  style={{ paddingLeft: '15px' }}>
                  <h6 className="h3 mb-1">
                      <b>Contact Information</b>
                  </h6>
                  <p className="text-muted mb-0">
                      Let's help your members connnect with you.
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
                          Email
                          <span className="text-danger pl-1">*</span>
                      </label>
                      <input
                          class="form-control"
                          type="email"
                          name="email"
                          value={formControls.controls.email.value}
                          onChange={handleInputChage}
                          placeholder="name@someserver.com"
                      />
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="form-group">
                      <label class="form-control-label">
                          Telephone <span className="text-danger pl-1">*</span>
                      </label>
                      <input
                          class="form-control"
                          type="phone"
                          name="telephone"
                          value={formControls.controls.telephone.value}
                          onChange={handleInputChage}
                          placeholder="+234 3443 234"
                      />
                  </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group">
                      <label class="form-control-label">Physical Address</label>
                      <textarea
                          class="form-control"
                          name="address"
                          value={formControls.controls.address.value}
                          onChange={handleInputChage}
                          placeholder="Block A1"
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
