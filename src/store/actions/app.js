import * as actionTypes from './Types'

 export const dispatchCookieAccepted = (token) => {
    return {
        type: actionTypes.ACCEPT_COOKIE,
        token
    }
};

 export const dispatchCookieAlreadyAccepted = (oldToken) => {
    return {
        type: actionTypes.COOKIE_ALREADY_ACCEPTED,
        token: oldToken
    }
}

export const dispatchAppEnvironment = (environ) => {
    return {
        type: actionTypes.ENVIRONMENT_SWITCH,
        currentEnv:environ
    }
}
