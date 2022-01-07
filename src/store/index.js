import { createStore , applyMiddleware,compose,combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'

import Authreducer from './reducers/authReducer'
import ClassroomReducer from './reducers/ClassroomReducer'
import appReducer from './reducers/appReducer'
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth : Authreducer,
    classroom:ClassroomReducer,
    app:appReducer,
})

const store =  createStore(rootReducer ,composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga)

export default store;