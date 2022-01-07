/**
 * /* eslint-disable no-undef
 *
 * @format
 */

/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/**
 * /* eslint-disable no-undef
 *
 * @format
 */

/**
 * /* eslint-disable react/prop-types
 *
 * @format
 */

import React, { useRef,useEffect,useState } from 'react'
import { formatToTimeZone } from 'date-fns-timezone'
import Mentions from '../../components/classroom/Conversation_Partials/Mentions/index'
import TextMessage from '../../components/classroom/Conversation_Partials/MessageType/Text/Text'
import ImageMessage from '../../components/classroom/Conversation_Partials/MessageType/Image'
import NotificationMessage from '../../components/classroom/Conversation_Partials/MessageType/Notifications'
import ScrollButton from '../../components/classroom/Conversation_Partials/ScrollTrigger'

import './css/conversation.css'

export default function Conversation(props) {
    const messageRef = useRef(null)

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const inputKeyDown = (event) => {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault()
            props.sendMessage(event)
        }
    }

    const [messageVisible, setMessageVisible] = useState(true)

    useEffect(() => {
        const messageContainer = document.querySelector('#fala');
        messageContainer.addEventListener('scroll', function(e){
            const position1 = e.target.scrollHeight - e.target.scrollTop;
             if (![1,0,2].includes(Number(position1 - e.target.clientHeight))) {
                 setMessageVisible(false)
             } else {
                 setMessageVisible(true)
             }
        });
    }, [])

    if (props.messages && props.messages.length > 0) {
        const messageBundle = {}
        let chunkCount = 0
        const mapMessageToChunkId = {}
        props.messages.forEach((m, i, arr) => {
            const date = new Date(m.oTime)
            const time = formatToTimeZone(date, 'h:mm', { timeZone })

            if (i === 0) {
                messageBundle[`${ chunkCount }`] = [m]
                mapMessageToChunkId[m.msgId] = chunkCount
                chunkCount++
            } else {
                // check if message was sent the same day
                const messageDateAndYear = formatToTimeZone(date, 'h:mm:YYYY', {
                    timeZone,
                })

                const previousMessageDate = new Date(arr[i - 1].oTime)

                const previousMessageDateAndYear = formatToTimeZone(
                    previousMessageDate,
                    'h:mm:YYYY',
                    { timeZone }
                )

                const previousMessagetime = formatToTimeZone(
                    previousMessageDate,
                    'h:mm',
                    { timeZone }
                )

                const previousSender = arr[i - 1].by
                const currentSender = m.by

                if (
                    String(previousMessageDateAndYear) ===
                        String(messageDateAndYear) &&
                    previousSender === currentSender
                ) {
                    if (time === previousMessagetime) {
                        // get chunk id of previous message
                        const previousMessageChunkId =
                            mapMessageToChunkId[arr[i - 1].msgId]

                        messageBundle[`${ previousMessageChunkId }`]
                            ? messageBundle[`${ previousMessageChunkId }`].push(m)
                            : (messageBundle[`${ previousMessageChunkId }`] = [m])

                        mapMessageToChunkId[m.msgId] = previousMessageChunkId
                    } else {
                        messageBundle[`${ chunkCount }`] = [m]
                        mapMessageToChunkId[m.msgId] = chunkCount

                        chunkCount++
                    }
                } else {
                    messageBundle[`${ chunkCount }`] = [m]
                    mapMessageToChunkId[m.msgId] = chunkCount

                    chunkCount++
                }
            }
        })

        const chunkedJSX = []
        for (const key in messageBundle) {
            if (messageBundle.hasOwnProperty(key)) {
                const messages = messageBundle[key]
                let jsx = []
                jsx = messages.map((message) => {
                    if(message.isDeleted) {
                        return (<i key={ message.msgId }>Message was deleted</i>)
                    } else {
                        
                    if (message.type && message.type === 'text') {
                        return (
                            <TextMessage
                                key={ message.msgId }
                                message={ message }
                                users={ props.users }
                                socket={ props.socket }
                            />
                        )
                    } else if (message.type && message.type === 'image') {
                        return (
                            <ImageMessage
                                key={ message.msgId }
                                handleImagePreview={ props.handleImagePreview }
                                message={ message }
                                socket={ props.socket }
                            />
                        )
                    } else {
                        return (
                            <NotificationMessage
                                key={ message.msgId }
                                user={ props.user }
                                message={ message }
                            />
                        )
                    }
                    }
                })
                jsx.unshift({
                    timeSent: messages[0].oTime,
                    username: messages[0].name,
                    color: messages[0].color,
                    userId: messages[0].by,
                })
                chunkedJSX.push(jsx)
            }
        }
        messageRef.current = chunkedJSX
    }

    const getTyping = () => {
        const whoIsTypingArray = props.typing.filter((utypist) => {
            return utypist.id !== props.user
        })

        if (Array.isArray(whoIsTypingArray)) {
            const usersTyping = whoIsTypingArray.length

            if (usersTyping > 0) {
                if (usersTyping === 1) {
                    return (
                        <span className="m-auto">
                            {whoIsTypingArray[0].username.slice(0, 10)} is
                            typing...
                        </span>
                    )
                } else if (usersTyping === 2) {
                    return (
                        <span className="m-auto">
                            {whoIsTypingArray[0].username.slice(0, 10)} and{' '}
                            {whoIsTypingArray[1].username.slice(0, 10)} are
                            typing
                        </span>
                    )
                } else if (usersTyping > 2) {
                    return <span className="m-auto">Too many typing...</span>
                }
            } else {
                return ''
            }
        }
    }

    function handlegoToBottom(e){
        e.preventDefault()
        var objDiv = document.getElementById('fala')
        objDiv.scrollTop = objDiv.scrollHeight
    }

    return (
        <div className="conversation__container d-block">
            <div className="user-bar">
                <div
                    className="name"
                    style={ {
                        color: '#fff',
                        fontSize: '1rem',
                        fontWeight: 200,
                    } }>
                    <div className="channel_info_container">
                        <div className="channel_info_title">
                            <i className="fas fa-comment-alt"></i> Workspace{' '}
                            <br />{' '}
                            <span style={ { fontSize: 'smaller' } }>
                                {' '}
                                # general{' '}
                            </span>{' '}
                        </div>
                        {/* <b># general</b> */}
                    </div>
                </div>
            </div>
            {/* messages tab */}
            <div className="container bg-black messages" id="fala">
                {/* {messageRef.current} */}
                {messageRef.current
                    ? messageRef.current.map((messages) => {
                          const groupMetaData = messages[0]
                          const {
                              timeSent,
                              color,
                              userId,
                              username,
                          } = groupMetaData
                          const date = new Date(timeSent)
                          const time = formatToTimeZone(date, 'h:mm a', {
                              timeZone,
                          })
                          if (userId === 'server') {
                              return messages.map((element, i) => {
                                  if (i !== 0) {
                                      return element
                                  }
                              })
                          } else {
                              return (
                                  <div
                                      className={ `message ${
                                          userId === props.user
                                              ? 'sent'
                                              : 'received'
                                      }` }>
                                      <div
                                          style={ {
                                              color: `${ color }`,
                                          } }
                                          className="font-weight-800 user-by">
                                          {userId !== props.user
                                              ? username
                                              : ''}
                                      </div>
                                      {messages.map((element, i) => {
                                          if (i !== 0) {
                                              return element
                                          }
                                      })}
                                      <span className="metadata">
                                          <b className="time">{time}</b>
                                      </span>
                                  </div>
                              )
                          }
                      })
                    : ''}
            </div>

            <Mentions
                users={ props.users }
                userSelected={ props.userSelected }
                mentionSearchString={ props.mentionSearchString }
                shouldDisplay={ props.shouldDisplay }
            />

            <ScrollButton
                goToBottom={ handlegoToBottom }
                status={ messageVisible }
            />

            {/* input text area */}
            <div className="input_container bg-dark">
                <textarea id="copy_board_textarea" hidden></textarea>
                <textarea
                    style={ {
                        fontSize: 'small',
                        padding: '.5rem .25rem',
                        background: '#2c3848',
                        border: 0,
                    } }
                    resize="none"
                    id="input_area"
                    onBlur={ props.inputBlur }
                    onFocus={ props.inputFocused }
                    value={ props.inputValue }
                    onChange={ props.handleInputChange }
                    onKeyDown={ inputKeyDown }
                    placeholder="Message Everyone with ''❤''"
                    className="form-control"></textarea>
                <div className="action-container">
                    <span onClick={ props.showMentions }>
                        <i className="fa fa-at"></i>
                    </span>
                    <span onClick={ props.showEmojiPicker }>
                        <i className="fa fa-smile"></i>
                    </span>
                    {/* <span onClick={props.addCodeBlock}>
                        <i className="fa fa-code"></i>
                    </span> */}
                    <span onClick={ props.uploadImage }>
                        <i className="fa fa-image"></i>
                    </span>
                    {/* <span onClick={props.uploadFiles}>
                        <i className="fa fa-file-alt"></i>
                    </span>
                    <span onClick={props.addURL}>
                        <i className="fa fa-paperclip"></i>
                    </span> */}
                </div>

                <div
                    className="text-white"
                    style={ { fontSize: 13, width: '100%', flexWrap: 'wrap' } }>
                    {getTyping()}
                </div>
            </div>
        </div>
    )
}
