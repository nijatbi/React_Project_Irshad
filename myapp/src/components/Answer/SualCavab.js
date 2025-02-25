import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion';
import Footer from '../Footer'
import Loading from '../../Loading'
import '../../css/Answer.css'
import Spinner from 'react-bootstrap/Spinner';
export default function SualCavab() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const[buttonLoading,setButonloading]=useState(false)
  const [statusCode, setstatusCode] = useState('all')
  const [num, setNum] = useState(1)
  const[header,setHeader]=useState([])
  useEffect(() => {
    fetchData()
    getHeader()
  }, [statusCode,num])
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const fetchData = () => {
   
   axios.get(`http://localhost:5126/api/answer/GetAnswerWithStatusCode/${statusCode}/${num}`).then(res => {
    setData(res.data)
  }).catch(eror => {
    console.log(eror)
  })
  }
  const getHeader=()=>{
    axios.get(`http://localhost:5126/api/answer/GetHeader`).then(res=>{
      setHeader(res.data)
    })
    .catch(eror=>{
      console.log(eror)
    })
  }

  return (
   <React.StrictMode>
     <div style={{ width: '100%' }}>
      <div style={{ width: '90%', margin: '50px auto' }}>
        <div className="header">
          <h3 style={{ fontSize: '35px', fontWeight: 'bold' }}>Sual-Cavab</h3>
        </div>
        <div className="accordion" style={{ width: '75%', margin: '50px auto' }}>
          <div className="up">
            <button type='button' onClick={()=>{
              setButonloading(true)
              setTimeout(() => {
                setButonloading(false)
              }, 500);
              setstatusCode('all')
              fetchData()
            }}>Bütün suallar</button>
            
            {
              header.map((item,index)=>{
                return (
                  <button onClick={(e)=>{
                    setstatusCode(item.name)
                    fetchData()
                  }} type='button' key={index}>{item.name}</button>
                )
              })
            }

          </div>
          <div className="down">
          {data.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className={`accordion_item`}>
            <div
              className="accordion_header"
              onKeyDown={(e) => { if (e.key === 'Enter') toggleAccordion(index); }}
              role="button"
              tabIndex={0}
              onClick={() => toggleAccordion(index)}
            >
              <h4>{item.title}</h4>
              <i className={`fa-solid fa-chevron-down ${isOpen ? 'rotated' : ''}`}></i>
            </div>
            <div
              className={`accordion_body ${isOpen ? 'open' : ''}`}
              style={{ maxHeight: isOpen ? `${item.description.length * 1}px` : '0' }} 
            >
              <p>{item.description}</p>
            </div>
          </div>
        );
      })}
          
          </div>

        </div>

      </div>
      <div className="load_more">
        <button disabled={buttonLoading} className='load' type='button' onClick={()=>{
          setButonloading(true)
          setTimeout(() => {
            setButonloading(false)
          setNum(num+1);

          }, 500);
         fetchData()
         
        }}>
          {buttonLoading ? (
               <Spinner animation="border" role="status">
               <span className="visually-hidden">Loading...</span>
             </Spinner>
         
          ): 'Daha çoxuna bax'}
        </button>
      </div>
    </div>
    <Footer></Footer>
   </React.StrictMode>
  )
}
