import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import {
    registerDataReducer,
    authReducer,
    allUsersReducer,
    findEmailReducer,
    userReducer,
    forgotPasswordReducer,
    userDetailsReducer,
    userReportsAndItemsReducer,
    notificationReducer,
    levelExpReducer
} from './Reducers/userReducers'

import {
    dumpsReducer,
    newDumpReducer,
    allDumpsReducer,
    dumpDetailsReducer,
    dumpReducer,
    rankingReducer,
    dumpCommentReducer
} from './Reducers/dumpReducers'


import { coordinateReducer } from './Reducers/mapReducers';

const reducers = combineReducers({
    registerData: registerDataReducer,
    auth: authReducer,
    allUsers: allUsersReducer,
    findEmail: findEmailReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    userReportsAndItems: userReportsAndItemsReducer,
    notification: notificationReducer,
    levelExp: levelExpReducer,

    dumps: dumpsReducer,
    newDump: newDumpReducer,
    allDumps: allDumpsReducer,
    dumpDetails: dumpDetailsReducer,
    dump: dumpReducer,
    ranking: rankingReducer,
    dumpComment:dumpCommentReducer,

    coordinate: coordinateReducer
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;