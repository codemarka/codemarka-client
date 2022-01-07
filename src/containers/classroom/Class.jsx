/* eslint-disable camelcase */
/* eslint-disable no-undef */
import React, { useState, useRef,useLayoutEffect } from 'react'
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as action from '../../store/actions/'

import Navigation from '../../components/classroom/UI/NavBar'
import Convo from './Conversation'
import Editor from '../../components/classroom/Editor/index'
import Preview from '../../components/classroom/Editor/Preview'
import AudioVideo from '../../components/classroom/AudioVideo/RTC';
import Seo from '../../components/SEO/helmet'
import Modal from '../../components/Partials/Modals/Modal'
import Input from '../../components/Partials/Input/Input'
import Spinner from '../../components/Partials/Preloader'
import ParticipantModal from '../../components/classroom/Participants/Modal'
import ClassRoomSettingsModal from '../../components/classroom/Settings/index.jsx';
import EmojiPicker from '../../components/classroom/Emoji/picker';
import MessageReactionEmojiPicker from '../../components/classroom/Emoji/picker'
import EditMessageModal from '../../components/classroom/Conversation_Partials/MessageType/Components/EditMessage';
import DeleteMessageModal from '../../components/classroom/Conversation_Partials/MessageType/Components/DeleteMessage'

import ImagePreview from '../../components/classroom/ImagePreview/index';

import { DOWNLOAD_CLASSROOM_ATTENDANCE } from '../../config/api_url';
import AttendanceCollector from '../../components/classroom/Attendance/index.jsx';
import MessageReactions from './MessageReactions'

import CodeBlockModal from '../../components/classroom/Conversation_Partials/CodeBlocks/index';
import ClassInformationModal from '../../components/classroom/Modals/ClassroomInformation'
import VideoAndAudioPermission from '../../components/classroom/Modals/VideoAndAudioPermission';
import { CLASSROOM_FILE_DOWNLOAD } from '../../config/api_url'
import ConversationThread from '../../components/classroom/Conversation_Partials/MessageType/Components/MessageThread'
import ReconnectionModal from '../../components/classroom/UI/ReconnectionModal';

import './css/Environment.css'

const host =
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
        ? 'https://codemarka.herokuapp.com'
        : 'http://localhost:2001'

const socket = io(host, {
    reconnection: true,
    reconnectionDelay: 6000,
    reconnectionDelayMax:1000,
    reconnectionAttempts: 30
})

toast.configure({
    autoClose: 6000,
    draggable: true
})

// const localVideoRef = useRef(null);

const MainClassLayout = ({
    ownerid,
    data,
    owner,
    name,
    description,
    username,
    userid,
    topic,
    onClassroomVerify,
    pinnedMessages,
    started,
    cid,
    gravatarUrl,
    classroomD,
    setSocket,
    closeReactionEmojiPicker,
    isShowingReactionEmoji,
    activeMessage,
    handleUnsetEditOrDeleteMessage,
    isProcessingEditingOrDeletingMessage,
    instanceOdEditingOrDeletingMessage,
    usersData
}) => {
    const [inputState, setInputState] = useState({
        value: '',
        isFocused: false,
        lastSentMessage: null,
    })

    const [userMessageColor, setUserMessageColor] = useState('#000')

    const [isDisplayingEmoji, setisDisplayingEmoji] = useState(false)
    const [, setIsUploadingImage] = useState(false)
    const [imagePreviewConfig, setImagePreviewConfig] = useState({
        shouldDisplay: false,
        url: '',
    })
    const [attendanceState, setAttendanceState] = useState({
        hasCollectedAttendance: false,
        isCollectingAttendance: classroomD.isTakingAttendance,
        isSubmittingAttendance: false,
        userAttendanceData: {
            email: '',
            gender: '',
            lastName: '',
            firstName: '',
            phone: '',
            kid: '',
            classExpertiseLevel: '',
        },
        list: [],
        downloadStatus: '',
    })
    
    const socketRef = useRef(socket)
    const audioVideoRef = useRef()

    const [codemarkastate, setcodemarkaState] = useState({
        messages: [],
        editors: [],
        previewContent: {
            html: null,
            css: null,
        },
        owner,
        users: [],
        editorPriviledge: owner,
        typingState: [],
        favourite: null,
        submitted: false,
        pinnedMessages: [],
        redirect: false,
        starRated: null,
        blocked: false,
        numberInClass: 0,
        sdemitted: null,
        countDownTime: 5,
        ended: false,
        started: null,
        starting: null,
        connected: true,
        currentEditorSelection: '',
        CSS_CDN: [],
        JS_CDN: [],
        isShowingMentions: false,
        mentionSearchString: null,
    })

    const [editorUploadState, setEditorUploadState] = useState({
        file: '',
        uploading: false,
    })

    const [userSpecificMessages] = useState([])
    const [userInvitationData, setUserInvitationData] = useState({
        value: '',
        socketFeedback: null,
        socketFeedbackStatus: null,
    })

    const startCountDonwTimer = () => {
        let t = 5
        const updateCounter = (ct) => {
            setcodemarkaState((s) => {
                t--
                return { ...s, countDownTime: ct - 1 }
            })
        }
        const inter = setInterval(() => {
            if (t !== 0) {
                updateCounter(t)
            } else {
                clearInterval(inter)
            }
        }, 1000)
    }
    const [SocketConnection, setSocketConnection] = useState({
        connected: true,
    })

    const [
        ClassroomPinnedInformation,
        setClassroomPinnedInformation,
    ] = useState({
        changed: false,
        value: '',
    })
    const connAttempts = useRef(0)
    const [inRoom, setInRoom] = useState(null)

    const redirectTo = (e, path) => {
        window.location.href = window.location.origin
    }

    const [starRating, setStarRating] = useState(0)

    useLayoutEffect(() => {
        socket.on('new_image_message', (data) => {
            const updateMessage = new Promise((resolve) => {
                resolve(
                    setcodemarkaState((c) => {
                        const oldmsg = c.messages
                        oldmsg.push(data)
                        const newuserTypingList = c.typingState.filter(
                            (typist) => {
                                return typist.id !== data.by
                            }
                        )
                        return {
                            ...c,
                            messages: oldmsg,
                            typingState: newuserTypingList,
                        }
                    })
                )
            })
            updateMessage.then((d) => {
                setTimeout(() => {
                    setcodemarkaState((c) => {
                        if (c.messages && c.messages.length > 0) {
                            const len = c.messages.length
                            const lastIndex = len - 1
                            const ele = c.messages[lastIndex].msgId
                            const lelem = document.getElementById(ele)

                            lelem.scrollIntoView(false)
                        }
                        return c
                    })
                }, 1000)
            })
        })

        socket.on('thread_reply', (thread, subscribers) => {
            setcodemarkaState((c) => {
                let oldMsg = c.messages
                oldMsg = oldMsg.map((message) => {
                    if (
                        message.msgId === thread[0].messageId &&
                        !message.isThread
                    ) {
                        return {
                            ...message,
                            isThread: true,
                            subscribers,
                        }
                    }
                    return message
                })
                return {
                    ...c,
                    messages: oldMsg,
                }
            })
        })

        socket.on('message_edit_or_delete_success', async function (
            message__
        ) {
            await setcodemarkaState((c) => {
                let oldMsg = c.messages
                oldMsg = oldMsg.map((message) => {
                    if (message.msgId === message__.msgId) {
                        return {
                            ...message__,
                        }
                    }
                    return message
                })
                return {
                    ...c,
                    messages: oldMsg,
                }
            })
            await document.getElementById('edit_message_modal') && document.getElementById('edit_message_modal').click()
            await document.getElementById('delete_message_modal') && document.getElementById('delete_message_modal').click()

            await handleUnsetEditOrDeleteMessage()
        })
        //listen for old message
        socket.on('updateMsg', (msg) => {
            setcodemarkaState((c) => {
                let oldmsg = c.messages
                oldmsg = msg.msgs.map((element) => {
                    return element
                })
                return {
                    ...c,
                    messages: oldmsg,
                    pinnedMessages: pinnedMessages,
                }
            })
        })
    }, [])

    React.useEffect(() => {
        const elem = document.querySelector('#editor_file_uploader_input')
        elem.addEventListener('change', handleUploadInputChange, {
            once: true,
            capture: true,
            passive: true,
        })

        return function () {
            elem.removeEventListener('change', handleUploadInputChange, true)
        }
    }, [editorUploadState])

    React.useEffect(() => {
        socket.on('attedance_ready', (file, list) => {
            setAttendanceState((state) => {
                return { ...state, list, downloadStatus: '' }
            })
            window.open(
                `${ DOWNLOAD_CLASSROOM_ATTENDANCE }/${ classroomD.kid }/${ file }`,
                '_blank'
            )
        })
    }, [classroomD.kid])

    React.useEffect(() => {
        socketRef.current = socket
        setSocket(socket)
    }, [socket.connected])

    React.useEffect(() => {
        const getRandomColor = () => {
            const letters = ['#b99286', '#a4cc99', '#7f82bb', '#b3cc6e']
            const color = letters[Math.floor(Math.random() * 4)]
            return color
        }
        const selectedUserColor = getRandomColor()
        setUserMessageColor(selectedUserColor)
    }, [socket.connected])

    React.useEffect(() => {
        if (inRoom && owner && !started) {
            setTimeout(() => {
                document.querySelector('#dialogueToStart').click()
            }, 10000)
        }
    }, [inRoom])

    React.useEffect(() => {
        const requestData = {
            classroom_id: cid || data.classroom_id,
            userId: userid,
            username,
            cdata: classroomD,
        }

        if (!inRoom && !codemarkastate.blocked) {
            // set listeners and emitters
            setInRoom(true)

            socket.on('collect_attendance', (attendanceList) => {
                if (!owner) {
                    setAttendanceState({
                        ...attendanceState,
                        hasCollectedAttendance: false,
                        isCollectingAttendance: true,
                        isSubmittingAttendance: true,
                    })
                    document.querySelector('#attendance_modal').click()
                }
            })

            socket.on('has_attendance_recorded', (attendance) => {
                setAttendanceState({
                    ...attendanceState,
                    userAttendanceData: attendance,
                    hasCollectedAttendance: true,
                    isCollectingAttendance: true,
                    isSubmittingAttendance: false,
                })
            })

            socket.on('new_message_reaction', (messageData) => {
                const { msgId } = messageData

                setcodemarkaState((s) => {
                    const isValid = s.messages.find(
                        (message) => message.msgId === msgId
                    )
                    if (isValid) {
                        const newMessages = s.messages.map((message) => {
                            if (message.msgId === msgId) {
                                return {
                                    ...messageData,
                                }
                            }
                            return message
                        })
                        return { ...s, messages: newMessages }
                    }
                    return s
                })
            })

            socket.on('attendance_recorded', () => {
                setAttendanceState({
                    ...attendanceState,
                    hasCollectedAttendance: true,
                    isCollectingAttendance: true,
                    isSubmittingAttendance: false,
                })
            })

            socket.on('new_attendance', (list) => {
                if (owner) {
                    setAttendanceState({
                        ...attendanceState,
                        hasCollectedAttendance: true,
                        list,
                    })
                    toast.info(`${ list.username } has added their attendance`, {
                        position: 'bottom-center',
                    })
                }
            })

            socket.on('attendance_list', (list) => {
                if (owner) {
                    setAttendanceState({
                        ...attendanceState,
                        hasCollectedAttendance: true,
                        list,
                    })
                }
            })

            socket.on('image_upload_complete', () => {
                toast.success('Image Upload Successful', {
                    position: toast.POSITION.BOTTOM_CENTER,
                })
                document
                    .getElementById('upload__codemarka__progressing')
                    .remove()
            })

            socket.on('attendance_reminder', () => {
                if (owner) {
                    toast.success(
                        <div>
                            Heads Up! :handball_person:
                            <br />
                            Reminder Sent to all participants.{' '}
                        </div>
                    )
                } else if (!attendanceState.hasCollectedAttendance) {
                    toast.success(
                        <div>
                            Listen Up!
                            <br />
                            Host is requesting you fill up your
                            attendance,thanks.
                        </div>
                    )
                }
            })

            socket.on('rejoin_updateMsg', (msg) => {
                setcodemarkaState((c) => {
                    return {
                        ...c,
                        messages: msg.msgs,
                        users: msg.newuserslist,
                        numberInClass: msg.newuserslist.length,
                    }
                })
            })

            socket.on('force_disconnect', () => {
                alert('Closing this session! Bye!');
                  setSocketConnection({
                      ...SocketConnection,
                      connected: false,
                      failed: true,
                  })

                socket.close();
            })

            socket.on('started_class', () => {
                setcodemarkaState((s) => {
                    return { ...s, started: true, starting: null }
                })
                toast.success(
                    <div>
                        Heads Up!
                        <br />
                        Classroom session has started!{' '}
                    </div>
                )
            })

            // disconnect users previous session
            socket.on('disconnect_user_before_join', (user) => {
                if (user.userId === userid) {
                    socket.close()
                    toast.warn('Session terminated', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                }
            })
            // tell server to add user to class
            socket.emit('join', {
            classroom_id: cid,
            userkid: userid,
            username,
            cdata: classroomD,
        })

            setSocket(socket)

            //listen for new members added
            socket.on('someoneJoined', (msg) => {
                setcodemarkaState((c) => {
                    const oldmsg = c.messages
                    oldmsg.push(msg)
                    const nnc = msg.newuserslist.find((u) => {
                        return true
                    })
                    if(msg.for === userid){
                        socket.close();
                        alert('You have been logged Out! Bye!!')
                    }
                    socket.emit('user_typing_cleared', {
                        username: msg.name,
                        userid: msg.for,
                        classroomid: msg.roomId,
                    })
                    return {
                        ...c,
                        messages: oldmsg,
                        users: msg.newuserslist,
                        numberInClass: nnc.length,
                    }
                })
                var objDiv = document.getElementById('fala')
                objDiv.scrollTop = objDiv.scrollHeight
            })

            socket.on('disconnect', (reason) => {

                if (reason === 'io server disconnect') {
                    // the disconnection was initiated by the server, you need to reconnect manually
                    socket.connect()
                }
                socket.emit('lefti')
                if (connAttempts.current > 30) {
                  setSocketConnection({ ...SocketConnection, connected: false, failed: true })
                }
            })

            socket.on('rated_class', (rated) => {
                setcodemarkaState((s) => {
                    return { ...s, starRated: rated }
                })
            })

            socket.on('reconnecting', (attemptNumber) => {
                connAttempts.current++
                setSocketConnection({ connected: attemptNumber > 10 ? false : true, attemptNumber })
            })

            socket.on('star_rating_failed', (reason) => {
                toast.warning(
                    <div>
                        Heads Up!
                        <br />
                        Rating failed,{reason}
                    </div>
                )
            })

            socket.on('reconnect_error', (error) => {
                if (connAttempts.current >= 30) {
                    setSocketConnection({ connected: false, failed: true })
                }
            })

            socket.on('reconnect_failed', () => {
                setSocketConnection({ connected: false, failed: true })
            })

            socket.on('reconnect', (attemptNumber) => {
                setSocketConnection({ connected: true, failed: false })
                socket.emit('join', requestData)
                // toast.success('Back Online!', { position: 'bottom-center' })
                connAttempts.current = 0
                socket.emit(
                    'update_socket_id',
                    socketRef.current.id,
                    requestData
                )
                
            })

            //listen for new messages
            socket.on('nM', (messageData) => {
                new Promise((resolve, reject) => {
                    resolve(
                        setcodemarkaState((c) => {
                            const oldmsg = c.messages
                            oldmsg.push(messageData)
                            const newuserTypingList = c.typingState.filter(
                                (typist) => {
                                    return typist.id !== messageData.by
                                }
                            )
                            return {
                                ...c,
                                messages: oldmsg,
                                typingState: newuserTypingList,
                            }
                        })
                    )
                })
            })

            //listen for members leaving
            socket.on('updatechat_left', (msg) => {
                setcodemarkaState((c) => {
                    const oldmsg = c.messages
                    oldmsg.push(msg)

                    const newUserList = c.users.filter((user) => {
                        return String(user.kid) !== String(msg.for)
                    })
                    const newTypingState = c.typingState.filter((user) => {
                        return String(user.kid) !== String(msg.for)
                    })

                    socket.emit('user_typing_cleared', {
                        username: msg.name,
                        userid: msg.for,
                        classroomid: msg.roomId,
                    })

                    return {
                        ...c,
                        messages: oldmsg,
                        users: newUserList,
                        numberInClass: newUserList.length,
                        typingState: newTypingState,
                    }
                })
            })

            socket.on('utyping', ({ username, userid }) => {
                setcodemarkaState((c) => {
                    let found = false

                    c.typingState.forEach((typist) => {
                        if (String(typist.id) === String(userid)) {
                            found = true
                        }
                    })

                    if (found) {
                        // user has typed and was recorded, don't do anything
                        return c
                    } else {
                        const oldT = c.typingState
                        oldT.push({ username, id: userid })
                        return { ...c, typingState: oldT }
                    }
                })
            })

            socket.on('shut_down_emitted', ({ by }) => {
                if (by !== userid) {
                    document.querySelector('#shutdownemitionbtn').click()
                    startCountDonwTimer()
                } else {
                    setcodemarkaState((s) => {
                        return { ...s, sdemitted: true }
                    })
                }
            })

            socket.on('shut_down_now', () => {
                setcodemarkaState((s) => {
                    return { ...s, ended: true }
                })
                if (!owner) {
                    socket.close()
                }
            })

            socket.on('utyping_cleared', ({ username, userid }) => {
                // remove user from typing list;

                setcodemarkaState((c) => {
                    const newuserTypingList = c.typingState.filter((typist) => {
                        return typist.id !== userid
                    })
                    return { ...c, typingState: newuserTypingList }
                })
            })

            socket.on('classroom_users', (data) => {
                setcodemarkaState((c) => {
                    const uwt = data.filter((u) => {
                        return u.kid !== userid
                    })
                    return { ...c, users: data, numberInClass: uwt.length }
                })
            })

            // listen for classroom files
            socket.on('class_files', (css, html, js) => {
                // set editor state
                setcodemarkaState((c) => {
                    return {
                        ...c,
                        editors: [
                            { file: 'css', ...css },
                            { file: 'html', ...html },
                            { file: 'js', ...js },
                        ],
                        CSS_CDN: css.externalCDN,
                        JS_CDN: js.externalCDN,
                    }
                })

                // set preview state
                setcodemarkaState((c) => {
                    return {
                        ...c,
                        previewContent: {
                            html,
                            css,
                            js,
                        },
                    }
                })
            })

            socket.on('newuser_role', (__d) => {
                if (String(__d.kid) === String(userid) && __d.role) {
                    setcodemarkaState((c) => {
                        return {
                            ...c,
                            editorPriviledge: __d.role === '2' ? true : false,
                        }
                    })
                    if (__d.role === '1') {
                        toast.info(
                            'You have been placed on restrictions to modify the Editors'
                        )
                    } else if (__d.role === '2') {
                        toast.info('You now have access to modify the Editors')
                    }

                    if (__d.assignedBy === String(userid) || owner) {
                        toast.info(
                            <div>
                                Heads Up!
                                <hr /> Access granted!{' '}
                            </div>
                        )
                    }
                }
            })

            //new like list
            socket.on('new_favourite_action', ({ liked, user }) => {
                if (user === userid) {
                    setcodemarkaState((c) => {
                        return { ...c, favourite: liked }
                    })
                }
            })

            socket.on('blocking_user_success', ({ user, by, newStudents }) => {
                setcodemarkaState((s) => {
                    return {
                        ...s,
                        users: newStudents,
                        blocked: userid === user.id,
                    }
                })
                if (userid === user.id) {
                    setInRoom((r) => false)

                    toast.info(
                        <div>
                            Heads Up!
                            <br /> You were kicked out from the classroom.
                        </div>
                    )
                }

                if (owner) {
                    toast.info(
                        <div>
                            Heads Up! <br />
                            {user.username} was kicked out.
                        </div>
                    )
                }
            })

            socket.on('blocking_user_failed', ({ user, reason }) => {
                const bfailedUsername = user.username

                toast.info(
                    <div>
                        Heads Up!
                        <br />
                        Failed to block {bfailedUsername}, because {reason}{' '}
                    </div>
                )
            })

            socket.on('user_waved', ({ from, to }) => {
                if (userid === to.kid) {
                    toast.info(`${ from } waved at you`)
                }
            })

            socket.on('star_rating_added', (rat) => {
                toast.success(
                    <div>
                        <b>Great!</b>
                        Your rating was recorded,please wait..
                    </div>
                )
                window.location.href = window.location.origin
            })

            socket.on('pinned_message_added', (pmsg) => {
                setcodemarkaState((c) => {
                    return { ...c, submitted: false, pinnedMessages: pmsg }
                })
                toast.info(
                    <div>
                        <b>Heads Up!</b> <br /> New Pinned Message!`
                    </div>
                )
            })

            socket.on('error', () => {
                setcodemarkaState((c) => {
                    return { ...c, submitted: false }
                })
                toast.warning(
                    <div>
                        <b>Whoops!!!</b> <br /> Something went wrong, try again
                        later!
                    </div>
                )
            })

            socket.on('user_invite_failed', (reason) => {
                setcodemarkaState((c) => {
                    return { ...c, submitted: false }
                })
                setUserInvitationData((c) => {
                    return {
                        ...c,
                        value: '',
                        socketFeedback: reason,
                        socketFeedbackStatus: 0,
                    }
                })
            })

            socket.on('invite_sent', () => {
                setcodemarkaState((c) => {
                    return { ...c, submitted: false }
                })
                setUserInvitationData((c) => {
                    return {
                        ...c,
                        value: '',
                        socketFeedback: 'Great! Invitation was sent.',
                        socketFeedbackStatus: 1,
                    }
                })
            })

            socket.on('editor_update_error', (reason) => {
                toast.warning(
                    <div>
                        <b>Whoops!!!</b> <br />
                        Error updating work files on remote server.
                    </div>
                )
            })

            socket.on('class_favourites', (likedList) => {
                setcodemarkaState((c) => {
                    let liked = false
                    likedList.forEach((list) => {
                        if (String(list.id) === String(userid)) {
                            liked = true
                        }
                    })

                    if (liked) {
                        return { ...c, favourite: true }
                    } else {
                        return { ...c, favourite: false }
                    }
                })
            })
            //listen to file changes
            // socket.on('class_files_updated', (data) => {
            //     const EditorName = data.file
            //     const updatedContentForEditor = data.content
            //     const EditorId = data.id
            //     const FileEditorsKid = data.user

            //     setcodemarkaState((c) => {
            //         // check preview states
            //         if (FileEditorsKid !== userid) {
            //             let newEditorContent

            //             c.editors.forEach((editor, i) => {
            //                 if (
            //                     editor.file === EditorName &&
            //                     editor.id === EditorId
            //                 ) {
            //                     newEditorContent = c.editors
            //                     newEditorContent[
            //                         i
            //                     ].content = updatedContentForEditor
            //                 }
            //             })
            //             return {
            //                 ...c,
            //                 editors: newEditorContent,
            //                 previewContent: {
            //                     ...c.previewContent,
            //                     [EditorName]: {
            //                         content: updatedContentForEditor,
            //                         id: EditorId,
            //                     },
            //                 },
            //             }
            //         } else {
            //             return c
            //         }
            //     })
            // })

        } else if (codemarkastate.blocked && inRoom === false) {
            socket.close()
        }
    }, [
        codemarkastate.owner,
        codemarkastate.messages,
        cid,
        codemarkastate.blocked,
        started,
        userSpecificMessages,
        username,
        data.classroom_id,
        userid,
        inRoom,
        codemarkastate.username,
        codemarkastate.classroom_id,
        owner,
        pinnedMessages,
        onClassroomVerify,
        classroomD,
        attendanceState,
        SocketConnection,
    ])

    const handleEmojiInput = (__emoji_object) => {
        const { native } = __emoji_object
        setInputState((s) => {
            return { ...s.inputState, value: s.value + native + ' ' }
        })
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        const value = e.target.value

        const splittedValue = value.split(' ')

        const lastSplittedIndex = splittedValue.length - 1

        const lastSplittedIndexContainsAtSymbol = splittedValue[
            lastSplittedIndex
        ].includes('@')

        const remainingStringInSplittedValue = splittedValue[
            lastSplittedIndex
        ].replace('@', '')

        const indexOfSpecialSymbolInString = value.indexOf(lastSplittedIndex)

        const beforelastChar = value[indexOfSpecialSymbolInString - 1]

        if (lastSplittedIndexContainsAtSymbol) {
            if (beforelastChar === ' ' || beforelastChar === undefined) {
                setcodemarkaState({
                    ...codemarkastate,
                    isShowingMentions: true,
                    mentionSearchString: remainingStringInSplittedValue,
                })
            }
        } else {
            setcodemarkaState({
                ...codemarkastate,
                isShowingMentions: false,
                mentionSearchString: null,
            })
        }

        if (value.length > 500) {
            const reduced = String(value).slice(0, 500)
            setInputState({ ...inputState, reduced })
            alert(
                'Reduce the noise, type less. Use pinned messagees for longer texts.'
            )
        } else if (e.target.value.trim().length > 0) {
            socket.emit('user_typing', {
                username,
                userid,
                classroomid: data.classroom_id,
            })
            setInputState({ ...inputState, value })
        } else {
            socket.emit('user_typing_cleared', {
                username,
                userid,
                classroomid: data.classroom_id,
            })
            setInputState({ ...inputState, value })
        }
    }

    const handleMessageSubmit = (e) => {
        e.preventDefault()

        if (inputState.value !== '') {
            setInputState({
                ...inputState,
                lastSentMessage: e.target.value,
                value: '',
            })
            const regex = /\B\@([\w\-]+\s)/gi
            const mentions = String(inputState.value).match(regex)

            const messageData = {
                user: userid,
                class: data.classroom_id,
                message: inputState.value,
                time: new Date(),
                messageColor: userMessageColor,
                isThread: false,
                reactions: [],
                isDeleted: false,
                wasEdited: false,
                editHistory: [],
                mentions,
                hashTags: [],
                sent: false,
                thread: [],
                subscribers: [],
            }
            socket.emit('newMessage', messageData)
        }
    }

    const handlePreview = (e) => {
        const previewFrame = document.getElementById('preview_iframe')
        // var preview =  previewFrame.contentDocument || previewFrame.contentWindow.document;
        let styles, html, script

        styles = codemarkastate.previewContent.css.content
        html = codemarkastate.previewContent.html.content
        script = codemarkastate.previewContent.js.content

        let extercssCDN = '',
            externaljsCDN = ''
        codemarkastate.CSS_CDN.forEach((cdn) => {
            extercssCDN += `<link href=${ cdn.url } rel="stylesheet"/> \n`
        })
        codemarkastate.JS_CDN.forEach((cdn) => {
            externaljsCDN += `<script src=${ cdn.url }></script> \n`
        })

        const getGeneratedPageURL = ({ html, css, js }) => {
            const getBlobURL = (code, type) => {
                const blob = new Blob([code], { type })
                return URL.createObjectURL(blob)
            }

            const cssURL = getBlobURL(css, 'text/css')
            const jsURL = getBlobURL(js, 'text/javascript')

            const source = `
    <html>
      <head>
<html lang="en">
      
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${ extercssCDN }
        ${ css && `<link rel="stylesheet" type="text/css" href="${ cssURL }" />` }
      </head>
      <body>
        ${ html || '' }
      </body>
      ${ externaljsCDN }
      ${ js && `<script src="${ jsURL }"></script>` }

    </html>
  `

            return getBlobURL(source, 'text/html')
        }

        const url = getGeneratedPageURL({
            html,
            css: styles,
            js: script,
        })

        previewFrame.src = url
    }

    let classNotification

    const handletoogleUserEditAccess = (e, u) => {
        socket.emit('toogle_class_role', { user: u, new_role: e.target.value })
    }

    const addClassToFavourite = (e) => {
        e.preventDefault()
        socket.emit('add_to_favourite')
    }

    const handlePrivateMessaging = (e, user) => {
        toast.info('Feature not available for free classrooms')
    }

    const handleUserBlocking = (e, user) => {
        socket.emit('block_user', user)
    }

    const handlewaveAtUser = (e, user) => {
        toast.info(`Hey! You just waved at ${ user.username }`)
        socket.emit('user_waving', user)
    }

    const handlePinTextAreaChange = (e) => {
        e.preventDefault()
        const v = e.target.value

        setClassroomPinnedInformation((c) => {
            return { ...c, touched: true, value: v }
        })
    }

    const handleClassPinnnedSubmit = (e) => {
        e.preventDefault()

        if (owner && ClassroomPinnedInformation.value.trim() !== '') {
            setcodemarkaState((c) => {
                return { ...c, submitted: true }
            })
            setClassroomPinnedInformation((c) => {
                return { ...c, touched: false, value: '' }
            })
            socket.emit('new_pinned_message', ClassroomPinnedInformation.value)
        } else {
            alert('No permission to perform Operation!')
        }
    }

    const handleUserInviteSubmit = (e) => {
        e.preventDefault()
        if (owner && userInvitationData.value.trim() !== '') {
            setcodemarkaState((c) => {
                return { ...c, submitted: true }
            })
            setUserInvitationData((c) => {
                return {
                    ...c,
                    socketFeedback: null,
                    socketFeedbackStatus: null,
                }
            })

            socket.emit('invite_user', {
                user: userInvitationData.value,
                classData: {
                    ownerid,
                    data,
                    owner,
                    name,
                    description,
                    username,
                    topic,
                    started,
                    kid: data.classroom_id,
                    shortUrl: classroomD.shortUrl,
                },
            })
        } else {
            alert('No permission to perform Operation or check input!')
        }
    }

    const addPinTextArea = (
        <form onSubmit={ handleClassPinnnedSubmit }>
            <Input
                name="text__area__msg__pin"
                elementType="textarea"
                elementConfig={ {
                    disabled: owner ? false : true,
                    placeholder: 'Pin Message Here...',
                    name: 'text__area__msg__pin',
                } }
                shouldDisplay={ true }
                value={ ClassroomPinnedInformation.value }
                inputType="textarea"
                changed={ handlePinTextAreaChange }
            />
            <button
                type="submit"
                onClick={ handleClassPinnnedSubmit }
                className="btn btn-sm float-left btn-soft-success">
                {codemarkastate.submitted ? <Spinner /> : 'Add'}
            </button>
        </form>
    )

    const classfilesdownloadlink = `${ CLASSROOM_FILE_DOWNLOAD }${ data.classroom_id }`

    const getPinnedMessages = () => {
        const pm = codemarkastate.pinnedMessages.map((msg) => {
            if (msg.content.trim() !== '')
                return (
                    <div
                        key={ msg.id }
                        className="card mt-0 mb-1"
                        style={ {
                            borderLeft: '2px solid #E91E63',
                            borderRadius: 0,
                        } }>
                        <div
                            className="card-body"
                            style={ { padding: 10, fontWeight: 'bolder' } }>
                            <p className="mb-0">{msg.content}</p>
                        </div>
                    </div>
                )
            else return ''
        })

        if (pm && Array.isArray(pm) && pm.length > 0) {
            return pm
        } else {
            return 'No Pinned Items!'
        }
    }

    const handletestConnection = (e) => {
        e.preventDefault()
        if (socket.connected) {
            toast.success(
                <div>
                    <b>Heads Up!!</b> <br />
                    You are Connected.
                </div>
            )
        } else {
            toast.error(
                <div>
                    <b>Heads Up!!</b> <br />
                    You are disconnected!!
                </div>
            )
        }
    }

    const handleexitClassGracefully = (e) => {
        e.preventDefault()
        if (codemarkastate.starRated) {
            window.location.href = window.location.origin
        } else {
            document
                .getElementById('exit_grancefully__success_dropdown_1')
                .click()
        }
    }

    const handleclassReport = (e) => {
        e.preventDefault()
    }

    const handleClassStar = (e) => {
        const element = document.getElementById(e.target.id)
        const starPos = parseInt(element.id)
        let strId = ''
        let i = 1

        while (i <= starPos) {
            strId = i.toString()
            const gold = document.getElementById(strId)
            gold.style.color = 'gold'
            i++
        }

        while (i <= 5) {
            strId = i.toString()
            const white = document.getElementById(strId)
            white.style.color = 'grey'
            i++
        }

        const countYellowStars = () => {
            const arr = []
            const stars = document.querySelectorAll('.fa__codemarka__star')
            for (let i = 0; i < stars.length; i++) {
                if (stars[i].style.color === 'gold') {
                    arr.push(stars[i].style.color)
                }
            }
            const rating = arr.length
            setStarRating((r) => {
                return rating
            })
        }

        countYellowStars()
    }

    const handleClassStarRating = (e) => {
        e.preventDefault()
        socket.emit('star_rating', starRating)
    }

    const addStars = (
        <div className="mt-3 text-center">
            <div className="border border-dark p-3 m-3 mb-4">
                <h3 className="font-weight-900">How was this class session?</h3>
            </div>

            <div>
                <span
                    onClick={ handleClassStar }
                    id="1"
                    className="fa fa-star fa__codemarka__star fa-2x border-success"></span>
                <span
                    onClick={ handleClassStar }
                    id="2"
                    className="fa fa-star fa-2x fa__codemarka__star border-success"></span>
                <span
                    onClick={ handleClassStar }
                    id="3"
                    className="fa fa-star fa-2x fa__codemarka__star border-success"></span>
                <span
                    onClick={ handleClassStar }
                    id="4"
                    className="fa fa-star fa-2x fa__codemarka__star border-success"></span>
                <span
                    id="5"
                    onClick={ handleClassStar }
                    className="fa fa-star fa-2x fa__codemarka__star border-success"></span>
            </div>

            <div className="text-center mt-3">
                <div>
                    <button
                        type="button"
                        onClick={ (e) => redirectTo(e, '/') }
                        className="btn btn-animated  btn-sm btn-outline-success btn-animated-y">
                        <span className="btn-inner--visible">NOT NOW</span>
                        <span className="btn-inner--hidden">
                            <i className="fa fa-pause-circle"></i>
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={ handleClassStarRating }
                        className="btn btn-animated  btn-sm btn-outline-success btn-animated-x">
                        <span className="btn-inner--visible">SUBMIT</span>
                        <span className="btn-inner--hidden">
                            <i className="fa fa-thumbs-up"></i>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )

    if (codemarkastate.redirect) {
        return <Redirect to={ codemarkastate.redirect } />
    }

    const handleEndClass = (e) => {
        e.preventDefault()
        document.querySelector('#exitbtn').click()
    }

    const handleuserInvitationDataChange = (e) => {
        e.preventDefault()
        e.persist()
        const v = e.target.value
        setUserInvitationData((c) => {
            return {
                value: v,
                socketFeedback: null,
                socketFeedbackStatus: null,
            }
        })
    }

    const HandleClassShutdown = (e) => {
        e.preventDefault()
        if (owner) {
            socket.emit('shutdown_classroom')
        }
    }

    const handlestartClass = (e) => {
        e.preventDefault()
        if (owner) {
            socket.emit('start_class', userid)
            setcodemarkaState((s) => {
                return { ...s, starting: true }
            })
        }
    }
    const handleAddUserIconClicked = (e) => {
        document.querySelector('#participantModalExitButton').click()
        document.querySelector('#add_user_modal_btn').click()
    }

    const handledropDownSelect = (event, value, editor) => {
        // 
    }

    const handleAttendanceSubmission = (data) => {
        socket.emit('new_attendance_record', data)
    }

    const handleSendReminder = () => {
        socket.emit('send_attendance_reminder_init')
    }

    const handledownloadAttendance = () => {
        socket.emit('download_attendance_init', classroomD.kid)

        setAttendanceState({ ...attendanceState, downloadStatus: 'loading' })
    }

    const handleUserSelected = (e, username) => {
        e.preventDefault()

        const usernameAttached = `@${ username } `
        const currentTextAreaValue = inputState.value

        let newTextAreaValue = currentTextAreaValue

        if (
            codemarkastate.mentionSearchString &&
            codemarkastate.mentionSearchString.length > 0
        ) {
            //find last @symbol and replace
            const splittedValue = currentTextAreaValue.split(' ')

            const lastSplittedIndex = splittedValue.length - 1

            const lastSplittedIndexContainsAtSymbol = splittedValue[
                lastSplittedIndex
            ].includes('@')

            if (lastSplittedIndexContainsAtSymbol) {
                const newReplaceSymbolContent = (splittedValue[
                    lastSplittedIndex
                ] = usernameAttached)
                splittedValue[lastSplittedIndex] = newReplaceSymbolContent
                newTextAreaValue = splittedValue.join(' ')
            }
        } else {
            if (codemarkastate.mentionSearchString === null) {
                newTextAreaValue = `${ currentTextAreaValue }@${ username } `
            } else {
                newTextAreaValue = `${ currentTextAreaValue }${ username } `
            }
        }

        setInputState({ ...inputState, value: newTextAreaValue })
        setcodemarkaState({
            ...codemarkastate,
            isShowingMentions: false,
            mentionSearchString: null,
        })
        document.querySelector('#input_area').focus()
    }

    const handleShowMentions = (e) => {
        setcodemarkaState((s) => {
            if (!s.isShowingMentions) {
                document.querySelector('#mentions_container').focus()
            }
            return { ...s, isShowingMentions: !s.isShowingMentions }
        })
    }

    const handleAddCodeBlock = (e) => {
        document.querySelector('#codeblockModal').click()
    }

    const handleShowEmojiPicker = (e) => {
        setisDisplayingEmoji(!isDisplayingEmoji)
    }

    const handleImageUpload = (e) => {
        document.getElementById('picture_input_upload').click()
    }

    const handleImageUploadChange = (e) => {
        setIsUploadingImage(true)

        const file = e.target.files[0]
        var reader = new FileReader()

        const messagesContainer = document.getElementById('fala')

        reader.onload = function (e) {
            const preview = document.createElement('img')
            preview.src = e.target.result
            preview.classList.add('pending__uploaded__image')
            preview.id = 'upload__codemarka__progressing'
            socketRef.current.binary(true).emit('image_upload', {
                data: e.target.result,
                name: file.name,
                by: userid,
                type: 'image',
                time: new Date(),
                messageColor: userMessageColor,
                room: classroomD.kid,
            })
            messagesContainer.appendChild(preview)

            setTimeout(() => {
                preview.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest',
                })
                messagesContainer.scrollTop = messagesContainer.scrollHeight
            }, 500)
        }

        reader.readAsDataURL(file)
    }

    const handleAddURL = (e) => {
        document.querySelector('#hyperlinkModal').click()
    }
    const editorChanged = (value, editorName, deltaValue,updateId) => {
        let editorFileId

        codemarkastate.editors.forEach((element) => {
            if (element.file === editorName) {
                editorFileId = element.id
            }
        })

        const emitObj = {
            file: editorName,
            content: value,
            class: data.classroom_id,
            user: userid,
            id: editorFileId,
            editedBy: userid,
            kid: data.classroom_id,
            type: 'update',
            deltaValue,
            updateId,
        }

        setcodemarkaState((c) => {
            return {
                ...c,
                previewContent: {
                    ...c.previewContent,
                    [editorName]: { content: value, id: editorFileId },
                },
            }
        })

        socket.emit('editorChanged', emitObj)
    }

    function handleUploadInputChange(e) {
        if (e.target && e.target.files[0]) {
            const file = e.target.files[0]

            let fileType = file.type ? file.type.split('/')[1] : 'NOT SUPPORTED'
            setEditorUploadState({ uploading: true, file: fileType })

            const reader = new FileReader()
            reader.addEventListener('load', (event) => {
                const content = event.target.result

                const fileTypeSupported = [
                    'javascript',
                    'x-javascript',
                    'script',
                    'html',
                    'css',
                ].some((t) => t === fileType.toLowerCase())

                if (!fileTypeSupported) {
                    toast.error(
                        '😥 File not supported',
                        {
                            position:'bottom-center'
                        }
                    )
                    setEditorUploadState({ uploading: false, file: '' })
                } else {
                    let editorFileId
                    fileType = fileType.includes('script') ? 'js' : fileType
                    codemarkastate.editors.forEach((element) => {
                        if (element.file === fileType) {
                            editorFileId = element.id
                        }
                    })

                    const emitObj = {
                        file: fileType,
                        content,
                        class: data.classroom_id,
                        user: userid,
                        id: editorFileId,
                        editedBy: userid,
                        kid: data.classroom_id,
                        type: 'upload',
                    }

                    setcodemarkaState((c) => {
                        const nEArray = c.editors.map((e) => {
                            if (e.file === fileType) {
                                return { ...e, content }
                            } else {
                                return e
                            }
                        })

                        return {
                            ...c,
                            previewContent: {
                                ...c.previewContent,
                                [fileType]: { content, id: editorFileId },
                            },
                            editors: nEArray,
                        }
                    })

                    socket.emit('editorChanged', emitObj)

                    setEditorUploadState({ uploading: false, file: '' })

                    e.target.value = null
                }
            })

            // reader.addEventListener('progress', (event) => {
            //     if (event.loaded && event.total) {
            //         const percent = (event.loaded / event.total) * 100;
            //     }
            // })

            reader.readAsText(file)
        } else {
            
        }
    }

    const handleuploadFileFromSystem = (e, file) => {
        e.preventDefault()
        setEditorUploadState({ uploading: true, file })

        document.getElementById('editor_file_uploader_input').click()
    }

    const handleClearEditorrContent = (e, editorName) => {
        e.preventDefault()
        setcodemarkaState((s) => {
            let editorid = ''
            const newFileContent = s.editors.map((editor) => {
                if (editor.file === editorName) {
                    const emitObj = {
                        file: editorName,
                        content: `/**
                                * Content cleared by ${ username },waiting for changes..
                                \n
                                /**`,
                        class: data.classroom_id,
                        user: userid,
                        id: editor.id,
                        editedBy: userid,
                        kid: data.classroom_id,
                        type: 'upload',
                    }
                    editorid = editor.id
                    socket.emit('editorChanged', emitObj)

                    return { ...editor, content: '' }
                } else return editor
            })

            return {
                ...s,
                editors: newFileContent,
                previewContent: {
                    ...codemarkastate.previewContent,
                    [editorName]: { content: '', id: editorid },
                },
            }
        })
    }
    const handleAddExternalCDN = (e, editorName) => {
        e.preventDefault()

        setcodemarkaState((s) => {
            return { ...s, currentEditorSelection: editorName }
        })
        setcodemarkaState((s) => {
            document.querySelector('#settingsModal').click()
            return s
        })
    }

    const handleAudioVideoAlert = (message) => {
        toast.success(message)
    }

    const handleImagePreview = (e, url) => {
        setImagePreviewConfig({ shouldDisplay: true, url })
    }

    const handleclosePreview = (e) => {
        setImagePreviewConfig({ shouldDisplay: false, url: '' })
    }

    const addReactionToMessage = (emoji) => {
        socket.emit(
            'add_reaction_to_message',
            emoji,
            activeMessage,
            classroomD.kid,
            userid
        )
        closeReactionEmojiPicker()
    }

    return (
        <div>
            <Seo
                title={ `${ name } :: codemarka classroom` }
                metaDescription={ description }></Seo>
            <ReconnectionModal
                show={ !SocketConnection.connected }
                attemptNumber={ SocketConnection.attemptNumber }
                failed={ SocketConnection.failed }
            />
            <ToastContainer />
            <Preview
                previewBtnClicked={ handlePreview }
                classroomid={ data.classroom_id }
            />
            <ImagePreview
                config={ imagePreviewConfig }
                closePreview={ handleclosePreview }
            />
            <EmojiPicker
                setdisplaying={ (e) => setisDisplayingEmoji(false) }
                shouldDisplay={ isDisplayingEmoji }
                handleInputChange={ handleEmojiInput }
            />

            <MessageReactions />

            <ClassRoomSettingsModal
                codemarkastate={ codemarkastate }
                socket={ socketRef.current }
                toast={ toast }
                cdata={ classroomD }
                currentEditorSelection={ codemarkastate.currentEditorSelection }
            />
            <AttendanceCollector
                isSubmittingAttendance={ attendanceState.isSubmittingAttendance }
                isCollectingAttendance={ attendanceState.isCollectingAttendance }
                hasCollectedAttendance={ attendanceState.hasCollectedAttendance }
                attendanceList={ attendanceState.userAttendanceData }
                isOwner={ owner }
                downloadStatus={ attendanceState.downloadStatus }
                sendReminder={ handleSendReminder }
                downloadAttendance={ handledownloadAttendance }
                list={ attendanceState.list }
                submit={ handleAttendanceSubmission }
            />

            {classNotification}
            <span
                className="d-none"
                id="exit_grancefully__success_dropdown_1"
                role="button"
                data-toggle="modal"
                data-target="#exit_class_modal_cont">
                ;
            </span>

            <Navigation
                name={ name }
                downloadLink={ classfilesdownloadlink }
                favourite={ addClassToFavourite }
                isFavourite={ codemarkastate.favourite }
                topic={ topic }
                exitClassGracefully={ handleexitClassGracefully }
                classroomid={ data.classroom_id }
                testConnection={ handletestConnection }
                classReport={ handleclassReport }
                number={ codemarkastate.users.length }
                owner={ owner }
                classStarted={ classroomD.status === 2 ? true : false }
                endClass={ handleEndClass }
                connected={ SocketConnection.connected }
                startClass={ handlestartClass }
                gravatarUrl={ gravatarUrl }
                isCollectingAttendance={ attendanceState.isCollectingAttendance }
                hasCollectedAttendance={ attendanceState.hasCollectedAttendance }
            />

            <button
                id="dialogueToStart"
                type="button"
                className="btn btn-danger d-none"
                data-toggle="modal"
                data-target="#startclassModal"></button>
            <div
                className="modal modal-white fade"
                id="startclassModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="startclassModal"
                aria-hidden="true">
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="py-3 text-center">
                                {codemarkastate.started === null ? (
                                    <div>
                                        {codemarkastate.starting === true ? (
                                            <div>
                                                <h5 className="heading h4 mt-4">
                                                    Starting...
                                                </h5>
                                                <Spinner />
                                            </div>
                                        ) : (
                                            <div>
                                                <h5 className="heading h4 mt-4">
                                                    Hi there!
                                                </h5>
                                                <p>
                                                    Your classroom session is
                                                    yet to begin, click on start
                                                    now to open the doors. You
                                                    can start this classroom
                                                    later.
                                                </p>
                                                <div className="modal-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-success"
                                                        onClick={
                                                            handlestartClass
                                                        }>
                                                        Start Now
                                                    </button>
                                                    <button
                                                        type="button "
                                                        className="btn btn-sm btn-white"
                                                        data-dismiss="modal">
                                                        Later
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <div className="row">
                                            <div
                                                className="col-md-12 mt-5 text-center d-flex justify-content-center align-items-center flex-column"
                                                style={ { paddingLeft: '15px' } }>
                                                <h6 className="h2 mb-1 text-success">
                                                    <b>You are all set!</b>
                                                </h6>
                                                <p className="mb-0">
                                                    Your class session is open
                                                    for all with link access,
                                                    we've started collecting
                                                    analytics ensure you want to
                                                    start now to get the best
                                                    out of the data which would
                                                    be available once the
                                                    session is
                                                    terminated,goodluck.
                                                </p>
                                                <div class="dummy-positioning d-flex">
                                                    <div class="success-icon">
                                                        <div class="success-icon__tip"></div>
                                                        <div class="success-icon__long"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                id="shutdownemitionbtn"
                type="button"
                className="btn btn-danger d-none"
                data-toggle="modal"
                data-target="#shutdownSignalModal">
                shutting down..
            </button>
            <div
                className="modal modal-info fade"
                id="shutdownSignalModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="shutdownSignalModal"
                aria-hidden="true">
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="py-3 text-center">
                                <b className="fas fa-4x">
                                    {codemarkastate.ended ? (
                                        <h1>The End!</h1>
                                    ) : (
                                        codemarkastate.countDownTime
                                    )}
                                </b>
                                {!codemarkastate.ended ? (
                                    <div>
                                        <h5 className="heading h4 mt-4">
                                            Shutting down classroom!
                                        </h5>
                                        <p>
                                            We recieved a signal to end this
                                            session.Meanwhile you can still
                                            download files for this classroom
                                            before you exit.
                                        </p>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a
                                className="btn btn-sm btn-primary"
                                href={ classfilesdownloadlink }>
                                Download Files
                            </a>
                            <a className="btn btn-sm btn-white" href="/?#">
                                Leave now
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <button
                id="exitbtn"
                type="button"
                className="btn btn-danger d-none"
                data-toggle="modal"
                data-target="#exitClass">
                Exit
            </button>
            <div
                className={ 'modal modal-danger fade' }
                id="exitClass"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exitClass"
                aria-hidden="true">
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title h6" id="modal_title_6">
                                This is way too dangerous
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {codemarkastate.sdemitted &&
                            !codemarkastate.ended ? (
                                <div className="text-center">
                                    Processing,please wait...
                                    <br /> <Spinner />{' '}
                                </div>
                            ) : (
                                <div className="py-3 text-center">
                                    <i className="fas fa-exclamation-circle fa-4x"></i>
                                    {codemarkastate.ended ? (
                                        <h2 className="heading h1">Done!</h2>
                                    ) : (
                                        <div>
                                            <h5 className="heading h4 mt-4">
                                                Should we stop now?
                                            </h5>
                                            <p>
                                                Once you end this classroom,
                                                it's no longer visible to anyone
                                                and request to join would fail,
                                                but can be restored from your
                                                dashboard.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        {!codemarkastate.sdemitted ? (
                            <div className="modal-footer">
                                <button
                                    type="button "
                                    className="btn btn-sm btn-white"
                                    data-dismiss="modal">
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-white"
                                    onClick={ HandleClassShutdown }>
                                    End now
                                </button>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>

            <Modal
                targetid="exit_class_modal_cont"
                type="default"
                size="sm"
                titleIcon={ <i className="fa fa-thumbs-up"></i> }
                title={ ' Rate this classroom ' }>
                {addStars}
            </Modal>

            <Modal
                targetid="pinned_modal_cont"
                type="default"
                size="sm"
                titleIcon={ <i className="fa fa-pen-nib"></i> }
                title={ 'Pinned Messages' }>
                {getPinnedMessages()}
                {owner ? addPinTextArea : ''}
            </Modal>

            <button
                id="add_user_modal_btn"
                type="button"
                style={ { display: 'none' } }
                data-toggle="modal"
                data-target="#add_user_modal"></button>

            <Modal
                targetid="add_user_modal"
                type="default"
                size="sm"
                titleIcon={ <i className="fa fa-users"></i> }
                title={ 'Invite people' }>
                <form>
                    <Input
                        name="add_user_input"
                        elementType="input"
                        elementConfig={ {
                            disabled: owner ? false : true,
                            placeholder: 'Invite with email',
                            name: 'add_user_input',
                        } }
                        shouldDisplay={ true }
                        value={ userInvitationData.value }
                        inputType="input"
                        changed={ handleuserInvitationDataChange }
                    />
                    <button
                        type="submit"
                        onClick={ handleUserInviteSubmit }
                        disabled={ codemarkastate.submitted }
                        className="btn btn-sm float-right btn-success">
                        {codemarkastate.submitted ? (
                            <Spinner />
                        ) : (
                            <div>
                                Send Invite <i className="fa fa-forward"></i>
                            </div>
                        )}
                    </button>
                    <div>
                        {userInvitationData.socketFeedback !== null ? (
                            <span
                                className={ `${
                                    userInvitationData.socketFeedbackStatus
                                        ? 'text-success'
                                        : 'text-danger'
                                }` }>
                                {' '}
                                {userInvitationData.socketFeedback}{' '}
                            </span>
                        ) : (
                            ''
                        )}
                    </div>
                </form>
            </Modal>

            <ParticipantModal
                users={ codemarkastate.users }
                toogleUserEditAccess={ handletoogleUserEditAccess }
                owner={ owner }
                ownerid={ ownerid }
                userid={ userid }
                sendUserPrivateMessage={ handlePrivateMessaging }
                blockUser={ handleUserBlocking }
                waveAtUser={ handlewaveAtUser }
                handleAddUserIconClicked={ handleAddUserIconClicked }
            />
            <VideoAndAudioPermission />
            <CodeBlockModal socket={ socketRef.current } />
            {isProcessingEditingOrDeletingMessage &&
                instanceOdEditingOrDeletingMessage === 'edit' && (
                    <EditMessageModal socket={ socketRef.current } />
                )}
            {isProcessingEditingOrDeletingMessage &&
                instanceOdEditingOrDeletingMessage === 'delete' && (
                    <DeleteMessageModal socket={ socketRef.current } />
                )}
            <ClassInformationModal
                owner={ owner }
                socket={ socketRef.current }
                onClassroomVerify={ onClassroomVerify }
                toast={ toast }
            />
            <div style={ { width: '100%', height: '91vh' } }>
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col-2 p-0 d-none d-md-block d-lg-block h-100">
                            <input
                                type="file"
                                id="picture_input_upload"
                                hidden
                                accept="image/png, image/jpeg"
                                onChange={ handleImageUploadChange }
                            />
                            <ConversationThread socket={ socketRef.current } />
                            <MessageReactionEmojiPicker
                                shouldDisplay={ isShowingReactionEmoji }
                                setdisplaying={ closeReactionEmojiPicker }
                                handleInputChange={ addReactionToMessage }
                            />
                            <Convo
                                typing={ codemarkastate.typingState }
                                users={ codemarkastate.users }
                                userSelected={ handleUserSelected }
                                username={ username }
                                inputValue={ inputState.value }
                                handleInputChange={ handleInputChange }
                                sendMessage={ handleMessageSubmit }
                                focused={ inputState.isFocused }
                                messages={ codemarkastate.messages }
                                userSpecificMessages={ userSpecificMessages }
                                user={ userid }
                                socket={ socketRef.current }
                                mentionSearchString={
                                    codemarkastate.mentionSearchString
                                }
                                handleImagePreview={ handleImagePreview }
                                shouldDisplay={ codemarkastate.isShowingMentions }
                                owner={ ownerid }
                                showMentions={ handleShowMentions }
                                isOnline={ SocketConnection.connected }
                                addCodeBlock={ handleAddCodeBlock }
                                showEmojiPicker={ handleShowEmojiPicker }
                                uploadImage={ handleImageUpload }
                                addURL={ handleAddURL }
                            />
                        </div>

                        <div className="p-0 col-12 col-md-8 col-lg-8 h-100">
                            <Editor
                                readOnly={ codemarkastate.editorPriviledge }
                                handleEditorChange={ editorChanged }
                                files={ codemarkastate.previewContent }
                                user={ userid }
                                socket={ socketRef.current }
                                dropDownSelect={ handledropDownSelect }
                                uploadingState={ editorUploadState.uploading }
                                showPreview={ handlePreview }
                                classroomid={ data.classroom_id }
                                clearEditorrContent={ handleClearEditorrContent }
                                addExternalCDN={ handleAddExternalCDN }
                            />
                        </div>
                        <div className="col-2 p-0 d-none d-md-block d-lg-block h-100">
                            <AudioVideo
                                socket={ socketRef.current }
                                userkid={ userid }
                                username={ username }
                                isOwner={ owner }
                                ref={ audioVideoRef }
                                isBroadcasting={ classroomD.isBroadcasting }
                                users={ codemarkastate.users }
                                kid={ classroomD.kid }
                                onAlert={ handleAudioVideoAlert }
                                usersData={ usersData }
                                toast={ toast }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onClassroomVerify: (classroomid) =>
            dispatch(action.classVerify(classroomid)),
        setSocket: (socketconnection) =>
            dispatch(action.setClassroomSocket(socketconnection)),
        closeReactionEmojiPicker: () =>
            dispatch(action.closeReactionEmojiPicker()),
        handleUnsetEditOrDeleteMessage: () => dispatch(action.handleUnsetEditOrDeleteMessage()),
    }
}

const mapStateToProps = ({ classroom, auth }) => {
    return {
        activeMessage: classroom.messageReaction.messageId,
        isShowingReactionEmoji: classroom.messageReaction.isShowing,
        isProcessingEditingOrDeletingMessage: classroom.editOrDeleteMessage.processing,
        instanceOdEditingOrDeletingMessage: classroom.editOrDeleteMessage.instance,
        usersData: auth.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainClassLayout)
