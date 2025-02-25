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
  CFormLabel,
  CFormInput,
  CForm,
  CInputGroup,
  CFormSelect
} from '@coreui/react'
import '../../../css/Modal.css'
import { NavLink } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../../Loading'
import { useSelector } from 'react-redux'

export default function AnswerList() {
    const [data, setData] = useState([])
    const [search, setSearchFilter] = useState('')
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [successCreate, setsuccessCreate] = useState(false)
  
    const navigate = useNavigate()
    const [createDto, setCreateDto] = useState({})
    const token = useSelector(state => state.token);
    const [eror, setEror] = useState({})
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=()=>{
        setLoading(true)
        axios.get(`http://localhost:5126/api/answer/getall`).then(res=>{
            console.log(res)
            setData(res.data)
        }).catch(eror=>{
            console.log(eror)
        })
        setLoading(false)
    }
    const RemoveData=(id)=>{
        axios.delete(`http://localhost:5126/api/answer/${id}`).then(res=>{
            fetchData()
        }).catch(eror=>{
            console.log(eror)
        })
    }
    const Search=(e)=>{
       e.preventDefault();
       if(search==null || search== ''){
        fetchData();
       }
       else{
        axios.get(`http://localhost:5126/api/answer/Search/${search}`).then(res=>{
          console.log(res)
          if(res.data.length>0){
            setData(res.data)
          }
          else{
            setAlert("Axtarisa uygun melumat tapilmadi")
            setTimeout(() => {
              setAlert('')
            }, 2000);
            fetchData();
          }
        }).catch(eror=>{
          console.log(eror)
        })
       }
    }
    if(loading) {
        return <Loading></Loading>
    }
  return (
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
          alert != '' && (
            <div style={{ color: 'white', fontSize: '16px', textAlign: 'center', backgroundColor: 'red', width: '100%', padding: '12px 0' }}>{alert}</div>
          )
        }
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong >Answer Table</strong>
            </CCardHeader>
            <CCardBody>
              <NavLink to="/Admin/answer/Create">
                <CButton  type='button' onClick={()=>navigate('/admin/answer/create')} style={{ backgroundColor: '#6261cc', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                  Create Answer
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
                        <CTableHeaderCell scope="col">Answer</CTableHeaderCell>
                        <CTableHeaderCell scope="col">IsDeleted</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Created</CTableHeaderCell>

                        <CTableHeaderCell style={{ width: '40px' }} scope="col">Settings</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {
                        data.map((item, index) => {
                          return <CTableRow>
                            <CTableHeaderCell >{item.title}</CTableHeaderCell>
                            <CTableDataCell>{item.isDeleted ? <span style={{ color: 'red' }}>Deleted</span> : "Active"}</CTableDataCell>
                            <CTableHeaderCell >{item.createdTime.split('T')[0]}</CTableHeaderCell>

                            <CTableDataCell>
                              {
                                <a onClick={() => RemoveData(item.id)}>
                                  {
                                    !item.isDeleted && <i style={{ cursor: 'pointer' }} class="fa-solid fa-trash"></i>
                                  }
                                </a>
                              }
                              <a href={`/Admin/answer/${item.id}`}>
                                <i style={{ cursor: 'pointer' }} class="fa-solid fa-circle-info mx-2"></i>
                              </a>
                              <a onClick={() => {
                                navigate(`/Admin/answer/update/${item.id}`)
                              }}>
                                <i style={{ cursor: 'pointer' }} class="fa-solid fa-pen-to-square"></i>
                              </a>
                            
                            </CTableDataCell>
                          </CTableRow>
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
  )
}
