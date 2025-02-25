import React, { useEffect, useState }  from 'react'
import '../../css/kampaniyaList.css'
import backPhoto from'../../images/kabinet-cover.jpg'
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import Loading from '../../Loading';

export default function KampaniyaList() {
    const[loading,setLoading]=useState(true)
    const[data,setData]=useState([])
    setTimeout(() => {
        setLoading(false)
    }, [500]);
    useEffect(()=>{
        fetchData()
    },[])



    const fetchData=()=>{
        axios.get('http://localhost:5126/api/kampaniya/getall').then(res=>{
            setData(res.data)
        })
        .catch(eror=>{
            console.log(eror)
        })
    }
    if(loading){
        return <Loading></Loading>
    }
  return (
    <section class="campaigns_inner">
        <div class="campaign_title">
            <h1>Kampaniyalar
            </h1>
        </div>
        <div class="campaigns_container">
           
           
           {data.map(item=>{
            return (
                <div class="campaign_item">
                <div class="campaign_up">
                <NavLink to={`/kampaniya/${item.id}`} ><img src={`http://localhost:5126/img/${item.imageUrl}`} alt="" /></NavLink>

                </div>
                <div class="campaign_body">
                    <div class="date">
                        <p> 30 Aprel - 31 May</p>
                    </div>
                    <div class="campaign_description">
                        <a>{item.title}</a>
                    </div>
                   
                </div>
                <div class="campaign_footer">
                    <div class="campaign_data">
                        <span>16</span> Gün 
                        <span> 08:</span><span>42:</span><span>15</span>

                    </div>
                    <div class="campaign_button">
                        <NavLink to={`/kampaniya/${item.id}`} >Ətraflı<i class="fa-solid fa-chevron-right"></i></NavLink>
                    </div>
                </div>
            </div>
            )
           })}
           
        </div>
    </section>

  )
}
