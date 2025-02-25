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
export default function KampaniyaDetail() {
  var location=useLocation();
  const token=useSelector(state=>state.token);
  const id = location.pathname.split("/")[3]
  console.log(id)
  const[data,setData]=useState([]);
  const[dataTime,setDateTime]=useState({})
  

  useEffect(()=>{
    fetchData()
  },[])
  const fetchData=()=>{
    axios.get(`http://localhost:5126/api/kampaniya/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then(res=>{
      setData(res.data)
      console.log(res)
    }).catch(eror=>{
      console.log(eror)
    })
  }
  return (
    <div>
        <div>
        <CRow>
       <CCol xs={12}>
           <CCard className="mb-4">
             <CCardHeader>
               <strong>Kampaniya-Detail Table</strong> 
             </CCardHeader>
             
             <CCardBody>
                       <a href='/admin/kampaniya'>
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
                       <CTableHeaderCell scope="col">Start Time</CTableHeaderCell>
                       <CTableHeaderCell scope="col">End Time</CTableHeaderCell>
                       <CTableHeaderCell scope="col">Deleted Time</CTableHeaderCell>
                       <CTableHeaderCell scope="col">Is Deleted</CTableHeaderCell>
                       <CTableHeaderCell scope="col">Added By Name</CTableHeaderCell>

                     </CTableRow>
                   </CTableHead>
                   <CTableBody>
                   <CTableRow>
                   <CTableHeaderCell scope="row"><img style={{width:'50px',height:'50px'}} src={`http://localhost:5126/img/${data.imageUrl}`}/></CTableHeaderCell>
                       
                         <CTableDataCell>{data.startTime}</CTableDataCell>
                         <CTableDataCell>{data.endTime}</CTableDataCell>
                         <CTableDataCell>{data.deletedTime}</CTableDataCell>
                         <CTableDataCell>{data.isDeleted ? <span style={{color:'red'}}>Deleted</span> : 'Active'}</CTableDataCell>

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
        <div>
            <div>
            <label htmlFor="">Title</label>
            <textarea name="" id="" style={{padding:'12px 10px',width:'100%',height:'auto',border:'1px solid #dbdbdb',borderRadius:'5px'}}  value={data.title}></textarea>
            </div>
            <div style={{margin:"30px 0"}}>
            <label htmlFor="">Description</label>
            <textarea name="" id="" style={{padding:'20px 10px',width:'100%',height:'auto',border:'1px solid #dbdbdb',borderRadius:'5px'}}  value={data.description}></textarea>
            </div>
        </div>
       </div>
  )
}
