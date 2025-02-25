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
  import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../../../Loading';
import image from '../../../images/download.jpeg'

export default function CategoryDetail() {
    const[data,setData]=useState({})
    const token=useSelector(state=>state.token);
    const location=useLocation();
    const id = location.pathname.split("/")[3]
    const[loading,setLoading]=useState(true);
    const[search,setSearch]=useState('')
    useEffect(()=>{
        fetchData();
    },[])    
    const fetchData=()=>{
        setLoading(true)
        axios.get(`http://localhost:5126/api/category/${id}`).then(res=>{
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
            <strong>Category-Detail Table</strong> 
          </CCardHeader>
          
          <CCardBody>
                    <a href='/admin/category'>
                        <CButton type='button' style={{backgroundColor:'#6261cc',color:'white',border:'0'}} color="primary" className="px-4 mb-4">
                        Go To Index
                        </CButton>
                    </a>
                    <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
                                        <div className="dash__table-2-wrap gl-scroll">

              <CTable borderless>
                <CTableHead>
                  <CTableRow>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">IsMain</CTableHeaderCell>
                    <CTableHeaderCell scope="col">ParentName</CTableHeaderCell>

                    <CTableHeaderCell scope="col">createdAt</CTableHeaderCell>
                    <CTableHeaderCell scope="col">IsDeleted</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                <CTableRow>
                      <CTableHeaderCell scope="row">
                            {
                                data.imageUrl==null ? (
                                    <img style={{ width: '100px', height: '100px' }} src={image} alt="" />
                                ):(
                                    <img style={{ width: '100px', height: '100px' }} src={`http://localhost:5126/category/${data.imageUrl}`} />

                                )
                            }
                      </CTableHeaderCell>
                      <CTableDataCell>{data.name}</CTableDataCell>
                      <CTableDataCell>{data.isMain==true ? 'Esas' :'Orta'}</CTableDataCell>
                      <CTableDataCell>{data.parentName==null ? 'Esas kateqoriyadir' : data.parentName}</CTableDataCell>
                      <CTableDataCell>{data.createdTime}</CTableDataCell>
                      <CTableDataCell>{data.isDeleted ? <span style={{ color: 'red' }}>Deleted</span> : "Active"}</CTableDataCell>


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
