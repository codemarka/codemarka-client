/**
 * /* eslint-disable no-undef
 *
 * @format
 */

/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'
import * as action from '../../store/actions/'
import { dispatchAppEnvironment } from '../../store/actions/app'

import './css/Environment.css'
import '../../components/classroom/Editor/editor.css'
import ColabLayout from './Class'

import Blocked from '../../components/classroom/AccessMessages/Blocked';
import Ended from '../../components/classroom/AccessMessages/Ended';
import NotStarted from '../../components/classroom/AccessMessages/NotStarted';
import MaxedOut from '../../components/classroom/AccessMessages/MaxUsers';
import AlreadyInClass from '../../components/classroom/AccessMessages/AlreadyInClass'

function Environment(props) {
    const {
        match: { params },
        history
    } = props
    const classroomId = params.classroom
    const {
        onClassroomVerify,
        onClassroomSwitch,
        clearClassRoomData,
        status
    } = props

    const checking = (
        <div className="env--content--loading text-center">
            <div
                className="spinner-grow"
                style={{ width: '3rem', height: '3rem', background: 'grey' }}
                role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div style={{ marginTop: '5' }}>Checking classroom..</div>
        </div>
    )

    const [colabstate, setty] = React.useState({
        user_id: props.userid,
        classroom_id: classroomId,
        username: props.username,
        className: props.className,
        isSmallScreen: null,
        in: false
    })

    const { class_verified, isAuthenticated } = props

    React.useEffect(() => {
        if (!colabstate.in) {
            onClassroomSwitch('classroom')

            if (window.innerWidth < 750) {
                setty(s => {
                    return { ...s, isSmallScreen: true }
                })
            }

            setty(s => {
                return { ...s, in: true }
            })
        }

        if (!class_verified && isAuthenticated) {
            onClassroomVerify(classroomId)
        }
    }, [
        class_verified,
        isAuthenticated,
        colabstate.in,
        classroomId,
        onClassroomSwitch,
        onClassroomVerify
    ])

    const getContent = () => {
        if (!props.isAuthenticated && props.authState === 'done') {
            clearClassRoomData()

            return (
                <Redirect
                    to={`/auth/signin?authCheck=failed&redir=/c/classroom/${ classroomId }`}
                />
            )
        }
        if (!props.class_verified && !props.validation_error_message) {
            return checking
        } else if (props.validation_error_message && !props.class_verified) {
            clearClassRoomData()
            return <Redirect to="/error/classroom/not-found" />
        } else if (
            props.isAuthenticated &&
            status &&
            props.class_verified
        ) {
            let blocked = false
            if (props.classroom.participants.length) {
                const alreadyInClass = props.classroom.participants.find(
                    (user) => {
                        return user.kid === props.userid && user.inRoom === true
                    }
                )
                if (alreadyInClass) {
                    return (
                        <AlreadyInClass
                            roomkid={props.kid}
                            userkid={props.userid}
                            token={props.token}
                        />
                    )
                }
            }
                if (String(props.classOwner) !== String(props.userid)) {
                    if (status === 3) {
                        return <Ended />
                    } else if (status === 1) {
                        return (
                            <NotStarted startTimeFull={props.startTimeFull} />
                        )
                    }
                }

            if (props.blocked) {
                props.blocked.forEach(per => {
                    if (per.user.id === props.userid) {
                        blocked = true
                    }
                })
            }

            if (props.classroom){
                // check for number in classroom and classtype
                const numberInClass = props.classroom.numberInClass
                const maxUsers = props.classroom.maxUsers;
                if(numberInClass + 1 > maxUsers){
                    return <MaxedOut />
                }
            }

            if (!blocked) {
                return (
                    <ColabLayout
                        started={props.status === 2}
                        cid={props.cid}
                        name={props.className}
                        owner={props.classOwner === props.userid}
                        data={colabstate}
                        username={props.username}
                        userid={props.userid}
                        description={props.class_description}
                        ownerid={props.classOwner}
                        topic={props.classTopic}
                        pinnedMessages={props.class_pinnedMessages}
                        history={history}
                        cd={props.cclassroom}
                        kid={props.kid}
                        gravatarUrl={props.gravatarUrl}
                        classroomD={props.classroom}
                    />
                )
            }
            else {
                clearClassRoomData()

                return <Blocked className={props.className}/>
            }
        }
    }
    return (
        <div className="env--container" id="env-container">
            {getContent()}
        </div>
    )
}

const mapStateToProps = ({ auth, classroom }) => {
    return {
        isAuthenticated: auth.user.token !== null,
        userid: auth.user.accountid,
        username: auth.user.displayName,
        token: auth.user.token,
        class_verified: classroom.validated,
        classOwner: classroom.owner,
        className: classroom.name,
        validation_error_message: classroom.validation_error_message,
        class_description: classroom.description,
        authState: auth.authState,
        classTopic: classroom.topic,
        class_pinnedMessages: classroom.pinnedMessages,
        blocked: classroom.blocked,
        status: classroom.status,
        startTimeFull: classroom.schedule || classroom.startTimeFull,
        cid: classroom._id,
        kid: classroom.kid,
        gravatarUrl: classroom.gravatarUrl,
        classroom
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClassroomVerify: classroomid =>
            dispatch(action.classVerify(classroomid)),
        onClassroomSwitch: state => dispatch(dispatchAppEnvironment(state)),
        clearClassRoomData: v => dispatch(action.classResetAll())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Environment)
