import { takeLatest } from 'redux-saga/effects'

import { userPasswordChange,accountRecovery,logoutSaga,checkAuthTimeoutSaga ,authLoginUserSaga,autoLoginUserSaga,authRegisterUserSaga } from '../auth';
import * as actionTypes from '../../actions/Types';

export function* watchAuth(){
    yield takeLatest('AUTH_LOGOUT_INIT',logoutSaga)
    yield takeLatest('AUTH_CHECK_TIMEOUT',checkAuthTimeoutSaga)
    yield takeLatest(actionTypes.AUTH_USER_LOGIN_INIT,authLoginUserSaga)
    yield takeLatest(actionTypes.AUTH_USER_SIGNUP_INIT,authRegisterUserSaga)
    yield takeLatest(actionTypes.AUTO_AUTH_INIT, autoLoginUserSaga)
    yield takeLatest(actionTypes.ACCOUNT_RECOVERY_START, accountRecovery)
    yield takeLatest(actionTypes.ACCOUNT_PASSWORD_CHANGE_INIT, userPasswordChange)
}