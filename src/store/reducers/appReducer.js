import * as actionTypes from '../actions/Types'
import * as helper from '../../utility/shared'

let INITIAL_STATE = {
    cookie_token: null,
    app_loaded: false,
    errors: null,
    loading: true,
    environment:'app'
}

const acceptCookie = (state, action) => {

    return helper.updateObject(state, {
        cookie_token: action.token,
        app_loaded: true,
        loading: false
    });
}

const environmentSwitch = (state, action) => {
    return helper.updateObject(state,{
        environment: action.currentEnv
    })
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case (actionTypes.ACCEPT_COOKIE): return acceptCookie(state, action)
        case (actionTypes.COOKIE_ALREADY_ACCEPTED): return acceptCookie(state, action)
        case (actionTypes.ENVIRONMENT_SWITCH): return environmentSwitch(state,action)
        default: return state;
    }
}
