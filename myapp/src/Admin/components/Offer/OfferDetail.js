import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
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
import axios
  from 'axios'
export default function OfferDetail() {
    const location = useLocation();
    const id = location.pathname.split("/")[3]
    const [data, setData] = useState({});
    const [dataTime, setDateTime] = useState({})
    const [isModal, setIsModal] = useState(false)
    const token = useSelector(state => state.token);
    const [successMessage, setsuccessMessage] = useState('')
    const [replycontactDto, setReplyContactDto] = useState({
      id: id
    });
  const [replyEror, setReplyEror] = useState('')
  useEffect(()=>{
    fetchData()
  },[])  
  
  const fetchData=()=>{
        axios.get(`http://localhost:5126/api/offer/getById/${id}`).then(res=>{
            console.log(res.data)
            setData(res.data)
        }).catch(eror=>{
            console.log(eror)
        })
    }
    const ReplyComment=()=>{

    }
  return (
    <div>
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Offer-Detail Table</strong>
          </CCardHeader>

          <CCardBody>
            <a href='/admin/sikayetler'>
              <CButton type='button' style={{ backgroundColor: '#6261cc', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
                Go To Index
              </CButton>
            </a>
            <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
              <div className="dash__table-2-wrap gl-scroll">

                <CTable borderless>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                      <CTableHeaderCell scope="col">IsDeleted</CTableHeaderCell>

                      <CTableHeaderCell scope="col">SendTime</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell>{data.nameAndSurname}</CTableDataCell>
                      <CTableDataCell>{data.phone}</CTableDataCell>
                      <CTableDataCell>{data.isDeleted ? <span style={{ color: 'red' }}>Deleted</span> : "Active"}</CTableDataCell>

                      <CTableDataCell>{data.sendTime}</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>

              </div>

            </div>
            <div>
              <label htmlFor="" style={{ display: 'block', marginTop: '50px', fontWeight: 'bold' }}>Message</label>
              <textarea value={data.message} name="" id="" style={{ width: '100%', padding: '12px 20px', height: 'auto', border: '1px solid #dbdbdb', borderRadius: '6px' }}>

              </textarea>
              {/* <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ backgroundColor: 'green', padding: '12px 20px', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '6px', marginTop: '15px' }}>
                Cavab ver
              </button> */}
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    {/* <div>
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Cavab məktubu</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form action="" onSubmit={ReplyComment}>
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
                <textarea onChange={(e) => setReplyContactDto({ ...replycontactDto, message: e.target.value })} value={replycontactDto.message} style={{ padding: '12px 10px', width: '100%', height: 'auto', border: '1px solid #dbdbdb', borderRadius: '5px' }} placeholder='Message' name="" id=""></textarea>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Send</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div> */}
  </div>
  )
}
