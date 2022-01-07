/** @format */

import React, { useState, useEffect, useLayoutEffect } from 'react'
import Modal from '../../../../Partials/Modals/Modal'
import Input from '../../../../Partials/Input/Input'
import Button from '../../../../Partials/Button'
import Spinner from '../../../../Partials/Preloader'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function EditMessage(props) {
    const [message, setmessage] = useState(props.editstate.originalContent)
    const [isSaving, setIsSaving] = useState(false)

    useLayoutEffect(() => {
      setIsSaving(false)

      return function cleanup() {
          setIsSaving(false)
      }
    }, [])
    useEffect(() => {
        props.socket.on('edit_success', () => {
            setIsSaving(false)
        })
        setmessage(props.editstate.originalContent);        
    }, [])

    useEffect(() => {
      setmessage(props.editstate.originalContent)
    }, [props.editstate])

    const inputKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
             setIsSaving(true)
            const data = {
                content: message,
                room: props.editstate.classroomId,
                time: new Date(),
                edit_by: {
                    kid: props.user.accountid,
                    username: props.user.displayName,
                    email: props.user.email,
                    image: props.user.displayImg,
                },
                messageId: props.editstate.messageId,
            }
            if (message.length > 0) {
                props.socket.emit('edit_message', data)
            }
        }
    }

    const handleEditInit = () => {
      setIsSaving(true)
        const data = {
            content: message,
            room: props.editstate.classroomId,
            time: new Date(),
            edit_by: {
                kid: props.user.accountid,
                username: props.user.displayName,
                email: props.user.email,
                image: props.user.displayImg,
            },
            messageId: props.editstate.messageId,
        }
        if (message.length > 0) {
            props.socket.emit('edit_message', data)
        }
    }
    const style = {
        maxWidth: '31rem',
        borderRadius: 0,
    }

    const handleCloseEditModal = (event) => {
      // close modal here!
      document.getElementById('edit_message_modal').click();
    }

    return (
        <Modal
            style={ style }
            size="sm"
            footerContent={
                <div>
                    <Button
                        clicked={ handleEditInit }
                        type="button"
                        size="sm"
                        textColor="#fff"
                        disabled={ isSaving }
                        color="success">
                        {isSaving ? <Spinner /> : 'save changes'}
                    </Button>
                    <Button
                        clicked={ handleCloseEditModal }
                        type="button"
                        disabled={ isSaving }
                        size="sm"
                        textColor="#fff"
                        color="danger">
                        cancel
                    </Button>
                </div>
            }
            title="Edit Message"
            targetid="edit_message_modal">
            <div className="message_thread_input_container">
                <Input
                    shouldDisplay={ true }
                    value={ message }
                    changed={ (e) => setmessage(e.target.value) }
                    KeyDown={ inputKeyDown }
                    elementType="textarea"
                    elementConfig={ {
                        resize: 'none',
                        placeholder: 'Type your message',
                        rows: 'auto',
                        style: { border: '2px solid #000' },
                        id: 'editMessageTextArea',
                    } }
                />
            </div>
            <button
                type="button"
                data-toggle="modal"
                data-target="#edit_message_modal"
                id="edit_message_modal_button"
                hidden="true"></button>
        </Modal>
    )
}
const mapStateToProps = ({ classroom, auth }) => {
    return {
        editstate: classroom.editOrDeleteMessage,
        user: auth.user,
    }
}

export default withRouter(connect(mapStateToProps, null)(EditMessage))
