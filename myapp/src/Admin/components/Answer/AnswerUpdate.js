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
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../../Loading'
import { set } from 'date-fns';
export default function AnswerUpdate() {
    const token = useSelector(state => state.token);
    const location = useLocation();
    const id = location.pathname.split("/")[4]
    const [loading, setLoading] = useState(true)
    const [headers, setHeaders] = useState([])
    const [alert, setAlert] = useState({})
    const navigate = useNavigate();
    const [data, setData] = useState({})
    const [updatedDto, setUpdateDto] = useState({
        id:id
    })
    useEffect(() => {
        getHeaders();
        fetchData()
       
    }, [])
    useEffect(() => {
        if (headers.length > 0) {
            fetchData();
        }
    }, [headers]);
    const getHeaders = () => {
        axios.get(`http://localhost:5126/api/answer/getheader`).then(res => {
            setHeaders(res.data)
        }).catch(eror => {
            console.log(eror)
        })
    }

    const fetchData = () => {
        setLoading(true)
        axios.get(`http://localhost:5126/api/answer/GetBydId/${id}`).then(res => {
            console.log(res.data)
            setUpdateDto(res.data)
            const selectedHeader = headers.find(item => item.name === res.data.headerName);
            if (selectedHeader) {
                setUpdateDto(prev => ({ ...prev, headerName: selectedHeader.name, answerHeaderId: selectedHeader.id }));
            }
        }).catch(eror => {
            console.log(eror)
        })
        setLoading(false)

    }
    const onUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5126/api/answer/update`,updatedDto,{
            headers:{
                "Content-Type":'multipart/form-data',
                Authorization:`Bearer ${token}`
            }
        }).then(res=>{
            navigate('/admin/answer')
        }).catch(eror=>{
            if (typeof eror.response.data == "object") {
                setAlert({
                  Title: eror.response.data.errors.title,
                  Description: eror.response.data.errors.description,
                  AnswerHeaderId: eror.response.data.errors.answerHeaderId,
                })
              }
              else if (typeof eror.response.data == "string") {
                setAlert({ data: eror.response.data })
              }
              setTimeout(() => {
                setAlert({})
              }, 2000);
            })
    }
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Answer Update</strong>
                </CCardHeader>
                <CCardBody >
                    <NavLink  >
                        <CButton onClick={() => navigate('/admin/answer')} type='button' style={{ backgroundColor: 'gray', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                            Go To Index
                        </CButton>
                    </NavLink>
                    <CForm onSubmit={onUpdate}>
                        {
                            alert.data !== undefined && (
                                <span style={{ color: 'red', fontSize: '14px', marginBottom: '0px', display: 'block', marginTop: '10px' }}>{alert.data}</span>
                            )
                        }

                        <div className="mb-3">

                            <CFormLabel htmlFor="exampleFormControlInput1"> Title</CFormLabel>
                            {
                                alert.Title !== undefined && (
                                    <div style={{ color: 'red', margin: '10px 0' }}>{alert.Title}</div>
                                )
                            }
                            <textarea
                                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                                rows="2"
                                type="text"
                                placeholder="Answer Title"
                                onChange={(e) => setUpdateDto({ ...updatedDto, title: e.target.value })}
                                value={updatedDto.title}
                            />
                        </div>
                        <div className='mb-3'>
                            {
                                alert.AnswerHeaderId !== undefined && (
                                    <div style={{ color: 'red', margin: '10px 0' }}>Kateqoriyani seçin</div>
                                )
                            }
                            <label htmlFor="">Katogoriyani seçin</label>
                            <Form.Select value={updatedDto.answerHeaderId}  onChange={(e) => {
                               setUpdateDto({...updatedDto,answerHeaderId:e.target.value})
                            }} aria-label="Default select example">
                                {
                                    headers.map((item, index) => {
                                        return (
                                            <option value={item.id} >{item.name}</option>

                                        )
                                    })
                                }

                            </Form.Select>
                        </div>

                        <div className="mb-3">

                            <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>

                            {
                                alert.Description !== undefined && (
                                    <div style={{ color: 'red', margin: '10px 0' }}>{alert.Description}</div>
                                )
                            }
                            <textarea
                                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                                rows="3"
                                type="text"
                                onChange={(e) => setUpdateDto({ ...updatedDto, description: e.target.value })}
                                value={updatedDto.description}
                                placeholder="Answer Description"
                            />
                        </div>


                        <CButton component="input" type="submit" color="primary"  >Create</CButton>
                    </CForm>

                </CCardBody>
            </CCard>
        </div>
    )
}
