import React, { useState } from 'react'
import '../../css/Login.css'
import logo from '../../images/white-logo.svg'
import backPhoto from'../../images/kabinet-cover.jpg'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setToken,getToken } from '../../store/action'
import { redirect, useLocation, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
export default function Login() {
    const[loginDto,seteLogindto]=useState({})
    const[alert,setAlert]=useState('')
    const dispatch=useDispatch();
    const location=useLocation()
    const navigate=useNavigate();

    const returnUrl = new URLSearchParams(location.search).get('redirectUrl');
    const token=useSelector(store=>{
        return store.token;
    })
  
    const LoginForm=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:5126/api/account/login",loginDto,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then(res=>{
            dispatch(setToken(res.data.token))
            navigate("/kampaniya")
            localStorage.setItem("token",res.data.token)
        })
        .catch(eror=>{
            if (typeof eror.response.data == "object") {
                setAlert({
                    Email: eror.response.data.errors.Email,
                    Password: eror.response.data.errors.Password
                })
            }
            else if(typeof eror.response.data == "string"){
                setAlert({data:eror.response.data})
            }
            setTimeout(() => {
                setAlert({
                    Email:'',
                    Password:'',
                    data:''
                })
            }, 2000);
        })
    }
  return (
    <div className="login-container">
    <div className="login-content">
        <div className="login_img" style={{backgroundImage:`url(${backPhoto})`}}>
            <a href=""><img src={logo} alt=""/></a>
        </div>
        <div className="login_base">
            <div className="login_form">
                <h1>Giriş</h1>
                <form action="" onSubmit={LoginForm}>
                    <div style={{fontSize:'14px',color:'red',margin:'15px 0px'}}>{alert.data}</div>
                    <div className="input_form_login">
                        {
                            alert.Email!==undefined &&(
                                <div style={{color:'red',margin:'10px 0',fontSize:'14px'}}>{alert.Email}</div>
                            )
                        }
                        <label for="">E-mail</label>
                        <input onChange={(e)=>seteLogindto({...loginDto,Email:e.target.value})} value={loginDto.Email} type="email"  placeholder="Email addres"/>
                    </div>
                    <div style={{marginTop:'20px'}} className="input_form_login">
                    {
                            alert.Password!==undefined &&(
                                <div style={{color:'red',margin:'10px 0',fontSize:'14px'}}>{alert.Password}</div>
                            )
                        }
                        <label for="">Şifrə</label>
                        <input onChange={(e)=>seteLogindto({...loginDto,Password:e.target.value})} value={loginDto.value}  type="password" placeholder="Şifrə"/>
                    </div>
                    <div className="button_form">
                        <button type="submit">Daxil ol</button>
                    </div>
                </form>
            </div>
            
        </div>
    </div>
</div>
  )
}
