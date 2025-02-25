import React, { useEffect, useState } from 'react'
import Loading from '../../Loading'
import '../../css/Sikayet.css'
import axios from 'axios';
import Footer from '../Footer';
export default function Sikayet() {
    const[loading,setLoading]=useState(true);
    const[offerDto,setofferDto]=useState({})
    const[isSuccess,setIsSuccess]=useState(false)
    const[error,setEror]=useState('');
    setTimeout(() => {
        setLoading(false)
    }, 500);

    const onSend = (e) =>{
        e.preventDefault()
        var regexNumber=/(?:0|994)(?:12|51|50|55|70|77)[^\w]{0,2}[2-9][0-9]{2}[^\w]{0,2}[0-9]{2}[^\w]{0,2}[0-9]{2}/;
        if(regexNumber.test(offerDto.Phone)){
            setTimeout(() => {
                axios.post("http://localhost:5126/api/offer",offerDto,{
                    headers:{
                        'Content-Type':"multipart/form-data"
                    }
                }).then(res=>{
                    console.log(res)
                    setofferDto({
                        NameAndSurname:'',
                        Phone:'',
                        Message:''
                    })
                    setIsSuccess(true)
                })
                .catch(eror=>{
                    console.log(eror)
                })
               }, 1000);
        }
        else{
           setEror("Nomreni duzgun daxil edin")
           setTimeout(() => {
            setEror("")
           }, 1500);
        }
   
        
    }

if(loading){
    return <Loading></Loading>
}
  return (
 <React.StrictMode>
       <section className="career">
        
        <div className="container-fluid">
            <h1>Şikayət və təkliflər</h1>
            <form action="" onSubmit={onSend}>
                <div className="checkout__form">
                    <div className="inputForm">
                        <div className="form">
                            <label >Ad soyad</label>
                            <input onChange={(e)=>{setofferDto({...offerDto,NameAndSurname:e.target.value})}} value={offerDto.NameAndSurname} type="text" placeholder="Ad" required />
                        </div>
                        <div className="form">
                            <label htmlFor="">Əlaqə nömrəsi</label>

                            {
                                <div style={{color:'red',fontSize:'14px',margin:"10px 0"}}>{error}</div>
                            }
                            <input onChange={(e)=>{
                                if(!isNaN(e.target.value) || e.target.value==="+"){
                                    setofferDto({...offerDto,Phone:e.target.value})
                                    console.log("reqemdir")
                                }
                                else if(e.target.value.startsWith("")){
                                    setofferDto({...offerDto,Phone:""})

                                }
                                else{
                                    // alert("Nomreni duzgun daxil edin")
                                    setofferDto({...offerDto,Phone:offerDto.Phone+""})
                                }
                            }} value={offerDto.Phone} type="text" placeholder="Əlaqə nömrəsi" required />
                        </div>
                    </div>
                    <div className="inputForm">
                       <div className="form">
                        <label htmlFor="">Şikayətiniz / Təklifiniz</label>
                        <textarea onChange={(e)=>setofferDto({...offerDto,Message:e.target.value})} value={offerDto.Message} name="" id="" cols="30" rows="10" required></textarea> 
                       </div>
                    </div>
                    <div className="checkout__form__button">
                        <button type="submit">Göndər</button>
                    </div>
                </div>
            </form>
           
        </div>
        <div className={`modal_content ${isSuccess ? 'isActive' :''}`} >
            <div className="model_text">
                <p><i class="fa-solid fa-check"></i> Şikayətiniz uğurla göndərildi</p>

                <button type='button' onClick={()=>setIsSuccess(false)}>X</button>
            </div>
        </div>
    </section>
    <Footer></Footer>
 </React.StrictMode>
  )
}
