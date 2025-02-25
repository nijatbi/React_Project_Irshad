import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,
    CPagination,
    CPaginationItem,
    CFormLabel,
    CFormInput,
    CForm,
    CInputGroup,
    CFormSelect
} from '@coreui/react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import image from '../../../images/download.jpeg'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function Category() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = useSelector(state => state.token);
    const [search, setSearchFilter] = useState('')
    const [show, setShow] = useState(false);
    const[alert,setAlert]=useState('')

    useEffect(() => {
        fetchData();
    }, [],show)
    console.log(show)
    const fetchData = () => {
        axios.get(`http://localhost:5126/api/category/getall`).then(res => {
            console.log(res)
            setData(res.data)
        }).catch(eror => {
            console.log(eror)
        })
    }
    const RemoveData = (id) => {
        axios.delete(`http://localhost:5126/api/category/${id}`, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res)
            fetchData()
        }).catch(eror => {
            console.log(eror)
        })
    }
    const Search=(e)=>{
        e.preventDefault();
        if(search==null || search==''){
            fetchData()
        }
        else{
          axios.get(`http://localhost:5126/api/category/searchCategory/${search}`).then(res=>{
            console.log(res)
            if(res.data.length==0){
                setAlert("Hec bir melumat tapilmadi")
                setTimeout(() => {
                    setAlert('')
                }, 1500);
            }
            else{
             setData(res.data)

            }
          }).catch(eror=>{
            console.log(eror)
          })
        }
      }
    return (
        <div className='container' style={{ marginTop: '50px' }}>
            <div className='row'>

                <div className="down">
                    <CRow>
                        <CForm onSubmit={Search}>
                            <CInputGroup className="mb-3">
                                <CButton className='btn btn-outline-warning' type="submit" color="secondary" variant="outline" id="button-addon1">Search</CButton>
                                <CFormInput
                                    autoComplete='off'
                                    aria-label="Example text with button addon"
                                    onChange={(e) => setSearchFilter(e.target.value)}
                                    value={search}
                                    aria-describedby="button-addon1"
                                    type="text"
                                    placeholder="Search By  Name" />

                                <span className='text-warning mx-2' style={{ cursor: 'pointer' }} ><i class="fa-solid fa-globe  fs-5 my-2"></i></span>
                            </CInputGroup>
                            

                        </CForm>
                        <CFormSelect size="md" className="mb-3 w-25 mx-2" aria-label="Large select example">
                            <option value="0">Search by different category</option>
                            <option value="2">Show Last Week Created </option>
                            <option value="3">Show Last Month Created </option>
                            <option value="1">Show Last Day Created </option>
                            <option value="4">Show Last Day Deleted </option>
                            <option value="5">Show Last Week Deleted </option>
                            <option value="6">Show Last Month Deleted </option>
                            <option value="7">Show Last Day Updated </option>
                            <option value="8">Show Last Week Updated </option>
                            <option value="9">Show Last Month Updated </option>
                        </CFormSelect>
                        <CCol xs={12}>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <strong >Category Table</strong>
                                </CCardHeader>
                                {
                                    alert!=='' && (
                                        <div style={{width:'100%',textAlign:'center',backgroundColor:'red',padding:'12px 20px'}}> <span style={{fontSize:'20px',color:'white',fontWeight:'bold'}}>{alert}</span></div>
                                    )
                                }
                                <CCardBody>
                                    <NavLink to="/Admin/category/Create">
                                        <CButton onClick={() => navigate('/admin/category/create')} type='button' style={{ backgroundColor: '#6261cc', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                                            Create Category
                                        </CButton>
                                    </NavLink>
                                    {/* {
                    responseMessage&&<p className='text-danger my-2'>{responseMessage}</p>
                  } */}
                                    <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
                                        <div className="dash__table-2-wrap gl-scroll">

                                            <CTable borderless>
                                                <CTableHead>
                                                    <CTableRow>
                                                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">IsMain</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">IsDeleted</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">Created</CTableHeaderCell>

                                                        <CTableHeaderCell style={{ width: '40px' }} scope="col">Settings</CTableHeaderCell>
                                                    </CTableRow>
                                                </CTableHead>
                                                <CTableBody>
                                                    {
                                                        data.map((item, index) => {
                                                            return (
                                                                <CTableRow>
                                                                    <CTableHeaderCell scope="row">
                                                                        {
                                                                            item.imageUrl != null ? (
                                                                                <img style={{ width: '50px', height: '50px' }} src={`http://localhost:5126/category/${item.imageUrl}`} />

                                                                            ) : (
                                                                                <img style={{ width: '50px', height: '50px' }} src={image} alt="" />
                                                                            )

                                                                        }
                                                                    </CTableHeaderCell>
                                                                    <CTableHeaderCell >{item.name}</CTableHeaderCell>
                                                                    <CTableHeaderCell >{item.isMain == true ? <span style={{ color: 'red' }}>Əsas kateqoriya</span> : <span style={{ color: 'green' }}>Orta kateqoriya</span>}</CTableHeaderCell>

                                                                    <CTableDataCell>{item.isDeleted ? <span style={{ color: 'red' }}>Deleted</span> : "Active"}</CTableDataCell>
                                                                    <CTableDataCell>{item.createdTime.split(" ")[0]}</CTableDataCell>
                                                                    <CTableDataCell>
                                                                        <a href='#' onClick={(e)=>{
                                                                            e.preventDefault();
                                                                            RemoveData(item.id)
                                                                        }}>
                                                                            {
                                                                                item.isDeleted == false && (
                                                                                <i class="fa-solid fa-trash"></i>                                                                
                                                                                )
                                                                                
                                                                            }
                                                                           
                                                                        </a>

                                                                        <a href={`/Admin/category/${item.id}`}>
                                                                            <i style={{ cursor: 'pointer' }} class="fa-solid fa-circle-info mx-2"></i>
                                                                        </a>
                                                                        <a href={`/Admin/category/update/${item.id}`}>
                                                                            <i style={{ cursor: 'pointer' }} class="fa-solid fa-pen-to-square"></i>
                                                                        </a>
                                                                    </CTableDataCell>

                                                                </CTableRow>
                                                            )


                                                        })

                                                    }
                                                </CTableBody>
                                            </CTable>

                                        </div>
                                    </div>
                                    <div class="pagination" style={{ marginTop: '30px ' }}>
                                        <a href="#">&laquo;</a>
                                        <a href="#">1</a>
                                        <a class="active" href="#">2</a>
                                        <a href="#">3</a>
                                        <a href="#">4</a>
                                        <a href="#">5</a>
                                        <a href="#">6</a>
                                        <a href="#">&raquo;</a>
                                    </div>
                                </CCardBody>

                            </CCard>
                        </CCol>
                    </CRow>
                </div>
            </div>
        </div>
    )
}
