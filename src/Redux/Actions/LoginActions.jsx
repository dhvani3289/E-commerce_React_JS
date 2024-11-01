import { GET_USER_DATA, LOGIN, LOGOUT } from "../ActionType"


export const userLogin = (data) => async (dispatch) => {
    dispatch({
        type: LOGIN,
        payload: data
    })
}

export const getUserData = () => {
    return {
        type: GET_USER_DATA
    }
}

export const userLogout = () => {
    return {
        type: LOGOUT
    }
}