import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBasket } from '../../store/store';
import '../../css/Basket.css'
import { DeleteBasket,İncreaseBasketCount,DecreaseBasketCount } from '../../store/store';
export default function BasketItem({ item }) {
    const dispatch=useDispatch();
    const IpAddress=useSelector(state=>state.ipAddress)
   const[basketProductCount,setBasketProductCount]=useState()
    const DeleteProduct=()=>{
        const basketDto={
            ProductId:item.id,
            IpAddress:localStorage.getItem('IpAddress')
        }
        dispatch(DeleteBasket(basketDto))
    }
    const IncreaseCount=()=>{
        const basketDto={
            ProductId:item.id,
            IpAddress:localStorage.getItem('IpAddress')
        }
        dispatch(İncreaseBasketCount(basketDto))
    }
    const DecreaseCount=()=>{
        const basketDto={
            ProductId:item.id,
            IpAddress:localStorage.getItem('IpAddress')
        }
        dispatch(DecreaseBasketCount(basketDto))
    }
    return (
        <div class="basket_item" >
            <div class="basket_img">
                <a href="">
                    <img src={`http://localhost:5126/product/${item.imageUrl}`} alt="" />
                </a>
            </div>
            <div class="basket_body">
                <div class="product_body_content">
                    <div class="content_left">
                        <span>{item.categoryName}</span>
                        <a href="">{item.name}</a>
                    </div>
                    <div class="content_right">
                        <button onClick={()=>DeleteProduct()} type="button"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
                <div class="basket_labels">
                    <div class="basket_label endirim">
                        - {Math.floor(((item.price * item.pricePercent) / 100))} AZN nağd alışda endirim
                    </div>
                    <div class="basket_label faiz">
                        Faizsiz təklif
                    </div>
                </div>
                <div class="basket_price">
                    <div class="basket_counter">
                        <button onClick={()=>DecreaseCount()}>-</button>
                        <span>{item.count}</span>
                        <button onClick={()=>IncreaseCount()}>+</button>
                    </div>
                    <div class="price">
                        <p>{item.price} Azn</p>
                    </div>
                    <div class="basket_switch">
                        <span style={{ marginRight: '20px' }}> Nagd al</span>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                        </label>

                        <span style={{ marginLeft: '10px' }}>Hissə-hissə al</span>
                    </div>
                </div>
            </div>
        </div>
    )
}