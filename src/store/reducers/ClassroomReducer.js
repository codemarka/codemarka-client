/* eslint-disable camelcase */
import * as actionTypes from '../actions/Types'
import * as helper from '../../utility/shared'

const INITIAL_STATE = {
    classroom_id: null,
    is_loaded: null,
    errors: null,
    loading: false,
    classdetails: null,
    validated: false,
    status: null,
    defaultAudioVideoConfig: {
        audioinput: undefined,
        videoinput: undefined,
        audiooutput: undefined,
    },
    audioVideoDeviceAndConfigs: {},
    messageThread: {
        messages: null,
        retrieved: false,
        loading: false,
        messageId: null,
        classroomId: null,
        userid: null,
        userInfo: null,
        showingThread: false,
    },
    messageReaction: {
        isShowing: false,
        messageId: null,
    },
    socket: null,
    editOrDeleteMessage: {
        messageId: null,
        classroomId: null,
        originalContent: '',
        processing: false,
        instance: null,
    },
}

const classroomCreationInit = (state,action) => {
    return helper.updateObject(state,{
        loading:true,
        errors:null,
        classdetails:null,
        classroom_id:null
        });
} 

const classroomCreatedSuccess = (state,action) => {
    return helper.updateObject(state,{
        loading:false,
       classdetails:action.payload
        });
} 

const classroomCreationFailed = (state,action) => {
    return helper.updateObject(state,{
            errors:action.errors
        });
} 

const classroomJoined = (state,action) => {
    return helper.updateObject(state,{
        classroom_id:action.classroom
    })
}

const errorLeavingClass = (state,prevClass,newClass) => {
    return helper.updateObject(state,{
        errors:'Failed to leave classroom',
        classdetails: `${ prevClass } is not same with ${ newClass }`
    })
}

const classroomLeft = (state,action) => {
    if(state.classroom_id === action.classroom){
        return helper.updateObject(state,{
            classroom_id:null
        })
    }
  return errorLeavingClass(state,state.classroom_id,action.classroom)
}

const classroomVerifyStart = (state,action) => {
    return helper.updateObject(state,{
        classroom_id:null,
        errors:null
    })
}

const classroomVerified = (state,action) => {
    if(action.classroom._id){
        return helper.updateObject(state, {
            validated: true,
            ...action.classroom,
            status: 2
        })
    } else if(action.classroom === 'Class has ended!') {
        return helper.updateObject(state, {
            validated: true,
            validation_error_message: action.classroom,
            status: 3
        })
    }   else if(action.classroom.msg) {
        return helper.updateObject(state, {
            validated: true,
            validation_error_message: action.classroom.msg,
            status: 1,
            startTimeFull: action.classroom.startTimeFull,
            ...action.classroom.cdata
        })
    }
}

const classroomVerificationFailed = (state, action) => {
    return helper.updateObject(state,{
        validated:false,
        validation_error_message : action.message
    })
}

const resetClassRoomData = (state, action) => {
    return helper.updateObject(state, {
        ...INITIAL_STATE
    });
}

const setDefaultInputOutputDevices = (state, action) => {
    return helper.updateObject(state, {
        defaultAudioVideoConfig: {
                ...action.data,
        },
    })
}

const setInputOutputDevices = (state, action) => {
    return helper.updateObject(state, {
        audioVideoDeviceAndConfigs: action.data,
    })
}

const setThreadData = (state, action) => {
return helper.updateObject(state, {
    messageThread: {
        ...state.messageThread,
        ...action.data,
        loading: true,
        showingThread: true,
    },
})
}

const fetchedMessageThreadSuccessfull = (state, action) => {
    return helper.updateObject(state, {
        messageThread: {
            ...state.messageThread,
            loading: false,
            retrieved: true,
            messages: action.data.messageData.thread,
            timeSent: action.data.messageData.oTime,
            message: action.data.messageData.msg || '',
            showingThread: true,
            userInfo: {
                username: action.data.username,
                image: action.data.image,
            },
           data:{
               ...action.data.messageData
           }
        },
    })
}

const updateCurrentMessageThread = (state, action) => {
    const incomingThreadMessageID = action.data[0].messageId;
    if (state.messageThread.showingThread && state.messageThread.messageId === incomingThreadMessageID) {
return helper.updateObject(state, {
    messageThread: {
        ...state.messageThread,
        messages: action.data,
    },
})
    } 
    return state;
        
}

const showMessageReactionPicker = (state, action) => {
    return helper.updateObject(state, {
        messageReaction: {
            isShowing: action.status,
            messageId: action.messageId
        },
    })
}

const setSocketConnection = (state, action) => {
    return helper.updateObject(state, {
        socket: action.socket
    })
}

const closeMessageReactionPicker = (state, action) => {
    return helper.updateObject(state, {
        messageReaction: {
            isShowing: false,
            messageId: null
        }
    })
}

const setEditOrDeleteMessageData = (state, action) => {
    return helper.updateObject(state, {
        editOrDeleteMessage: {
            ...state.editMessage,
            ...action.data,
            processing: true,
        },
    })
}

const unsetMessageEditOrDeleteData = (state) => {
    return helper.updateObject(state, {
        editOrDeleteMessage: {
            messageId: null,
            classroomId: null,
            originalContent: '',
            processing: false,
            instance: null,
        },
    })
}

const updateClassInfo = (state, action) => {
    return helper.updateObject(state, {
        description: action.data.description,
        topic: action.data.topic,
        name: action.data.name,
    })
};

const updateRoomGravatar =  (state, action) => {
    return helper.updateObject(state, {
        gravatarUrl: action.url
    })
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case(actionTypes.CLASSROOM_CREATE_INIT): return classroomCreationInit(state,action)
        case(actionTypes.CLASS_CREATION_SUCCESS): return classroomCreatedSuccess(state,action)
        case(actionTypes.CLASS_CREATION_FAILED): return classroomCreationFailed(state,action)
        case(actionTypes.CLASSROOM_JOINED): return classroomJoined(state,action)
        case(actionTypes.CLASSROOM_LEFT): return classroomLeft(state,action)
        case(actionTypes.CLASSROOM_VERIFICATION_INIT): return classroomVerifyStart(state,action) 
        case(actionTypes.CLASSROOM_VERIFICATION_SUCCESS): return classroomVerified(state,action)
        case(actionTypes.CLASSROOM_VERIFICATION_FAILED): return classroomVerificationFailed(state,action)
        case(actionTypes.CLASSROOM_RESET): return resetClassRoomData(state,action)
        case(actionTypes.SET_DEFAULT_INPUT_OUTPUT_DEVICES): return setDefaultInputOutputDevices(state,action)
        case(actionTypes.SET_INPUT_OUTPUT_DEVICES): return setInputOutputDevices(state,action)
        case(actionTypes.MESSAGE_THREAD_DATA_SET_DONE): return setThreadData(state,action)
        case(actionTypes.MESSAGE_THREAD_FETCH_DONE): return fetchedMessageThreadSuccessfull(state,action)
        case(actionTypes.MESSAGE_THREAD_UPDATED): return updateCurrentMessageThread(state,action)
        case(actionTypes.SET_DISPLAYING_MESSAGE_REACTION_PICKER): return showMessageReactionPicker(state,action)
        case(actionTypes.SET_CLASSROOM_SOCKET_CONNECTION): return setSocketConnection(state,action)
        case(actionTypes.CLOSE_MESSAGE_REACTION_EMOJI_PICKER): return closeMessageReactionPicker(state,action)
        case(actionTypes.SET_EDIT_OR_DELETE_MESSAGE_DATA): return setEditOrDeleteMessageData(state,action)
        case(actionTypes.UNSET_EDIT_OR_DELETE_MESSAGE_DATA): return unsetMessageEditOrDeleteData(state,action)
        case(actionTypes.CLASSROOM_INFO_UPDATE): return updateClassInfo(state,action);
        case(actionTypes.UPDATE_ROOM_GRAVATAR): return updateRoomGravatar(state,action);
        default: return state;
    }
}
