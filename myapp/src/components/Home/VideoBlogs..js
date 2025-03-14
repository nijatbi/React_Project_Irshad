import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player/youtube'
import '../../css/videoblog.css'
import ProductListOwl from './ProductListOwl';
import BrandList from './BrandList';
import axios from 'axios';
import VideoBlogItem from './VideoBlogItem';
export default function VideoBlogs() {
    const [data, setData] = useState([])
    const [statusCode, setstatusCode] = useState(1)
    useEffect(() => {
        fetchData(statusCode)
    }, [statusCode])
    const fetchData = (statusCode) => {
        axios.get(`http://localhost:5126/api/videoblog/filter/${statusCode}`).then(res => {
            console.log(res)
            setData(res.data)
        }).catch(eror => {
            console.log(eror)
        })
        console.log(statusCode)
    }

    return (
        <div className="container_fluid" style={{ marginTop: '100px' }}>
            <div className="fluid_content_video">

                <div className='videoblog_up'>
                    <div class="h4">
                        <button onClick={() => setstatusCode(1)} style={{ backgroundColor: 'white', border: 'none', outline: 'none', marginRight: '30px', fontSize: '36px', fontWeight: '500' }}>Məhsul icmalı </button>
                        <button onClick={() => setstatusCode(2)} style={{ backgroundColor: 'white', border: 'none', outline: 'none', marginRight: '30px', fontSize: '36px', fontWeight: '500' }}>İrşad Youtube</button>
                    </div>
                    <div className='link'>
                        <a href=''><i class="fa-brands fa-youtube"></i> Youtube hesabina kec</a>
                    </div>
                </div>
                <div className='videoBlogList'>
                    {
                        data.length > 0 && (
                            data.map((item, index) => {
                                return (
                                  <VideoBlogItem item={item}></VideoBlogItem>
                                )
                            })
                        )
                    }

                </div>
            </div>
        </div>
    )
}