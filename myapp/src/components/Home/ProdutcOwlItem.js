import React, { useState, useEffect } from 'react'
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import { Message } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { setIp } from '../../store/action';
import { useSearch } from 'rsuite/esm/internals/Picker';
import { CreateBasket } from '../../store/store'
import { CButton, CSpinner } from "@coreui/react";
export default function ProductOwlItem({ item, onCommentSubmit, onNotificationSubmit }) {
  const [active, setActive] = useState(false);
  const [productCommentDto, setproductCommentDto] = useState({
    Rating: 0,
    Message: '',
    NameAndSurname: '',
    ProductId: item.id
  })
  const [alert, setAlert] = useState({})
  const [rating, setRating] = useState(0);
  const [notActive, setNotActive] = useState(false)
  const [success, setSucces] = useState(false)
  const [notEror, setnotERor] = useState({})
  const [loading, setLoading] = useState(false);

  const [sendNotificationDto, setsendNotificationDto] = useState({
    ProductId: item.id
  })
  const dispatch = useDispatch();
  const totalStars = 5;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [basketDto, setBasketDto] = useState({
    ProductId: item.id
  })
  const [inBasket, setInBasket] = useState(false)
  useEffect(() => {
    fetchIpAddress()
  }, [])
  const AddComment = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5126/api/Product/AddComment`, productCommentDto, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    }).then(res => {
      console.log(res)
      setTimeout(() => {
        onCommentSubmit("✅ Rəyiniz uğurla əlavə olundu, baxıldıqdan sonra dərc olunacaq ");
        setActive(false)
      }, 1000);
      setproductCommentDto({
        NameAndSurname: '',
        Message: ''
      })


    }).catch(eror => {
      console.log(eror);
      if (typeof eror.response.data == "object") {
        setAlert({
          NameAndSurname: eror.response.data.errors.NameAndSurname,
          Message: eror.response.data.errors.Message
        })
      }
      else if (typeof eror.response.data == "string") {
        setAlert({ data: eror.response.data })
      }

      setTimeout(() => {
        setAlert({
          Message: '',
          NameAndSurname: '',
          data: ''
        })
      }, 2000);
    })
  }

  const AddNotification = (e) => {
    e.preventDefault();
    console.log(sendNotificationDto)
    if (!emailRegex.test(sendNotificationDto.Email)) {
      setnotERor({
        Email: 'Email etibarli deyil...'
      })
      setTimeout(() => {
        setnotERor({
          Email: '',
          NameAndSurname: '',
          data: ''
        })
      }, 2000);
      return;
    }
    else if (sendNotificationDto.Email == "" || sendNotificationDto.Email == undefined || sendNotificationDto.NameAndSurname == "" || sendNotificationDto.NameAndSurname == undefined) {
      setnotERor({
        NameAndSurname: 'Zehmet olmasa doldurun'
      })
      setTimeout(() => {
        setnotERor({
          NameAndSurname: ''
        })
      }, 2000);
    }

    else {
      axios.post(`http://localhost:5126/api/Product/SendNotification`, sendNotificationDto, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
        setTimeout(() => {
          onNotificationSubmit("✅ Müraciətiniz uğurla göndərildi, Sizə məlumat veriləcək ");
          setNotActive(false)
        }, 1000);
        setsendNotificationDto({
          NameAndSurname: '',
          Email: ''
        })
      }).catch(eror => {
        console.log(eror)

      })


    }


  }

  const fetchIpAddress = () => {
    axios.get("https://api64.ipify.org?format=json").then(res => {
      dispatch(setIp(res.data.ip))
      setBasketDto({ ...basketDto, IpAddress: res.data.ip })
      localStorage.setItem('IpAddress',res.data.ip)
    })
      .catch(eror => {
        console.log(eror)
      })
  };

  
  const GetProductById = () => {

  }
  return (
    <div>

      <div class="item">
        <div class="product">
          <div class="product_image">
            <div class="product_icon">
              <a class="scale" href=""><i class="fa-solid fa-scale-unbalanced-flip"></i></a>
              <a class="heart" href=""><i class="fa-solid fa-heart"></i></a>
            </div>
            <img src={`http://localhost:5126/product/${item.imageUrl[0].imageUrl}`} alt="" />
          </div>
          <div class="product_body">
            <div class="product_category">{item.categoryName}</div>
            <div class="product_name"><a href="">{item.name}</a></div>

            <div class="product_comment">
              <div class="product_stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>


                <i class="fa-regular fa-message" onClick={() => { setActive(true) }}></i>
                <span>4</span>
              </div>
              {
                active && (
                  <div class="comment_box">
                    <div class="comment_up">
                      <span>Rəy əlavə et</span>
                      <button type="button" onClick={() => setActive(false)}>X</button>
                    </div>
                    <div class="comment_body">
                      <form onSubmit={AddComment}>
                        {
                          alert.data != undefined && (
                            <p style={{ color: 'red', fontSize: '13px', margin: '15px 0' }}>{alert.data}</p>
                          )
                        }
                        <div class="comment_price">
                          <div class="price_left">Qiymətləndirin : {rating} / 5</div>
                          <div class="comment_right">
                            <div>

                            </div>
                            <div style={{ display: "flex", gap: "5px", fontSize: "20px", cursor: "pointer" }}>

                              {[...Array(totalStars)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                  <FaStar
                                    key={index}
                                    color={starValue <= rating ? "gold" : "gray"}
                                    onClick={() => {
                                      setRating(starValue)
                                      setproductCommentDto({ ...productCommentDto, Rating: starValue })
                                    }}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div class="comment_form">

                          {
                            alert.NameAndSurname != undefined && (
                              <p style={{ color: 'red', fontSize: '13px', margin: '15px 0' }}>{alert.NameAndSurname}</p>
                            )
                          }
                          <div class="input_form">
                            <label for="">Ad soyad</label>
                            <input
                              type="text"
                              placeholder="Ad soyad"
                              onChange={(e) => setproductCommentDto({ ...productCommentDto, NameAndSurname: e.target.value })}
                            />
                          </div>
                          {
                            alert.Message != undefined && (
                              <p style={{ color: 'red', fontSize: '13px', margin: '15px 0' }}>{alert.Message}</p>
                            )
                          }
                          <div class="input_form">
                            <label for="">Detalli serh</label>
                            <textarea
                              name="" id=""
                              placeholder="Detallı şərh"
                              onChange={(e) => setproductCommentDto({ ...productCommentDto, Message: e.target.value })}
                            ></textarea>
                          </div>
                          <div class="input_form_btn">
                            <button type="submit">Göndər</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              }
            </div>




            <div class="product__labels">
              <div class="product__label komissiya">Komissiyasız</div>
              {
                item.count < 10 ? (
                  <div class="product__label stok">Stokda məhdud sayda</div>

                ) : (
                  <div class="product__label stok">Stokda var</div>

                )
              }
              {
                item.count == 0 && (

                  <div class="product__label faiz" onClick={(e) => setNotActive(true)}>Mehsul barede bildir</div>

                )
              }
              {
                notActive && (
                  <div className='product_comment'>
                    <div class="comment_box">
                      <div class="comment_up">
                        <span style={{ zIndex: '999999' }}>Məhsul barədə xəbərdar et</span>
                        <button type="button" onClick={() => setNotActive(false)}>X</button>
                      </div>
                      <div style={{ margin: '15px 0' }}>

                      </div>
                      <div class="comment_body">
                        <form onSubmit={AddNotification}>
                          {
                            notEror.data != undefined && (
                              <p style={{ color: 'red', fontSize: '13px', margin: '15px 0' }}>{notEror.data}</p>
                            )
                          }

                          <div class="comment_form">

                            {
                              notEror.NameAndSurname != undefined && (
                                <p style={{ color: 'red', fontSize: '13px', margin: '15px 0' }}>{notEror.NameAndSurname}</p>
                              )
                            }
                            <div class="input_form">
                              <label for="">Ad soyad</label>
                              <input
                                type="text"
                                placeholder="Ad soyad"
                                onChange={(e) => setsendNotificationDto({ ...sendNotificationDto, NameAndSurname: e.target.value })}
                              />
                            </div>
                            {
                              notEror.Email != undefined && (
                                <p style={{ color: 'red', fontSize: '13px', margin: '15px 0' }}>{notEror.Email}</p>
                              )
                            }
                            <div class="input_form">
                              <label for="">E-mail ünvanı</label>
                              <input
                                name="" id=""
                                placeholder="E-mail ünvanı"
                                onChange={(e) => setsendNotificationDto({ ...sendNotificationDto, Email: e.target.value })}
                              ></input>
                            </div>
                            <div class="input_form_btn">
                              <button type="submit">Göndər</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
            <div class="product_prices">
              <div class="prices_left">
                <p class="overline">{item.price}Azn</p>
                <p class="price">{(Math.floor((item.price - ((item.price * item.pricePercent) / 100))))}Azn</p>
              </div>
              <div class="prices_right">
                <div class="taksit_up">
                  <div>12 <br /> ay</div>
                  <div>18 <br />ay</div>
                  <div class="taksit_active">24 <br /> ay</div>
                </div>
                <div class="taksit_down">
                  <p>153.33 AZN</p>
                </div>
              </div>
            </div>
          </div>
          <div class="product_footer">
            {
              inBasket == true ? (
                <a style={{ backgroundColor: '#f6861f' }}><i class="fa-solid fa-basket-shopping" ></i>Səbətə keç</a>
              ) : (
                <a onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setInBasket(true)
                  }, 2000);
                  dispatch(CreateBasket(basketDto))
                }}>{
                    loading ? (
                      <CSpinner size="sm" />
                    ) : (

                      <i class="fa-solid fa-basket-shopping" ></i>
                    )
                  }Səbətə əlavə et</a>
              )
            }


          </div>
        </div>
      </div>
    </div >
  )
}