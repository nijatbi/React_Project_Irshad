import React, { useState } from 'react'
import logo from '../../images/white-logo.svg'
import backPhoto from'../../images/kabinet-cover.jpg'
import '../../css/Register.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
export default function Register() {
    const[registerDto,setregisterDto]=useState({})
    const[eror,setEror]=useState({})
    const[formEror,setFormEror]=useState({})
    const[display,setDisplay]=useState(false)
    const RegisterForm = (e)=>{
        e.preventDefault();
       
        setTimeout(() => {
            axios.post("http://localhost:5126/api/account/register",registerDto,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            .then(res=>{
                console.log(res)
                setregisterDto({
                    FullName:'',
                    Email:'',
                    Phone:'',
                    FINCode:'',
                    CustomerCode:'',
                    Password:'',
                    RepeatPass:'',
                })
                setDisplay(true)

            })
            .catch(error=>{
                if(typeof error.response.data=="object"){
                    setEror({
                      
                        RepeatPassword:error.response.data.errors.RepeatPassword,
                        FINCode:error.response.data.errors.FINCode,
                        Phone:error.response.data.errors.Phone
                    })
                    console.log("object")

                  }
                  else if(typeof error.response.data=="string"){
                    setEror({
                      data:error.response.data
                    })
                    console.log("string")
                  }
                  setTimeout(() => {
                    setEror({
                        RepeatPassword:'',
                        data:''
                    })
                  }, 1500);
                  console.log(error)
            })
           }, 1000);
    }

  return (
    <div className="register_container">
    <div className="register_content">
        <div className="register_img" style={{backgroundImage:`url(${backPhoto})`}}>
            <a href=""><img src={logo} alt=""/></a>
        </div>
        <div className="register_fluid">
            {display==false && (
                  <div className="register_form">
                  <h1>Qeydiyyat</h1>
  
                 
                  <form action="" onSubmit={RegisterForm}>
                  <div style={{color:'red',fontSize:'13px',margin:'15px'}}>
                      {eror.data!==undefined && (
                          <p>{eror.data}</p>
                      )}
                       {eror.RepeatPassword!==undefined && (
                          <p>{eror.RepeatPassword}</p>
                      )}
                       {eror.Phone!==undefined && (
                          <p>{eror.Phone}</p>
                      )}
                       {eror.FINCode!==undefined && (
                          <p>{eror.FINCode}</p>
                      )}
                  </div>
                      <div className="input_form_group">
                          <label for="">Ad soyad</label>
                          <input type="text" onChange={(e)=>setregisterDto({...registerDto,FullName:e.target.value})} required value={registerDto.FullName} placeholder="Ad soyad"/>
                      </div>
                      <div className="input_form">
                          <div className="input_form_group" style={{marginRight:'15px'}}>
                              <label for="">Fərdi identifikasiya nömrəsi (FİN)</label>
                              <input onChange={(e)=>setregisterDto({...registerDto,FINCode:e.target.value})} required value={registerDto.FINCode} type="text" />
                          </div>
                          <div className="input_form_group">
                              <label for="">Müştəri kodu</label>
                              <input onChange={(e)=>setregisterDto({...registerDto,CustomerCode:e.target.value})} required value={registerDto.CustomerCode} type="text" />
                          </div>
                      </div>
                      <div className="input_form_group">
                          <label for="">Email</label>
                          <input onChange={(e)=>setregisterDto({...registerDto,Email:e.target.value})} required value={registerDto.Email} type="email" />
                      </div>
                      <div className="input_form_group">
                          <label for="">Telefon</label>
                          <input onChange={(e)=>setregisterDto({...registerDto,Phone:e.target.value})} required  value={registerDto.Phone} type="text" />
                      </div>
                      <div className="input_form_group">
                          <label for="">Şifrə</label>
                          <div className="pass">
                              <input onChange={(e)=>setregisterDto({...registerDto,Password:e.target.value})} required value={registerDto.Password} type="password" style={{position:'relative'}} />
                              <i className="fa-sharp fa-solid fa-eye-slash"></i>
                          </div>
  
                      </div>
                      <div className="input_form_group">
                          <label for="">Şifrəni təkrarla</label>
                          <div className="pass">
                              <input onChange={(e)=>setregisterDto({...registerDto,RepeatPass:e.target.value})} required value={registerDto.RepeatPass} type="password" />
                              <i className="fa-sharp fa-solid fa-eye-slash"></i>
                          </div>
                      </div>
                      <div className="input_form_button">
                          <button type="submit">Qeydiyyatdan keç</button>
                      </div>
                  </form>
                  <div className="register_footer">
                      <NavLink to={'/login'} className="loginUser" href="login.html"><i className="fa-regular fa-user"></i>Daxil ol</NavLink>
                      <NavLink to={'/forgetPassword'} className="forgetPas" href=""><i className="fa-solid fa-key"></i> Şifrəni unutmusan? </NavLink>
                  </div>    
              </div>
            )}

           {
            display && (
                <div style={{padding:'150px 300px'}} className="confirm">
                <a style={{fontSize:'17px',color:'black'}} href="" onClick={()=>setDisplay(false)}>Geri qayit</a>
                <h3 style={{fontSize:'28px',fontWeight:'bold',marginTop:'15px'}}>Email ünvanını təsdiqlə</h3>
                <p style={{fontSize:'17px',color:'grey',marginTop:'20px'}}>Davam etmək üçün e-mail ünvanınızı təsdiqləyin</p>
            </div>
            )
           }
            
        </div>
    </div>
</div>
  )
}
