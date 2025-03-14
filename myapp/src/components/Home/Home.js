import React, { useState, useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductListOwl from './ProductListOwl';
import BrandList from './BrandList';
import Footer from '../Footer';
import VideoBlogs from './VideoBlogs.';
export default function Home() {
    return (
        <div>
            <div class="container_fluid">
                <div class="fluid_content">
                    <div class="services_item">
                        <div class="services__item__info">
                            <i class="fa-solid fa-house"></i>
                            <p>40-dan çox mağaza</p>
                        </div>

                    </div>
                    <div class="services_item">
                        <div class="services__item__info">
                            <i class="fa-solid fa-mobile-screen"></i>
                            <p>30 minden cox secim</p>
                        </div>

                    </div>
                    <div class="services_item">
                        <div class="services__item__info">
                            <i class="fa-solid fa-van-shuttle"></i>
                            <p>Sürətli çatdırılma</p>
                        </div>

                    </div>
                    <div class="services_item">
                        <div class="services__item__info">
                            <i class="fa-regular fa-circle-check"></i>
                            <p>Rəsmi zəmanət</p>
                        </div>

                    </div>
                    <div class="services_item">
                        <div class="services__item__info">
                            <i class="fa-solid fa-gift"></i>
                            <p>Bonus proqramı</p>
                        </div>

                    </div>
                    <div class="services_item">
                        <div class="services__item__info" style={{border: 'none'}}>
                            <i class="fa-solid fa-basket-shopping"></i>
                            <p>Sürətli alış-veriş</p>
                        </div>

                    </div>
                </div>
            </div>
            <ProductListOwl></ProductListOwl>
            <BrandList></BrandList>
            <VideoBlogs></VideoBlogs>
            <Footer></Footer>
        </div>
    )
}