import axios from "axios";
import { ADD_TO_CART, GET_CART_DATA } from "../ActionType";

export const addToCart = (data) => async (dispatch) => {
    let cartProducts = await axios.post("http://localhost:3000/cartData", data)
    dispatch({
        type: ADD_TO_CART,
        payload: cartProducts
    })
}

export const getCartDetails = (data) => async (dispatch) => {

    let cartDetails = await axios.get("http://localhost:3000/cartData?userId=" + data)
    console.log(cartDetails.data);

    dispatch({
        type: GET_CART_DATA,
        payload: cartDetails.data
    })

}

