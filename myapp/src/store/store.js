import axios from "axios";
import { thunk } from "redux-thunk";
import { jwtDecode } from "jwt-decode";
import { SET_TOKEN, SET_BASKET, REMOVE_BASKET, setBasket,GET_TOKEN } from "./action";
import { applyMiddleware, legacy_createStore as createStore } from 'redux';

const LoadTokenFromStorage = ()=>{
    let token = localStorage.getItem('token')
    if(token){
        return token;
    }
    else{
        localStorage.removeItem('token')
    }
}



const initialState = {
    token: LoadTokenFromStorage(), // Initialize token as null
    basket: null
};
const changesState = (state = initialState, { type, token, basket, id }) => {
    switch (type) {
        case SET_TOKEN:
            return { ...state, token };
        case REMOVE_BASKET:
            var updatedBasket = state.basket.filter(p => p.id !== id)
            return { ...basket, basket: updatedBasket };
        case SET_BASKET:
            return { ...state, basket }
        case GET_TOKEN:
            return state.basket            
        default:
            return state;
    }
}

const store = createStore(changesState, applyMiddleware(thunk));
export default store;

