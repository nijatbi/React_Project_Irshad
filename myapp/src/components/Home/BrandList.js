import React, { useState, useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
export default function BrandList() {
    const[data, setData] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = () => {
        axios.get(`http://localhost:5126/api/brand/getall`).then(res => {
            console.log(res)
            setData(res.data)
        }).catch(eror => {
            console.log(eror)
        })
    }
    return (
        <div className="container_fluid" style={{marginTop:'100px'}}>
          <div className="fluid_content">
              {data.length > 0 ? (
                <OwlCarousel className="owl-theme"
                loop
                margin={10}
                nav
                responsive={{
                  0: { items: 1 },
                  600: { items: 3 },
                  1000: { items: 6 },
                }}>
                  {data.map((item, index) => (
                    <div className="item" key={index}>
                      <div className="brand_item">
                        <a href="#">
                          <img
                            src={`http://localhost:5126/brand/${item.imageUrl}`}
                            alt={`Brand ${index}`}
                          />
                        </a>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              ) : (
                <p>Brendlər mövcud deyil.</p>
              )}
          </div>
        </div>
      );

}