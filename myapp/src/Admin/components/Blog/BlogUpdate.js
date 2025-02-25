import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
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
export default function BlogUpdate() {
  var location=useLocation();
  const token=useSelector(state=>state.token);
  const id = location.pathname.split("/")[4]
  const[loading,setLoading]=useState(true);
  const[data,setData]=useState({});
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const[changeImage,setChangeImage]=useState(false)
  const[updateDto,setUpdateDto]=useState({})
  const[alert,setAlert]=useState({})
  const handleContentChange = (html) => {
    setUpdateDto((prevState) => ({
      ...prevState,
      description: html,
    }));
  };
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData=()=>{
    setLoading(true)
    axios.get(`http://localhost:5126/api/blog/${id}`).then(res=>{
      console.log(res.data)
      setData(res.data)
      setSelectedImage(res.data.imageUrl)
      setChangeImage(false)
      setUpdateDto(res.data)
    }).catch(eror=>{
      console.log(eror)
    })
    setLoading(false)
  }
  const onUpdate=(e)=>{
    e.preventDefault();
    axios.put(`http://localhost:5126/api/blog`,updateDto,{
        headers:{
            "Content-Type":'multipart/form-data',
            Authorization:`Bearer ${token}`
        }
    }).then(res=>{
        console.log(res)
        navigate('/admin/blog')
    }).catch(eror=>{
        console.log(eror)
        if (typeof eror.response.data == "object") {
            setAlert({
                Image: eror.response.data.errors.imageUrl,
                Title: eror.response.data.errors.title,
                Description:eror.response.data.errors.description
            })
        }
        else if(typeof eror.response.data == "string"){
            setAlert({data:eror.response.data})
        }

        setTimeout(() => {
            setAlert({
                Title: '',
                Image: '',
                data: '',
                Description:''
            })
        }, 2000);
    })
  }

  return (
    <div>
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Blog Update</strong>
            </CCardHeader>
            <CCardBody >
                <NavLink  >
                    <CButton onClick={() => navigate('/admin/blog')} type='button' style={{ backgroundColor: 'gray', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                        Go To Index
                    </CButton>
                </NavLink>
                <CForm onSubmit={onUpdate}>
                    {
                        alert.data !== undefined && (
                            <span style={{ color: 'red', fontSize: '14px', marginBottom: '0px', display: 'block', marginTop: '10px' }}>{alert.data}</span>
                        )
                    }
                    <div style={{ marginTop: '40px', }} className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1" style={{ marginBottom: '15px' }}>Blog Title</CFormLabel>
                        <div>
                            {
                                alert.Title !== undefined && (
                                    <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.Title}</span>
                                )
                            }
                        </div>
                        <CFormInput onChange={(e) => setUpdateDto({ ...updateDto, title: e.target.value })}
                            value={updateDto.title}
                            type="text"
                            placeholder="BlogTitle"
                        />
                        <div className="mb-3">
                            <label for="fileField" class="attachment" style={{ padding: '20px 0' }}>
                                <span style={{ display: 'block', marginBottom: '30px' }}>Image</span>
                                {
                                    alert.Image !== undefined && (
                                        <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.Image}</span>
                                    )
                                }
                                <div class="row btn-file">
                                    <div class="btn-file__preview"></div>
                                    <div class="btn-file__actions">
                                        <div class="btn-file__actions__item col-xs-12 text-center">
                                            <div style={{ width: '200px', height: '150px', border: '1px solid #dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }} class="btn-file__actions__item--shadow">
                                                {
                                                    selectedImage == null && (
                                                        <i class="fa fa-plus fa-lg fa-fw" aria-hidden="true"></i>
                                                    )
                                                }
                                                {
                                                    (selectedImage && changeImage==false) && (
                                                        <img src={`http://localhost:5126/blog/${selectedImage}`} alt="Selected" style={{ width: '100%', height: '60%' }} />
                                                    )
                                                }
                                                {
                                                    changeImage && (
                                                        <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '60%' }} />

                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    onChange={(e) => {
                                      setUpdateDto({ ...updateDto, imageUrl: e.target.files[0] })
                                        if (e.target.files[0]) {
                                              setChangeImage(true)

                                            setSelectedImage(URL.createObjectURL(e.target.files[0]));
                                            console.log(selectedImage)
                                        }

                                    }
                                    }

                                    name="file" type="file" id="fileField" style={{ visibility: 'hidden' }} />
                            </label>
                        </div>
                    </div>
                    <div style={{ marginBottom: '40px' }}>
                        <p style={{ marginBottom: '20px' }}>Blog Description</p>
                       <div>
                       {
                        alert.Description!==undefined && (
                            <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.Description}</span>
                        )
                       }
                       </div>
                        <ReactQuill style={{ height: '300px' }}
                            modules={BlogUpdate.modules}
                            formats={BlogUpdate.formats}
                            value={updateDto.description}
                            onChange={ handleContentChange}
                        />
                    </div>


                <CButton style={{marginTop:'50px'}} component="input" type="submit" color="primary"  >Update</CButton>
                </CForm>

            </CCardBody>
        </CCard>
    </div>
)
}
BlogUpdate.modules = {
toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
    ['clean'], // remove formatting button
],
};

// Define Quill formats
BlogUpdate.modules = {
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
