/**
 * /* eslint-disable no-undef
 *
 * @format
 */

import { put, delay, call } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from '../actions/index'
import * as actionTypes from '../actions/Types'
import { resolvePromise } from '../../utility/shared'

import * as APIURLS from '../../config/api_url'
import store from '../index'
const userTokenAlias = 'wx1298'
const userIdAlias = 'u342345'

axios.defaults.withCredentials = true

export function* userLoginSaga() {
    yield put({
        type: 'AUTH_USER_LOGIN',
    })
}

export function* logoutSaga() {
    yield localStorage.removeItem(userTokenAlias)
    yield localStorage.removeItem(userIdAlias)
    yield put({
        type: 'LOGOUT_SUCCESSFUL',
    })
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime)
    yield put()
}

export function* authRegisterUserSaga({
    email,
    password,
    username,
    field,
    firstname,
    lastname,
}) {
    yield put({ type: actionTypes.AUTH_USER_SIGNUP_START })

    const url = APIURLS.USER_SIGN_UP
    const myHeaders = yield new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    const loginRequest = yield new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify({
            email,
            password,
            username,
            field,
            firstname,
            lastname,
        }),
        mode: 'cors',
        
    })

    try {
        const response = yield fetch(loginRequest)
        const resolvedResponse = yield call(resolvePromise, response.json())

        if (resolvedResponse.status === 1) {
            yield put(actions.authRegisterSuccess(resolvedResponse.message))
        } else if (typeof resolvedResponse.message == 'object') {
            yield put(
                actions.authRegisterFailed(resolvedResponse.message[0].msg)
            )
        } else {
            yield put(actions.authRegisterFailed(resolvedResponse.message))
        }
    } catch ({ message }) {
        if (message && message === 'Failed to fetch') {
            yield put(actions.authRegisterFailed('Whoops! Newtwork error!'))
        } else {
            yield put(actions.authRegisterFailed('Opps! Something went wrong'))
        }
    }
}

export function* authLoginUserSaga({ email, password }) {
    yield put({ type: 'AUTH_USER_LOGIN_START' })

    const url = APIURLS.USER_SIGN_IN
    const myHeaders = yield new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    const loginRequest = yield new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify({ email, password }),
        mode: 'cors',
        
    })

    try {
        const response = yield fetch(loginRequest)
        const resolvedResponse = yield call(resolvePromise, response.json())
        if (resolvedResponse.status) {
            // 
            yield localStorage.setItem(
                userTokenAlias,
                resolvedResponse.data.token
            )
            yield localStorage.setItem(userIdAlias, resolvedResponse.data.kid)
            yield put(actions.authLoginSuccess(resolvedResponse.data))
        } else if (typeof resolvedResponse.message == 'object') {
            yield put(actions.authLoginFailed(resolvedResponse.message[0].msg))
        } else {
            yield put(actions.authLoginFailed(resolvedResponse.message))
        }
    } catch ({ message }) {
        if (message && message === 'Failed to fetch') {
            yield put(actions.authLoginFailed('Whoops! Newtwork error!'))
        } else {
            yield put(actions.authLoginFailed('Opps! Something went wrong'))
        }
    }
}

export function* autoLoginUserSaga() {
    const loggingOut = yield store.getState().auth.loggingOut
    if (loggingOut) {
        yield put(actions.autoAuthFailed('logging out.'))
    } else {
        const kid = yield localStorage.getItem(userIdAlias)
        const token = yield localStorage.getItem(userTokenAlias)

        const url = APIURLS.AUTO_LOGIN_USER
        const myHeaders = yield new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const autoLoginRequest = yield new Request(url, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ token, kid }),
            redirect: 'follow',
            
        })

        if (token && kid) {
            try {
                // const done = yield axios.post(url,{token,kid})
                // 
                const response = yield fetch(autoLoginRequest)
                const resolvedResponse = yield call(
                    resolvePromise,
                    response.json()
                )
                if (resolvedResponse.status) {
                    yield localStorage.setItem(
                        userTokenAlias,
                        resolvedResponse.data.token
                    )
                    yield localStorage.setItem(
                        userIdAlias,
                        resolvedResponse.data.kid
                    )
                    yield put(actions.autoAuthSuccess(resolvedResponse.data))
                } else if (
                    resolvedResponse.message.name === 'JsonWebTokenError'
                ) {
                    yield put(actions.autoAuthFailed('jwt malformed'))
                } else {
                    yield put(actions.autoAuthFailed(resolvedResponse.message))
                }
            } catch ({ message }) {
                yield put(actions.autoAuthFailed({ message }))
            }
        } else {
            yield put(actions.autoAuthFailed('Token and userid not found'))
        }
    }
}

export function* accountRecovery({ email }) {
    const url = APIURLS.ACCOUNT_RECOVERY

    const myHeaders = yield new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    const accountRecoveryRequest = yield new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify({ email }),
        mode: 'cors',
    })
    const response = yield fetch(accountRecoveryRequest)

    const resolvedResponse = yield call(resolvePromise, response.json())

    const { status, message } = resolvedResponse

    if (status && status !== 0) {
        yield put(actions.accountRecoverySuccess(status))
    } else {
        yield put(actions.accountRecoveryFailed(message))
    }
}

export function* userPasswordChange({ data }) {
    yield put(actions.userPasswordChangeStart())

    const url = APIURLS.ACCOUNT_PASSWORD_RESET

    const myHeaders = yield new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    const passwordReset = yield new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify({ ...data }),
        mode: 'cors',
        
    })
    const response = yield fetch(passwordReset)

    const resolvedResponse = yield call(resolvePromise, response.json())

    const { status, message } = resolvedResponse
    if (status && status !== 0) {
        yield put(actions.accountRecoverySuccess(status))
    } else {
        yield put(actions.accountRecoveryFailed(message))
    }
}
