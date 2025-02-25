import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../Loading';
import { NavLink } from 'react-router-dom';
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
import '../../../css/Vakansiya.css'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'; // CSS stilini əlavə edin

import { useSelector } from 'react-redux';
export default function CvList() {
  const { name } = useParams();
  const formattedTitle = decodeURIComponent(name.replace(/-/g, ' '));
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [search, setSearchFilter] = useState('')
  const token = useSelector(state => state.token)
  const [imageActive, setImageActive] = useState(false)
  const [alert, setAlert] = useState('')
  const [sendMessageCVDto, setsendMessageCVDto] = useState({})
  const [successMessage, setsuccessMessage] = useState('')
  const [replyEror, setReplyEror] = useState('')

  const [modalImageUrl, setimageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = () => {
    setLoading(true)
    axios.get(`http://localhost:5126/api/vakansiya/getcv/${formattedTitle}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setData(res.data.returnCVdtos)
    }).catch(eror => {
      console.log(eror)
    })
    setLoading(false)
  }

  const RemoveData = (id) => {
    axios.delete(`http://localhost:5126/api/vakansiya/cvdelete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
      fetchData()
    }).catch(eror => {
      console.log(eror)
    })
  }
  const Search = (e) => {
    e.preventDefault()
    if (search == null || search == '') {
      fetchData()
    }
    else {

      axios.get(`http://localhost:5126/api/vakansiya/searchcvlist/${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => {
        if (res.data.length == 0) {
          setAlert("Hec bir melumat tapilmadi")
          setTimeout(() => {
            setAlert('')
          }, 1500);

        }
        else {
          setData(res.data)
        }
      }).catch(eror => {
        console.log(eror)
      })
    }
  }
  const RepylComment = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5126/api/vakansiya/SendMessage`,sendMessageCVDto,{
      headers:{
        "Content-Type":'multipart/form-data',
        Authorization:`Bearer ${token}`
      }
    }).then(res=>{
      console.log(res)
      setsuccessMessage('Mesajiniz ugurla gonderildi')
      setTimeout(() => {
        setsuccessMessage('')
      }, 2000);
      setsendMessageCVDto({
        Message:'',
        Email:sendMessageCVDto.Email
      })
    }).catch(eror=>{
      console.log(eror)
      setReplyEror('Mesaj hissesini bos buraxmayin')
      setTimeout(() => {
        setReplyEror('')
      }, 1500);
    })
    console.log(sendMessageCVDto)

  }
  if (loading) {
    return (<Loading></Loading>)
  }
  return (
    <div className='container' style={{ marginTop: '50px' }}>
      <div className='row' >

        <div className="down">
          <CRow>
            <CForm onSubmit={Search}>
              <CInputGroup className="mb-3">
                <CButton className='btn btn-outline-warning' type="submit" color="secondary" variant="outline" id="button-addon1">Search</CButton>
                <CFormInput
                  autoComplete='off'
                  aria-label="Example text with button addon"
                  onChange={(e) => setSearchFilter(e.target.value)}
                  value={search}
                  aria-describedby="button-addon1"
                  type="text"
                  placeholder="Search By  Name" />

                <span className='text-warning mx-2' style={{ cursor: 'pointer' }} ><i class="fa-solid fa-globe  fs-5 my-2"></i></span>
              </CInputGroup>

            </CForm>
          
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong >CV Table</strong>
                </CCardHeader>
                {
                  alert !== '' && (
                    <div style={{ width: '100%', textAlign: 'center', backgroundColor: 'red', padding: '12px 20px' }}> <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>{alert}</span></div>
                  )
                }
                <CCardBody>

                  {/* {
                      responseMessage&&<p className='text-danger my-2'>{responseMessage}</p>
                    } */}
                  <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
                    <div className="dash__table-2-wrap gl-scroll">

                      <CTable borderless>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Ad</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Soyad</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Ata adi</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Cins</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Telefon nomresi</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Aile vezyeti</CTableHeaderCell>
                            <CTableHeaderCell scope="col">CV</CTableHeaderCell>

                            <CTableHeaderCell style={{ width: '40px' }} scope="col">Settings</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {
                            data.map((item, index) => {
                              return <CTableRow key={index}>
                                <CTableHeaderCell >{item.name}</CTableHeaderCell>
                                <CTableHeaderCell >{item.surname}</CTableHeaderCell>
                                <CTableDataCell>{item.fatherName}</CTableDataCell>

                                <CTableHeaderCell >{item.gender}</CTableHeaderCell>
                                <CTableHeaderCell >{item.email}</CTableHeaderCell>

                                <CTableHeaderCell >{item.phoneNumber}</CTableHeaderCell>
                                <CTableHeaderCell >{item.familyPosition}</CTableHeaderCell>
                                <CTableHeaderCell >
                                  <a onClick={() => {
                                    setImageActive(true)
                                    setimageUrl(item.cvImage)
                                  }}>CV-ə bax</a>


                                </CTableHeaderCell>


                                <CTableDataCell>
                                  {
                                    <a onClick={() => RemoveData(item.id)}>
                                      {
                                        !item.isDeleted && <i style={{ cursor: 'pointer' }} class="fa-solid fa-trash"></i>
                                      }
                                    </a>
                                  }
                                  <a onClick={(e) => {
                                    setsendMessageCVDto({ ...sendMessageCVDto, Email: item.email })
                                  }} >
                                    <button style={{backgroundColor:'transparent',border:'none'}} data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                                      <i style={{ color: 'red', marginLeft: "10px" }} class="fa-solid fa-reply"></i>

                                    </button>
                                  </a>

                                </CTableDataCell>
                              </CTableRow>
                            })
                          }
                        </CTableBody>
                      </CTable>
                    </div>
                  </div>
                  <div class="pagination" style={{ marginTop: '30px ' }}>
                    <a href="#">&laquo;</a>
                    <a href="#">1</a>
                    <a class="active" href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#">5</a>
                    <a href="#">6</a>
                    <a href="#">&raquo;</a>
                  </div>
                </CCardBody>

              </CCard>
            </CCol>
          </CRow>
        </div>
        {
          imageActive && (
            <div className='modal_cv' onClick={(e) => {
              // modal_cv dışındaki alanı tıkladığımızda
              if (e.target === e.currentTarget) {
                setImageActive(false);
              }

            }}>
              <div className="cv_content" onClick={(e) => {
                e.stopPropagation();
              }}>
                <Zoom>
                  <img src={`http://localhost:5126/vakansiya/${modalImageUrl}`} alt={modalImageUrl} />

                </Zoom>
              </div>
            </div>
          )
        }
        <div>
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">Cavab məktubu</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form action="" onSubmit={RepylComment}>
                    {
                      replyEror !== undefined && (
                        <div style={{ color: 'red', fontSize: '14px', margin: '20px 0' }}>{replyEror}</div>
                      )
                    }
                    {
                      successMessage !== undefined && (
                        <div style={{ color: 'green', fontSize: '14px', margin: '20px 0' }}>{successMessage}</div>
                      )
                    }
                    <textarea onChange={(e) => setsendMessageCVDto({ ...sendMessageCVDto, Message: e.target.value })} value={sendMessageCVDto.Message} style={{ padding: '12px 10px', width: '100%', height: 'auto', border: '1px solid #dbdbdb', borderRadius: '5px' }} placeholder='Message' name="" id=""></textarea>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary">Send</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
