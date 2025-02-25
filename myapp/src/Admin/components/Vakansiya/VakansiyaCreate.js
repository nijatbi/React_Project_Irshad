import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CRow,
    CFormSelect
} from '@coreui/react'
import { NavLink } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function VakansiyaCreate() {
    const[createDto,setCreateDto]=useState({})
    const navigate=useNavigate();
    const[alert,setAlert]=useState({})
    const token=useSelector(state=>state.token);
    const onCreate=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:5126/api/vakansiya/Create`,createDto,{
            headers:{
                "Content-Type":'multipart/form-data',
                Authorization:`Bearer ${token}`
            }
        }).then(res=>{
            navigate('/admin/vakansiya')
        }).catch(eror=>{
            if (typeof eror.response.data == "object") {
                setAlert({
                    Title: eror.response.data.errors.Title,
                    Description:eror.response.data.errors.Description
                })
            }
            else if(typeof eror.response.data == "string"){
                setAlert({data:eror.response.data})
            }

            setTimeout(() => {
                setAlert({
                    Title: '',
                    data: '',
                    Description:''
                })
            }, 2000);
        })
    }
    return (
    <div>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Vakansiya Create</strong>
                </CCardHeader>
                <CCardBody >
                    <NavLink  >
                        <CButton onClick={() => navigate('/admin/vakansiya')} type='button' style={{ backgroundColor: 'gray', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                            Go To Index
                        </CButton>
                    </NavLink>
                    <CForm onSubmit={onCreate}>
                        {
                            alert.data !== undefined && (
                                <span style={{ color: 'red', fontSize: '14px', marginBottom: '0px', display: 'block', marginTop: '10px' }}>{alert.data}</span>
                            )
                        }
                        <div style={{ marginTop: '40px', }} className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1" style={{ marginBottom: '15px' }}>Vakansiya Title</CFormLabel>
                            <div>
                                {
                                    alert.Title !== undefined && (
                                        <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.Title}</span>
                                    )
                                }
                            </div>
                            <CFormInput onChange={(e) => setCreateDto({ ...createDto, Title: e.target.value })}
                                value={createDto.Title}
                                type="text"
                                placeholder="Vakansiya Title"
                            />
                           
                                    
                        </div>
                        <div style={{ marginTop: '40px', }} className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1" style={{ marginBottom: '15px' }}>Vakansiya Description</CFormLabel>
                            <div>
                                {
                                    alert.Description !== undefined && (
                                        <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.Description}</span>
                                    )
                                }
                            </div>
                            <CFormTextarea onChange={(e) => setCreateDto({ ...createDto, Description: e.target.value })}
                                value={createDto.Description}
                                type="text"
                                placeholder="Vakansiya Description"
                            />
                           
                                    
                        </div>

                        <CButton component="input" type="submit" color="primary"  >Create</CButton>
                    </CForm>

                </CCardBody>
            </CCard>
        </div>
  )
}
