import * as actionTypes from './Types'

export function updateRoomInfo(data){
    return {type: actionTypes.CLASSROOM_INFO_UPDATE,
    data}
}

export function updateClassGravatar(url){
    return {
        type: actionTypes.UPDATE_ROOM_GRAVATAR,
        url
    }
}
export function classVerify(classKid){
    return {
        type:actionTypes.CLASSROOM_ASYNC_VERIFICATION_INIT,
        classKid
    }
}

export function setClassroomSocket(socket){
    return {
        type: actionTypes.SET_CLASSROOM_SOCKET_CONNECTION,
        socket
    }
}
export function closeReactionEmojiPicker(){
    return {
        type: actionTypes.CLOSE_MESSAGE_REACTION_EMOJI_PICKER
    }
}

export function handleUnsetEditOrDeleteMessage() {
    return {
        type: actionTypes.UNSET_EDIT_OR_DELETE_MESSAGE_DATA,
    }
}
export function classVerifySuccess(classroom){
    return {
        type: actionTypes.CLASSROOM_VERIFICATION_SUCCESS,
        classroom
    }
}

export function messageThreadFecthDone(data){
     return {
         type: actionTypes.MESSAGE_THREAD_FETCH_DONE,
         data,
     }
}
export function getMessageThread(data){
    return {
        type: actionTypes.SET_MESSAGE_THREAD,
        data
    }
}

export function classResetAll(){
    return {
        type: 'CLASSROOM_RESET'
    }
}

export function classVerifyFailed(msg){
    return {
        type: actionTypes.CLASSROOM_VERIFICATION_FAILED,
        message:msg
    }
}
export const createClassRoomInit = (data) => {
    return {
        type: actionTypes.CLASSROOM_CREATE_INIT,
        ...data
    }
}

export const userJoinedAClass = (classroom) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CLASSROOM_JOINED,
            classroom
        })
    }
}

export const userLeftAClass = (classroom) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CLASSROOM_LEFT,
            classroom
        })
    }
}

export const classCreationFailed = (error) => {
    return {
        type: actionTypes.CLASS_CREATION_FAILED,
        errors: error

    }
}

export const classCreationSuccess = (details) => {
    return {
        type: actionTypes.CLASS_CREATION_SUCCESS,
        payload: details
    }
}

export const setDefaultInputOutputDevices = (data) => {
    return {
        type: actionTypes.SET_DEFAULT_INPUT_OUTPUT_DEVICES,
        data
    }
}

export const setInputOuputDevices = (data) => {
    return {
        type: actionTypes.SET_INPUT_OUTPUT_DEVICES,
        data
    }
}