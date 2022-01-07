import * as actionTypes from '../actions/Types'
import * as helper from '../../utility/shared'

const INITIAL_STATE = {
    
    error:false,
    loading:false,
    message:'',
    user:{
        displayName:null,
        token:null,
        accountKid:null,
        displayImg:null,
        email:null,
        accountType:null
    },
    authenticated:false,
    authState:null,
    loggingOut: false        

}

const authStart = (state,action) => {
    return helper.updateObject(state,{ 
        error:false,
        message:'',
        loading: true,
        authState:'started'
      });
}

const reset = (state, action ) => {
    return helper.updateObject(state,{
        error:false,
        message:'',
        loading: false,
        authState:null
    })
}

const authLoginFailed = (state,{ message }) => {
    // const msg = action.message
    return helper.updateObject(state,{
        error:true,
        loading: false,
        message,
        authState:'done'
    });
}

const authLoginSuccess = (state,action) => {
    // 
    return helper.updateObject(state,{
        loading:false,
        error:false,
        message:'',
        authenticated:true,
        user:{
            token: action.response.token,
            accountKid:action.response.kid,
            displayName: action.response.displayName
        },
        authState:'done'
    })
}

const authLogout = (state,action) => {

    return helper.updateObject(state,{
        authenticated:false,
        user: {
            token: null,
            userId: null,
            username: null,
            email: null
        }
    });
} 
const autoAuthFailed = (state) => {
    return helper.updateObject(state,{
        authenticated:false,
        user: {
            token: null,
            userId: null,
            username: null,
            email: null
        },
        authState: 'done'
    })
}
const setAuthRedirectPat = (state,action) => {
    return helper.updateObject(state,{
        authRedirectPath:action.path
    })
}

const authRegistrationSuccess = (state,action) => {
    return helper.updateObject(state,{
            loading:false,
            message:action.message,
            error:false,
            authState:'done',
            Registrationsuccess:true        
    })
}

const authRegistrationFailed = (state, action) => {
    return helper.updateObject(state,{
        loading:false,
        error: true,
        message: action.error,
            authState:'done'        

    })
}

const ClearAlertMessage = (state,action) => {
    return helper.updateObject(state,{
        message:null,
        error: false
    })
}

const authAutoSuccess = ( state, action ) => {
    return helper.updateObject(state,{
        authenticated: true,
        error: false,
        loading: false,
        message: '',
        user: { 
            token: action.token,
            accountid: action.kid,
            displayName:action.displayName,
            email: action.email,
            displayImg: action.displayImg,
            accountType:action.accountType
        },
        authState:'done'
    })
}

const logoutSuccessful = (state, action) => {
    return helper.updateObject(state,{
        authenticated: false,
        user : {
            token: null,
            userId: null,
            username: null,
            email: null
        },
        error: false,
        loading: false,
        message: ''
    })
}

const autoAuthInit = (state, action) => {
    return helper.updateObject(state,{
        authState:'started'
    });
}

const accountRecoveryFailed = (state, action) => {
    return helper.updateObject(state,{
        error: true,
        loading:false,
        message: action.msg
    })
}

const accountRecoveryStart = (state, action) => {
    return helper.updateObject(state,{
        error: false,
        loading: true,
        message: null
    })
}

const accountRecoverySuccess = (state, action) => {
    return helper.updateObject(state, {
        error: false,
        loading: false,
        message: 'Hurray!! Your mail is on it\'s way'
    })
}

const accountPasswordChangeStart = (state, action) => {
    return helper.updateObject(state, {
        error: false,
        loading: true,
        message: null
    })
}

const accountPasswordChangeSuccess = (state, action) => {
    return helper.updateObject(state, {
        error: false,
        loading: false,
        message: 'Great! Your new password has been set,login to continue.'
    });
}

const accountPasswordChangeFailed = (state, action) => {
    return helper.updateObject(state, {
        error: true,
        loading: false,
        message: action.msg
    })
}

const logoutInit = (state, action) => {
    return helper.updateObject(state,{
        loggingOut: true
    })
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.AUTH_USER_LOGIN_START:
            return authStart(state, action)
        case actionTypes.AUTH_USER_LOGIN_SUCCESS:
            return authLoginSuccess(state, action)
        case actionTypes.AUTH_USER_LOGIN_FAILED:
            return authLoginFailed(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPat(state, action)
        case actionTypes.AUTO_AUTH_FAILED:
            return autoAuthFailed(state, action)
        case actionTypes.AUTO_AUTH_SUCCESS:
            return authAutoSuccess(state, action)
        case actionTypes.AUTH_USER_SIGNUP_FAILED:
            return authRegistrationFailed(state, action)
        case actionTypes.AUTO_AUTH_INIT:
            return autoAuthInit(state, action)
        case actionTypes.AUTH_USER_SIGNUP_SUCCESS:
            return authRegistrationSuccess(state, action)
        case actionTypes.AUTH_USER_SIGNUP_START:
            return authStart(state, action)
        case actionTypes.NOTIFICATION_ALERT_CLOSE:
            return ClearAlertMessage(state, action)
        case actionTypes.AUTH_RESET:
            return reset(state, action)
        case actionTypes.LOGOUT_SUCCESSFUL:
            return logoutSuccessful(state, action)
        case actionTypes.LOGOUT_INIT:
            return logoutInit(state, action)
        case actionTypes.ACCOUNT_RECOVERY_START:
            return accountRecoveryStart(state, action)
        case actionTypes.ACCOUNT_RECOVERY_FAILED:
            return accountRecoveryFailed(state, action)
        case actionTypes.ACCOUNT_RECOVERY_SUCCESS:
            return accountRecoverySuccess(state, action)
        case actionTypes.ACCOUNT_PASSWORD_CHANGE_START:
            return accountPasswordChangeStart(state, action)
        case actionTypes.ACCOUNT_PASSWORD_CHANGE_SUCCESS:
            return accountPasswordChangeSuccess(state, action)
        case actionTypes.ACCOUNT_PASSWORD_CHANGE_FAILED:
            return accountPasswordChangeFailed(state, action)

        default:
            return state
    }
}
