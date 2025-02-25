import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Loading'
import '../../css/Muraciet.css'
import axios from 'axios';
import Footer from '../Footer'
export default function Muraciet() {
    const location = useLocation();
    const id = location.pathname.split("/")[3]
    const [store, setStore] = useState([])
    const [loading, setLoading] = useState(true)
    const [education, setEducation] = useState([])
    const [success, setSuccess] = useState(false)
    const [alert, setAlert] = useState({})
    const [Praktikas, setPraktika] = useState([{
        Name: '',
        StartTime: '',
        EndTime: ''
    }])
    const [numberWork, setNumberWork] = useState(0)
    const [school, setSchool] = useState([{
        Name: '',
        StartTime: '',
        EndTime: ''
    }])
    const [sendcvDto, setsendCVDto] = useState({
        Gender: 'Kişi',
        LanguageLevel: 'Yox',
        Computers: education,
        Educations: school,
        Praktikas: [Praktikas],
        VakansiyaId: id,
        TiendaId: 1,
        CvImage: '',
        ProfilImage: '',
    })
    useEffect(() => {
        getStore();
    }, [])
    const getStore = () => {
        axios.get(`http://localhost:5126/api/tienda/GetAll`).then(res => {
            console.log(res)
            var filterData = res.data.filter(x => !x.iSDeleted);
            setStore(filterData)
        }).catch(eror => {
            console.log(eror)
        })
    }
    const handleAddFields = () => {
        setSchool([...school, { Name: '', StartTime: '', EndTime: '' }]);
    };
    const handleRemoveFields = (index) => {
        const newFields = school.filter((_, i) => i !== index);
        setSchool(newFields);
    };
    const handleChange = (index, e) => {
        const newFields = [...school];
        newFields[index][e.target.name] = e.target.value;
        setSchool(newFields);
    };

    const handleAddFieldsPraktika = () => {
        setPraktika([...Praktikas, { Name: '', StartTime: '', EndTime: '' }]);
    };
    const handleRemoveFieldsPraktika = (index) => {
        const newFields = Praktikas.filter((_, i) => i !== index);
        setPraktika(newFields);
    };
    const handleChangePraktika = (index, e) => {
        const newFields = [...Praktikas];
        newFields[index][e.target.name] = e.target.value;
        setPraktika(newFields);
    };
    const updateSendCVDto = () => {
        setsendCVDto(prevDto => ({
            ...prevDto,
            Educations: school,
            Praktikas: Praktikas,
            Computers: education,
        }));
    };

    const postCV = (e) => {
        e.preventDefault();
        updateSendCVDto()
        console.log(sendcvDto)
        setTimeout(() => {
            axios.post(`http://localhost:5126/api/vakansiya/SendCV`, sendcvDto, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            }).then(res => {
                console.log(res)
                setSuccess(true)
                setsendCVDto({
                    Name: '',
                    Surname: '',
                    FatherName: '',
                    Location: '',
                    LocationRepeat: '',
                    Email: '',
                    PhoneNumber: '',

                })
            }).catch(eror => {
                console.log(eror)
                if (typeof eror.response.data == "string") {
                    setAlert({ data: eror.response.data })

                }
                else if (typeof eror.response.data == "object") {
                    setAlert({
                        Name: eror.response.data.errors.Name,
                        FamilyPosition: eror.response.data.errors.FamilyPosition,
                        Surname: eror.response.data.errors.Surname,
                        FatherName: eror.response.data.errors.FatherName,
                        Gender: eror.response.data.errors.Gender,
                        Location: eror.response.data.errors.Location,
                        LocationRepeat: eror.response.data.errors.LocationRepeat,
                        PhoneNumber: eror.response.data.errors.PhoneNumber,
                        BirthDay: eror.response.data.errors.BirthDay
                    })
                }

                setTimeout(() => {
                    setAlert({
                        Name: '',
                        Image: '',
                        data: ''
                    })
                }, 2000);
            })
        }, 1000);
        console.log(sendcvDto)
    }
    return (
      <div>
          <div class="container">
            {
                success && (
                    <div className="modal_success">
                        <div className="btn_modal">
                            <span onClick={() => setSuccess(false)}>X</span>

                        </div>
                        <div className='text'>
                            <i class="fa-solid fa-check"></i> Mesajınız uğurla göndərildi...
                        </div>
                    </div>
                )
            }
            <div class="content">
                <h3>Şəxsi məlumat</h3>
                <form action="" onSubmit={postCV}>
                    <div>
                        {alert.data != undefined && (
                            <p style={{ color: "red", fontSize: "14px", margin: '10px 20px' }}>{alert.data}</p>
                        )}
                        {alert.Name != undefined && (
                            <p style={{ color: "red", fontSize: "14px", margin: '10px 20px' }}>{alert.Name}</p>
                        )}
                        {alert.Surname != undefined && (
                            <p style={{ color: "red", fontSize: "14px", margin: '10px 20px' }}>{alert.Surname}</p>
                        )}
                        {alert.FamilyPosition != undefined && (
                            <p style={{ color: "red", fontSize: "14px", margin: '10px 20px' }}>{alert.FamilyPosition}</p>
                        )}
                        {alert.Location != undefined && (
                            <p style={{ color: "red", fontSize: "14px", margin: '10px 20px' }}>{alert.Location}</p>
                        )}
                        {alert.LocationRepeat != undefined && (
                            <p style={{ color: "red", fontSize: "14px", margin: '10px 20px' }}>{alert.LocationRepeat}</p>
                        )}
                        {alert.Email != undefined && (
                            <p style={{ color: "red", fontSize: "14px", margin: '10px 20px' }}>{alert.Email}</p>
                        )}

                        {alert.BirthDay != undefined && (
                            <p style={{ color: "red", fontSize: "14px", margin: '10px 20px' }}>{alert.BirthDay}</p>
                        )}
                        {alert.Gender != undefined && (
                            <p style={{ color: "red", fontSize: "14px", margin: '10px 20px' }}>{alert.Gender}</p>
                        )}
                       
                    </div>
                    <div class="input_form">
                        <div>
                            <label for="">Ad</label>
                            <input required value={sendcvDto.Name} onChange={(e) => setsendCVDto({ ...sendcvDto, Name: e.target.value })} type="text" placeholder="Ad" />
                        </div>

                        <div>
                            <label for="">Soyad</label>
                            <input required value={sendcvDto.Surname} onChange={(e) => setsendCVDto({ ...sendcvDto, Surname: e.target.value })} type="text" placeholder="Soyad" />
                        </div>
                    </div>
                    <div class="input_form">
                        <div>
                            <label for="">Ata adi</label>
                            <input required value={sendcvDto.FatherName} onChange={(e) => setsendCVDto({ ...sendcvDto, FatherName: e.target.value })} type="text" placeholder="Ata adı" />
                        </div>
                        <div>
                            <label for="">Soyad</label>
                            <input required value={sendcvDto.BirthDay} onChange={(e) => setsendCVDto({ ...sendcvDto, BirthDay: e.target.value })} type="date" placeholder="Soyad" />
                        </div>
                    </div>
                    <div class="input_radio">
                        <div class="radio_check">
                            <p>Cinsiniz</p>
                            <div>

                                <input checked onChange={(e) => setsendCVDto({ ...sendcvDto, Gender: 'Kişi' })} type="radio" value="Kisi" name="cins" /><label for="kisi">Kişi</label>
                                <input onChange={(e) => setsendCVDto({ ...sendcvDto, Gender: 'Qadın' })} type="radio" value="Kisi" name="cins" /><label for="">Qadın</label>
                            </div>

                        </div>
                        <div class="radio_check">
                            <p>Ailə vəziyəti</p>
                            <div>
                                <input value={sendcvDto.FamilyPosition} required onChange={(e) => setsendCVDto({ ...sendcvDto, FamilyPosition: 'Evli' })} type="radio" name="aile" value="Kisi" /><label for="">Evli</label>
                                <input value={sendcvDto.FamilyPosition} required onChange={(e) => setsendCVDto({ ...sendcvDto, FamilyPosition: 'Subay' })} type="radio" value="Kisi" name="aile" /><label for="">Subay</label>
                            </div>

                        </div>
                    </div>
                    <div class="input_form">
                        <div>
                            <label for="">Ünvan</label>
                            <input required value={sendcvDto.Location} onChange={(e) => setsendCVDto({ ...sendcvDto, Location: e.target.value })} type="text" placeholder="Unvan" />
                        </div>
                        <div>
                            <label for="">Faktiki Ünvan</label>
                            <input required value={sendcvDto.LocationRepeat} onChange={(e) => setsendCVDto({ ...sendcvDto, LocationRepeat: e.target.value })} type="text" placeholder="Faktiki unvan" />
                        </div>
                    </div>
                    <div class="input_form">
                        <div>
                            <label for="">Email</label>
                            <input required value={sendcvDto.Email} onChange={(e) => setsendCVDto({ ...sendcvDto, Email: e.target.value })} type="text" placeholder="Email" />
                        </div>
                        <div>
                            <label for="">Əlaqe nömrəsi</label>
                            <input required value={sendcvDto.PhoneNumber} onChange={(e) => setsendCVDto({ ...sendcvDto, PhoneNumber: e.target.value })} type="text" placeholder="Elaqe nomresi" />
                        </div>

                    </div>

                    <div class="input_form">
                        <div>
                            <label for="">CV yüklə</label>
                            <input required type="file" onChange={(e) => setsendCVDto({ ...sendcvDto, CvImage: e.target.files[0] })} />
                        </div>
                        <div>
                            <label for="">Şəkil yüklə</label>
                            <input required onChange={(e) => setsendCVDto({ ...sendcvDto, ProfilImage: e.target.files[0] })} type="file" />
                        </div>

                    </div>
                    <div class="input_foreach">
                        <div class="div">
                            <h3>Təhsil</h3>

                        </div>
                        <div class="tehsil">


                            <div class="input_text" style={{ width: '100%', display: 'block' }}>
                                {
                                    school.map((item, index) => (
                                        <div style={{ marginTop: '40px', width: '100%' }}>
                                            {
                                                index == 0 ? (
                                                    <div class="header">
                                                        <span>Orta təhsil</span>
                                                        <button type="button" onClick={() => {
                                                            handleAddFields();
                                                        }}><i class="fa-solid fa-plus"></i> Əlavə et</button>
                                                    </div>
                                                ) : (
                                                    <div class="header">
                                                        <span>Orta təhsil</span>
                                                        <button style={{ color: 'red' }} type="button" onClick={() => {
                                                            handleRemoveFields(index)
                                                        }}><i class="fa-solid fa-minus"></i> Sil</button>
                                                    </div>
                                                )
                                            }
                                            <div class="input_text">
                                                <div class="input_name">
                                                    <label for="">Müəssisənin adı</label>
                                                    <input required name='Name'
                                                        onChange={(e) => {
                                                            handleChange(index, e)
                                                        }} value={item.Name} type="text" placeholder="Muessisenin adi" />
                                                </div>
                                                <div class="input_date">
                                                    <div class="select">
                                                        <label for="">Tedrisin başlanılması</label>
                                                        <select required onChange={(e) => {
                                                            handleChange(index, e);
                                                        }} value={item.StartTime} name="StartTime" id="">
                                                            <option value="2002">2002</option>
                                                            <option value="2003">2003</option>
                                                            <option value="2004">2004</option>
                                                            <option value="2005">2005</option>
                                                            <option value="2006">2006</option>
                                                            <option value="2007">2007</option>
                                                            <option value="2008">2008</option>
                                                            <option value="2009">2009</option>
                                                            <option value="2010">2010</option>
                                                            <option value="2011">2011</option>
                                                            <option value="2012">2012</option>
                                                            <option value="2013">2013</option>
                                                            <option value="2014">2014</option>
                                                            <option value="2015">2015</option>
                                                            <option value="2016">2017</option>
                                                            <option value="2018">2018</option>
                                                            <option value="2019">2019</option>
                                                            <option value="2020">2020</option>
                                                            <option value="2021">2021</option>
                                                            <option value="2022">2022</option>
                                                            <option value="2023">2023</option>
                                                            <option value="2024">2024</option>



                                                        </select>
                                                    </div>
                                                    <div class="select">
                                                        <label for="">Tədrisin bitməsinə</label>

                                                        <select required onChange={(e) => {
                                                            handleChange(index, e)
                                                        }} value={item.EndTime} name="EndTime" id="">
                                                            <option value="2002">2002</option>
                                                            <option value="2003">2003</option>
                                                            <option value="2004">2004</option>
                                                            <option value="2005">2005</option>
                                                            <option value="2006">2006</option>
                                                            <option value="2007">2007</option>
                                                            <option value="2008">2008</option>
                                                            <option value="2009">2009</option>
                                                            <option value="2010">2010</option>
                                                            <option value="2011">2011</option>
                                                            <option value="2012">2012</option>
                                                            <option value="2013">2013</option>
                                                            <option value="2014">2014</option>
                                                            <option value="2015">2015</option>
                                                            <option value="2016">2016</option>
                                                            <option value="2017">2017</option>
                                                            <option value="2018">2018</option>
                                                            <option value="2019">2019</option>
                                                            <option value="2020">2020</option>
                                                            <option value="2021">2021</option>
                                                            <option value="2022">2022</option>
                                                            <option value="2023">2023</option>



                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>


                        </div>
                        {
                            Praktikas.map((item, index) => (
                                <div class="tehsil" style={{ marginTop: '50px' }}>

                                    {
                                        index == 0 ? (
                                            <div class="header">
                                                <span>Ali təhsil</span>
                                                <button type="button" onClick={() => {
                                                    handleAddFieldsPraktika();
                                                }}><i class="fa-solid fa-plus"></i> Əlavə et</button>
                                            </div>
                                        ) : (
                                            <div class="header">
                                                <span>Ali təhsil</span>
                                                <button style={{ color: 'red' }} type="button" onClick={() => {
                                                    handleRemoveFieldsPraktika(index)
                                                }}><i class="fa-solid fa-minus"></i> Sil</button>
                                            </div>
                                        )
                                    }
                                    <div class="input_text">
                                        <div class="input_name">
                                            <label for="">Müəssisənin adı</label>
                                            <input required name='Name' value={Praktikas.Name} onChange={(e) => handleChangePraktika(index, e)} type="text" placeholder="Muessisenin adi" />
                                        </div>
                                        <div class="input_date">
                                            <div class="select">
                                                <label for="">Tedrisin baslanilmasi</label>
                                                <select required name="StartTime" onChange={(e) => handleChangePraktika(index, e)} value={Praktikas.StartTime} id="">
                                                    <option value="2002">2002</option>
                                                    <option value="2003">2003</option>
                                                    <option value="2004">2004</option>
                                                    <option value="2005">2005</option>
                                                    <option value="2006">2006</option>
                                                    <option value="2007">2007</option>
                                                    <option value="2008">2008</option>
                                                    <option value="2009">2009</option>
                                                    <option value="2010">2010</option>
                                                    <option value="2011">2011</option>
                                                    <option value="2012">2012</option>
                                                    <option value="2013">2013</option>
                                                    <option value="2014">2014</option>
                                                    <option value="2015">2015</option>
                                                    <option value="2016">2017</option>
                                                    <option value="2018">2018</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2024">2024</option>


                                                </select>
                                            </div>
                                            <div class="select">
                                                <label for="">Tədrisin bitməsinə</label>

                                                <select required name="EndTime" onChange={(e) => handleChangePraktika(index, e)} value={Praktikas.EndTime} id="">
                                                    <option value="2002">2002</option>
                                                    <option value="2003">2003</option>
                                                    <option value="2004">2004</option>
                                                    <option value="2005">2005</option>
                                                    <option value="2006">2006</option>
                                                    <option value="2007">2007</option>
                                                    <option value="2008">2008</option>
                                                    <option value="2009">2009</option>
                                                    <option value="2010">2010</option>
                                                    <option value="2011">2011</option>
                                                    <option value="2012">2012</option>
                                                    <option value="2013">2013</option>
                                                    <option value="2014">2014</option>
                                                    <option value="2015">2015</option>
                                                    <option value="2016">2017</option>
                                                    <option value="2018">2018</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2024">2024</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>



                    <div class="input_foreach">
                        <h3>Dil biliyi</h3>
                        <div class="language">
                            <p for="">Azərbaycan dili</p>
                            <div class="radio">
                                <div>
                                    <input checked onChange={() => setsendCVDto({ ...sendcvDto, LanguageLevel: 'Yox' })} name="lang" type="radio" id="" />
                                    <label for="">Yox</label>
                                </div>
                                <div>
                                    <input onChange={() => setsendCVDto({ ...sendcvDto, LanguageLevel: 'Orta' })} name="lang" type="radio" id="" />
                                    <label for="">Orta</label>
                                </div>
                                <div>

                                    <input onChange={() => setsendCVDto({ ...sendcvDto, LanguageLevel: 'Yaxşı' })} name="lang" type="radio" x id="" />
                                    <label for="">Yaxşı</label>
                                </div>

                                <div>
                                    <input onChange={() => setsendCVDto({ ...sendcvDto, LanguageLevel: 'Ana dili' })} name="lang" type="radio" id="" />
                                    <label for="">Ana dili</label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="input_foreach">
                        <h3>Kompüter biliyi</h3>
                        <div class="language">
                            <div class="checkbox">
                                <div>
                                    <input onChange={(e) => {
                                        if (e.target.checked) {
                                            const educationItem = { Name: 'Microsoft Word' };
                                            setEducation([...education, educationItem])
                                            setsendCVDto({ ...sendcvDto, Computers: education })
                                            // console.log(education)

                                        }

                                    }} type="checkbox" name="" value="Microsoft Word" id="" />
                                    <label for="">Microsoft Word</label>
                                </div>
                                <div>
                                    <input onChange={(e) => {
                                        if (e.target.checked) {
                                            const educationItem = { Name: 'Microsoft Excel' };
                                            setEducation([...education, educationItem])
                                            setsendCVDto({ ...sendcvDto, Computers: education })

                                        }


                                    }} type="checkbox" name="" value="Microsoft Excel" id="" />
                                    <label for="">Microsoft Excel</label>
                                </div>
                                <div>

                                    <input onChange={(e) => {
                                        if (e.target.checked) {
                                            const educationItem = { Name: '1C: Предприятие' };
                                            setEducation([...education, educationItem])
                                            setsendCVDto({ ...sendcvDto, Computers: education })

                                        }

                                    }} type="checkbox" name="" value="1C: Предприятие" id="" />
                                    <label for="">1C: Предприятие</label>
                                </div>

                                <div>
                                    <input onChange={(e) => {
                                        if (e.target.checked) {
                                            const educationItem = { Name: 'Adobe Photoshop' };
                                            setEducation([...education, educationItem])
                                            setsendCVDto({ ...sendcvDto, Computers: education })

                                        }
                                    }} type="checkbox" name="" value="Adobe Photoshop" id="" />
                                    <label for="">Adobe Photoshop</label>
                                </div>
                                <div>
                                    <input onChange={(e) => {
                                        if (e.target.checked) {
                                            const educationItem = { Name: 'Corel Draw' };
                                            setEducation([...education, educationItem])
                                            setsendCVDto({ ...sendcvDto, Computers: education })

                                        }

                                    }} type="checkbox" name="" value="Corel Draw" id="" />
                                    <label for="">Corel Draw</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input_foreach">
                        <h3>İşləmək istədiyin mağaza</h3>
                        <select onChange={(e) => setsendCVDto({ ...sendcvDto, TiendaId: e.target.value })} class="magaza" name="" id="">
                            {
                                store.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.name}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <div class="button">
                        <button type='submit'>Təsdiq et</button>
                    </div>
                </form >
            </div >
        </div >
        <Footer></Footer>
      </div>
    )
}
