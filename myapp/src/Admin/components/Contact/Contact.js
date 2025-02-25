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
import axios from 'axios'
import Loading from '../../../Loading'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
export default function Contact() {
  const token = useSelector(state => state.token);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearchFilter] = useState('');
  const [alert, setAlert] = useState('')
  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = () => {
    setLoading(true)
    axios.get('http://localhost:5126/api/contact/getall', {
      headers: {
        Authorization: `Bearer ${token}`,

      }
    }).then(res => {
      setData(res.data)
      console.log(res)
    })
      .catch(eror => {
        console.log(eror);
      })
    setLoading(false)

  }
  const Search = (e) => {
    e.preventDefault()
    if (search === '') {
      fetchData()
    }
    else {
      axios.post(`http://localhost:5126/api/contact/searchcontact/${search}`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          if (res.data.length == 0) {
            setAlert('Axtarisa uygun melumat tapilmadi...')
            setTimeout(() => {
              fetchData();
              setAlert('')
            }, 1500);
          }
          else{
            setAlert('')
          }

          setData(res.data)
          setSearchFilter('')
        })
        .catch(eror => {
          console.log(eror)
        })
    }
  }
  const RemoveData = (id) => {
    axios.delete(`http://localhost:5126/api/contact/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => {
        fetchData()
        console.log(res)
      })
      .catch(eror => {
        console.log(eror)
      })
  }

  if (loading) {
    return (
      <Loading></Loading>
    )
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
            {
              alert!=='' && (
                <div style={{color:'white',textAlign:'center',fontSize:'14px',width:'100%',backgroundColor:'red',padding:'12px 0',fontWeight:'bold',margin:"20px 0"}}>{alert}</div>
              )
            }
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Brand Table</strong>
                </CCardHeader>
                <CCardBody>
                  <NavLink to="/Admin/Brand/Create">
                    <CButton type='button' style={{ backgroundColor: '#6261cc', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                      Create Brand
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
                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                            <CTableHeaderCell scope="col">IsDeleted</CTableHeaderCell>

                            <CTableHeaderCell style={{ width: '40px' }} scope="col">Settings</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {
                            data.map((item, index) => {
                              return <CTableRow>
                                <CTableHeaderCell >{item.name}</CTableHeaderCell>
                                <CTableDataCell>{item.email}</CTableDataCell>
                                <CTableDataCell>{item.phone}</CTableDataCell>
                                <CTableDataCell>{item.isDeleted ? <span style={{ color: 'red' }}>Deleted</span> : "Active"}</CTableDataCell>

                                <CTableDataCell>
                                  {
                                    <a onClick={() => RemoveData(item.id)}>
                                      {
                                        !item.isDeleted && <i style={{ cursor: 'pointer' }} class="fa-solid fa-trash"></i>
                                      }
                                    </a>
                                  }
                                  <a href={`/Admin/contact/${item.id}`}>
                                    <i style={{ cursor: 'pointer' }} class="fa-solid fa-circle-info mx-2"></i>
                                  </a>
                                 
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
