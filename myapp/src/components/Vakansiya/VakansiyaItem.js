import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Loading'
import '../../css/VakansiyaItem.css'
import Footer from '../Footer';
import axios from 'axios';
export default function VakansiyaItem() {
  const location = useLocation();
  const id = location.pathname.split("/")[2]
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const[feautes,setFeauture]=useState([])
  const navigate=useNavigate();
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = () => {
    setLoading(true)
    axios.get(`http://localhost:5126/api/vakansiya/${id}`).then(res => {
      console.log(res.data)
      setData(res.data)
      setFeauture(res.data.returnVakansiyaUps)
    }).catch(eror => {
      console.log(eror)
    })
    setLoading(false)

  }

  if (loading) {
    return <Loading></Loading>
  }
  return (
   <div>
     <div>
      <div class="container_fluids">
        <div class="container_content">
          <div class="container_content_title">
            <p style={{ marginBottom: '20px' }}>{data.title}
            </p>
            <span>{data.description} </span>
          </div>
          <div class="vakansiya_inner_desc">
            <div class="vakansiay_inner_desc_center">
              
              {
                feautes.map(item=>{
                  return (
                    <div>
                    <p>{item.name}</p>
                    <ul>
                     {
                      item.downs.map((down,i)=>{
                        return (
                          <li style={{fontWeight: down.isStrong ? 'bold' :'300'}} >- {down.value};
                         </li>
                        )
                      })
                     }
                     
                    </ul>
                  </div>
                  )
                })
                  
              }
              



              <button onClick={()=>navigate(`/vakansiyalar/muraciet-et/${id}`)}>Müraciət et</button>
            </div>
          </div>
        </div>
      </div>
      <div class="sendcv-container">
        <div class="cv-content">
          <span>X</span>
          <h3>CV göndər</h3>
          <form id="cvPost" method="post" enctype="multipart/form-data">
            <div id="cvEror" class="text-danger" ></div>
            <div>
              <input type="text" class="nameCV" placeholder="Adınız" />
              <span asp-validation-for="SendCVVM.Name" class="text-danger"></span>
            </div>
            <div>
              <input class="telNum" type="text" placeholder="Sizin telefon nömrəniz" />
              <span asp-validation-for="SendCVVM.PhoneNumber" class="text-danger"></span>

            </div>
            <div>
              <input class="emailCv" type="email" placeholder="E-poçt" />
              <span asp-validation-for="SendCVVM.Email" class="text-danger"></span>

            </div>
            <div >
              <label >Choose file</label>
              <input type="file" id="formFile" />
              <span asp-validation-for="SendCVVM.File" class="text-danger"></span>

            </div>
            <div style={{ marginTop: '10px' }}>
              <textarea name="" id="ismariccv" placeholder="Sualınız" cols="54" rows="4"></textarea>
              <span asp-validation-for="SendCVVM.Message" class="text-danger"></span>

            </div>
            <button type="submit">Göndər</button>
          </form>
          <div class="sendSuccess" >
            <span>CV uğurla göndərildi... Sizinlə qısa müddətda əlaqə saxlanılacaq</span>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
   </div>
  )
}
