/** @format */

import React,{ useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actionType from '../../../../store/actions/Types'
import MessageActions from './Components/Actions'
import ThreadReplies from './Components/ThreadReplies'
import Reactions from './Components/Reactions';

function ImageMessage(props) {
    const { isThread, isDeleted, msgId, by, thread } = props.message
 useLayoutEffect(() => {
     var objDiv = document.getElementById('fala')
     objDiv.scrollTop = objDiv.scrollHeight
 }, [])
    const [showAction, setShowingAction] = useState(false)
  function handleShowThread(e) {
      e.preventDefault()
      document.getElementById('thread_modal_button').click()
      props.setMessageThread({
          messageId: msgId,
          userId: props.userId,
          classroomId: props.match.params.classroom,
      })
  }

    if (isDeleted)
        return <i className="deleted_message">Message was deleted </i> 

    return (
        <div
            onMouseLeave={ (e) => setShowingAction(false) }
            onMouseEnter={ (e) => setShowingAction(true) }
            style={ {
                maxWidth: '100%',
            } }
            className="main_message_container"
            id={ props.message.msgId }>
            <img
                src={ props.message.result.secure_url }
                alt={ props.message.result.public_id }
                title={ 'Image' }
                style={ {
                    width: '100%',
                    cursor: 'pointer',
                    objectFit: 'cover',
                } }
                height="180px"
                onClick={ (e) =>
                    !props.replyingthread &&
                    props.handleImagePreview(e, props.message.result.secure_url)
                }
            />

            {showAction && !props.replyingthread && !props.message.isDeleted ? (
                <MessageActions
                    keepShowingActions={ (e) => setShowingAction(true) }
                    id={ msgId }
                    senderid={ by }
                    type="image"
                    isDeleted={ props.message.isDeleted }
                />
            ) : (
                ''
            )}

            <Reactions
                messageid={ props.message.msgId }
                classroomid={ props.kid }
                user={ props.userId }
                reactions={ props.message.reactions }
            />
            {isThread ? (
                <ThreadReplies
                    msgId={ msgId }
                    showThread={ handleShowThread }
                    thread={ thread }
                    { ...props }
                />
            ) : (
                ''
            )}
        </div>
    )
}

const matchDispatchToProps = (dispatch) => {
    return {
        setMessageThread: (data) =>
            dispatch({ type: actionType.SET_MESSAGE_THREAD, data }),
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        userId: auth.user.accountid,
    }
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(ImageMessage))