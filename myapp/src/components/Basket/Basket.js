import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBasket } from '../../store/store';
import '../../css/Basket.css'
import BasketItem from './BasketItem';
import Footer from '../Footer'
export default function Basket() {
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    const basketDto = useSelector((state) => {
        return state.basket
    })
    const ipAddress = useSelector(state => state.ipAddress);
    const total=0;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        dispatch(fetchBasket());
        totalPrice()
    }, [dispatch]);
    
    useEffect(() => {
        setData(basketDto)
    }, [basketDto]); // basketDto dəyişdikdə konsola yaz

    const totalPrice=()=>{
        for (let i = 0; i < basketDto.length; i++) {
            total+=basketDto[i].count*basketDto[i].price
            
        }
        console.log(total)
        return total
    }
    return (
      <React.StrictMode>
          <div class="basket_container">
            <div class="basket_content">
                <div class="basketProduct">
                    <div class="basketList">
                        <div class="basket_up">
                            <p>Səbət</p>
                            <button><i class="fa-solid fa-trash-can"></i>4 mehsul silinmisdir</button>
                        </div>
                        <div class="basket_down">
                            <div class="basket_list_fluid">
                               {
                                  basketDto?.length === 0 ? (
                                    <div>Mehsul yoxdur</div>
                                ) : (
                                    basketDto?.map((item, index) => (
                                      <BasketItem item={item}></BasketItem>
                                    ))
                                )
                               }


                            </div>
                            <div class="basket_list_count">
                                <div class="basket_total">
                                    <h3>Səbətdəki məhsullar</h3>
                                    <dl>
                                        <dt>Məhsulların qiyməti
                                        </dt>
                                        <dd>5019.00 Azn</dd>
                                        <dt>Endirim</dt>
                                        <dd>500 Azn</dd>
                                    </dl>
                                    <div class="total_price">Toplam qiymət: <span>44400.45 Azn</span></div>
                                    <div class="checkout">
                                        <a href="">Sifarişi rəsmləşdir</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
      </React.StrictMode>

    )
}