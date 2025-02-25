import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
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
import Loading from '../../../Loading'
import axios from 'axios';
export default function AnswerDetail() {
  const location = useLocation();
  const id = location.pathname.split("/")[3]
  const[loading,setLoading]=useState(true)
  const [data, setData] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData=()=>{
    setLoading(true)
    axios.get(`http://localhost:5126/api/answer/GetBydId/${id}`).then(res=>{
      console.log(res)
      setData(res.data)
    })
    setLoading(false)

  }
  if(loading){
    return (<Loading></Loading>)
  }
  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Answer-Detail Table</strong>
            </CCardHeader>

            <CCardBody>
              <a href='/admin/answer'>
                <CButton type='button' style={{ backgroundColor: '#6261cc', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                  Go To Index
                </CButton>
              </a>
              <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
                <div className="dash__table-2-wrap gl-scroll">

                  <CTable borderless>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Isdeleted</CTableHeaderCell>

                        <CTableHeaderCell scope="col">createdAt</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>{data.title}</CTableDataCell>
                        <CTableDataCell>{data.isDeleted ? <span style={{ color: 'red' }}>Deleted</span> : "Active"}</CTableDataCell>

                        <CTableDataCell>{data.createdTime}</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>

                </div>

              </div>
              <div>
                <label htmlFor="" style={{ display: 'block', marginTop: '50px', fontWeight: 'bold' }}>Message</label>
                <textarea value={data.description} name="" id="" style={{ width: '100%', padding: '12px 20px', height: 'auto', border: '1px solid #dbdbdb', borderRadius: '6px' }}>

                </textarea>
               
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      
    </div>
  )
}
