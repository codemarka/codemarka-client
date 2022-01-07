import { all } from 'redux-saga/effects'

import { watchAuth } from './watchers/auth';
import { watchApp } from './watchers/app';
import { watchClassroom } from './watchers/classroom';

function* rootSaga() {
    yield all([
        watchAuth(),
        watchApp(),
        watchClassroom(),
      ])    
}

export default rootSaga;
