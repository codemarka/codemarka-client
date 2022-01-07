/**
 * /* eslint-disable no-undef
 *
 * @format
 */

/** @format */

import React, { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actionType from '../../../../../store/actions/Types'
import '../Styles/text.css'
import MessageActions from '../Components/Actions'
import ThreadReplies from '../Components/ThreadReplies'
import Reactions from '../Components/Reactions'

function MessageComponent(props) {
  useLayoutEffect(() => {
      var objDiv = document.getElementById('fala')
      objDiv.scrollTop = objDiv.scrollHeight
  }, [])
    const { isThread, isDeleted, msgId, by, thread, wasEdited } = props.message

    const [showAction, setShowingAction] = useState(false)

    if (isDeleted)
        return <i className="deleted_message">Message was deleted </i>

    async function handleShowThread(e) {
        e.preventDefault()
       await props.setMessageThread({
            messageId: msgId,
            classroomId: props.match.params.classroom,
        })
       await document.getElementById('thread_modal_button').click()
    }

    function showReactionComponent(e) {
        e.preventDefault()
        props.setMessageThread({
            messageId: msgId,
            userId: props.userId,
            classroomId: props.match.params.classroom,
        })
        //  props.showReactionComponent(true);
    }

    return (
        <div
            onMouseLeave={ (e) => setShowingAction(false) }
            onMouseEnter={ (e) => setShowingAction(true) }
            id={ props.id }
            className="main_message_container">
            <div
                className="r-message"
                dangerouslySetInnerHTML={ { __html: props.content } }
            />
            {wasEdited && <small className="disabled">edited</small>}
            {showAction && !props.message.isDeleted ? (
                <MessageActions
                    // setShowEmoji={ (v) => setShowingEmoji(v) }
                    keepShowingActions={ (e) => showReactionComponent(e) }
                    id={ msgId }
                    senderid={ by }
                    type="text"
                    message={ props.message.msg }
                    isDeleted={ props.message.isDeleted }
                />
            ) : (
                ''
            )}

            <Reactions
                messageid={ props.message.msgId }
                room={ props.kid }
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

function Text(props) {
    const copyCode = (e, code) => {
        navigator.permissions
            .query({ name: 'clipboard-write' })
            .then((result) => {
                if (result.state === 'granted' || result.state === 'prompt') {
                    /* write to the clipboard now */
                    navigator.clipboard.writeText(code).then(
                        function () {
                            /* clipboard successfully set */
                            alert('Copied code to clipboard')
                        },
                        function () {
                            /* clipboard write failed */
                        }
                    )
                }
            })
    }

    var wrapURLs = function (text, new_window, id) {
        var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/gm
        let hasHTML = false
        const tabFound = text.replace('\t', '')
        const newLine = tabFound.replace('\n', '')
        text = newLine
        const htmlRegex = /<.+?>/g

        let rt = text.replace(htmlRegex, function (username) {
            hasHTML = true
            return username
        })

        if (hasHTML) {
            return (
                <code
                    style={ { cursor: 'pointer' } }
                    onClick={ (e) => copyCode(e, rt) }>
                    {rt}
                </code>
            )
        }

        var target = new_window === true || new_window == null ? '_blank' : ''
        rt = rt.replace(url_pattern, function (url) {
            var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i
            var href = protocol_pattern.test(url) ? url : 'http://' + url

            return `<a href="${ href }" target="${ target }"> ${ url } </a>`
        })
        const mentionReqex = /@+[\w]*/gm

        rt = rt.replace(mentionReqex, function (username) {
            const userFound = props.users.filter((user) => {
                return (
                    String(`@${ user.username.trim() }`) ===
                    String(username.trim())
                )
            })
            if (userFound.length) {
                return `<b style="
    padding: 2px;
    border-radius: 6px;
"><a style="color:#aea262;cursor:pointer" href="/u/${ userFound[0].username }" target="_blank" rel="noopener noreferrer" class="mentions_username"> ${ username }</a>
 </b>`
            } else return username
        })

        return (
            <MessageComponent
                { ...props }
                content={ rt }
                id={ props.message.msgId }
            />
        )
    }
    return <React.Fragment>{wrapURLs(props.message.msg)}</React.Fragment>
}

Text.propTypes = {
    message: PropTypes.object,
}

const matchDispatchToProps = (dispatch) => {
    return {
        setMessageThread: (data) =>
            dispatch({ type: actionType.SET_MESSAGE_THREAD, data }),
        hideMessageReactionPicker: (data) =>
            dispatch({
                type: actionType.SET_DISPLAYING_MESSAGE_REACTION_PICKER,
                status: data,
            }),
    }
}

const mapStateToProps = ({ auth, classroom }) => {
    return {
        userId: auth.user.accountid,
        ...classroom,
    }
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Text))
