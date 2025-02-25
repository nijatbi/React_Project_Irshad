import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../css/mexfilik.css'
import Footer from '../Footer'
export default function Policy() {
  const[data,setData]=useState([])


  useEffect(()=>{
    fetchData();
  },[])
  const fetchData=()=>{
    axios.get("http://localhost:5126/api/policy/getall").then(res=>{
        setData(res.data)
    }).catch(eror=>{
        console.log(eror)
    })
  }
    return (
      <React.StrictMode>
        
          <div className="container_fluid">
        <div className="content">
            <div className="content_up">
                <div className="title_content">
                    <h1>Məxfilik siyasəti</h1>
                </div>
              {data.map(item=>{
                return(
                    <div className="sector_content">
                    <h3>{item.key}
                    </h3>
                    <p>{item.value}</p>
                </div>
                )
              })}
               
            </div>
        </div>
    </div>
    <Footer></Footer>
      </React.StrictMode>
  )
}
