import {combineReducers} from 'redux'
import authReducer from './authReducer'
import tokenReducer from './tokenReducer';
import users from './usersReducer';
import usersReducerTwo from './usersReducerTwo';
import usersReducerForAll from './usersReducerForAll';
import usersReducerTwoForAll from './usersReduceTwoForAll';
import visitorUsers from './visitorUsers';
export default combineReducers({
    authReducer ,
    tokenReducer ,
    users ,
    usersReducerTwo ,
    usersReducerForAll ,
    usersReducerTwoForAll ,
    visitorUsers
})