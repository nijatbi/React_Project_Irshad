import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../css/Vakansiya.css'
import { useNavigate } from 'react-router-dom';
export default function VakansiyaList() {
  const[data,setData]=useState([])
  const[loading,setLoading]=useState(true);
  const navigate=useNavigate()
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData=()=>{
    axios.get(`http://localhost:5126/api/vakansiya/getall`).then(res=>{
      console.log(res)
      setData(res.data)
    }).catch(eror=>{
      console.log(eror)
    })
  }
  return (
    <div class="container-fluid">
        <div class="container_content">
            <h1>Vakansiyalar</h1>
            <div class="vakansiya_list">
                {
                  data.map((item,index)=>{
                    return (
                      <div class="vakansiya_item">
                   <div class="vakansiya_item_content">
                    <p>{item.title}</p>
                    <div class="vakansiya_description">
                        {item.description}
                    </div>
                   </div>
                    <a onClick={()=>navigate(`/vakansiyalar/${item.id}`)}>Ətraflı<i class="fa-solid fa-chevron-right"></i></a>
                </div>
                    )
                  })
                }
              
            </div>
        </div>
    </div>
  )
}
