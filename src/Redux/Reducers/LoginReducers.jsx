import { GET_USER_DATA, LOGIN, LOGOUT } from "../ActionType";

const initialValue = {
    loginDetails: {}
}

export const loginReducer = (state = initialValue, action) => {
    switch (action.type) {
        case LOGIN:
            // console.log(action.payload);
            // {id: '3c6e', username: 'monika', email: 'm@gmail.com', password: 'Monika@123', confirmPassword: 'Monika@123'}

            localStorage.setItem("user", JSON.stringify(action.payload))
            return { ...state, loginDetails: action.payload };

        case GET_USER_DATA:
            let userData = JSON.parse(localStorage.getItem("user"))
            return { ...state, loginDetails: userData ? userData : {} }

        case LOGOUT:
            localStorage.removeItem("user")
            return { ...state, loginDetails: {} }

        default:
            return state;
    }
}