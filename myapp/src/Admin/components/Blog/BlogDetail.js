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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import Loading from '../../../Loading'
export default function BlogDetail() {
  var location=useLocation();
  const token=useSelector(state=>state.token);
  const id = location.pathname.split("/")[3]
  const[loading,setLoading]=useState(true);
  const[data,setData]=useState([]);
  console.log(id)
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData=()=>{
    setLoading(true)
    axios.get(`http://localhost:5126/api/blog/${id}`).then(res=>{
      setData(res.data)
    }).catch(eror=>{
      console.log(eror)
    })
    setLoading(false)
  }

  if (loading) {
    return <Loading></Loading>
  }
  return (
    <div>
 <CRow>
    <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Blog-Detail Table</strong> 
          </CCardHeader>
          
          <CCardBody>
                    <a href='/admin/blog'>
                        <CButton type='button' style={{backgroundColor:'#6261cc',color:'white',border:'0'}} color="primary" className="px-4 mb-4">
                        Go To Index
                        </CButton>
                    </a>
                    <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
                                        <div className="dash__table-2-wrap gl-scroll">

              <CTable borderless>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">createdAt</CTableHeaderCell>
                    <CTableHeaderCell scope="col">isDeleted</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                <CTableRow>
                      <CTableHeaderCell scope="row">{data.title}</CTableHeaderCell>
                      <CTableDataCell>{data.datetime  }</CTableDataCell>
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
      <div style={{margin:'50px 0'}}>
          Description
        </div>
      <div>
        
      <ReactQuill style={{ height: '300px' }}
                                modules={BlogDetail.modules}
                                formats={BlogDetail.formats}
                                value={data.description}

                            />
      </div>
    </div>
  )
}
BlogDetail.modules = {
  toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      ['clean'], // remove formatting button
  ],
};

// Define Quill formats
BlogDetail.modules = {
  toolbar: [
      [{ 'header': [1, 2, false] }],
      [{ 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image', 'clean'],
  ],
};

