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
import Loading from '../../../Loading'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
export default function BrandUpdate() {
    const navigate=useNavigate();
    const location =useLocation();
    const id = location.pathname.split("/")[4]
    const token=useSelector(state=>state.token)
    const[data,setData]=useState({})
    const[loading,setLoading]=useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const[alert,setAlert]=useState({})
    console.log(id)
    useEffect(()=>{
        fetchData();
    },[])
    const fetchData=()=>{
        setLoading(true)

        axios.get(`http://localhost:5126/api/Brand/${id}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(res=>{
            setData(res.data)
            setSelectedImage(`http://localhost:5126/brand/${res.data.imageUrl}`)
            console.log(res.data);
        })
        .catch(eror=>{
            console.log(eror)
        }
            
        )
        setLoading(false)
    }
    const onUpdate=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:5126/api/Brand/Update/${id}`,data,{
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'multipart/form-data'
            }
        }).then(res=>{
            navigate('/admin/brand')
        })
        .catch(eror=>{
            if(typeof eror.response.data=="string"){
                setAlert({
                    data:eror.response.data
                })
            }
            else if(typeof eror.response.data=="object"){
                setAlert({
                    Image: eror.response.data.errors.formFile,
                    Name: eror.response.data.errors.Name
                })
            }
            setTimeout(() => {
                setAlert({
                    Image:'',
                    data:'',
                    Name:''
                })
            }, 2000);
            console.log(eror)
        })
    }

if(loading==true){
    return <Loading></Loading>
}

  return (
    <div>
       <CCard className="mb-4">
    <CCardHeader>
      <strong>Brand Update</strong>
    </CCardHeader>
    <CCardBody>
    <NavLink >
                        <CButton onClick={()=>navigate('/admin/brand')} type='button' style={{backgroundColor:'gray',color:'white',border:'0'}} color="primary" className="px-4 mb-4">
                        Go To Index
                        </CButton>
                    </NavLink>
    <CForm onSubmit={onUpdate}>
    <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">Brand Name</CFormLabel>
            {
                                    alert.data !== undefined && (
                                        <span style={{ color: 'red', fontSize: '14px',marginBottom:'10px',display:'block',marginTop:'10px' }}>{alert.data}</span>
                                    )
                                }
                                <div>
                                {
                                    alert.Name !== undefined && (
                                        <span style={{ color: 'red', fontSize: '14px',marginBottom:'10px',display:'block' }}>{alert.Name}</span>
                                    )
                                }
                            </div>
            <CFormInput
              type="text"
              placeholder="Brand Name"
              onChange={(e)=>setData({...data,name:e.target.value})}
              value={data.name}
            />
          </div>
         
         
       
          <div className="mb-3">
                            <label for="fileField" class="attachment" style={{ padding: '20px 0' }}>
                                <span style={{ display: 'block', marginBottom: '30px' }}>Image</span>
                                {
                                    alert.Image !== undefined && (
                                        <span style={{ color: 'red', fontSize: '14px',marginBottom:'10px',display:'block' }}>{alert.Image}</span>
                                    )
                                }
                                <div class="row btn-file">
                                    <div class="btn-file__preview"></div>
                                    <div class="btn-file__actions">
                                        <div class="btn-file__actions__item col-xs-12 text-center">
                                            <div style={{ width: '200px', height: '150px', border: '1px solid #dbdbdb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }} class="btn-file__actions__item--shadow">
                                               {
                                                selectedImage==null &&(
                                                    <i class="fa fa-plus fa-lg fa-fw" aria-hidden="true"></i>
                                                )
                                               }
                                                {
                                                    selectedImage && (
                                                        <img src={selectedImage} alt="Selected" style={{ width: '70%', height: '70%' }} />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                                <input
                                    onChange={(e) => {
                                        setData({...data,formFile:e.target.files[0]})
                                        if(e.target.files[0]){
                                            setSelectedImage(URL.createObjectURL(e.target.files[0]));
                                        }
                                        
                                    }
                                    }
                                    name="file" type="file" id="fileField" style={{ visibility: 'hidden' }} />
                            </label>
                        </div>
            <CButton component="input" type="submit" color="primary" value="Update">Update Brand</CButton>
        </CForm>
       
    </CCardBody>
  </CCard>
    </div>
  )
}
