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
export default function BrandCreate() {
    const token = useSelector(state => state.token);
    const [createDto, setCreateDto] = useState({})
    const [alert, setAlert] = useState({})
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
    }, [])

    const onCreate = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5126/api/brand`, createDto, {
            headers: {
                "Content-Type": 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(res => {
                console.log(res)
                navigate('/Admin/Brand')
            })
            .catch(eror => {
                console.log(eror)
                if (typeof eror.response.data == "object") {
                    setAlert({
                        Image: eror.response.data.errors.formFile,
                        Name: eror.response.data.errors.Name
                    })
                }
                else if(typeof eror.response.data == "string"){
                    setAlert({data:eror.response.data})
                }

                setTimeout(() => {
                    setAlert({
                        Name: '',
                        Image: '',
                        data: ''
                    })
                }, 2000);
            })
    }
    return (
        <div>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Brand Create</strong>
                </CCardHeader>
                <CCardBody >
                    <NavLink  >
                        <CButton onClick={()=>navigate('/admin/brand')} type='button' style={{ backgroundColor: 'gray', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                            Go To Index
                        </CButton>
                    </NavLink>
                    <CForm onSubmit={onCreate}>
                    {
                                    alert.data !== undefined && (
                                        <span style={{ color: 'red', fontSize: '14px',marginBottom:'0px',display:'block',marginTop:'10px' }}>{alert.data}</span>
                                    )
                                }
                        <div style={{ marginTop: '40px' }} className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1" style={{ marginBottom: '15px' }}>Brand Name</CFormLabel>
                            <div>
                                {
                                    alert.Name !== undefined && (
                                        <span style={{ color: 'red', fontSize: '14px',marginBottom:'10px',display:'block' }}>{alert.Name}</span>
                                    )
                                }
                            </div>
                            <CFormInput onChange={(e) => setCreateDto({ ...createDto, Name: e.target.value })}
                                value={createDto.Name}
                                type="text"
                                placeholder="Brand Name"
                            />
                        </div>
                        {/* <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">Blog Content</CFormLabel>
                            <textarea
                                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                                rows="15"
                                type="text"
                                placeholder="Blog Content"
                            />
                        </div> */}
                        {/* <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">Blog Information</CFormLabel>
                            <textarea
                                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                                rows="5"
                                type="text"
                                placeholder="Blog Information"
                            />
                        </div> */}
                        {/* <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">Blog Description</CFormLabel>
                            <textarea
                                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                                rows="10"
                                type="text"
                                placeholder="Blog Description"
                            />
                        </div> */}

                        <div className="mb-3">
                            <label for="fileField" class="attachment" style={{ padding: '20px 0' }}>
                                <span style={{ display: 'block', marginBottom: '30px' }}>Image</span>
                                {
                                    alert.Image !== undefined && (
                                        <span style={{ color: 'red', fontSize: '14px',marginBottom:'10px',display:'block' }}>{alert.Image}</span>
                                    )
                                }
                                <div class="row btn-file">
                                    <div class="btn-file__preview"></div>
                                    <div class="btn-file__actions">
                                        <div class="btn-file__actions__item col-xs-12 text-center">
                                            <div style={{ width: '200px', height: '150px', border: '1px solid #dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }} class="btn-file__actions__item--shadow">
                                               {
                                                selectedImage==null &&(
                                                    <i class="fa fa-plus fa-lg fa-fw" aria-hidden="true"></i>
                                                )
                                               }
                                                {
                                                    selectedImage && (
                                                        <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%' }} />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    onChange={(e) => {
                                        setCreateDto({ ...createDto, FormFile: e.target.files[0] })
                                        if(e.target.files[0]){
                                            setSelectedImage(URL.createObjectURL(e.target.files[0]));
                                            console.log(selectedImage)
                                        }
                                        
                                    }
                                    }

                                    name="file" type="file" id="fileField" style={{ visibility: 'hidden' }} />
                            </label>
                        </div>
                        <CButton component="input" type="submit" color="primary"  >Create</CButton>
                    </CForm>

                </CCardBody>
            </CCard>
        </div>
    )
}
