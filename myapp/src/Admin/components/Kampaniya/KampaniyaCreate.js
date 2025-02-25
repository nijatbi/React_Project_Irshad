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
import React, { useState } from 'react'
import { NavLink } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function KampaniyaCreate() {
  const token = useSelector(state => state.token);
  const [createDto, setCreateDto] = useState({})
  const [alert, setAlert] = useState({})
  const [formFile, setformFile] = useState(null);
  const navigate = useNavigate();

  const onCreate = (e) => {
    e.preventDefault();
    axios
    .post(`http://localhost:5126/api/kampaniya/create`,createDto,{
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":'multipart/form-data' 
       }
    })
    .then(res=>{
      console.log(res)
      navigate('/admin/kampaniya')
    }).catch(eror=>{
      if (typeof eror.response.data == "object") {
        setAlert({
            Image: eror.response.data.errors.formFile,
            Title: eror.response.data.errors.Title,
            Description:eror.response.data.errors.Description,
            EndTime:eror.response.data.errors.EndTime
        })
    }
    else if(typeof eror.response.data == "string"){
        setAlert({data:eror.response.data})
    }
    setTimeout(() => {
      setAlert({})
    }, 2000);
    })
  }
  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Kampaniya Create</strong>
        </CCardHeader>
        <CCardBody >
          <NavLink  >
            <CButton onClick={() => navigate('/admin/kampaniya')} type='button' style={{ backgroundColor: 'gray', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
              Go To Index
            </CButton>
          </NavLink>
          <CForm onSubmit={onCreate}>
          {
                                    alert.data !== undefined && (
                                        <span style={{ color: 'red', fontSize: '14px',marginBottom:'0px',display:'block',marginTop:'10px' }}>{alert.data}</span>
                                    )
                                }
            <div style={{ marginTop: '20px',display:'flex' }} className="mb-3">
    
              <div className="mb-3">
                <label for="fileField" class="attachment" style={{ padding: '20px 0' }}>
                  <span style={{ display: 'block', marginBottom: '30px' }}>Kampaniya Image</span>
                  {
                    alert.Image !== undefined && (
                      <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.Image}</span>
                    )
                  }
                  <div class="row btn-file">
                    <div class="btn-file__preview"></div>
                    <div class="btn-file__actions">
                      <div class="btn-file__actions__item col-xs-12 text-center">
                        <div style={{ width: '150px', height: '100px', border: '1px solid #dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }} class="btn-file__actions__item--shadow">
                          {
                            formFile == null && (
                              <i class="fa fa-plus fa-lg fa-fw" aria-hidden="true"></i>
                            )
                          }
                          {
                            formFile && (
                              <img src={formFile} alt="Selected" style={{ width: '70%', height: '70%' }} />
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    onChange={(e) => {
                      setCreateDto({ ...createDto, formFile: e.target.files[0] })
                      if (e.target.files[0]) {
                        setformFile(URL.createObjectURL(e.target.files[0]));
                        console.log(formFile)
                      }

                    }
                    }

                    name="file" type="file" id="fileField" style={{ visibility: 'hidden' }} />
                </label>
              </div>
              <div style={{marginTop:'20px'}}>
                {
                  alert.EndTime!==undefined &&(
                    <div style={{color:'red',margin:'10px 0'}}>{alert.EndTime}</div>
                  )
                }
                <label style={{display:'block',marginBottom:'30px'}} htmlFor="">Kampaniya End Time</label>
                <input
                 type="date" 
                  style={{padding:'10px 20px ',border:'1px solid #dbdbdb'}} 
                  onChange={(e)=>setCreateDto({...createDto,EndTime:e.target.value})}
                   />
              </div>
            </div>
            <div className="mb-3">
            
              <CFormLabel htmlFor="exampleFormControlInput1">Kampaniya Title</CFormLabel>
              {
                  alert.Title!==undefined &&(
                    <div style={{color:'red',margin:'10px 0'}}>{alert.Title}</div>
                  )
                }
              <textarea
                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                rows="3"
                type="text"
                placeholder="Kampaniya Title"
                onChange={(e)=>setCreateDto({...createDto,Title:e.target.value})}
                value={createDto.Title}
              />
            </div>
            <div className="mb-3">
         
              <CFormLabel htmlFor="exampleFormControlInput1">Kampaniya Description</CFormLabel>

              {
                  alert.Description!==undefined &&(
                    <div style={{color:'red',margin:'10px 0'}}>{alert.Description}</div>
                  )
                }
              <textarea
                style={{ width: "100%", backgroundColor: "transparent", padding: "15px" }}
                rows="10"
                type="text"
                placeholder="Kampaniya Description"
                onChange={(e)=>setCreateDto({...createDto,Description:e.target.value})}
                value={createDto.Description}
              />
            </div>



            <CButton component="input" type="submit" color="primary"  >Create</CButton>
          </CForm>

        </CCardBody>
      </CCard>
    </div>
  )
}
