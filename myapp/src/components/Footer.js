import React from 'react'
import '../css/Footer.css'
import QRImage from  '../images/mobile-qr.png'
import { NavLink, useNavigate } from 'react-router-dom'
export default function Footer() {
    const navigate=useNavigate()
  return (
    <footer>
        <div class="container_footer">
            <div class="footer_content">
                <div class="qr_image">
                    <div class="image_info">
                        <img src={QRImage} alt=""/>
                        <span>Skan et, Qeydiyyatdan keç 20 AZN BONUS qazan!</span>
                    </div>
                </div>
                <div class="footer_menu">
                    <h3>Şirkət</h3>
                    <ul>
                        <li><a href="">Haqqımızda</a></li>
                        <li><NavLink to={`/magazalar`}>Mağazalar
                        </NavLink></li>
                        <li><NavLink to={'/vakansiyalar'}>Vakansiyalar
                        </NavLink></li>
                        <li><NavLink to={'/kampaniya'}>Kampaniyalar
                        </NavLink></li>
                        <li><a href="">Şərtlərimiz
                        </a></li>

                        <li><a href="">Çatdırılma qaydaları
                        </a></li>

                    </ul>
                </div>
                <div class="footer_menu">
                    <h3>Müştəri üçün</h3>
                    <ul>
                        <li><a   href='' onClick={()=>{
                            navigate('/sual-cavab')
                        }}>Sual-Cavab</a></li>
                        <li><a href="" onClick={()=>{
                            navigate('/mexfilik-siyaseti')
                        }}>Hissə-hissə ödəniş

                        </a></li>
                        <li><a href="" onClick={()=>{
                            navigate('/mexfilik-siyaseti')
                        }}>Məxfilik siyasəti

                        </a></li>
                        <li><a href="" onClick={()=>{
                            navigate('/korporativ')
                        }}>Korporativ satışlar

                        </a></li>
                        <li><a href="" onClick={()=>{
                            navigate('/mexfilik-siyaseti')
                        }}>Şərtlərimiz
                        </a></li>

                        <li><a href="" onClick={()=>{
                            navigate('/mexfilik-siyaseti')
                        }}>Çatdırılma qaydaları
                        </a></li>
                        <li><a href="" onClick={()=>{
                            navigate('/mexfilik-siyaseti')
                        }}>İstifadə qaydaları

                        </a></li> <li><a onClick={()=>{
                            navigate('/blog')
                        }}  href="">Bloq

                        </a></li>

                        <li><a href="" onClick={()=>{
                            navigate('/sikayet-ve-teklifler')
                        }}>
                        Şikayət və təkliflər

                        </a></li>
                    </ul>
                </div>
                <div class="footer_menu_contact">
                    <h3>Əlaqə</h3>
                    <div class="contact_info">
                       <i class="fa-solid fa-house"></i>
                       <span>Əhməd Rəcəbli 1/9,
                        Azərbaycan, Bakı şəhəri
                        </span>
                    </div>
                    <div class="contact_social">
                        <p>Bizi izləyin
                        </p>
                        <div class="social_icons">
                            <a href=""><i class="fa-brands fa-facebook"></i></a>
                            <a href=""><i class="fa-brands fa-instagram"></i></a>
                            <a href=""><i class="fa-brands fa-youtube"></i></a>
                            <a href=""><i class="fa-brands fa-whatsapp"></i></a>
                            <a href=""><i class="fa-brands fa-telegram"></i></a>
                            <a href=""><i class="fa-brands fa-x-twitter"></i></a>
                            <a href=""><i class="fa-brands fa-tiktok"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer_copyright">  
                <div class="logo">
                    <img src="images/footer-logo.svg" alt=""/>
                </div>
                <div class="copyright">İrşad © 2000 - 2024. Bütün hüquqlar qorunur.
                </div>
            </div>
        </div>
    </footer>
  )
}
