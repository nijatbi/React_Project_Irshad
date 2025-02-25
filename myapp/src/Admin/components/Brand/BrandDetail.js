import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
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
import { format,parseISO } from 'date-fns';
import { NavLink } from 'react-bootstrap';
export default function BrandDetail() {
  var location=useLocation();
  const token=useSelector(state=>state.token);
  const id = location.pathname.split("/")[3]
  const[data,setData]=useState([]);
  const[dataTime,setDateTime]=useState({})
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData=()=>{
    axios.get(`http://localhost:5126/api/Brand/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(res=>{
      setData(res.data)
      console.log(res.data)
      setDateTime({
        CreatedAt:format(new Date(res.data.createdAt), "d-M-yy"),
          UpdatedAt:res.data.updatedAt==null?'': format(new Date(res.data.updatedAt), "d-M-yy"),
          DeletedTime:res.data.deletedTime==null?'': format(new Date(res.data.deletedTime), "d-M-yy"),

      })
      
    })
    .catch(eror=>{
      console.log(eror)
    })
  
  }
  
  return (
    <div>
 <CRow>
    <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Brand-Detail Table</strong> 
          </CCardHeader>
          
          <CCardBody>
                    <a href='/admin/brand'>
                        <CButton type='button' style={{backgroundColor:'#6261cc',color:'white',border:'0'}} color="primary" className="px-4 mb-4">
                        Go To Index
                        </CButton>
                    </a>
                    <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
                                        <div className="dash__table-2-wrap gl-scroll">

              <CTable borderless>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">createdAt</CTableHeaderCell>
                    <CTableHeaderCell scope="col">deletedAt</CTableHeaderCell>
                    <CTableHeaderCell scope="col">updatedAt</CTableHeaderCell>
                    <CTableHeaderCell scope="col">addedBy</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                <CTableRow>
                      <CTableHeaderCell scope="row">1</CTableHeaderCell>
                      <CTableDataCell>{data.name}</CTableDataCell>
                      <CTableDataCell>{dataTime.CreatedAt}</CTableDataCell>
                      <CTableDataCell>{dataTime.DeletedTime}</CTableDataCell>
                      <CTableDataCell>{dataTime.UpdatedAt}</CTableDataCell>
                      <CTableDataCell>Admin</CTableDataCell>
                    </CTableRow>
                </CTableBody>
              </CTable>
                                          </div>
                                          </div>
          </CCardBody>
        </CCard>
      </CCol>
      </CRow>
    </div>
  )
}
