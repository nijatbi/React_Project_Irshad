import React, { useEffect, useState } from 'react'
import Loading from '../../../Loading'
import { useSelector } from 'react-redux';
import axios from 'axios'
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
export default function TiendaDetail() {
    const[data,setData]=useState([])
    const[loading,setLoading]=useState(true)
    var location=useLocation();
    const token=useSelector(state=>state.token);
    const id = location.pathname.split("/")[3]
    useEffect(()=>{
        fetchData();
    },[])
    const fetchData=()=>{
        setLoading(true)
        axios.get(`http://localhost:5126/api/tienda/${id}`).then(res=>{
            console.log(res)

            setData(res.data)
        }).catch(eror=>{
            console.log(eror)
        })
        setLoading(false)
    }
    if(loading){
        return <Loading></Loading>
    }
  return (
    <div>
 <CRow>
    <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Store-Detail Table</strong> 
          </CCardHeader>
          
          <CCardBody>
                    <a href='/admin/magaza'>
                        <CButton type='button' style={{backgroundColor:'#6261cc',color:'white',border:'0'}} color="primary" className="px-4 mb-4">
                        Go To Index
                        </CButton>
                    </a>
                    <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
                                        <div className="dash__table-2-wrap gl-scroll">

              <CTable borderless>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">City</CTableHeaderCell>
                    <CTableHeaderCell scope="col">IsService</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Is Deleted</CTableHeaderCell>
                    <CTableHeaderCell scope="col">WorkTime</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                <CTableRow>
                      <CTableDataCell>{data.name}</CTableDataCell>
                      <CTableDataCell>{data.cityName}</CTableDataCell>
                      <CTableDataCell>{data.isService ? 'Servisdir' :'Servis deyil'}</CTableDataCell>
                      <CTableDataCell>{data.iSDeleted ? <span style={{color:'red'}}>Deleted</span> : 'Active'}</CTableDataCell>

                      <CTableDataCell>{data.workTime}</CTableDataCell>

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
