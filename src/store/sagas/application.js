import { put } from 'redux-saga/effects';

import * as actions from '../actions/index'

export function* cookieAccepted() {
    
    const cookie_token = localStorage.getItem('ctok');
    if (cookie_token) {
        localStorage.setItem('ctok', cookie_token)

      yield  put(actions.dispatchCookieAlreadyAccepted(cookie_token));

    } else {
        const cookie_token = (Math.random() * 22345678912345678934)
        localStorage.setItem('ctok', cookie_token)
       yield put(actions.dispatchCookieAccepted(cookie_token));

    }

}

export function* tryValidatingCookie() {
    const cookie_token = localStorage.getItem('ctok');
  
    if (cookie_token) {
        localStorage.setItem('ctok', cookie_token)
        yield put(actions.dispatchCookieAlreadyAccepted(cookie_token))
    }else {
        yield 
    }

}