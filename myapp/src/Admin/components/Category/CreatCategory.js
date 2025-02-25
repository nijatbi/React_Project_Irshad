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
    CFormSelect,
    CFormCheck
} from '@coreui/react'
import { NavLink } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function CreatCategory() {
    const token = useSelector(state => state.token);

    const [alert, setAlert] = useState({})
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMain, setIsMain] = useState(true)
    const [isChild, setIChild] = useState(false)
    const [createDto, setCreateDto] = useState({
        isMain: true,
        isChild: false
    })
    const [data, setData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetchData()
    }, [selectedImage])
    useEffect(() => {
        filterData()
    }, [isChild, isMain])


    const fetchData = () => {
        axios.get(`http://localhost:5126/api/category/getall`).then(res => {
            console.log(res)
            setData(res.data)
        }).catch(eror => {
            console.log(eror)
        })

    }

    const filterData = () => {
        var data = new FormData();
        data.append("isMain", isMain)
        data.append("isChild", isChild)

        axios.post(`http://localhost:5126/api/category/FilterCategory`, data, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }).then(res => {
            console.log(res)
            setData(res.data)
        }).catch(eror => { console.log(eror) })
    }
    const onCreate = (e) => {
        e.preventDefault();


        axios.post(`http://localhost:5126/api/category/create`, createDto, {
            headers: {
                "Content-Type": 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res)
            navigate("/admin/category")
        }).catch(eror => {
            console.log(eror)
            if (typeof eror.response.data == "object") {
                setAlert({
                    Image: eror.response.data.errors.formFile,
                    Name: eror.response.data.errors.Name,
                    ParentId: eror.response.data.errors.ParentId
                })
            }
            else if (typeof eror.response.data == "string") {
                setAlert({ data: eror.response.data })
            }

            setTimeout(() => {
                setAlert({
                    Name: '',
                    Image: '',
                    data: ''
                })
            }, 2000);
        })
        console.log(createDto)
    }

    return (
        <div>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Category Create</strong>
                </CCardHeader>
                <CCardBody >
                    <NavLink  >
                        <CButton onClick={() => navigate('/admin/category')} type='button' style={{ backgroundColor: 'gray', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                            Go To Index
                        </CButton>
                    </NavLink>
                    <CForm onSubmit={onCreate}>
                        {
                            alert.data !== undefined && (
                                <span style={{ color: 'red', fontSize: '14px', marginBottom: '0px', display: 'block', marginTop: '10px' }}>{alert.data}</span>
                            )
                        }
                        <div style={{ marginTop: '40px' }} className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1" style={{ marginBottom: '15px' }}>Category Name</CFormLabel>
                            <div>
                                {
                                    alert.Name !== undefined && (
                                        <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.Name}</span>
                                    )
                                }
                            </div>
                            <CFormInput onChange={(e) => setCreateDto({ ...createDto, Name: e.target.value })}
                                value={createDto.Name}
                                type="text"
                                placeholder="Brand Name"
                            />
                        </div>
                        <div className='mb-3'>
                            <CFormCheck onChange={() => {
                                setIsMain(x => !x)
                                filterData();
                                setCreateDto({ ...createDto, isMain: !isMain })

                            }} style={{ marginLeft: '0px' }} id="flexCheckChecked" label="Əsas kateqoriya olsun ?" defaultChecked={isMain} />
                        </div>

                        <div className='mb-3'>

                            {
                                isMain == false && (
                                    <div>
                                        {
                                            alert.ParentId !== undefined && (
                                                <span style={{ color: 'red', fontSize: '14px', marginBottom: '0px', display: 'block', marginTop: '10px' }}>{alert.ParentId}</span>
                                            )
                                        }
                                        <CFormSelect onChange={(e) => setCreateDto({ ...createDto, ParentId: e.target.value })} aria-label="Default select example">
                                            <option>Select Parent Category</option>

                                            {
                                                data.map((item, index) => {
                                                    return (
                                                        <option key={index} style={{ padding: "20px 12px" }} value={item.id}>{item.name}</option>

                                                    )
                                                })
                                            }
                                        </CFormSelect>
                                        <CFormCheck onChange={() => {
                                            setIChild(x => !x)
                                            console.log(isChild)
                                            filterData()
                                            setCreateDto({ ...createDto, isChild: !isChild })

                                        }} style={{ marginLeft: '0px' }} label="Child kateqoriya olsun ?" defaultChecked={isChild} />

                                    </div>

                                )
                            }

                        </div>

                        <div className="mb-3">
                            <label for="fileField" class="attachment" style={{ padding: '20px 0' }}>
                                <span style={{ display: 'block', marginBottom: '30px' }}>Image</span>
                                {
                                    alert.Image !== undefined && (
                                        <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.Image}</span>
                                    )
                                }
                                <div class="row btn-file">
                                    <div class="btn-file__preview"></div>
                                    <div class="btn-file__actions">
                                        <div class="btn-file__actions__item col-xs-12 text-center">
                                            <div style={{ width: '200px', height: '150px', border: '1px solid #dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }} class="btn-file__actions__item--shadow">
                                                {
                                                    selectedImage == null && (
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
                                        // if (e.target.files[0]) {
                                        //     console.log(selectedImage)
                                        //     setCreateDto({...createDto,imageUrl:selectedImage})
                                        // }

                                        if (e.target.files[0]) {
                                            // const reader = new FileReader();
                                            // reader.onloadend = () => {
                                            //     setCreateDto({ ...createDto, imageUrl: reader.result })

                                            // };
                                            // reader.readAsDataURL(e.target.files[0]);
                                           setCreateDto({ ...createDto, imageUrl: e.target.files[0] })

                                            setSelectedImage(URL.createObjectURL(e.target.files[0]));

                                        }
                                        // Dosya seçimini sıfırlama
                                        e.target.value = null;

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
