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
import { useNavigate } from 'react-router-dom'

export default function TiendaCreate() {
    const token = useSelector(state => state.token);
    const [createDto, setCreateDto] = useState({
        CityId: 1
    })
    const navigate = useNavigate();
    const [cityData, setCityData] = useState([])
    const [alert, setAlert] = useState({})
    useEffect(() => {
        getCity()
    }, [])

    const getCity = () => {
        axios.get(`http://localhost:5126/api/city/getall`).then(res => {
            console.log(res)
            setCityData(res.data)
        }).catch(eror => {
            console.log(eror)
        })
    }
    const onCreate = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5126/api/tienda/CreateTienda`, createDto, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'multipart/form-data'
            }

        }).then(res => {
            navigate("/admin/magaza")
        }).catch(eror => {
            console.log(eror)
            if (typeof eror.response.data == "object") {
                setAlert({
                    Name: eror.response.data.errors.Name,
                    WorkTime: eror.response.data.errors.WorkTime,
                    Location: eror.response.data.errors.Location,
                    LangitudeandLatitude: eror.response.data.errors.LangitudeandLatitude
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

    
    return (
        <div>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Store Create</strong>
                </CCardHeader>
                <CCardBody >
                    <NavLink  >
                        <CButton onClick={() => navigate('/admin/magaza')} type='button' style={{ backgroundColor: 'gray', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                            Go To Index
                        </CButton>
                    </NavLink>
                    <CForm onSubmit={onCreate}>
                        {
                            alert.data !== undefined && (
                                <span style={{ color: 'red', fontSize: '14px', marginBottom: '0px', display: 'block', marginTop: '10px' }}>{alert.data}</span>
                            )
                        }

                        <div className="mb-3">

                            <CFormLabel htmlFor="exampleFormControlInput1"> Name</CFormLabel>
                            {
                                alert.Name !== undefined && (
                                    <div style={{ color: 'red', margin: '10px 0' }}>{alert.Name}</div>
                                )
                            }
                            <textarea
                                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                                rows="2"
                                type="text"
                                placeholder="Store Name"
                                onChange={(e) => setCreateDto({ ...createDto, Name: e.target.value })}
                                value={createDto.Name}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="">City</label>
                            <Form.Select onChange={(e) => { setCreateDto({ ...createDto, CityId: e.target.value }) }} aria-label="Default select example">
                                {
                                    cityData.map(item => (
                                        <option value={item.id}>{item.name}</option>

                                    ))
                                }
                            </Form.Select>
                        </div>
                        <div className='mb-3' style={{marginLeft:'30px'}}>
                            <label htmlFor="" style={{marginLeft:'-20px',marginTop:'30px'}}>Service</label>
                            <Form.Check // prettier-ignore
                                type="checkbox"
                                id="custom-switch"
                                label="Do you want service?"
                                onChange={(e)=>setCreateDto({...createDto,IsService:e.target.checked})}
                                value={createDto.IsService}
                            />
                        </div>
                        <div className="mb-3">

                            <CFormLabel htmlFor="exampleFormControlInput1">Location</CFormLabel>

                            {
                                alert.Location !== undefined && (
                                    <div style={{ color: 'red', margin: '10px 0' }}>{alert.Location}</div>
                                )
                            }
                            <textarea
                                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                                rows="3"
                                type="text"
                                placeholder="Store Location"
                                onChange={(e) => setCreateDto({ ...createDto, Location: e.target.value })}
                                value={createDto.Location}
                            />
                        </div>
                        <div className="mb-3">

                            <CFormLabel htmlFor="exampleFormControlInput1">Work Time</CFormLabel>

                            {
                                alert.WorkTime !== undefined && (
                                    <div style={{ color: 'red', margin: '10px 0' }}>{alert.WorkTime}</div>
                                )
                            }
                            <textarea
                                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                                rows="3"
                                type="text"
                                placeholder="Store WorkTime"
                                onChange={(e) => setCreateDto({ ...createDto, WorkTime: e.target.value })}
                                value={createDto.WorkTime}
                            />
                        </div><div className="mb-3">

                            <CFormLabel htmlFor="exampleFormControlInput1">Langitude and Latitude</CFormLabel>

                            {
                                alert.LangitudeandLatitude !== undefined && (
                                    <div style={{ color: 'red', margin: '10px 0' }}>{alert.LangitudeandLatitude}</div>
                                )
                            }
                            <textarea
                                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                                rows="3"
                                type="text"
                                placeholder="Store Langitude and Latitude"
                                onChange={(e) => setCreateDto({ ...createDto, LangitudeandLatitude: e.target.value })}
                                value={createDto.LangitudeandLatitude}
                            />
                        </div>


                        <CButton component="input" type="submit" color="primary"  >Create</CButton>
                    </CForm>

                </CCardBody>
            </CCard>
        </div>
    )
}
