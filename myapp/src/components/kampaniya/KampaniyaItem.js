import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../../css/KampaniyaItem.css'
import image from '../../images/ulduz171-black.svg'
import Loading from '../../Loading';
export default function KampaniyaItem() {
    const location = useLocation();
    const id = location.pathname.split("/")[2]
    const[loading,setLoading]=useState(true)
    const [data, setData] = useState({})
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    setTimeout(() => {
        setLoading(false)
    }, [500]);
    useEffect(() => {
        fetchData()
        const interval = setInterval(() => getTime(data.endTime), 1000);
        return () => clearInterval(interval);
    }, [])
    const fetchData = () => {
        axios.get(`http://localhost:5126/api/kampaniya/${id}`).then(res => {
            setData(res.data)
            console.log(res.data)
        })
            .catch(eror => {
                console.log(eror)
            })
    }
    const monthIndexStart=new Date(data.startTime).getMonth();
    const monthIndexEndTime=new Date(data.endTime).getMonth();
    console.log(monthIndexEndTime)
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let monthNameStart = monthNames[monthIndexStart];
        let monthNameEnd = monthNames[monthIndexEndTime];

         const getTime=(deadLine)=>{
                var time=Date.parse(deadLine)
                const result=time-Date.now();
                setDays(Math.floor(result / (1000 * 60 * 60 * 24)));
                setHours(Math.floor((result / (1000 * 60 * 60)) % 24));
                setMinutes(Math.floor((result / 1000 / 60) % 60));
                setSeconds(Math.floor((result / 1000) % 60));
         }
        
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div class="container_inner">
            <div class="container-fluid">
                <div class="campaign_left">
                    <img src={`http://localhost:5126/img/${data.imageUrl}`} alt="" />
                </div>
                <div class="campaign_right">
                    <div class="campaigns-inner__date">
                        <span>{days} Gün {hours} : {minutes} : {seconds} </span>
                    </div>
                    <div class="campaig_body">
                        <div class="date">
                          {new Date(data.startTime).getDate()} {monthNameStart}  -  {new Date(data.startTime).getDate()} {monthNameEnd}
                        </div>
                        <div class="campaigns-inner__title">
                            {data.title}
                        </div>
                        <div class="campaigns-inner__desc">
                            {data.description}
                        </div>
                        <div class="social_info">
                            <div class="campaigns-inner__info__text">
                                <span>Onlayn sifariş üçün:</span>
                                <a href=""><img src={image} alt="" /></a>
                            </div>
                            <div class="campaigns-inner__info__text">
                                <span>WhatsApp:</span>
                                <a href="tel:077 777 01 71"><i class="fa-brands fa-whatsapp"></i>077 777 01 71</a>
                            </div>
                            <div class="campaigns-inner__info__text">
                                <span>Telegram:</span>
                                <a href=""><i class="fa-brands fa-telegram"></i>irshad</a>
                            </div>
                            <div class="campaigns-inner__info__text">
                                <span>Instagram:</span>
                                <a href=""><i class="fa-brands fa-instagram"></i>irshad</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
