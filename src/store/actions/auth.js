import * as actionTypes from './Types'

export const authLoginSuccess = (response) => {
           return {
               type: actionTypes.AUTH_USER_LOGIN_SUCCESS,
               response,
           }
       }

export const authLoginFailed = (error) => {
    return {
        type: actionTypes.AUTH_USER_LOGIN_FAILED,
        message:error 
    }
}

export const authResetAll = () => {
    return {
        type: actionTypes.AUTH_RESET
    }
}

export const autoAuthFailed = (reason) => {
    return {
        type: actionTypes.AUTO_AUTH_FAILED,
        message: reason
    }
}

export const autoAuthSuccess = (data) => {
    return {
        type: actionTypes.AUTO_AUTH_SUCCESS,
        ...data
    }
}

export const autoAuthAborted = (reason) => {

    return {
        type: actionTypes.AUTO_AUTO_ABORTED
    }
}

export const ClearMessage = () => {
    return {
        type: actionTypes.NOTIFICATION_ALERT_CLOSE
    }
}

export const authRegisterUser  = (params) => {
    return {
        type: actionTypes.AUTH_USER_SIGNUP_INIT,
        ...params
    }
}

export const authRegisterFailed = (error) => {
    return {
        type: actionTypes.AUTH_USER_SIGNUP_FAILED,
        error
    }
}

export const authRegisterSuccess = (msg) => {
    return {
        type: actionTypes.AUTH_USER_SIGNUP_SUCCESS,
        message:msg
    }
}
/**
 *  Action Dispatcher for authenticating users
 * @returns object
 * @param required paremeters  
 */
export const authLoginUser = (paremeters) => {
    return {
        type: actionTypes.AUTH_USER_LOGIN_INIT,
        ...paremeters
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: 'AUTH_CHECK_TIMEOUT',
        expirationTime
    };
};

export const logout = () => {
    return {
        type:'AUTH_LOGOUT_INIT'
    }
}

export const logoutSucceed = () => {
    return {
        type: 'LOGOUT_SUCCESSFUL'
    }
}

export const accountRecoveryInit = (email) => {
    return {
        type: actionTypes.ACCOUNT_RECOVERY_START,
        email
    }
}

export const accountRecoveryFailed = (message) => {
    return {
        type: actionTypes.ACCOUNT_RECOVERY_FAILED,
        msg: message
    }
}

export const accountRecoverySuccess = (status) => {
    return {
        type: actionTypes.ACCOUNT_RECOVERY_SUCCESS,
        status
    }
}

export const passwordChangeInit = (data) => {
    return {
        type: actionTypes.ACCOUNT_PASSWORD_CHANGE_INIT,
        data
    }
}

export const userPasswordChangeStart = () => {
    return {
        type: actionTypes.ACCOUNT_PASSWORD_CHANGE_START
    }
}