/** @format */

import React, { useState, useEffect, useLayoutEffect } from 'react'
import Modal from '../../../../Partials/Modals/Modal'
import Input from '../../../../Partials/Input/Input'
import Spinner from '../../../../Partials/Preloader'
import ImageMessage from '../Image';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actionType from '../../../../../store/actions/Types'
import { convertToReadableDateFormat} from '../../../../../utility/shared'
function FooterContent(props) {
    const [threadMessage, setThreadMessage] = useState('')

    function handleThreadMessageChanged(e) {
        const value = e.target.value
        setThreadMessage(value)
    }

    useLayoutEffect(() => {
        var objDiv = document.getElementById('thread_container_div')
        if(objDiv){
          objDiv.scrollTop = objDiv.scrollHeight
        }
    }, [props.threadState.messages])

    useEffect(() => {
        props.socket.on('thread_reply',(thread) => {
            // 
            props.updateMessageThread(thread)
        });
    },[])

     const inputKeyDown = (event) => {
         if (event.keyCode === 13) {
             event.preventDefault()
             const data = {
                 content: threadMessage,
                 room: props.threadState.classroomId,
                 time: new Date(),
                 reply_by: {
                     kid: props.user.accountid,
                     username: props.user.displayName,
                     email: props.user.email,
                     image: props.user.displayImg
                 },
                 messageId: props.threadState.messageId
             }
             if (threadMessage.length > 0) {
                 props.socket.emit('new_thread_reply', data)
                 setThreadMessage('')
             }
         }
     }
    return (
        <div className="message_thread_input_container">
            <Input
                value={ threadMessage }
                shouldDisplay={ true }
                changed={ handleThreadMessageChanged }
                KeyDown={ inputKeyDown }
                elementType="textarea"
                elementConfig={ {
                    resize: 'none',
                    placeholder: "Reply with ''❤''",
                    rows: 1,
                } }
            />
        </div>
    )
}

function MessageThread(props) {
    const style = {
        maxWidth: '31rem',
        borderRadius: 0,
    }

    return (
        <Modal
            style={ style }
            size="sm"
            footerContent={ <FooterContent { ...props } /> }
            title="Message Thread"
            targetid="thread_modal">
            {!props.threadState.loading && props.threadState.retrieved ? (
                <div className="thread_container" id="thread_container_div">
                    <div className="thread_user_message_info">
                        <div className="thread_user_icon">
                            <img
                                src={ props.threadState.userInfo.image }
                                alt={ props.threadState.userInfo.username }
                            />
                        </div>
                        <div className="thread_user_name_date_message">
                            <div className="thread_user_container">
                                <span>
                                    @{props.threadState.userInfo.username}
                                </span>{' '}
                                <small>
                                    {convertToReadableDateFormat(
                                        props.threadState.timeSent,
                                        'h:mm A, Do MMMM YYYY'
                                    )}
                                </small>
                            </div>
                            <div className="thread_message_content">
                                {props.threadState.data.type === 'text' ? (
                                    props.threadState.message
                                ) : (
                                    <ImageMessage
                                        message={
                                            props.threadState.data
                                        }
                                        replyingthread
                                    />
                                )}
                                {}
                            </div>
                        </div>
                    </div>
                    <div className="thread_replies_container">
                        {props.threadState.messages &&
                        props.threadState.messages.length > 0
                            ? props.threadState.messages.map((message) => {
                                  return (
                                      <div
                                          className="thread_reply"
                                          key={ message.messageId }>
                                          <div className="thread_reply_user">
                                              <div className="thread_reply_user_image">
                                                  <img
                                                      src={
                                                          message.reply_by.image
                                                      }
                                                      height="30px"
                                                      width="30px"
                                                      alt={
                                                          message.reply_by
                                                              .username
                                                      }
                                                  />
                                              </div>
                                              <div className="thread_reply_user_username">
                                                  <span>
                                                      {
                                                          message.reply_by
                                                              .username
                                                      }
                                                  </span>
                                                  <div className="message">
                                                      {message.content}
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  )
                              })
                            : ''}
                    </div>
                </div>
            ) : (
                <Spinner />
            )}

            <button
                type="button"
                data-toggle="modal"
                data-target="#thread_modal"
                id="thread_modal_button"
                hidden={ true }></button>
        </Modal>
    )
}
const mapStateToProps = ({ classroom,auth }) => {
    return {
        threadState: classroom.messageThread,
        user: auth.user
    }
}

const matchDispatchToProps = (dispatch) => {
    return {
        addMessageToThread: () => dispatch({ type: actionType.AUTO_AUTH_INIT }),
        // fetchMessageThread: () =>
        //     dispatch({ type: actionType.MESSAGE_THREAD_FETCH_START }),
        updateMessageThread: (data) => dispatch({ type: actionType.MESSAGE_THREAD_UPDATED, data})
    }
}

export default withRouter(
    connect(mapStateToProps, matchDispatchToProps)(MessageThread)
)
