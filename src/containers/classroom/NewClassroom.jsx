/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import isFuture from 'date-fns/isFuture'

import Spinner from '../../components/Partials/Preloader'
import { checkValidity } from '../../utility/shared'

import Button from '../../components/Partials/Button'
import Input from '../../components/Partials/Input/Input'
import Helmet from '../../components/SEO/helmet'
import { dispatchAppEnvironment } from '../../store/actions/app'

import countyJson from '../../utility/country.json';

import Alert from '../../components/Partials/Alert/Alert'

import './newclassroom.css'
import * as action from '../../store/actions'

import logo from '../../media/images/logo/codemark__logo.png'

function NewClassroom(props) {
     const { onClassroomSwitch, onResetAll } = props
     const [mounted, setMounted] = useState(false)
     useEffect(() => {
         setMounted(true)
         if (!mounted) {
             onResetAll()
             onClassroomSwitch('classroom')
         }
     }, [mounted, onResetAll, onClassroomSwitch])

    const mappedCountry = countyJson.map((country) => {
        return { value: `${ country.code }`, displayValue: `${ country.name }` }
    });
    const [state, setState] = useState({
        controls: {
            name: {
                label: 'Classroom Name',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Dragon Riders',
                    inputhelpertext: 'e.g David and Friends.',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                display: true

            },
            topic: {
                label: 'Topic',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Javascript ES6',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false,
                display: true

            },
            schedule: {
                label: 'Schedule',
                elementType: 'input',
                elementConfig: {
                    type: 'datetime-local',
                    placeholder: 'Select Date & Time',
                    inputhelpertext: 'Choose a time and date in the future',
                },
                value: '',
                validation: {
                    required: true,
                    isPastDate: false
                },
                valid: !props.isCommunityAccount,
                touched: false,
                display: props.isCommunityAccount

            },

            visibility: {
                label: 'Visibility',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: '',
                            displayValue: 'Select Visibility'
                        },
                        {
                            value: 'Public',
                            displayValue: 'Public'
                        },
                        {
                            value: 'Private',
                            displayValue: 'Private'
                        }
                    ],
                    inputhelpertext: 'Private classrooms can only be searched for. Not restrictions to enter once with a valid url to your classroom'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false,
                display: true,

            },
            location: {
                label: 'location',
                elementType: 'select',
                elementConfig: {
                    options: mappedCountry,
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false,
                display: true

            },
            classType: {
                label: 'Classroom Type',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'Basic Web App',
                            displayValue: 'Basic Web App(HTML,CSS AND JS)'
                        }
                    ]
                },
                value: 'Basic Web App',
                validation: {
                    required: false,
                    minLength: 3
                },
                valid: true,
                touched: false,
                display: true
            },
            description: {
                label: 'class description',
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Let people know more about your class',
                    inputhelpertext: 'min 30 Words.',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 30
                },
                valid: !props.isCommunityAccount,
                touched: false,
                display: props.isCommunityAccount

            },
            isTakingAttendance: {
                label:'Collect attendance',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {

                            value: '',
                            displayValue: 'Select one'
                        },

                        {
                            value: 'Yes',
                            displayValue: 'Yes'
                        },
                        {
                            value: 'No',
                            displayValue: 'No'
                        }
                    ],
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: !props.isCommunityAccount,
                touched: false,
                display: props.isCommunityAccount
            }
        },
        formisValid: false,
        formisSubmitted: props.loading ? true : false,
        formErrorMessage: false,
        formErrored: false,
        alertType: null
    })

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
        // 
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
            formData.token = props.token;
            formData.user = props.user;
            
if(props.isCommunityAccount){
    if (!isFuture(new Date(`${ formData.schedule }`))) {
        alert('Please Ensure your start date and time is in the future');
        setState({
            ...state, formisSubmitted: false,
            controls: {
                ...state.controls,
                startTime: { ...state.controls.startTime, valid: false }
            }
        });
        return false;
    }
}
            // eslint-disable-next-line no-undef
            props.onCreate(formData)
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
            {formElementArray.map(formElement => (
                <Input
                    key={ formElement.id }
                    elementConfig={ formElement.config.elementConfig }
                    elementType={ formElement.config.elementType }
                    value={ formElement.config.value }
                    changed={ event => inputChangeHandler(event, formElement.id) }
                    invalid={ formElement.config.valid }
                    touched={ formElement.config.touched }
                    label={ formElement.config.label }
                    shouldDisplay={ formElement.config.display }
                />
            ))}

            <Button
                block
                textColor="#fff"
                color="success"
                clicked={ submitHandler }
                disabled={ !state.formisValid }>
                {state.formisSubmitted ? <Spinner /> : 'Go'}
            </Button>
        </form>
    )

    if (props.classroom_kid) {
        return <Redirect to={ `/c/classroom/${ props.classroom_kid }` } />
    }

    return (
        <div>
            <Link to="/">
                <button
                    className="zindex-100 btn btn-outline-secondary fixed-left position-lg-fixed position-md-absolute position-absolute
                         rounded-circle btn-icon-only mt-3 float-left ml-3 home-button">
                    {' '}
                    <span class="btn-inner--icon">
                        <i className="fa fa-home"></i>
                    </span>
                </button>
            </Link>

            <Helmet
                title="Create a classroom | codemarka"
                metaDescription="Collaborte, build and learn in real time when you create a classroom for free."></Helmet>

            <section>
                <div className="row min-vh-100">
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 py-6 py-md-0 side">
                        <div className="align-content-center justify-content-center rocket-cont ">
                            <div className="rocket-cont">
                                <img
                                    width="200"
                                    src={ logo }
                                    className="codemarka_logo"
                                    alt="codemarka"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-0 col-md-6 col-lg-6 col-xl-6 px-sm-5 px-lg-5 p-md-2 py-md-0 px-md-5 mb-3 registration-container">
                        <div>
                            <div className="mb-5 mt-2 text-center">
                                <b className="text-muted mb-0"></b>
                            </div>
                            <span className="clearfix" />

                            <div className="py-4 text-center">
                                <h6 className="h3 mb-0">
                                    Create your Free Classroom Today!
                                </h6>
                            </div>
                            <span className="clearfix" />
                            {form}
                            <Alert
                                type={ state.alertType }
                                display={ state.formErrorMessage }
                                title="Heads Up!">
                                {state.formErrorMessage}
                            </Alert>
                        </div>
                    </div>
                    {/* image section */}
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = ({ auth, classroom }) => {
    return {
        token: auth.user.token,
        classroom_kid: classroom.classdetails ? classroom.classdetails.kid : null,
        loading: classroom.loading,
        isCommunityAccount: auth.user.accountType === 102,
        user: auth.user 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreate: data => dispatch(action.createClassRoomInit(data)),

        onResetAll: () => dispatch(action.classResetAll()),

        onClassroomSwitch: state => dispatch(dispatchAppEnvironment(state))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewClassroom)
