import React, { useState } from 'react'
import '../cssAdmin/style.css'
import logo from '../../images/logo.svg'
import { useDispatch,useSelector } from 'react-redux'
import { setToken } from '../../store/action'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
export default function Login() {
    const dispatch=useDispatch();
    const token=useSelector(store=>{
        return store.token;
    })
    const navigate=useNavigate();
    const decodeToken=token?jwtDecode(token) :null;
    const[alert,setAlert]=useState('')
    const[loginDto,seteLogindto]=useState({})

    const LoginForm=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:5126/api/account/login",loginDto,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then(res=>{
            dispatch(setToken(res.data.token))
            localStorage.setItem('token',res.data.token)
            if(decodeToken.Role==="Admin" ||decodeToken.Role==="SuperAdmin"){
                navigate('/Admin/') ///Bu hisseni duzelt 
            }
            else{
                setAlert("Bu hesab admin deyildir")
                dispatch(setToken(null))
                localStorage.removeItem("token")
                setTimeout(() => {
                    setAlert('')
                }, 2000);
               
            }
        })
        .catch(eror=>{
            setAlert(eror.response.data)
            setTimeout(() => {
                setAlert('')
            }, 2000);
        })
    }
  return (
    <div className="container-scroller">
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="content-wrapper d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={logo} alt="logo" />
              </div>
              <h4 style={{fontWeight:'bold'}}>Hello! let's get started</h4>
              <h6 className="font-weight-light" style={{margin:'10px 0 20px 0'}}>Sign in to continue.</h6>
              <form className="pt-3" onSubmit={LoginForm}> 
                <div style={{color:'red',fontSize:'14px'}}>{alert}</div>
                <div className="form-group">
                  <input required onChange={(e)=>seteLogindto({...loginDto,Email:e.target.value})} value={loginDto.Email} type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" />
                </div>
                <div className="form-group">
                  <input required type="password" className="form-control form-control-lg" onChange={(e)=>seteLogindto({...loginDto,Password:e.target.value})} value={loginDto.Password} id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="mt-3">
                  <button type='submit' className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="../../index.html">SIGN IN</button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      Keep me signed in
                    </label>
                  </div>
                  <a href="#" className="auth-link text-black">Forgot password?</a>
                </div>
                <div className="mb-2">
                  <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                    <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                  </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account? <a href="register.html" className="text-primary">Create</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
