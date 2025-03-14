import React, { useState, useEffect, act } from 'react'
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player/youtube'
import '../../css/videoblog.css'
import axios from 'axios';
export default function VideoBlogItem({item}) {
    const[active,setActive]=useState(false)
    return(
        <div className='video_blog_item'>
        <div className='blog_up'>
            <ReactPlayer width='450px' height='250px' url={item.yoUtubeUrl} />
            <div className='video_button'>
                <i class="fa-solid fa-play"></i>
                <span onClick={()=>setActive(true)}> Videonu izle</span>
            </div>

        </div>
        <div className='blog_down'>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
        </div>
        {
            active && (
                <div className='modal_video'>
                <div className='model_content'>
                    <div>
                        <h2>{item.title}</h2>
                        <button onClick={()=>setActive(false)}>X</button>
                    </div>
                    <ReactPlayer style={{ marginTop: '20px' }} width='890px' height='400px' url={item.yoUtubeUrl} />
    
                </div>
            </div>
            )
        }
    </div>
    )
}