import ACTIONS from '../actions/'

const users =[]

const usersReducerTwo = (state = users, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_USERS_TWO:
            return action.payload
        default:
            return state
    }
}

export default usersReducerTwo