import ACTIONS from '../actions/'

const users =[]

const usersReducerTwoForAll = (state = users, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_USERS_TWO_FOR_ALL:
            return action.payload
        default:
            return state
    }
}

export default usersReducerTwoForAll