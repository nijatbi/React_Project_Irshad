import React, { useEffect, useState } from 'react'
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
import '../../../css/Modal.css'
import { NavLink } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../../Loading'
import { useSelector } from 'react-redux'
export default function PolicyList() {
  const [data, setData] = useState([])
  const [search, setSearchFilter] = useState('')
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const [successCreate, setsuccessCreate] = useState(false)

  const navigate = useNavigate()
  const [createDto, setCreateDto] = useState({})
  const token = useSelector(state => state.token);
  const [eror, setEror] = useState({})
  const [createBool, setCreateBool] = useState(false)
  const [updateBool, setUpdateBool] = useState(false)
  const [UpdateDto, setUpdateDto] = useState({})
  const[updateId,setUpdateId]=useState(0)
  useEffect(() => {
    fetchData()
  }, [successCreate])

  const fetchData = () => {
    setLoading(true)
    axios.get(`http://localhost:5126/api/policy/getall`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setData(res.data)
      onCreate();
    })
      .catch(eror => {
        console.log(eror)
      })
    setLoading(false)
  }
  const Search = (e) => {
    e.preventDefault()
    if (search == '' || search == null) {
      fetchData();
    }
    else {

      var result = data.filter(x => x.key.toLowerCase().includes(search.toLowerCase()))
      if (result.length == 0) {
        setAlert("Axtarisa uygun melumat tapilmadi")
        setTimeout(() => {
          setAlert('')
        }, 2000);
        fetchData();
      }
      else {
        setData(result)

      }

      console.log(result)
    }
  }
  const onCreate = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5126/api/policy/create`, createDto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'multipart/form-data'

      }
    }).then(res => {
      console.log(res)
      setsuccessCreate(true)

      setCreateDto({
        Key: '',
        Value: ""
      })

    }
    ).catch(eror => {
      console.log(eror)
      if (typeof eror.response.data == "object") {
        setEror({
          Key: eror.response.data.errors.Key,
          Value: eror.response.data.errors.Value,
        })
      }
      else if (typeof eror.response.data == "string") {
        setEror({ data: eror.response.data })
      }
      setTimeout(() => {
        setEror({
          data: '',
          Key: '',
          Value: ''
        })
      }, 2000);
    })
    setTimeout(() => {
      setsuccessCreate(false)
    }, 2000);
  }
  const RemoveData = (id) => {
    axios.delete(`http://localhost:5126/api/policy/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
      fetchData()
    })
      .catch(eror => {
        console.log(eror)
      })
  }

  const getById=(id)=>{
    axios.get(`http://localhost:5126/api/policy/${id}`).then(res=>{
      console.log(res)
      setUpdateDto({
        Key:res.data.key,
        Value:res.data.value
      })
    }).catch(eror=>{
      console.log(eror)
    })
  }

  const onUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5126/api/policy/${updateId}`, UpdateDto, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res)
    })
      .catch(eror => {
        console.log(eror)
        if (typeof eror.response.data == "object") {
          setEror({
            Key: eror.response.data.errors.Key,
            Value: eror.response.data.errors.Value,
          })
        }
        else if (typeof eror.response.data == "string") {
          setEror({ data: eror.response.data })
        }
        setTimeout(() => {
          setEror({
            data:'',
            Key:'',
            Value:''
          })
        }, 2000);
      })

  }
  if (loading) {
    return <Loading></Loading>
  }
  return (

    <div className='container' style={{ marginTop: '50px' }}>
      {
        successCreate == true && (
          <div style={{ display: 'inline-block' }} className='successCreate'>
            Policy create succesfuly
          </div>
        )
      }


      <div className='row'>

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
            <CFormSelect size="md" className="mb-3 w-25 mx-2" aria-label="Large select example">
              <option value="0">Search by different category</option>
              <option value="2">Show Last Week Created </option>
              <option value="3">Show Last Month Created </option>
              <option value="1">Show Last Day Created </option>
              <option value="4">Show Last Day Deleted </option>
              <option value="5">Show Last Week Deleted </option>
              <option value="6">Show Last Month Deleted </option>
              <option value="7">Show Last Day Updated </option>
              <option value="8">Show Last Week Updated </option>
              <option value="9">Show Last Month Updated </option>
            </CFormSelect>
            {
              alert != '' && (
                <div style={{ color: 'white', fontSize: '16px', textAlign: 'center', backgroundColor: 'red', width: '100%', padding: '12px 0' }}>{alert}</div>
              )
            }
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong >Policy Table</strong>
                </CCardHeader>
                <CCardBody>
                  <NavLink to="/Admin/Brand/Create">
                    <CButton onClick={() => setCreateBool(true)} type='button' style={{ backgroundColor: '#6261cc', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                      Create Policy
                    </CButton>
                  </NavLink>
                  {/* {
                      responseMessage&&<p className='text-danger my-2'>{responseMessage}</p>
                    } */}
                  <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
                    <div className="dash__table-2-wrap gl-scroll">

                      <CTable borderless>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Key</CTableHeaderCell>
                            <CTableHeaderCell scope="col">IsDeleted</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Created</CTableHeaderCell>

                            <CTableHeaderCell style={{ width: '40px' }} scope="col">Settings</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {
                            data.map((item, index) => {
                              return <CTableRow>
                                <CTableHeaderCell >{item.key}</CTableHeaderCell>
                                <CTableDataCell>{item.isDeleted ? <span style={{ color: 'red' }}>Deleted</span> : "Active"}</CTableDataCell>
                                <CTableDataCell>{item.datetime.split(" ")[0]}</CTableDataCell>
                                <CTableDataCell>
                                  {
                                    <a onClick={() => RemoveData(item.id)}>
                                      {
                                        !item.isDeleted && <i style={{ cursor: 'pointer' }} class="fa-solid fa-trash"></i>
                                      }
                                    </a>
                                  }
                                  <a href={`/Admin/Policy/${item.id}`}>
                                    <i style={{ cursor: 'pointer' }} class="fa-solid fa-circle-info mx-2"></i>
                                  </a>
                                  <a onClick={() => {
                                    setUpdateBool(true)
                                    setUpdateId(item.id)
                                    getById(item.id)
                                    console.log(UpdateDto)
                                  }}>
                                    <i style={{ cursor: 'pointer' }} class="fa-solid fa-pen-to-square"></i>
                                  </a>
                                
                                </CTableDataCell>
                              </CTableRow>
                            })
                          }
                        </CTableBody>
                      </CTable>
                    </div>
                  </div>
                  {
                                    updateBool == true && (
                                      <div class="modals-container" style={{ display: 'block' }}>

                                        <div class="modalContent" >
                                          <div class="modalUp">
                                            <span onClick={() => setUpdateBool(false)}>X</span>
                                          </div>
                                          <div class="modal-body" id="scrollbar1">
                                            <h3>Update Policy</h3>

                                            <form  onSubmit={onUpdate}>
                                              <div className='input-form'>
                                                <label htmlFor="">Key daxil ed</label>
                                                {
                                                  eror.Key !== undefined && (
                                                    <div style={{ color: 'red', margin: '10px 0', fontSize: '15px' }}>{eror.Key}</div>
                                                  )
                                                }
                                                <textarea
                                                  name=""
                                                  onChange={(e) => setUpdateDto({ ...UpdateDto, Key: e.target.value })}
                                                  value={UpdateDto.Key}
                                                  rows={3} id="" placeholder='Add Key'></textarea>
                                              </div>
                                              <div className='input-form'>
                                                <label htmlFor="">Value daxil ed</label>
                                                {
                                                  eror.Value !== undefined && (
                                                    <div style={{ color: 'red', margin: '10px 0', fontSize: '15px' }}>{eror.Value}</div>
                                                  )
                                                }
                                                <textarea rows={8} name="" id="" placeholder='Add Value'
                                                  onChange={(e) => setUpdateDto({ ...UpdateDto, Value: e.target.value })}
                                                  value={UpdateDto.Value}
                                                ></textarea>

                                              </div>
                                              <div className='craeteButton'>
                                                <button type='submit'>Update</button>
                                              </div>
                                            </form>
                                          </div>

                                        </div>
                                      </div>
                                    )
                                  }
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
      </div>
      {
        createBool == true && (
          <div class="modals-container" style={{ display: 'block' }}>

            <div class="modalContent" >
              <div class="modalUp">
                <span onClick={() => setCreateBool(false)}>X</span>
              </div>
              <div class="modal-body" id="scrollbar1">
                <h3>Create Policy</h3>

                <form action="" onSubmit={onCreate}>
                  <div className='input-form'>
                    <label htmlFor="">Key daxil ed</label>
                    {
                      eror.Key !== undefined && (
                        <div style={{ color: 'red', margin: '10px 0', fontSize: '15px' }}>{eror.Key}</div>
                      )
                    }
                    <textarea
                      name=""
                      onChange={(e) => setCreateDto({ ...createDto, Key: e.target.value })}
                      value={createDto.Key}
                      rows={3} id="" placeholder='Add Key'></textarea>
                  </div>
                  <div className='input-form'>
                    <label htmlFor="">Value daxil ed</label>
                    {
                      eror.Value !== undefined && (
                        <div style={{ color: 'red', margin: '10px 0', fontSize: '15px' }}>{eror.Value}</div>
                      )
                    }
                    <textarea rows={8} name="" id="" placeholder='Add Value'
                      onChange={(e) => setCreateDto({ ...createDto, Value: e.target.value })}
                      value={createDto.Value}
                    ></textarea>

                  </div>
                  <div className='craeteButton'>
                    <button type='submit'>Create</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        )
      }

    </div>
  )

}
