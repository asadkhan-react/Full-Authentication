import ACTIONS from '../actions/'

const users =[]

const visitorUsers = (state = users, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_USERS_FOR_VISITORS:
            return action.payload
        default:
            return state
    }
}

export default visitorUsers