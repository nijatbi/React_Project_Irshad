import React, { useState, useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../../css/index.css'
import axios from 'axios';
import ProductOwlItem from './ProdutcOwlItem';
export default function ProductListOwl() {
    const [data, setData] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [NotSuccess, setNotSuccess] = useState('')
    const [statusCode, setstatusCode] = useState(1)
    const INACTIVITY_LIMIT = 20 * 60 * 1000;
    useEffect(() => {
        fetchData(statusCode)
    }, [statusCode])
    const fetchData = (statusCode) => {
        axios.get(`http://localhost:5126/api/Product/getPopular/${statusCode}`).then(res => {
            setData(res.data)
        }).catch(eror => {
            console.log(eror)
        })
    }
    const handleCommentSuccess = (message) => {
        setSuccessMessage(message);

        // Mesajı 3 saniyədən sonra gizlətmək üçün timeout əlavə edirik
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };

    const handleNotificationSuccess = (message) => {
        setNotSuccess(message);

        // Mesajı 3 saniyədən sonra gizlətmək üçün timeout əlavə edirik
        setTimeout(() => {
            setNotSuccess("");
        }, 3000);
    };

    useEffect(() => {
        // Son aktivlik vaxtını yenilə
        const updateLastActivity = () => {
            localStorage.setItem("lastActivity", Date.now());
        };

        // Səbəti backenddə silən funksiya
        const deleteCart = () => {
            axios.delete("http://localhost:5126/api/cart/DeleteCart")
                .then(response => {
                    console.log("Səbət backenddə silindi:", response.data);
                })
                .catch(error => {
                    console.log("Səbəti silmək alınmadı:", error);
                });
        };

        const checkInactivity = () => {
            const lastActivity = localStorage.getItem("lastActivity");
            if (lastActivity && Date.now() - lastActivity > INACTIVITY_LIMIT) {
                deleteCart();
            }
        };

        window.addEventListener("mousemove", updateLastActivity);
        window.addEventListener("keydown", updateLastActivity);
        window.addEventListener("click", updateLastActivity);

        updateLastActivity();

        const interval = setInterval(checkInactivity, 60 * 1000);

        return () => {
            window.removeEventListener("mousemove", updateLastActivity);
            window.removeEventListener("keydown", updateLastActivity);
            window.removeEventListener("click", updateLastActivity);
            clearInterval(interval);
        };
    }, []);

    return (
        <section class="ProductList">
            {successMessage && (
                <div style={{ fontSize: "25px", position: 'absolute', width: '25%', backgroundColor: 'white', borderRadius: '30px', left: '40%', top: '40%', zIndex: 99999, padding: '15px 20px', border: '1px solid #dbdbdb' }}>{successMessage}</div>

            )}

            {NotSuccess && (
                <div style={{ fontSize: "25px", position: 'absolute', width: '25%', backgroundColor: 'white', borderRadius: '30px', left: '40%', top: '40%', zIndex: 99999, padding: '15px 20px', border: '1px solid #dbdbdb' }}>{NotSuccess}</div>

            )}
            <div class="h4">
                <button onClick={() => {
                    setstatusCode(1)

                }} style={{ backgroundColor: 'white', border: 'none', outline: 'none', marginRight: '30px' }}>Populyar məhsullar</button>
                <button onClick={() => {
                    setstatusCode(2)
                }} style={{ backgroundColor: 'white', border: 'none', outline: 'none', marginRight: '30px' }}>Yeni məhsullar</button>
            </div>
            <div style={{ width: '75%', margin: '20px auto', border: '1px solid #dbdbdb', borderRadius: '10px' }}>
                {data.length > 0 && (
                    <OwlCarousel className='owl-theme' loop margin={10} nav items={4}>
                        {data.map((item, index) => (
                            <ProductOwlItem onCommentSubmit={handleCommentSuccess} onNotificationSubmit={handleNotificationSuccess} key={index} item={item} />
                        ))}
                    </OwlCarousel>
                )}
            </div>
        </section>
    )
}