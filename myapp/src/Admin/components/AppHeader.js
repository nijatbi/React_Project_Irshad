import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { jwtDecode } from 'jwt-decode';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useFetcher, useNavigate } from 'react-router-dom';
export default function AppHeader() {
  const token = useSelector(state => state.token);
  const[user,setUser]=useState({})
  const decodedToken = jwtDecode(token);
  const userId=decodedToken.Id
  const navigate = useNavigate()
  const Logout = () => {
    if (token == null) {
      alert("token null")
    }
    localStorage.removeItem("token");
    navigate("/")

  }
useEffect(()=>{
  fetchUser();
},[])
const fetchUser=()=>{
  axios.get(`http://localhost:5126/api/account/getbyid/${userId}`).then(res=>{
    setUser(res.data)
  })
  .catch(eror=>{
    console.log(eror)
  })
}
  return (
    <div>
      <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="navbar-brand-wrapper d-flex justify-content-center">
          <div class="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
            <a class="navbar-brand brand-logo" href="index.html"><img src="images/logo.svg" alt="logo" /></a>
            <a class="navbar-brand brand-logo-mini" href="index.html"><img src="images/logo-mini.svg" alt="logo" /></a>
            <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
              <span class="mdi mdi-sort-variant"></span>
            </button>
          </div>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <ul class="navbar-nav mr-lg-4 w-100">
            <li class="nav-item nav-search d-none d-lg-block w-100">

            </li>
          </ul>
          <ul class="navbar-nav navbar-nav-right">
            <li class="nav-item dropdown mr-1">
              <a class="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-toggle="dropdown">
                <i class="mdi mdi-message-text mx-0"></i>
                <span class="count"></span>
              </a>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="messageDropdown">
                <p class="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
                <a class="dropdown-item">
                  <div class="item-thumbnail">
                    <img src="images/faces/face4.jpg" alt="image" class="profile-pic" />
                  </div>
                  <div class="item-content flex-grow">
                    <h6 class="ellipsis font-weight-normal">David Grey
                    </h6>
                    <p class="font-weight-light small-text text-muted mb-0">
                      The meeting is cancelled
                    </p>
                  </div>
                </a>
                <a class="dropdown-item">
                  <div class="item-thumbnail">
                    <img src="images/faces/face2.jpg" alt="image" class="profile-pic" />
                  </div>
                  <div class="item-content flex-grow">
                    <h6 class="ellipsis font-weight-normal">Tim Cook
                    </h6>
                    <p class="font-weight-light small-text text-muted mb-0">
                      New product launch
                    </p>
                  </div>
                </a>
                <a class="dropdown-item">
                  <div class="item-thumbnail">
                    <img src="images/faces/face3.jpg" alt="image" class="profile-pic" />
                  </div>
                  <div class="item-content flex-grow">
                    <h6 class="ellipsis font-weight-normal"> Johnson
                    </h6>
                    <p class="font-weight-light small-text text-muted mb-0">
                      Upcoming board meeting
                    </p>
                  </div>
                </a>
              </div>
            </li>
            <li class="nav-item dropdown mr-4">

              <div class="dropdown">
                <button style={{ backgroundColor: 'white', color: 'black' }} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Notification
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </li>
            <li class="nav-item nav-profile dropdown">
              <Dropdown>
                <Dropdown.Toggle variant='Secondary' id="dropdown-basic">
                  {/* <img src="images/faces/face5.jpg" alt="profile" /> */}
                  <span class="nav-profile-name">{user.fullName}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ marginTop: '40px' }}>
                  <Dropdown.Item href="#/action-1">
                    <a class="dropdown-item">
                      <i class="mdi mdi-settings text-primary"></i>
                      Settings
                    </a></Dropdown.Item>

                  <Dropdown.Item href="#/action-2">
                    <a onClick={()=>Logout()} class="dropdown-item">
                      <i class="mdi mdi-logout text-primary"></i>
                      Logout
                    </a></Dropdown.Item>
                 
                </Dropdown.Menu>
              </Dropdown>
            </li>

          </ul>
          <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span class="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    </div>
  )
}
