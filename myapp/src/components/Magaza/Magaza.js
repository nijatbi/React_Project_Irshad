import React, { useState, useRef } from 'react'
import '../../css/Magaza.css'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useEffect } from 'react';
import Footer from '../Footer';
export default function Magaza() {
    const [center, setCenter] = useState({
        lat: 40.41011604135333,  // Example latitude (San Francisco)
        lng: 49.865720778128875 // Example longitude (San Francisco)
    })
    const mapRef = useRef(null);
    // const locations = [
    //     { id: 1, name: 'Location 1', position: { lat: 40.40923564966522, lng: 49.86266065185771 } },
    //     { id: 2, name: 'Location 2', position: { lat: 40.38986223297359, lng: 49.80326622671995 } },
    //     { id: 3, name: 'Location 3', position: { lat: 51.5074, lng: -0.1278 } },
    // ];
    const[locations,setLocation]=useState([])
    const [data, setData] = useState([]);
    const[search,setSearch]=useState('')
    const mapContainerStyle = {
        width: '100%',
        height: '650px',
    };
    useEffect(() => {
        FetchBaku()
    }, [],[locations])
   


    const focusLocation = (position,zoom) => {
        if (mapRef.current) {
          mapRef.current.panTo(position); 
          mapRef.current.setZoom(zoom);   
        }
      };
    
    const fetchData = (statusCode) => {
        axios.post(`http://localhost:5126/api/tienda/getlocation/${statusCode}`).then(res => {
            setData(res.data);
            if (data.length > 0) {
                setLocation(data.map((item,index)=>({...locations, 
                    id: index + 1,
                    name: `Location ${index + 1}`,
                    position: {
                        lat: parseFloat(item.langitudeandLatitude.split(",")[0]),
                        lng: parseFloat(item.langitudeandLatitude.split(",")[1]),
                    },
                    })))
            }
            console.log(res)
        }).catch(eror => {
            console.log(eror)
        })
       
        console.log(locations)
    }
    const FetchBaku=()=>{
        axios.get(`http://localhost:5126/api/tienda/OnlyBaki`).then(res=>{
            console.log(res)
            setData(res.data)
        }).catch(eror=>{
            console.log(eror);
        })
    }
    
   const Search=(e)=>{
    e.preventDefault();
    var results=data.filter(x=>x.cityName.toLowerCase().includes(search.toLowerCase()) || x.name.toLowerCase().includes(search.toLowerCase()))
    console.log(results)   
    setData(results)

   }
  

    return (
        <React.StrictMode>
              <div className='main'>
            <div className='frame'>
                <LoadScript googleMapsApiKey="AIzaSyBaAeYOgTIp_GHnyFtEmHV0c70ySqtkyh0">
                    <GoogleMap
                     onLoad={(map) => (mapRef.current = map)}
                        mapContainerStyle={mapContainerStyle}
                        zoom={5}
                        center={center}
                    >
                        {locations.map(location => (
                            <Marker
                                key={location.id}
                                position={location.position}
                                title={location.name}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
                <div className="magazalar_container">
                    <div className="up"><h3>Mağazalar</h3></div>
                    <div className="listCity">
                        <div onClick={() => fetchData(1)}>
                            <span >Bakı üzrə <sup>(26)</sup></span>
                        </div>
                        <div onClick={() => fetchData(2)}>
                            <span >Bölgələr üzrə <sup>(26)</sup></span>
                        </div>
                        <div onClick={() => fetchData(3)}>
                            <span >Servis mərkəzi <sup>(26)</sup></span>
                        </div>
                    </div>
                    <div className="search">
                        <form action="" onSubmit={Search}>
                            <input
                             type="search"
                             onChange={(e)=>setSearch(e.target.value)}
                             value={search}
                             placeholder='Axtar...' />
                             
                        </form>
                    </div>

                    <div className="tienda_list">
                        
                        {
                            data.map(item => {
                                return (
                                    <div className="tienda" onClick={(e)=>{
                                        focusLocation({
                                            lat: parseFloat(item.langitudeandLatitude.split(",")[0]),
                                            lng: parseFloat(item.langitudeandLatitude.split(",")[1]),
                                        },15)
                                    }}>
                                        <div className="left">
                                            <h4>{item.name}</h4>
                                            <span>{item.location}</span>
                                            <p>{item.workTime}</p>
                                        </div>
                                        <div className="right">
                                            <i class="fa-solid fa-share"></i>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>

        </div>
        <Footer></Footer>
        </React.StrictMode>
    )
}
