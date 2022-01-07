/**
 * /* eslint-disable no-undef
 *
 * @format
 */

/**
 * /* eslint-disable no-undef
 *
 * @format
 */

/**
 * /* eslint-disable no-undef
 *
 * @format
 */

/** @format */

import React, { useState, useLayoutEffect, useRef, useEffect } from 'react'
import DetectRTC from 'detectrtc'

import * as util from '../../../utility/shared'
import VideoAudioPermission from '../Modals/VideoAndAudioPermission'
import RemoteVideoStream from './Components/Video'
import './index.css'

export default function RTC(props) {
    const yourID = useRef('')
    const [users, setUsers] = useState([])
    const usersRef = useRef()
    const [stream, setStream] = useState()

    const userVideo = useRef()
    const signalingSocket = useRef()
    const peersRef = useRef({})
    const mystream = useRef()
    const myData = useRef()
    const [audioMuted, setAudioMuted] = useState(true)
    const [videoMuted, setVideoMuted] = useState(true)
    const [peerStreams, setPeerStreams] = useState([])
    const offerStrength = useRef(0)
    const beepOfferStatus = useRef([])

    async function preparePeer() {
        const _stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        })
        userVideo.current.srcObject = _stream
        await setStream(_stream)
        await setVideoMuted(true)
        _stream.getVideoTracks()[0].enabled = await videoMuted
        mystream.current = _stream
        window.stream = {}
        window.stream[yourID.current] = _stream
        offerStrength.current = util.randomNumber(4)
        _stream.getAudioTracks()[0].enabled = false
    }

    useEffect(() => {
        yourID.current = props.userkid && props.userkid
    }, [props.userkid])

    useLayoutEffect(() => {
        DetectRTC.load(async function () {
            signalingSocket.current = (await props.socket) ? props.socket : null
            yourID.current = await props.userkid
            await setUsers(props.users)

            const hasWebcamForOutput = DetectRTC.hasWebcam
            const hasMicrophoneForOutput = DetectRTC.hasMicrophone

            if (!hasWebcamForOutput || !hasMicrophoneForOutput) {
                // show modal, telling the user they can't start webrtc calls without devices;
            } else {
                if (
                    !DetectRTC.isWebsiteHasMicrophonePermissions &&
                    !DetectRTC.isWebsiteHasWebcamPermissions
                ) {
                    setTimeout(() => {
                        document.querySelector('#video_permission') &&
                            document.querySelector('#video_permission').click()
                    }, 1500)
                }
                await preparePeer() //1

                await signalingSocket.current.emit('rtc_ready_state', props.kid) //2

                // request for current users in room;
                // 1. Setup personal stream
                //2. Alert server you are ready
                //3. server tells you to setup your data and other users data
                // 4. let the server know when done
                // 5. server beeps people in room
                // 6. when a user receives beep, setup rtc and emit ready to receive call
                // 7. initiate a call to the user, create offer and everything follows;

                signalingSocket.current.on(
                    'rtc_setup_users',
                    async (usersInRoom) => {
                        
                        usersRef.current = await usersInRoom.filter(
                            (user) => user.kid !== yourID.current
                        )
                        myData.current =
                            (await usersInRoom) &&
                            usersInRoom.filter(
                                (user) => user.kid === yourID.current
                            )[0]
                        
                        signalingSocket.current.emit(
                            'rtc_setup_users_complete',
                            usersRef.current,
                            offerStrength.current
                        )
                    }
                )

                signalingSocket.current.on('beep_delivery', (user) => {
                    
                    const offerExists = beepOfferStatus.current.find(
                        (user_) => user_.kid === user.kid
                    )
                    if (!offerExists) {
                        beepOfferStatus.current.push({
                            ...user,
                            offer: 'pending',
                        })
                        
                    }
                })

                signalingSocket.current.on(
                    'rtc_beep',
                    async ({ from: to, beepstrength }) => {
                        // user wants to call
                        ;(await !window.stream) && (await preparePeer())
                        // console.log();
                        const exitingBeepOffers =
                            beepOfferStatus.current.length > 0
                        // check if we have a beep instance of the user trying to call
                        const initiatedBeep =
                            exitingBeepOffers &&
                            beepOfferStatus.current.find(
                                (user) => user.socketid === to
                            )

                        if (!initiatedBeep) {
                            // no instance of user yet, allow to receive
                            
                            ;(await window.stream) &&
                                (await signalingSocket.current.emit(
                                    'rtc_beep_success',
                                    to,
                                    myData.current
                                ))
                        } else {
                            
                            // check beep strength
                            const myBeepStrength = offerStrength.current
                            
                            if (beepstrength > myBeepStrength) {
                                 // my call strength is weak, allow user to call me instead.
                                ;(await window.stream) &&
                                    (await signalingSocket.current.emit(
                                        'rtc_beep_success',
                                        to,
                                        myData.current
                                    ))
                            } else {
                                
                                const user = usersRef.current.find(
                                    (user_) => user_.socketid === to
                                )
                                user &&
                                    callPeer(
                                        user,
                                        window.stream[yourID.current]
                                    )
                            }
                        }
                    }
                )

                signalingSocket.current.on('rtc_beep_initite', (usertocall) => {
                    // user aggred i should call
                    
                    usertocall &&
                        callPeer(usertocall, window.stream[yourID.current])
                })

                signalingSocket.current.on('rtc_search_failed', () => {
                    window.location.reload()
                })

                signalingSocket.current.on('offer', (data) => {
                    
                    if (
                        !peersRef.current[data.caller.kid] &&
                        data.target.socketid === signalingSocket.current.id
                    ) {
                        // accept offer
                        if (!window.stream) preparePeer()
                        handleRecieveCall(data, window.stream[yourID.current])
                    }
                })
                signalingSocket.current.on('answer', handleAnswer)

                signalingSocket.current.on(
                    'ice-candidate',
                    handleNewICECandidateMsg
                )
                signalingSocket.current.on('updatechat_left', (msg) => {
                    
                    peersRef.current[msg.for] &&
                        closeVideoCall(peersRef.current[msg.for], msg.for)
                })

                signalingSocket.current.on(
                    'mute_user_audio_webrtc',
                    toogleMicStatus
                )

                signalingSocket.current.on(
                    'disconnection_request',
                    disconnectFromVideoConference
                )

                signalingSocket.current.on(
                    'audio_toggle_complete',
                    updateAudioStatusForUser
                )

                signalingSocket.current.on(
                    'wave_to_user_webrtc_',
                    handleIncomingWave
                )

                signalingSocket.current.on(
                    'video_toggle',
                    handleUserVideoToggle
                )
            }
        })
    }, [])

    function callPeer(user, myStream) {
        
        const peer = createPeer(user)
        myStream.getTracks().forEach((track) => peer.addTrack(track, myStream))
        return peer
    }

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp)
        
        peersRef.current[message.caller.kid] &&
            peersRef.current[message.caller.kid]
                .setRemoteDescription(desc)
                .catch((e) => {})
        
    }

    async function handleRecieveCall(incoming, myStream) {
        
        const newpeer = await createPeer(incoming.caller)
        
        const desc = await new RTCSessionDescription(incoming.sdp)
        newpeer
            .setRemoteDescription(desc)
            .then(() => {
                myStream
                    .getTracks()
                    .forEach((track) => newpeer.addTrack(track, myStream))
            })
            .then(() => {
                return newpeer.createAnswer()
            })
            .then((answer) => {
                return newpeer.setLocalDescription(answer)
            })
            .then(() => {
                const payload = {
                    target: incoming.caller,
                    caller: incoming.target,
                    sdp: newpeer.localDescription,
                }
                
                signalingSocket.current.emit('answer', payload)
            })
    }

    function createPeer(user) {
        const userkid = user.kid

        if (peersRef.current[userkid]) {
            closeVideoCall(peersRef.current[userkid], userkid)
        }

        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com',
                },
                {
                    url: 'turn:turn.azcryptotrade.com:3478',
                    credential: 'turnadmin',
                    username: '@P@$$w0rd',
                },
                {
                    urls: 'stun:numb.viagenie.ca',
                    username: 'sultan1640@gmail.com',
                    credential: '98376683',
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    username: 'sultan1640@gmail.com',
                    credential: '98376683',
                },
            ],
        })
        /**
         * Called once  after a peer object has been created
         * - We create offer for a user here and dispatch with socket.io
         */
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(user)

        peer.onicecandidate = (e) => handleICECandidateEvent(e, user)
        peer.ontrack = (e) => handleTrackEvent(e, user)

        peer.oniceconnectionstatechange = async () => {
            
            if (
                peer.iceConnectionState === 'failed' ||
                peer.iceConnectionState === 'closed'
            ) {
                closeVideoCall(peer, userkid)
            }
        }

        peer.signalingstatechange = () => {
            switch (peer.signalingState) {
                case 'closed':
                    closeVideoCall(peer, userkid)
                    break
            }
        }
        peersRef.current[userkid] = peer
        
        return peer
    }

    function closeVideoCall(peer_, kid) {
        setPeerStreams((s) => {
            if (peer_) {
                peer_.ontrack = null
                peer_.onremovetrack = null
                peer_.onremovestream = null
                peer_.onicecandidate = null
                peer_.oniceconnectionstatechange = null
                peer_.onsignalingstatechange = null
                peer_.onicegatheringstatechange = null
                peer_.onnegotiationneeded = null
                peer_.close()
                peer_ = null
                delete peersRef.current[kid]
            }
            const newUserStreams = s.filter(
                (remoteStream_) => remoteStream_.user.kid !== kid
            )
            return newUserStreams
        })
    }

    function handleICECandidateEvent(e, user) {
        if (e.candidate) {
            
            const payload = {
                target: user,
                candidate: e.candidate,
                sender: myData.current,
            }
            signalingSocket.current.emit('ice-candidate', payload)
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming.candidate)
        
        incoming.sender &&
            peersRef.current[incoming.sender.kid] &&
            peersRef.current[incoming.sender.kid]
                .addIceCandidate(candidate)
                .catch((e) => {})
    }

    function handleNegotiationNeededEvent(user) {
        
        const { kid } = user

        peersRef.current[kid]
            .createOffer()
            .then((offer) => {
                
                return peersRef.current[kid].setLocalDescription(offer)
            })
            .then(() => {
                const payload = {
                    target: user,
                    caller: myData.current,
                    sdp: peersRef.current[kid].localDescription,
                }
                
                signalingSocket.current.emit('offer', payload)
            })
            .catch((e) => {})
    }

    function hideVideo(e) {
        e.preventDefault()
        if (stream) {
            setVideoMuted(!videoMuted)
            stream.getVideoTracks()[0].enabled = videoMuted
            const data = {
                ...props.usersData,
                videoMuted,
                socketid: signalingSocket.current.id,
            }
            signalingSocket.current.emit('video_toggle', data)
        }
    }

    function handleUserVideoToggle(data) {
        
        const { accountid, videoMuted: videoMuted_ } = data
        accountid &&
            peersRef.current[accountid] &&
            setPeerStreams((s) => {
                let newUserStreams = s
                newUserStreams = s.map((remoteStream_) => {
                    if (remoteStream_ && remoteStream_.user.kid === accountid) {
                        return {
                            ...remoteStream_,
                            video: videoMuted_,
                        }
                    } else {
                        return stream
                    }
                })
                return newUserStreams
            })
    }

    function toogleAudio(e) {
        e.preventDefault()
        if (stream) {
            const status = stream.getAudioTracks()[0].enabled
            setAudioMuted(status)
            stream.getAudioTracks()[0].enabled = !status
            peerStreams.length &&
                signalingSocket.current.emit(
                    'audio_toggle_complete',
                    status,
                    myData.current
                )
                
        }
    }

    async function toogleMicStatus() {
        
        if (mystream.current) {
            const status = await mystream.current.getAudioTracks()[0].enabled
            await setAudioMuted(status)

            mystream.current.getAudioTracks()[0].enabled = await !status
            signalingSocket.current.emit(
                'audio_toggle_complete',
                status,
                myData.current
            )

            // alert that mic was muted
            status
                ? props.toast.info('Your Mic was muted by moderator.', {
                      position: 'bottom-center',
                  })
                : props.toast.info('Your Mic has been released by moderator.', {
                      position: 'bottom-center',
                  })
        }
    }

    function updateAudioStatusForUser(status, user) {
        
        const { kid } = user
        kid &&
            peersRef.current[kid] &&
            setPeerStreams((s) => {
                let newUserStreams = s
                newUserStreams = s.map((remoteStream_) => {
                    if (remoteStream_ && remoteStream_.user.kid === kid) {
                        return {
                            ...remoteStream_,
                            audio: status,
                        }
                    } else {
                        return stream
                    }
                })
                return newUserStreams
            })
    }

    async function saveScreenshotOfVideo(userkid) {
        signalingSocket.current.emit('video_toggle')
    }

    function handleTrackEvent(e, user) {
        
        user &&
            user.kid &&
            setPeerStreams((s) => {
                let newUserStreams = s
                if (
                    newUserStreams.find(
                        (remoteStream) =>
                            String(remoteStream.user.kid) === String(user.kid)
                    )
                ) {
                    newUserStreams = s.map((remotePeerStreamData) => {
                        if (remotePeerStreamData.user.kid === user.kid) {
                            return {
                                ...remotePeerStreamData,
                                stream: e.streams[0],
                            }
                        } else {
                            return stream
                        }
                    })
                    return newUserStreams
                } else {
                    // play sound;
                    newUserStreams.push({
                        user,
                        stream: e.streams[0],
                        video: false,
                        audio: true,
                    })
                }
                return newUserStreams
            })
    }

    function handleUserDisconnection(user) {
        closeVideoCall(peersRef.current[user.kid], user.kid)
        signalingSocket.current.emit('disconnect_user_webrtc', user)
    }

    function disconnectFromVideoConference() {
        for (const key in peersRef.current) {
            if (peersRef.current.hasOwnProperty(key)) {
                closeVideoCall(peersRef.current[key], key)
            }
        }
        setPeerStreams([])
    }

    function handletoogleUserAudio(user) {
        
        signalingSocket.current.emit('mute_user_audio_webrtc', user)
    }

    function handleWaveUser(user) {
        props.toast.success(
            <div className="wave_alert_rtc">
                <img
                    src={ user.avatar }
                    style={ { borderRadius: '50%', marginRight: '1rem' } }
                    height="40"
                    width="40"
                />
                <b>You sent a wave.</b>
            </div>,
            { position: 'bottom-center' }
        )
        signalingSocket.current.emit('wave_to_user_webrtc', {
            ...user,
            from: {
                displayName: props.usersData.displayName,
                displayImg: props.usersData.displayImg,
            },
        })
    }
    function handleIncomingWave(data) {
        
        data &&
            data.from &&
            props.toast.success(
                <div className="wave_alert_rtc">
                    <img
                        src={ data.from.displayImg }
                        style={ { borderRadius: '50%', marginRight: '1rem' } }
                        height="40"
                        width="40"
                    />
                    <b>{data.from.displayName} sent a wave</b>
                </div>,
                { position: 'bottom-center' }
            )
    }

    return (
        <div className="participant-host-video-container">
            <VideoAudioPermission />
            <span className="hide d-flex align-items-center justify-content-between">
                <div style={ { fontSize: 'larger' } }>
                    <i className="fa fa-video mr-1"></i> Video call
                </div>
                {props.isOwner ? (
                    <i className="fa fa-users-cog mr-2 group-audio-settings"></i>
                ) : (
                    ''
                )}
            </span>
            <div className="videos-remote-user">
                <div className={ 'video-container' }>
                    <video
                        style={ { display: videoMuted ? 'none' : 'block' } }
                        playsInline
                        muted
                        ref={ userVideo }
                        autoPlay
                    />
                    <div
                        style={ { display: videoMuted ? 'flex' : 'none' } }
                        className="userVideo-placecholder">
                        <img
                            src={ props.usersData.displayImg }
                            height="60"
                            width="60"
                        />
                    </div>
                    <span
                        className={ `user_name_label ${
                            audioMuted ? 'user-muted' : 'user-unmuted'
                        }` }>
                        You
                        {audioMuted ? (
                            <i className="ml-1 fas fa-volume-mute"></i>
                        ) : (
                            <i className="ml-1  fas fa-volume-up"></i>
                        )}
                    </span>

                    <div className="video-audio-controls">
                        <span
                            className="video-audio-icon-button"
                            onClick={ hideVideo }>
                            <i
                                className={ `fa fa-video${
                                    videoMuted ? '-slash' : ''
                                } cursor-pointer` }></i>
                        </span>
                        <span
                            onClick={ toogleAudio }
                            className="video-audio-icon-button">
                            <i
                                className={ `fa fa-microphone${
                                    audioMuted ? '-slash' : ''
                                } cursor-pointer` }></i>
                        </span>
                    </div>
                </div>

                {peerStreams.map(
                    (remotestream) =>
                        remotestream && (
                            <RemoteVideoStream
                                stream={ remotestream.stream }
                                // hideVideo={ hideRemoteVideo }
                                video={ remotestream.video }
                                disconnectUser={ handleUserDisconnection }
                                audio={ remotestream.audio }
                                isOwner={ props.isOwner }
                                wave={ handleWaveUser }
                                toogleAudio={ handletoogleUserAudio }
                                user={ remotestream.user }
                                kid={ remotestream.user.kid }
                            />
                        )
                )}
            </div>
        </div>
    )
}
