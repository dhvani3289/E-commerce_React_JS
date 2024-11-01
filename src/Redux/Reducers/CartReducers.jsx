import { ADD_TO_CART, GET_CART_DATA } from "../ActionType";

const initialValue = {
    cartRecord: []
}

export const CartReducers = ((state = initialValue, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return { ...state, cartRecord: [...state.cartRecord, action.payload] }

        case GET_CART_DATA:
            return { ...state, cartRecord: action.payload }

        default:
            return state;
    }
})