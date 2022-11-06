import ACTIONS from '../actions/'

const users =[]

const usersReducerForAll = (state = users, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_USERS_FOR_ALL:
            return action.payload
        default:
            return state
    }
}

export default usersReducerForAll



