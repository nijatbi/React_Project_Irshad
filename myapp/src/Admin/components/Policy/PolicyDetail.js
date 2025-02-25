import React,{useEffect, useState} from 'react'
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
  import { NavLink } from 'react-bootstrap'
  import { useLocation, useNavigate } from 'react-router-dom'
  import axios from 'axios'
  import Loading from '../../../Loading'
import { useSelector } from 'react-redux'
import * as XLSX from 'xlsx';
export default function PolicyDetail() {
    const[data,setData]=useState([]);
    const location=useLocation();
    const token=useSelector((state)=>state.token)
    const id = location.pathname.split("/")[3]
    console.log(id);
    useEffect(()=>{
        fetchData();
    },[])
    const fetchData = ()=>{
        axios.get(`http://localhost:5126/api/policy/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res.data)
            setData(res.data)
        }).catch(eror=>{
            console.log(eror)
        })
    }

    const exportToExcel=()=>{
       
        const processedData =[
            {
                id:data.id,
                key:data.key,
                value:data.value,
                isDeleted:data.isDeleted,
                createdTime:data.datetime
            }
        ]
        const worksheet = XLSX.utils.json_to_sheet(processedData);

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Export the workbook to Excel file
        XLSX.writeFile(workbook, 'exported_data.xlsx');
    }

    
  return (
    <div>
    <CRow>
       <CCol xs={12}>
           <CCard className="mb-4">
             <CCardHeader>
               <strong>Policy-Detail Table</strong> 
             </CCardHeader>
             <div style={{margin:'30px 50px 10px 20px' ,textAlign:'right'}}>
             <button onClick={()=>exportToExcel()} type="button" class="btn btn-success">Export to Excel</button>
             </div>
             <CCardBody>
                       <a href='/admin/policy'>
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
                       <CTableHeaderCell scope="col">Key</CTableHeaderCell>
                       <CTableHeaderCell scope="col">createdAt</CTableHeaderCell>
                       <CTableHeaderCell scope="col">deletedAt</CTableHeaderCell>
                       <CTableHeaderCell scope="col">updatedAt</CTableHeaderCell>
                       <CTableHeaderCell scope="col">addedBy</CTableHeaderCell>
                     </CTableRow>
                   </CTableHead>
                   <CTableBody>
                   <CTableRow>
                         <CTableHeaderCell scope="row">1</CTableHeaderCell>
                         <CTableDataCell>{data.key}</CTableDataCell>
                         <CTableDataCell>{data.datetime}</CTableDataCell>
                         <CTableDataCell>{data.deletedTime}</CTableDataCell>
                         <CTableDataCell>{data.updatedTime}</CTableDataCell>

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
