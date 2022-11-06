import ACTIONS from './index'
import axios from 'axios'

export const fetchAllUsers = async (token) => {
    const res = await axios.get('/user/getalluserinfo', {
        headers: {Authorization: token}
    })
    return res
}

export const fetchAllUsersTwo = async (token) => {
    const res = await axios.get('/user/getalluserinfotwo', {
        headers: {Authorization: token}
    })
    return res
}

export const fetchAllUsersForAll = async (token) => {
    const res = await axios.get('/user/getAllUserIfoforAll', {
        headers: {Authorization: token}
    })
    return res
}
export const fetchAllUsersTwoForAll = async (token) => {
    const res = await axios.get('/user/getAllUserInfoTwoforAll', {
        headers: {Authorization: token}
    })
    return res
}

export const fetchAllUsersForVisitors = async (token) => {
    const res = await axios.get('/user/getallusersforvisitors' , {
        headers : {Authorization : token}
    })
    return res
}

export const dispatchGetAllUsers = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
    }
}
export const dispatchGetAllUsersTwo = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS_TWO,
        payload: res.data
    }
}

export const dispatchGetAllUsersForAll = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS_FOR_ALL,
        payload: res.data
    }
}
export const dispatchGetAllUsersTwoForAll = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS_TWO_FOR_ALL,
        payload: res.data
    }
}

export const dispatchGetAllUsersForVisitors = (res) => {
    return {
        type : ACTIONS.GET_ALL_USERS_FOR_VISITORS ,
        payload: res.data
    }
}
