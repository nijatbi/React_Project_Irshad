import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CFormSelect
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AnswerCreate() {
  const token = useSelector(state => state.token);
  const [createDto, setCreateDto] = useState({})
  const [alert, setAlert] = useState({})
  const[headers,setHeaders]=useState([])
  const navigate = useNavigate();
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData=()=>{
    axios.get(`http://localhost:5126/api/answer/getheader`).then(res=>{
      console.log(res.data)
      setHeaders(res.data)
    }).catch(eror=>{
      console.log(eror)
    })
  }
  const onCreate = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5126/api/answer/Create`, createDto, {
      headers: {
        "Content-Type": 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      navigate('/admin/answer')
    }).catch(eror => {
      console.log(eror)
      if (typeof eror.response.data == "object") {
        setAlert({
          Title: eror.response.data.errors.Title,
          Description: eror.response.data.errors.Description,
          AnswerHeaderId: eror.response.data.errors.AnswerHeaderId,
        })
      }
      else if (typeof eror.response.data == "string") {
        setAlert({ data: eror.response.data })
      }
      setTimeout(() => {
        setAlert({})
      }, 2000);
    })
    console.log(createDto)
  }
  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Answer Create</strong>
        </CCardHeader>
        <CCardBody >
          <NavLink  >
            <CButton onClick={() => navigate('/admin/answer')} type='button' style={{ backgroundColor: 'gray', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
              Go To Index
            </CButton>
          </NavLink>
          <CForm onSubmit={onCreate}>
            {
              alert.data !== undefined && (
                <span style={{ color: 'red', fontSize: '14px', marginBottom: '0px', display: 'block', marginTop: '10px' }}>{alert.data}</span>
              )
            }

            <div className="mb-3">

              <CFormLabel htmlFor="exampleFormControlInput1"> Title</CFormLabel>
              {
                alert.Title !== undefined && (
                  <div style={{ color: 'red', margin: '10px 0' }}>{alert.Title}</div>
                )
              }
              <textarea
                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                rows="2"
                type="text"
                placeholder="Answer Title"
                onChange={(e) => setCreateDto({ ...createDto, Title: e.target.value })}
                value={createDto.Title}
              />
            </div>
            <div className='mb-3'>
            {
                alert.AnswerHeaderId !== undefined && (
                  <div style={{ color: 'red', margin: '10px 0' }}>Kateqoriyani seçin</div>
                )
              }
              <label htmlFor="">Katogoriyani seçin</label>
              <Form.Select onChange={(e) => { setCreateDto({ ...createDto, AnswerHeaderId: e.target.value }) }} aria-label="Default select example">
                <option value="default">Kategoriyani sec</option>
                {
                  headers.map((item,index)=>{
                    return(
                      <option value={item.id}>{item.name}</option>
                    )
                  })
                }
              </Form.Select>
            </div>

            <div className="mb-3">

              <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>

              {
                alert.Description !== undefined && (
                  <div style={{ color: 'red', margin: '10px 0' }}>{alert.Description}</div>
                )
              }
              <textarea
                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                rows="3"
                type="text"
                onChange={(e)=>setCreateDto({...createDto,Description:e.target.value})}
                value={createDto.Description}
                placeholder="Answer Description"
              />
            </div>


            <CButton component="input" type="submit" color="primary"  >Create</CButton>
          </CForm>

        </CCardBody>
      </CCard>
    </div>
  )
}
