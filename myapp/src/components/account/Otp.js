import React, { useEffect } from 'react'
import '../../css/Login.css'
import logo from '../../images/white-logo.svg'
import backPhoto from'../../images/kabinet-cover.jpg'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

import { useLocation } from 'react-router-dom'
export default function Otp() {
    const location=useLocation()
    console.log(location)
    const email=location.pathname.split("/")[2].replace("%40","@")
    console.log(email)
    const token=location.pathname.split("/")[3]
    console.log(token)
    const data={
        email:email,
        token:token
    }
    console.log(data)

    useEffect(()=>{
        VerifyEmail()
    },[])
    const VerifyEmail=()=>{
        axios.post(`http://localhost:5126/api/account/Verify/${email}/${token}`).then(res=>{
            console.log(res)
        })
        .catch(eror=>{
            console.log(eror)
        })
    }
    

  return (
//     <div classNameName="login-container">
//     <div classNameName="login-content">
//         <div classNameName="login_img" style={{backgroundImage:`url(${backPhoto})`}}>
//             <a href=""><img src={logo} alt=""/></a>
//         </div>
//         <div classNameName="login_base">
           
//             <div classNameName="otp_form">
//                 <h1>Giriş</h1>
//                 <form action="">
//                     <div classNameName="input_form_login">
//                         <label for="">OTP kod</label>
//                         <input type="number" />
//                     </div>
//                     <div classNameName="button_form">
//                         <button type="submit">Daxil ol</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
// </div>
   <div>
     <div style={{display:'flex',alignItems:'center',justifyContent:'center',paddingTop:'100px'}}>
        <NavLink to={'/login'} style={{color:'black',fontSize:"25px"}}  href="">Geri qayit</NavLink>
        </div>
     <div style={{display:'flex',alignItems:'center',justifyContent:'center',paddingTop:'100px'}}>
       <i className="fa-regular fa-circle-check" style={{color:'green',fontSize:'45px',marginRight:'10px'}}></i> <span style={{fontSize:'26px',fontWeight:'bold'}}>Təbriklər... Hesabınız təsdiqləndi</span>
    </div>
   
   </div>
  )
}
