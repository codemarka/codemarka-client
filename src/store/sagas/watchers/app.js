import { takeLatest } from 'redux-saga/effects'

import { tryValidatingCookie,cookieAccepted } from '../application';
import * as actionTypes from '../../actions/Types';

export function* watchApp(){
    yield takeLatest(actionTypes.COOKIE_VALIDATE_INIT, tryValidatingCookie);
    yield takeLatest(actionTypes.ACCEPT_COOKIE,cookieAccepted)
}