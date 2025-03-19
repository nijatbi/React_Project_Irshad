import axios from "axios";
import { thunk } from "redux-thunk";
import { jwtDecode } from "jwt-decode";
import { SET_TOKEN, SET_BASKET, REMOVE_BASKET, setBasket,GET_TOKEN,SET_IPAdress,GET_IPAddress } from "./action";
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { useEffect } from "react";

const LoadTokenFromStorage = ()=>{
    let token = localStorage.getItem('token')
    if(token){
        return token;
    }
    else{
        localStorage.removeItem('token')
    }
}

const LoadIpAddres=()=>{
    var ip=localStorage.getItem('IpAddress')
    if(ip==null) {
        console.log('Ip not found')
        return ;
    }
    return ip

}

export  const fetchBasket=()=>{
    return async (dispatch)=>{
      if(localStorage.getItem('IpAddress')==null) {
        console.log("Ip bosdu")
        return ''
    }
    else{
        axios.get(`http://localhost:5126/api/Cart/GetProducts/${localStorage.getItem('IpAddress')}`,).then(res=>{
            dispatch(setBasket(res.data.products))
        }).catch(eror=>{
            console.log(eror)
        })
    }
    }

}
export const CreateBasket=(basketDto)=>{
    return async (dispatch) => {
        axios.post(`http://localhost:5126/api/Cart/AddToBasket`,basketDto).then(res=>{
            dispatch(fetchBasket())
            console.log(res)
        })  
        .catch(eror=>{
            console.log(eror)
        })
    }
}

export const DeleteBasket=(basketDto)=>{
    return  async (dispatch)=>{
        axios.post(`http://localhost:5126/api/Cart/DeleteProduct`,basketDto).then(res=>{
            console.log(res)
            dispatch(fetchBasket())
        }).catch(eror=>{
            console.log(eror)
        })
    }
}

export const İncreaseBasketCount=(basketDto)=>{
    return async (dispatch)=>{
        axios.post(`http://localhost:5126/api/Cart/Increase`,basketDto).then(res=>{
            console.log(res)
            dispatch(fetchBasket())
        }).catch(eror=>{
            console.log(eror)
        })
    }
}

export const DecreaseBasketCount=(basketDto)=>{
    return async (dispatch)=>{
        axios.post(`http://localhost:5126/api/Cart/Decrease`,basketDto).then(res=>{
            console.log(res)
            dispatch(fetchBasket())
        }).catch(eror=>{
            console.log(eror)
        })
    }
}

const initialState = {
    token: LoadTokenFromStorage(), // Initialize token as null
    basket: [],
    ipAddress: LoadIpAddres()
};

const changesState = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return { ...state, token: action.token };

        case REMOVE_BASKET:
            return { ...state, basket: state.basket.filter(p => p.id !== action.id) };

        case SET_BASKET:
            return { ...state, basket: action.basket }; // Burada səhv var idi, indi düzəldi!

        case GET_TOKEN:
            return state.token;  

        case SET_IPAdress:
            return { ...state, ipAddress: action.ipAddress }; 

        case GET_IPAddress:
            return state.ipAddress;

        default:
            return state;
    }
};
const store = createStore(changesState, applyMiddleware(thunk));
export default store;

