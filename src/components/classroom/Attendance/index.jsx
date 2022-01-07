import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import Input from '../../Partials/Input/Input';
import { checkValidity } from '../../../utility/shared'
import Alert from '../../Partials/Alert/Alert'
import Spinner from '../../Partials/Preloader'
import Button from '../../Partials/Button'

function AttendanceCollector(props){

  const [state, setState] = useState({

    hasCollectedAttendance: props.hasCollectedAttendance,
    controls: {
      firstName: {
        label: 'First Name',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'David',
        },
        value: props.attendanceList.firstName,
        validation: {
          required: true,
          minLength: 2
        },
        valid: false,
        touched: false,
        display: true
      },
      lastName: {
        label: 'Last Name',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Johnson ',
        },
        value: props.attendanceList.lastName,
        validation: {
          required: true,
          minLength: 2
        },
        valid: false,
        touched: false,
        display: true

      },
      classExpertiseLevel: {
        label: 'Level of Expertise based on topic',
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: '',
              displayValue: 'Select Expertise'
            },
            {
              value: 'Beginner',
              displayValue: 'Beginner'
            },
            {
              value: 'Intermediate',
              displayValue: 'Intermediate'
            },
            {
              value: 'Senior',
              displayValue: 'Senior'
            }
          ],
        },
        value: props.attendanceList.classExpertiseLevel,
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false,
        display: true,
      },
      gender: {
        label: 'Gender',
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: '',
              displayValue: 'Select Gender'
            },
            {
              value: 'Male',
              displayValue: 'Male'
            },
            {
              value: 'Female',
              displayValue: 'Female'
            },
            {
              value: 'Rather not say',
              displayValue: 'Rather not say'
            }
          ],
        },
        value: props.attendanceList.gender,
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false,
        display: true,
      },
      email: {
        label: 'Email',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'name@example.com',
        },
        value: props.userEmail,
        validation: {
          required: true,
          minLength: 2,
          isEmail: true
        },
        valid: props.userEmail ? true : false,
        touched: false,
        display: true
      }, 
      phone: {
        label: 'Phone',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '+40-777 245 549',
        },
        value: props.attendanceList.phone ,
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        display: true
      },
    },
    formisValid: false,
    formisSubmitted: props.loading ? true : false,
    formErrorMessage: false,
    formErrored: false,
    alertType: null,
  })

  useEffect(() => {
    if (props.hasCollectedAttendance && props.isCollectingAttendance) {
      setState((S) => {
        return { ...S, alertType: 'success', formErrorMessage:'You are all caught up! Re-filling this form only updates your previous submission' }
      } )
    
    } else if (!props.isCollectingAttendance) {
      setState((S) => {
        return { ...S, alertType: 'info', formErrorMessage: 'Heads Up!!Classroom does not support attendance collection, feel free to send in your information.' }
      })
    }
    if (!props.hasCollectedAttendance && props.isCollectingAttendance){
      setState((S) => {
        return { ...S, alertType: 'info', formErrorMessage: 'Heads Up!! Host is requesting you fill up an attendance.' }
      })
    }
  }, [props]);

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...state.controls,
      [controlName]: {
        ...state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          state.controls[controlName].validation
        ),
        touched: true
      }
    }

    let formisValid = true
    for (const inputIdentifier in updatedControls) {
      formisValid = updatedControls[inputIdentifier].valid && formisValid
    }

    setState({ ...state, controls: updatedControls, formisValid })
  }

  const submitHandler = event => {
    event.preventDefault()
    const formisSubmitted = true
    setState({ ...state, formisSubmitted })

    const formData = {}

    if (state.formisValid) {
      for (const formElementIdentifier in state.controls) {
        formData[formElementIdentifier] =
          state.controls[formElementIdentifier].value
      }

      // eslint-disable-next-line no-undef
      props.submit(formData)
      setState({ ...state, alertType: null, formErrorMessage: null })

    } else {
      setState({
        ...state,
        alertType: 'error',
        formErrored: true,
        formErrorMessage:
          'Form Validation Failed, please check inputs and try again'
      })
      return false
    }
  }

  const formElementArray = []
  for (const key in state.controls) {
    formElementArray.push({
      id: key,
      config: state.controls[key]
    })
  }

  const form = (
      <form onSubmit={ submitHandler }>
          <div className="row align-items-center">

              <Alert
          type={ state.alertType }
          display={ state.formErrorMessage }
          title="Heads Up!">
                  {state.formErrorMessage}
              </Alert>
              {formElementArray.map(formElement => (
                  <div className="col-md-6" 
          key={ formElement.id }
        >
                      <Input
          elementConfig={ formElement.config.elementConfig }
          elementType={ formElement.config.elementType }
          value={ formElement.config.value }
          changed={ event => inputChangeHandler(event, formElement.id) }
          invalid={ formElement.config.valid }
          touched={ formElement.config.touched }
          label={ formElement.config.label }
          shouldDisplay={ formElement.config.display }
          validation={ formElement.config.validation }
          
          /></div>
      )
      )}
          </div>
      </form>
  )

  let list;

  list = props.list.map((atte,i) => {
    return (
        <tr key={ atte.kid }>
            <th scope="row">{i + 1}</th>
            <td>{atte.firstName}</td>
            <td>{atte.lastName}</td>
            <td>{atte.email}</td>
            <td>@{atte.username}</td>
            <td>{atte.phone}</td>
            <td>{atte.classExpertiseLevel}</td>
        </tr>
    )
  })

  return (
      <React.Fragment>
          <button type="button" class="btn btn-primary d-none" id="attendance_modal" data-toggle="modal" data-target="#attendanceModal">
              ..
          </button>
          <div class="modal fade" id="attendanceModal" tabIndex="-1" role="dialog" aria-labelledby="attendanceModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="attendanceModalLabel">Attendance Sheet</h5>
                          <div>              
                              {props.isOwner ? (
                                  <>
                                      <Button
                  size="sm"
                  textColor="#fff"
                  color="warning"
                  clicked={ props.downloadAttendance }
                ><i className="fa fa-download"></i> {props.downloadStatus === 'loading' ? 'Preparing..': 'Download CSV'}</Button><Button
                  size="sm"
                  textColor="#fff"
                  color="success"
                  clicked={ props.sendReminder }
                ><i className="fa fa-broadcast-tower"></i> Send Reminder</Button>
                                  </>
                ) : (
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>)}
                          </div>

                      </div>
                      <div class={ `modal-body ${ props.isOwner ? 'm-0 p-0 h-80': '' }` }>
                          {props.isOwner ? (<table class="table table-dark w-100 table-responsive table-hover">
                              <thead>
                                  <tr >
                                      <th scope="col">#</th>
                                      <th scope="col">First Name</th>
                                      <th scope="col">Last Name</th>
                                      <th scope="col">Email</th>
                                      <th scope="col">Username</th>
                                      <th scope="col">Phone</th>
                                      <th scope="col">Expertise Level</th>

                                  </tr>
                              </thead>
                              <tbody>
                                  {list}
                              </tbody>
                          </table>) : form }
                      </div>
                      <div class={ `modal-footer ${ props.isOwner ? 'd-none':'' }` }>

                          <Button
                size="sm"
                textColor="#fff"
                color="primary"
                clicked={ submitHandler }
                disabled={ !state.formisValid }>
                              {state.formisSubmitted && props.isSubmittingAttendance ? <Spinner /> : state.hasCollectedAttendance ?'update': 'submit'}
                          </Button>
                      </div>
                  </div>
              </div>
          </div>
      </React.Fragment>
  );
}
const mapStateToProps = ({ auth }) => {
  return {
    userEmail: auth.user.email
  }
}

export  default connect(mapStateToProps,null)(AttendanceCollector);