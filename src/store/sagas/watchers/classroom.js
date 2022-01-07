import { takeLatest } from 'redux-saga/effects'

import { createClass,verifyClassRoom,setMessageThreadData } from '../classroom';
import * as actionTypes from '../../actions/Types';

export function* watchClassroom(){

    yield takeLatest(actionTypes.CLASSROOM_CREATE_INIT,createClass)
    yield takeLatest(actionTypes.CLASSROOM_ASYNC_VERIFICATION_INIT, verifyClassRoom)
    yield takeLatest(actionTypes.SET_MESSAGE_THREAD,setMessageThreadData);
}
