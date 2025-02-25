import React, { useEffect, useState } from 'react'
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
    CFormCheck,
    CFormLabel,
    CFormInput,
    CForm,
    CInputGroup,
    CFormSelect
} from '@coreui/react'
import '../../../css/Modal.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../../Loading'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
export default function VakansiyaList() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [search, setSearchFilter] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [alert, setAlert] = useState({})
    const [isStrong, setStrong] = useState(false)
    const [successCreate, setsuccessCreate] = useState(false)
    const[searchAlert,setsearchAlert]=useState('')
    const [addfeature, setAddFeature] = useState({
        isStrong: isStrong
    })
    const token = useSelector(state => state.token);
    const [ups, setUps] = useState([])
    useEffect(() => {
        fetchData();
        getUps()
    }, [])
    const fetchData = () => {
        axios.get(`http://localhost:5126/api/vakansiya/getall`).then(res => {
            console.log(res);
            setData(res.data)
        }).catch(eror => {
            console.log(eror)
        })
    }
    const RemoveData = (id) => {
        axios.delete(`http://localhost:5126/api/vakansiya/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res)
            fetchData()
        }).catch(eror => {
            console.log(eror)
        })
    }
    const getUps = () => {
        axios.get(`http://localhost:5126/api/vakansiya/getup`).then(res => {
            setUps(res.data)
        }).catch(eror => {
            console.log(eror)
        })
    }
    const Search = (e) => {
        e.preventDefault()
        if(search=='' || search ==null) {
            fetchData();
        }
        else{
            axios.get(`http://localhost:5126/api/vakansiya/SearchVakansiya/${search}`).then(res=>{
                console.log(res)
                if(res.data.length>0){
                    setData(res.data)
                }
                else{
                    setsearchAlert("Bele bir melumat tapilmadi")
                    fetchData();
                    setTimeout(() => {
                        setsearchAlert('')
                    }, 1500);
                }
            }).catch(eror=>{
                console.log(eror)
            })
        }
    }
    const AddFeaturePost = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5126/api/vakansiya/AddDown`, addfeature, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setsuccessCreate(true)
            setTimeout(() => {
                setsuccessCreate(false)
            }, 2000);
            setAddFeature({
                Value: '',
                VakansiyaUpId:'0'
            })
        }).catch(eror => {
            console.log(eror)
            if (typeof eror.response.data == "object") {
                setAlert({
                    VakansiyaUpId: eror.response.data.errors.VakansiyaUpId,
                    Value: eror.response.data.errors.Value,
                })
            }
            else if (typeof eror.response.data == "string") {
                setAlert({ data: eror.response.data })
            }

            setTimeout(() => {
                setAlert({
                    VakansiyaUpId: '',
                    Value: '',
                    data: ''
                })
            }, 2000);
        })
    }
    return (
        <div className='container' style={{ marginTop: '50px' }}>
            {
                successCreate == true && (
                    <div style={{ display: 'inline-block' }} className='successCreate'>
                        Feature create succesfuly
                    </div>
                )
            }
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
                        {
                            searchAlert!='' && (
                                <div style={{ color: 'white', textAlign: 'center', fontSize: '14px', width: '100%', backgroundColor: 'red', padding: '12px 0', fontWeight: 'bold', margin: "20px 0" }}>{searchAlert}</div>
                            )
                        }
                        <CCol xs={12}>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <strong>Vakansiya Table</strong>
                                </CCardHeader>
                                <CCardBody>
                                    <NavLink >
                                        <NavLink to={`/admin/vakansiya/create`} style={{ backgroundColor: '#6261cc', color: 'white', border: '0', padding: '13px 0px', marginBottom: '15px', display: 'inline-block' }} color="primary" className="px-4 mb-4">
                                            Create Vakansiya
                                        </NavLink>
                                    </NavLink>
                                    {/* {
                  responseMessage&&<p className='text-danger my-2'>{responseMessage}</p>
                } */}
                                    <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
                                        <div className="dash__table-2-wrap gl-scroll">

                                            <CTable borderless>
                                                <CTableHead>
                                                    <CTableRow>
                                                        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">Created Time</CTableHeaderCell>
                                                        <CTableHeaderCell scope="col">Is Deleted</CTableHeaderCell>
                                                        <CTableHeaderCell style={{ width: '40px' }} scope="col">CV</CTableHeaderCell>

                                                        <CTableHeaderCell style={{ width: '160px' }} scope="col">Settings</CTableHeaderCell>
                                                    </CTableRow>
                                                </CTableHead>
                                                <CTableBody>
                                                    {
                                                        data.map((item, index) => {
                                                            return <CTableRow>
                                                                <CTableHeaderCell scope="row">{item.title}</CTableHeaderCell>

                                                                <CTableDataCell>{item.createdTime}</CTableDataCell>
                                                                <CTableDataCell>{item.isDeleted ? <span style={{ color: 'red' }}>Deleted</span> : <span >No Deleted</span>}</CTableDataCell>
                                                                <CTableDataCell>
                                                                    {item.returnCVdtos.length > 0 && (
                                                                        <NavLink to={`/admin/vakansiya/cv/${item.title.replace(/ /g, '-')}`}>CVLER</NavLink>
                                                                    )}
                                                                </CTableDataCell>

                                                                <CTableDataCell>
                                                                    {
                                                                        <a onClick={() => RemoveData(item.id)}>
                                                                            {
                                                                                !item.isDeleted && <i style={{ cursor: 'pointer' }} class="fa-solid fa-trash"></i>
                                                                            }
                                                                        </a>
                                                                    }

                                                                    <a href={`/admin/vakansiya/${item.id}`}>
                                                                        <i style={{ cursor: 'pointer' }} class="fa-solid fa-circle-info mx-2"></i>
                                                                    </a>
                                                                    {
                                                                        !item.isDeleted && (
                                                                            <a href={`/admin/vakansiya/update/${item.id}`}>
                                                                                <i style={{ cursor: 'pointer' }} class="fa-solid fa-pen-to-square"></i>
                                                                            </a>
                                                                        )
                                                                    }
                                                                    <a onClick={() => {
                                                                        setAddFeature({ ...addfeature, VakansiyaId: item.id })

                                                                        setIsActive(true)
                                                                    }} style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }} ><i class="fa-solid fa-plus"></i></a>
 {
                                                        isActive && (
                                                            <div class="modals-container" style={{ display: 'block' }}>

                                                                <div class="modalContent" >
                                                                    <div class="modalUp">
                                                                        <span onClick={() => setIsActive(false)}>X</span>
                                                                    </div>
                                                                    <div class="modal-body" id="scrollbar1">
                                                                        <h3 style={{ marginLeft: '0px' }}>Add Feature</h3>

                                                                        <form onSubmit={AddFeaturePost} >
                                                                            <div className='input-form'>
                                                                            {
                                                                                    alert.data != undefined && (
                                                                                        <div style={{ color: 'red', fontSize: '14px' }}> {alert.data}</div>
                                                                                    )
                                                                                }
                                                                                {
                                                                                    alert.VakansiyaUpId != undefined && (
                                                                                        <div style={{ color: 'red', fontSize: '14px' }}> {alert.VakansiyaUpId}</div>
                                                                                    )
                                                                                }
                                                                                <label htmlFor="">Key seç</label>

                                                                                <select onChange={(e) => {
                                                                                    setAddFeature({ ...addfeature, VakansiyaUpId: e.target.value })

                                                                                }} value={addfeature.VakansiyaUpId} style={{ width: '100%', padding: "12px 20px", border: '1px solid #dbdbdb', borderRadius: '10px' }} name="" id="">
                                                                                    <option value="0" defaultChecked>Key seçin</option>
                                                                                    {
                                                                                        ups.map((item, index) => (
                                                                                            <option key={index} value={item.id}>{item.name}</option>
                                                                                        ))
                                                                                    }

                                                                                </select>
                                                                            </div>
                                                                            <div className='input-form'>
                                                                                {
                                                                                    alert.Value != undefined && (
                                                                                        <div style={{ color: 'red', fontSize: '14px' }}> {alert.Value}</div>
                                                                                    )
                                                                                }
                                                                                <label htmlFor="">Value daxil ed</label>

                                                                                <textarea rows={8} name="" id="" placeholder='Add Value'
                                                                                    onChange={(e) => {
                                                                                        setAddFeature({ ...addfeature, Value: e.target.value })
                                                                                    }} value={addfeature.Value}
                                                                                ></textarea>

                                                                            </div>
                                                                            <div style={{ margin: '20px 0', paddingLeft: '15px' }}>
                                                                                <CFormCheck onChange={() => {
                                                                                    setStrong(x => !x)
                                                                                    setAddFeature({ ...addfeature, isStrong: !isStrong })

                                                                                }} style={{ marginLeft: '0px' }} id="flexCheckChecked"  defaultChecked={isStrong} /><label htmlFor="" style={{marginLeft:'30px'}}>Qalın şiriftlə yazılsın?</label>
                                                                            </div>
                                                                            <div className='craeteButton'>
                                                                                <button type='submit' onClick={()=>setAddFeature({...addfeature,VakansiyaId:item.id})}>Add </button>
                                                                            </div>
                                                                        </form>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                                </CTableDataCell>
                                                            </CTableRow>
                                                        })
                                                    }
                                                   
                                                </CTableBody>
                                            </CTable>
                                        </div>

                                    </div>
                                    {/* <CPagination aria-label="Page navigation example">
          <CPaginationItem aria-label="Previous" disabled={skip === 0} onClick={() => onPageChange(skip / take)}>
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
          {[...Array(Math.ceil(size/4)).keys()].map((page) => (
            <CPaginationItem key={page} active={page === skip / take} onClick={() => onPageChange(page + 1)}>
              {page + 1}
            </CPaginationItem>
          ))}
          <CPaginationItem
            aria-label="Next"
            disabled={skip + take >= size}
            onClick={() => onPageChange((skip + take) / take + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination> */}
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </div>
            </div>
        </div>
    )
}
