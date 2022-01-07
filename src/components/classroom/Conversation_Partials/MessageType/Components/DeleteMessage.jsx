/** @format */

import React, { useState, useEffect, useLayoutEffect } from 'react'
import Modal from '../../../../Partials/Modals/Modal'
import Button from '../../../../Partials/Button'
import Spinner from '../../../../Partials/Preloader'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function DeleteMessage(props) {
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
    }, [])

    const handleDeleteInit = () => {
        setIsSaving(true)
        const data = {
            content: '',
            room: props.deletestate.classroomId,
            time: new Date(),
            edit_by: {
                kid: props.user.accountid,
                username: props.user.displayName,
                email: props.user.email,
                image: props.user.displayImg,
            },
            messageId: props.deletestate.messageId,
        }
            props.socket.emit('delete_message', data)
    }
    const style = {
        maxWidth: '31rem',
        borderRadius: 0,
    }

    const handleCloseEditModal = (event) => {
        // close modal here!
        document.getElementById('delete_message_modal').click()
    }

    return (
        <Modal
            style={ style }
            size="sm"
            footerContent={
                <div>
                    <Button
                        clicked={ handleDeleteInit }
                        type="button"
                        size="sm"
                        textColor="#fff"
                        disabled={ isSaving }
                        color="danger">
                        {isSaving ? <Spinner /> : 'Delete'}
                    </Button>
                    <Button
                        clicked={ handleCloseEditModal }
                        type="button"
                        disabled={ isSaving }
                        size="sm"
                        textColor="#fff"
                        color="success">
                        cancel
                    </Button>
                </div>
            }
            title=""
            targetid="delete_message_modal">
            <div className="message_thread_input_container">
                <h3>
                    <b>Are you sure you want to delete this message?</b>
                    😯
                </h3>
            </div>
            <button
                type="button"
                data-toggle="modal"
                data-target="#delete_message_modal"
                id="delete_message_modal_button"
                hidden="true"></button>
        </Modal>
    )
}
const mapStateToProps = ({ classroom, auth }) => {
    return {
        deletestate: classroom.editOrDeleteMessage,
        user: auth.user,
    }
}

export default withRouter(connect(mapStateToProps, null)(DeleteMessage))
