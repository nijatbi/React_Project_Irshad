import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Loading from '../../Loading'
import '../../css/BlogItem.css'
import Footer from '../Footer';

import axios from 'axios';
export default function BlogItem() {
  const location=useLocation();
  const id = location.pathname.split("/")[2]
  const[data,setData]=useState({})
  const[loading,setLoading]=useState(true)
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData=()=>{
    setLoading(true)
    axios.get(`http://localhost:5126/api/blog/${id}`).then(res=>{
      console.log(res)
      setData(res.data)
    })
    setLoading(false)
  }


  if(loading){
    return <Loading></Loading>
  }
  return (
    <React.StrictMode>
       <div class="blog_inner">
    <div class="blog_detail">
        <div class="title">
            <h1>{data.title}</h1>
        </div>
        <div class="blog_image">
        </div>
        <div class="blog_inner_description">
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>
    
        
    </div>
</div>
<Footer></Footer>
    </React.StrictMode>
  )
}
