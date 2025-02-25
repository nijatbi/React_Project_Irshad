import React, { useState } from 'react'
import '../../css/Contact.css'
import photo from '../../images/600x600.webp'
import axios from 'axios'
import Footer from '../Footer'
export default function Contact() {
    const [contactDto, setContactDto] = useState({
        Datetime:'10:00 - 11:00'
    })
    const [eror, setEror] = useState("")
    const[isSuccess,setIsSuccess]=useState(false)

    const sendMessage = (e) => {
        e.preventDefault();
        var regexNumber=/(?:0|994)(?:12|51|50|55|70|77)[^\w]{0,2}[2-9][0-9]{2}[^\w]{0,2}[0-9]{2}[^\w]{0,2}[0-9]{2}/;
        if(regexNumber.test(contactDto.Phone)){
            setTimeout(() => {
                axios.post("http://localhost:5126/api/contact", contactDto, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res)
                    setIsSuccess(true)
                    setContactDto({
                        Name:'',
                        Phone:"",
                        Message:'',
                        Datetime:"",
                        Company:'',
                        Email:''
                    })
                })
                    .catch(eror => {
                       console.log(eror)
                    })
               }, 1500);
        }
        else{
            setEror("Nomreni duzgun daxil edin")
            setTimeout(() => {
                setEror("")
            }, 1500);
        }
    }


    return (
     <React.StrictMode>
           <div className="korporativ-inner">
            <div className="container-fluid">
                <div className="container_up">
                    <h1>Korporativ</h1>
                </div>
                <div className="korporativ_inner_desc">
                    <div className="blog-inner__text">
                        <p>İrşad Korporativ şöbəsi ölkənin bir çox tanınmış şirkətləri ilə əməkdaşlıq edir. Ümumilikdə 2500-dən çox şirkət, publik hüquqi şəxslər, dövlət qurumlarını əhatə edən əməkdaşlıq çərçivəsində Korporativ şöbə müştərilərinə xüsusi həssaslıqla yanaşır.</p>
                    </div>
                    <div className="blog_inner_add">
                        <div className="blog_inner_left">
                            <h4>Korporativ üstünlüklərimiz</h4>
                            <ul>
                                <li>
                                    <p>
                                        <strong>Qiymət strategiyası:</strong>
                                        Korporativ müştərilər daim Korporativ seqmentə xas olan xüsusi endirimlərdən yararlana bilirlər.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Xidmət:</strong>
                                        Korporativ müştərilər servis xidmətlərindən növbəsiz yararlana bilirlər.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Ödəmə şərtləri:</strong>
                                        Korporativ müştərilər daim Korporativ seqmentə xas olan xüsusi endirimlərdən yararlana bilirlər.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Şəxsi menecer:</strong>
                                        Korporativ müştərilər daim Korporativ seqmentə xas olan xüsusi endirimlərdən yararlana bilirlər.
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="blog_inner_img">
                            <img src={photo} alt="" />
                        </div>
                    </div>
                    <div className="blog_inner_suggest">
                        <h4>Sizə təkliflərimiz:
                        </h4>
                        <ul>
                            <li>
                                Köçürmə yolu ilə ödəniş edə bilmək imkanı
                            </li>
                            <li>
                                Korporativ müştərilərə xüsusi endirimlər
                            </li>
                            <li>
                                Seçilmiş müştərilərə hissəli ödəniş imkanı
                            </li>
                            <li>
                                Zəng,elektron poçt üzərindən sifariş vermə imkanı
                            </li>
                            <li>
                                Öncədən sifariş etməklə saytımızda əks olunmayan malların əldə edə bilmə imkanı
                            </li>
                            <li>
                                Bizimlə əməkdaşlıq etmək üçün aşağıdakı əlaqə vasitələrindən sizə uyğun olanını seçə bilərsiniz:
                            </li>
                        </ul>
                    </div>
                    <div className="blog_inner_contact">
                        <h4>Əlaqə</h4>
                        <ul>
                            <li><a href="tel:+994553008784">  +994553008784</a></li>
                            <li><a href="tel:+994552052686">  +994552052686</a></li>
                            <li><strong>Poçt ünvanımız:</strong><a href="mailto:corp@irshad.az">corp@irshad.az</a></li>
                        </ul>
                    </div>
                </div>

            </div>
            <form action="" onSubmit={sendMessage}>
                <div className="checkout__form">
                    <div className="checkup">
                        <h1>Bizə yazın</h1>
                    </div>
                    <div className="input_form">
                        <div className="form_group">
                            <label for="">Ad soyad</label>
                            <input value={contactDto.Name} onChange={(e) => setContactDto({ ...contactDto, Name: e.target.value })} type="text" placeholder="Ad" required />
                        </div>
                        <div className="form_group">
                            <label for="">Əlaqe nömrəsi</label>
                            <div style={{color:'red',fontSize:'14px',margin:"10px 0"}}>{eror}</div>
                            <input value={contactDto.Phone} onChange={(e) => {
                                 if(!isNaN(e.target.value) || e.target.value==="+"){
                                    setContactDto({...contactDto,Phone:e.target.value})
                                    console.log("reqemdir")
                                }
                                else if(e.target.value.startsWith("")){
                                    setContactDto({...contactDto,Phone:""})

                                }
                                else{
                                    // alert("Nomreni duzgun daxil edin")
                                    setContactDto({...contactDto,Phone:contactDto.Phone+""})
                                }
                            }

                            } type="text" placeholder="Elaqe nomresi" required />
                        </div>
                    </div>
                    <div className="input_form">
                        <div className="form_group">
                            <label for="">Email</label>
                            <input type="email" placeholder="Email" value={contactDto.Email} onChange={(e) => setContactDto({ ...contactDto, Email: e.target.value })} name="" id="" required />
                        </div>
                    </div>
                    <div className="input_form">
                        <div className="form_group">
                            <label for="">Şirkət</label>
                            <input value={contactDto.Company} onChange={(e) => setContactDto({ ...contactDto, Company: e.target.value })} type="text" placeholder="Şirkət" required />
                        </div>
                        <div className="form_group">
                            <label for="">Sizə nə zaman zəng edək</label>
                            <select onChange={(e) => setContactDto({ ...contactDto, Datetime: e.target.value })} name="" id="">
                                <option selected value="10:00-11:00">10:00-11:00</option>
                                <option value="11:00-12:00">11:00-12:00</option>
                                <option value="12:00-13:00">12:00-13:00</option>
                                <option value="13:00-14:00">13:00-14:00</option>
                                <option value="14:00-15:00">14:00-15:00</option>
                                <option value="15:00-16:00">15:00-16:00</option>

                            </select>
                        </div>

                    </div>
                    <div className="input_form">
                        <div className="form_group">
                            <label for="" required>İsmarıc</label>
                            <textarea style={{padding:"15px 20px",fontSize:'16px'}} value={contactDto.Message} onChange={(e) => setContactDto({ ...contactDto, Message: e.target.value })} name="" id=""></textarea>
                        </div>
                    </div>
                    <div className="input_form_button">
                        <button type="submit">Təsdiq et</button>
                    </div>
                </div>
            </form>
            <div className={`modal_content ${isSuccess ? 'isActive' :''}`} >
            <div className="model_text">
                <p><i class="fa-solid fa-check"></i> Müraciətiniz uğurla göndərildi</p>

                <button type='button' onClick={()=>setIsSuccess(false)}>X</button>
            </div>
        </div>
        </div>
        <Footer></Footer>
     </React.StrictMode>
    )
}
