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
  CFormSelect,
  CFormCheck
} from '@coreui/react'
import { NavLink } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
export default function ProductCreate() {
  const token = useSelector(state => state.token);
  const [createDto, setCreateDto] = useState({
    isOnline: false,
    CategoryId: null,
    BrandId: null,
    Price: null,
    Count: null,
  })
  const [alert, setAlert] = useState({})
  const [selectedImages, setSelectedImages] = useState([]);
  const [brands, setBrands] = useState([])
  const [kampaniyas, setKampaniyas] = useState([])
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();
  const [goldZemanet, setgoldZemanet] = useState(false)
  useEffect(() => {
    getBrands()
    getCategory()
    getKampaniya()
  }, [])
  useEffect(() => {
    console.log(goldZemanet)
  }, [goldZemanet])
  const handleContentChange = (html) => {
    setCreateDto((prevState) => ({
      ...prevState,
      Description: html,
    }));
  };


  const handleImageSelect = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.error("Fayllar seçilməyib!");
      return;
    }
    const fileNames = Array.from(event.target.files).map((file) => file.name);

    const fileArray = Array.from(files);
  
    // `File` obyektlərini `createDto.Files`-ə əlavə edirik
    setCreateDto((prevDto) => ({
      ...prevDto,
      Files: fileArray, // Yalnız fayl adlarını array kimi saxlayırıq
    }));
  
    // Önizləmə üçün URL-lər yaratmaq
    const imagePreviews = fileArray.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...imagePreviews]);
  
    console.log("Seçilmiş fayllar:", fileArray);
  };
  
  const handleImageDelete = (imageToDelete) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image !== imageToDelete)
    );
  
    // Seçilmiş şəkli `createDto.Files`-dən də silmək lazımdır
    setCreateDto((prev) => ({
      ...prev,
      Files: prev.Files.filter((file, index) => 
        URL.createObjectURL(file) !== imageToDelete
      ),
    }));
  };
  
 
  useEffect(() => {
    // setCreateDto((prevDto) => ({
    //   ...prevDto,
    //   Files: selectedImages
    // }));
  }, [selectedImages])


  // const onCreate = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   for (let key in createDto) {
  //     if (key === "Files") {
  //       if (Array.isArray(createDto.Files) && createDto.Files.length > 0) {
  //         createDto.Files.forEach((file) => {
  //           if (file instanceof File) { // Yalnız File obyektlərini əlavə edirik
  //             formData.append("Files", file);
  //           } else {
  //             console.error("Düzgün formatda fayl deyil!", file);
  //           }
  //         });
  //       } else {
  //         console.error("Files array deyil və ya boşdur!");
  //       }
  //     } else {
  //       formData.append(key, createDto[key]);
  //     }
  //   }

  //   axios.post(`http://localhost:5126/api/product/Create`, formData).then(res => {
  //     console.log(res)
  //   }).catch(eror => {
  //     console.log(eror)
  //     if (typeof eror.response.data == "object") {
  //       setAlert({
  //         Name: eror.response.data.errors.Name,
  //         Files: eror.response.data.errors.Files,
  //         ZemanetDate: eror.response.data.errors.ZemanetDate,
  //         BrandId: eror.response.data.errors.BrandId,
  //         CategoryId: eror.response.data.errors.CategoryId,
  //         Count: eror.response.data.errors.Count,
  //         Price: eror.response.data.errors.Price,
  //       })
  //     }
  //     else if (typeof eror.response.data == "string") {
  //       setAlert({ data: eror.response.data })
  //     }
  //   })

  // }

  const onCreate = (e) => {
    e.preventDefault();
    console.log(createDto)

    const formData = new FormData();
  
    for (let key in createDto) {
      if (key === "Files") {
        if (Array.isArray(createDto.Files) && createDto.Files.length > 0) {
          createDto.Files.forEach((file) => {
            formData.append("Files", file);
            console.log(file)
          });
        } else {
          console.error("Files array deyil və ya boşdur!");
        }
      } else {
        formData.append(key, createDto[key]);
      }
    }
  
    axios.post(`http://localhost:5126/api/product/Create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res);
      navigate("/admin/product")
    })
    .catch(eror => {
      console.log(eror);
      if (typeof eror.response.data == "object") {
        setAlert({
            Files: eror.response.data.errors.Files,
            Name: eror.response.data.errors.Name,
            Price:eror.response.data.errors.Price,
            Count:eror.response.data.errors.Count,
            BrandId:eror.response.data.errors.BrandId,
            CategoryId:eror.response.data.errors.CategoryId,
            ZemanetDate:eror.response.data.errors.ZemanetDate,

        })
    }
    else if(typeof eror.response.data == "string"){
        setAlert({data:eror.response.data})
    }
    setTimeout(() => {
      setAlert({})
    }, 2000);
    });
  };
  

  const getBrands = () => {
    axios.get(`http://localhost:5126/api/brand/getall`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setBrands(res.data)
    }).catch(eror => {
      console.log(eror)
    })
  }
  const getCategory = () => {
    axios.get(`http://localhost:5126/api/category/getall`).then(res => {
      var filterData = res.data.filter(x => x.isMain == false);

      setCategories(filterData)
    }).catch(eror => {
      console.log(eror)
    })
  }
  const getKampaniya = () => {
    axios.get(`http://localhost:5126/api/kampaniya/getall`).then(res => {
      filterCampaigns(res.data)
    }).catch(eror => {
      console.log(eror)
    })
  }
  const filterCampaigns = (data) => {
    const now = new Date(); // İndiki tarix
    const activeCampaigns = data.filter(campaign => {
      const endTime = new Date(campaign.endTime); // EndTime stringini Date-ə çeviririk
      return endTime > now; // EndTime gələcəkdədirsə, aktiv kampaniya olacaq
    });
    setKampaniyas(activeCampaigns)

  };
  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Product Create</strong>
        </CCardHeader>
        <CCardBody >
          <NavLink  >
            <CButton onClick={() => navigate('/admin/product')} type='button' style={{ backgroundColor: 'gray', color: 'white', border: '0' }} color="primary" className="px-4 mb-4">
              Go To Index
            </CButton>
          </NavLink>
          <CForm onSubmit={onCreate}>
            {
              alert.data !== undefined && (
                <span style={{ color: 'red', fontSize: '14px', marginBottom: '0px', display: 'block', marginTop: '10px' }}>{alert.data}</span>
              )
            }
            <div style={{ marginTop: '40px', display: 'flex' }} className="mb-3">
              <div style={{ width: '60%' }}>
                <div>
                  <CFormLabel htmlFor="exampleFormControlInput1" style={{ marginBottom: '15px' }}>Name</CFormLabel>
                  <div>
                    {
                      alert.Name !== undefined && (
                        <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.Name}</span>
                      )
                    }
                  </div>
                  <CFormInput onChange={(e) => setCreateDto({ ...createDto, Name: e.target.value })}
                    value={createDto.Name}
                    type="text"
                    placeholder="Product Name"
                  />
                </div>
                <div style={{ marginTop: '40px' }}>
                  <CFormLabel htmlFor="exampleFormControlInput1" style={{ marginBottom: '15px' }}>Price</CFormLabel>
                  <div>
                    {
                      alert.Price !== undefined && (
                        <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.Price}</span>
                      )
                    }
                  </div>
                  <CFormInput onChange={(e) => setCreateDto({ ...createDto, Price: e.target.value })}
                    value={createDto.Price}
                    type="number"
                    placeholder="Product Price"
                  />
                </div>
                <div style={{ marginTop: '40px' }}>
                  <CFormLabel htmlFor="exampleFormControlInput1" style={{ marginBottom: '15px' }}>PricePercent</CFormLabel>
                  <div>
                    {
                      alert.PricePercent !== undefined && (
                        <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.PricePercent}</span>
                      )
                    }
                  </div>
                  <CFormInput onChange={(e) => setCreateDto({ ...createDto, PricePercent: e.target.value })}
                    value={createDto.PricePercent}
                    type="number"
                    placeholder="Product PricePercent"
                  />
                </div>
                <div style={{ marginTop: '40px' }}>
                  <CFormLabel htmlFor="exampleFormControlInput1" style={{ marginBottom: '15px' }}>Zemanet muddeti</CFormLabel>
                  <div>
                    {
                      alert.ZemanetDate !== undefined && (
                        <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.ZemanetDate}</span>
                      )
                    }
                  </div>
                  <CFormInput onChange={(e) => setCreateDto({ ...createDto, ZemanetDate: e.target.value })}
                    value={createDto.ZemanetDate}
                    type="text"
                    placeholder="Product ZemanetDate"
                  />
                </div>
                <div style={{ marginTop: '40px' }}>
                  <CFormLabel htmlFor="exampleFormControlInput1" style={{ marginBottom: '15px' }}>Count</CFormLabel>
                  <div>
                    {
                      alert.Count !== undefined && (
                        <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.Count}</span>
                      )
                    }
                  </div>
                  <CFormInput onChange={(e) => setCreateDto({ ...createDto, Count: e.target.value })}
                    value={createDto.Count}
                    type="double"
                    placeholder="Product Count"
                  />
                </div>
                <div style={{ marginTop: '40px' }}>
                  <div>
                    {
                      alert.GoldZemanet !== undefined && (
                        <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.GoldZemanet}</span>
                      )
                    }
                  </div>
                  <CFormCheck onChange={() => {
                    setgoldZemanet(x => !x)
                    setCreateDto({ ...createDto, GoldZemanet: !createDto.GoldZemanet })

                  }} style={{ marginLeft: '0px', fontSize: '22px' }} id="flexCheckChecked" label="Qizil zemanet olsun ?" defaultChecked={goldZemanet} />
                  {
                    goldZemanet == true && (

                      <div>

                        <div style={{ marginTop: '20px' }}>
                          <CFormInput onChange={(e) => setCreateDto({ ...createDto, GoldPrice: e.target.value })}
                            value={createDto.GoldPrice}
                            type="number"
                            placeholder="Qizil zemanetin qiymeti"
                          />
                        </div>
                      </div>
                    )
                  }
                </div>
                <div style={{ marginTop: '40px' }}>
                  {
                    alert.BrandId !== undefined && (
                      <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.BrandId}</span>
                    )
                  }
                  <CFormLabel htmlFor="exampleFormControlInput1" style={{ marginBottom: '15px' }}>Select Brand</CFormLabel>

                  <CFormSelect onChange={(e) => setCreateDto({ ...createDto, BrandId: e.target.value })} aria-label="Default select example">
                    <option>Select Brand</option>

                    {
                      brands.map((item, index) => {
                        return (
                          <option key={index} style={{ padding: "20px 12px" }} value={item.id}>{item.name}</option>

                        )
                      })
                    }
                  </CFormSelect>
                </div>
                <div style={{ marginTop: '40px' }}>
                  {
                    alert.CategoryId !== undefined && (
                      <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.CategoryId}</span>
                    )
                  }
                  <CFormLabel htmlFor="exampleFormControlInput1" style={{ marginBottom: '15px' }}>Select Category</CFormLabel>

                  <CFormSelect onChange={(e) => setCreateDto({ ...createDto, CategoryId: e.target.value })} aria-label="Default select example">
                    <option >Select Category</option>

                    {
                      categories.map((item, index) => {
                        return (
                          <option key={index} style={{ padding: "20px 12px" }} value={item.id}>{item.name}</option>

                        )
                      })
                    }
                  </CFormSelect>
                </div>
              </div>
              <div className="mb-3" style={{ marginLeft: '40px' }}>
                <label for="fileField" class="attachment" style={{ padding: '20px 0' }}>
                  <span style={{ display: 'block', marginBottom: '30px', fontSize: '24px' }}>Image</span>
                  {
                    alert.Files !== undefined && (
                      <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>{alert.Files}</span>
                    )
                  }
                  <label htmlFor="file-upload" style={labelStyle}>
                    Select photo
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    key={selectedImages.length}
                    multiple
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                  />

                  <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                    {/* Seçilən şəkillərin kiçik formada göstərilməsi */}
                    {selectedImages.map((image, index) => (
                      <div key={index} style={{ margin: '10px', position: 'relative' }}>
                        <img
                          src={image}
                          alt={`Selected thumbnail ${index}`}
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                        <button
                          onClick={() => handleImageDelete(image)}
                          style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            background: 'rgba(255, 0, 0, 0.6)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>

                </label>
                <div style={{ marginTop: '40px', width: '100%' }}>
                  <label htmlFor="">Məhsul yalniz online?</label>
                  <CFormSelect style={{ width: '100%' }} onChange={(e) => setCreateDto({ ...createDto, isOnline: e.target.value })}>
                    <option value={false}>Xeyr</option>
                    <option value={true}>Bəli</option>

                  </CFormSelect>
                </div>
                <div style={{ marginTop: '40px', width: '100%' }}>
                  <label htmlFor="">Kampaniyani seç...</label>
                  <CFormSelect style={{ width: '100%' }} onChange={(e) => setCreateDto({ ...createDto, KampaniyaId: e.target.value })}>
                    <option value="">Default</option>
                    {kampaniyas.map((item, index) => {
                      return (
                        <option value={item.id}>{item.title}</option>
                      )
                    })}

                  </CFormSelect>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <p style={{ marginBottom: '20px' }}>Product Description</p>

              <ReactQuill style={{ height: '300px' }}
                modules={ProductCreate.modules}
                formats={ProductCreate.formats}
                value={createDto.Description}
                onChange={handleContentChange}
              />
            </div>


            <CButton component="input" type="submit" color="primary"  >Create</CButton>
          </CForm>

        </CCardBody>
      </CCard>
    </div >
  )
}
ProductCreate.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
    ['clean'], // remove formatting button
  ],
};

// Define Quill formats
ProductCreate.modules = {
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
const labelStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '10px',
};