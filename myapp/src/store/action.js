export const SET_TOKEN='SET_TOKEN'
export const SET_BASKET='SET_BASKET'
export const REMOVE_BASKET='REMOVE_BASKET'
export const GET_TOKEN='GET_TOKEN'
export const SET_IPAdress='SET_IPAdress'
export const GET_IPAddress='GET_IPAddress'
export const setToken=(token)=>({
    type:SET_TOKEN,
    token,
})

export const removeBasket = (id)=>({
    type:REMOVE_BASKET,
    id,
}) 
export  const setBasket = (basket)=>({
    type:SET_BASKET,
    basket
})

export const getToken=()=>({
    type:GET_TOKEN,
})
export const setIp=(ipAddress)=>({
    type:SET_IPAdress,
    ipAddress
})
export const getIp=()=>({
    type:GET_IPAddress,

})
