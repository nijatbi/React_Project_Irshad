import React, { useEffect, useState } from 'react'
import Loading from '../../Loading';
import axios from 'axios';
import '../../css/Bloq.css'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
export default function Blog() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate=useNavigate();
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = () => {
        setLoading(true)
        axios.get(`http://localhost:5126/api/blog/GetAll`).then(res => {
           var filterData=res.data.filter(x=>x.isDeleted==false)
            setData(filterData)
        }).catch(eror => {
            console.log(eror)
        })
        setLoading(false)
    }


    if (loading) {
        return (<Loading></Loading>)
    }

    return (
        <React.StrictMode>
               <div>
            <section class="campaigns">
                <div class="container-fluid">
                    <h1>Bloq</h1>
                    <div class="campaign_list">
                        {
                            data.map((item, inde) => {
                                return (
                                    <div class="campaign_item">
                                        <a href="" onClick={()=>{
                                            navigate(`/blog/${item.id}`)
                                        }}>
                                            <div class="campaign_image">
                                                <img src={`http://localhost:5126/blog/${item.imageUrl}`} alt="" />
                                            </div>
                                        </a>
                                        <div class="campaign_body">
                                            <a href="">
                                                <div class="campaign_title">
                                                    <span>{item.title}</span>
                                                </div>
                                            </a>

                                        </div>
                                        <div class="campaign_footer">
                                            <a style={{cursor:'pointer'}} onClick={()=>navigate(`/blog/${item.id}`)}>Etrafli<i class="fa-solid fa-chevron-right"></i></a>

                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div class="pagination_Sector">
                    <ul class="pagination">
                        <li class="pagination_item deactive">
                            <a href=""><i class="fa-solid fa-angle-left"></i></a>
                        </li>
                        <li class="pagination_item active" >1</li>
                        <li class="pagination_item">2</li>
                        <li class="pagination_item"><i class="fa-solid fa-angle-right"></i></li>
                    </ul>
                </div>
            </section>
        </div>
        <Footer></Footer>
        </React.StrictMode>
    )
}
