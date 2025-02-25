import React, { useEffect, useState } from 'react'
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
import { NavLink } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
export default function BlogCreate() {
    const token = useSelector(state => state.token);
    const [createDto, setCreateDto] = useState({})
    const [alert, setAlert] = useState({})
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const[description,setDesc]=useState()
    const onCreate = (e) => {
        e.preventDefault()
        console.log(createDto)
        axios.post(`http://localhost:5126/api/blog/create`,createDto,{
            headers:{
                "Content-Type":'multipart/form-data',
                Authorization:`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res)
            navigate("/admin/blog")
        }).catch(eror=>{
            console.log(eror)
            if (typeof eror.response.data == "object") {
                setAlert({
                    Image: eror.response.data.errors.formFile,
                    Title: eror.response.data.errors.Title,
                    Description:eror.response.data.errors.Description
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
    const handleContentChange = (html) => {
        setCreateDto((prevState) => ({
          ...prevState,
          Description: html,
        }));
      };
  
    return (
        <div>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Blog Create</strong>
                </CCardHeader>
                <CCardBody >
                    <NavLink  >
                        <CButton onClick={() => navigate('/admin/blog')} type='button' style={{ backgroundColor: 'gray', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                            Go To Index
                        </CButton>
                    </NavLink>
                    <CForm onSubmit={onCreate}>
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
                            <CFormInput onChange={(e) => setCreateDto({ ...createDto, Title: e.target.value })}
                                value={createDto.Title}
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
                                                        selectedImage && (
                                                            <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '60%' }} />
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
                                modules={BlogCreate.modules}
                                formats={BlogCreate.formats}
                                value={createDto.Description}
                                onChange={ handleContentChange}
                            />
                        </div>


                        <CButton component="input" type="submit" color="primary"  >Create</CButton>
                    </CForm>

                </CCardBody>
            </CCard>
        </div>
    )
}
BlogCreate.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        ['clean'], // remove formatting button
    ],
};

// Define Quill formats
BlogCreate.modules = {
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

