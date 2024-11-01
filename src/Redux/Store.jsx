import { applyMiddleware, combineReducers, createStore } from "redux";
import { loginReducer } from "./Reducers/LoginReducers";
import { CartReducers } from "./Reducers/CartReducers";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    loginRoot: loginReducer,
    cartRoot: CartReducers
})

const store = createStore(rootReducer,applyMiddleware(thunk))
export default store;