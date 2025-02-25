import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Loading  from '../../../Loading';
import { NavLink } from 'react-bootstrap';
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function KampaniyaList() {
    const[data,setData]=useState([])
    const token=useSelector(state=>state.token);
    const [loading, setLoading] = useState(true)
    const[search,setSearchFilter]=useState('')
    const[isSearch,setIsSearch]=useState('')
    const navigate=useNavigate();
  const[alert,setAlert]=useState(false)
    
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=()=>{
        axios.get(`http://localhost:5126/api/kampaniya/getall`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(res=>{
          filterCampaigns(res.data)
        })
        .catch(eror=>{
            console.log(eror)
        })
        setLoading(false)
    }
    const filterCampaigns = (data) => {
      const now = new Date(); // İndiki tarix
      const activeCampaigns = data.filter(campaign => {
        const endTime = new Date(campaign.endTime); // EndTime stringini Date-ə çeviririk
        return endTime > now; // EndTime gələcəkdədirsə, aktiv kampaniya olacaq
      });
  
      const expiredCampaigns = data.filter(campaign => {
        const endTime = new Date(campaign.endTime); // EndTime stringini Date-ə çeviririk
        return endTime < now; // EndTime keçmişdirsə, bitmiş kampaniya olacaq
      });
  
     
      setData(activeCampaigns)
    };
    const RemoveData=(id)=>{
      axios.delete(`http://localhost:5126/api/kampaniya/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then(res=>{
        console.log(res)
        fetchData()
      })
      .catch(eror=>{
        console.log(eror)
      })

    }
    const Search = (e) => {
      e.preventDefault()
      var result=data.filter(x=>x.title.toLowerCase().includes(search.toLowerCase()))

      if (search === '' || result.length==0) {
        fetchData()
      }
      else {
        console.log(result)
        if(result.length==0){
          setAlert(true)
          setIsSearch('Bele bir melumat tapilmadi')
          fetchData()
          setTimeout(() => {
            setAlert(false)
            setIsSearch('')
          }, 2000);
        }
        else{
          setData(result)
        }
       
      }
    }
    if(loading){
        return (
            <Loading></Loading>
        )
    }
  return (
    <div className='container' style={{ marginTop: '50px' }}>
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
            alert!==false && (
              <div style={{color:'white',textAlign:'center',fontSize:'14px',width:'100%',backgroundColor:'red',padding:'12px 0',fontWeight:'bold',margin:"20px 0"}}>{isSearch}</div>
            )
          }
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Kampaniya Table</strong>
              </CCardHeader>
              <CCardBody>
                <NavLink >
                  <CButton onClick={()=>navigate('/Admin/kampaniya/Create')} type='button' style={{ backgroundColor: '#6261cc', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                    Create Kampaniya
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
                          <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Start Time</CTableHeaderCell>
                          <CTableHeaderCell scope="col">End Time</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Is Ending</CTableHeaderCell>
                          <CTableHeaderCell scope="col">IsDeleted</CTableHeaderCell>

                          <CTableHeaderCell style={{ width: '40px' }} scope="col">Settings</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {
                          data.map((item, index) => {
                            return <CTableRow>
                            <CTableHeaderCell scope="row"><img style={{width:'50px',height:'50px'}} src={`http://localhost:5126/img/${item.imageUrl}`}/></CTableHeaderCell>

                              <CTableDataCell>{item.startTime}</CTableDataCell>
                              <CTableDataCell>{item.endTime}</CTableDataCell>
                              <CTableDataCell>{item.endTime==Date.now() ? 'Deactive' : 'Active'}</CTableDataCell>
                              <CTableDataCell>{item.isDeleted ? <span style={{color:'red'}}>Deleted</span>: <span >No Deleted</span>}</CTableDataCell>

                              <CTableDataCell>
                                {
                                  <a onClick={() => RemoveData(item.id)}>
                                    {
                                      !item.isDeleted && <i style={{ cursor: 'pointer' }} class="fa-solid fa-trash"></i>
                                    }
                                  </a>
                                }
                                <a href={`/Admin/kampaniya/${item.id}`}>
                                  <i style={{ cursor: 'pointer' }} class="fa-solid fa-circle-info mx-2"></i>
                                </a>
                                <a  href={`/Admin/kampaniya/Update/${item.id}`}>
                        <i style={{cursor:'pointer'}} class="fa-solid fa-pen-to-square"></i>
                      </a>
                              </CTableDataCell>
                            </CTableRow>
                          })
                        }
                      </CTableBody>
                    </CTable>
                  </div>
                  <div class="modalContainer">

	

</div>
                </div>
                {/* <CPagination aria-label="Page navigation example">
          <CPaginationItem aria-label="Previous" disabled={skip === 0} onClick={() => onPageChange(skip / take)}>
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
          {[...Array(Math.ceil(size/4)).keys()].map((page) => (
            <CPaginationItem key={page} active={page === skip / take} onClick={() => onPageChange(page + 1)}>
              {page + 1}
            </CPaginationItem>
          ))}
          <CPaginationItem
            aria-label="Next"
            disabled={skip + take >= size}
            onClick={() => onPageChange((skip + take) / take + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination> */}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </div>
  </div>
  )
}
