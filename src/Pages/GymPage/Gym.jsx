import styled from 'styled-components'
import 오른쪽버튼 from '../../Image/btn_right.png'
import { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../Shared/Loading.js"
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Shared/Navbar'
import GymHeader from './components/GymHeader';
import axios from 'axios';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faL, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import GymList from './components/GymList';
import Footer from '../../Shared/Footer';


const Gym = () => {
    const BASE_URL = "https://sparta-tim.shop"
    // const BASE_URL = 'https://01192mg.shop'
    // const BASE_URL = "http://54.180.31.108";
    const navigate = useNavigate()

    const [location, setLocation] = useState('내 주변 클라이밍짐')
    const [gyms, setGyms] = useState([]) 
    const [sizeMy, setSizeMy] = useState(10)
    const [sizeSeoul, setSizeSeoul] = useState(10)
    const [sizeGg, setSizeGg] = useState(25)
    const [sizeBs, setSizeBs] = useState(10)
    const [sizeDg, setSizeDg] = useState(10)
    const [sizeGj, setSizeGj] = useState(10)

    const onclickGymList = (lat, lng) => {
      setState((prev) => ({
        ...prev,
        center: {
          lat: lat,
          lng: lng,
      }}))
    }

// 카카오 Map 입니다

  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    isPanto: false,
    errMsg: null,
    isLoading: true,
  })
  // console.log(state.center)

// 현재위치 api 입니다
  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          await axios.get(`${BASE_URL}/gyms?page=0&size=${sizeMy}&lon=${lng}&lat=${lat}`)
        .then((res) => {
            // console.log(res.data.data)
            setGyms(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })

          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation 을 사용할 수 없네용, 애용!",
        isLoading: false,
      }))
    }
  }, [sizeMy])

  
    //서울을 클릭하면 서울 특정 주소로 지도 중심을 이동시킨다
    //서울 주변의 클라이밍짐을 띄워준다
  const onclickCategorySeoul = () => {
    categorySeoul(); 
    setLocation('서울 주변 클라이밍짐')
    setPlusMy(false)
    setPlusGg(false)
    setPlusBs(false)
    setPlusDg(false)
    setPlusGj(false)
  }
  const onclickCategoryGg = () => {
    categoryGg(); 
    setLocation('경기 주변 클라이밍짐')
    setPlusMy(false)
    setPlusSeoul(false)
    setPlusBs(false)
    setPlusDg(false)
    setPlusGj(false)
  }
  const onclickCategoryBs = () => {
    categoryBs(); 
    setLocation('부산 주변 클라이밍짐')
    setPlusMy(false)
    setPlusSeoul(false)
    setPlusGg(false)
    setPlusDg(false)
    setPlusGj(false)
  }
  const onclickCategoryDg = () => {
    categoryDg(); 
    setLocation('대구 주변 클라이밍짐')
    setPlusMy(false)
    setPlusSeoul(false)
    setPlusGg(false)
    setPlusBs(false)
    setPlusGj(false)
  }
  const onclickCategoryGj = () => {
    categoryGj(); 
    setLocation('광주 주변 클라이밍짐')
    setPlusMy(false)
    setPlusSeoul(false)
    setPlusGg(false)
    setPlusBs(false)
    setPlusDg(false)
  }

  const categorySeoul = async() => {
    const lat = 37.56682195018582
    const lng = 126.97865225946583
    await axios.get(`${BASE_URL}/gyms?page=0&size=${sizeSeoul}&lon=${lng}&lat=${lat}`)
    .then((res) => {
      setGyms(res.data.data)
      setState((prev) => ({
        ...prev,
        center: {
          lat: lat,
          lng: lng,
      }}))
    setPlusSeoul(!plusSeoul)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const categoryGg = async() => {
    const lat = 37.23430874181801
    const lng = 127.20135714691537
    await axios.get(`${BASE_URL}/gyms?page=0&size=${sizeGg}&lon=${lng}&lat=${lat}`)
    .then((res) => {
      setGyms(res.data.data)
      setState((prev) => ({
        ...prev,
        center: {
          lat: lat,
          lng: lng,
      }}))
      setPlusGg(!plusGg)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const categoryBs = async() => {
    const lat = 35.179735278020225
    const lng = 129.0750650311972
    await axios.get(`${BASE_URL}/gyms?page=0&size=${sizeBs}&lon=${lng}&lat=${lat}`)
    .then((res) => {
      setGyms(res.data.data)
      setState((prev) => ({
        ...prev,
        center: {
          lat: lat,
          lng: lng,
      }}))
      setPlusBs(!plusBs)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const categoryDg = async() => {
    const lat = 35.87138346208865
    const lng = 128.60180223396753
    await axios.get(`${BASE_URL}/gyms?page=0&size=${sizeDg}&lon=${lng}&lat=${lat}`)
    .then((res) => {
      setGyms(res.data.data)
      setState((prev) => ({
        ...prev,
        center: {
          lat: lat,
          lng: lng,
      }}))
      setPlusDg(!plusDg)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const categoryGj = async() => {
    const lat = 35.160101970076916
    const lng = 126.8516381907944
    await axios.get(`${BASE_URL}/gyms?page=0&size=${sizeGj}&lon=${lng}&lat=${lat}`)
    .then((res) => {
      setGyms(res.data.data)
      setState((prev) => ({
        ...prev,
        center: {
          lat: lat,
          lng: lng,
      }}))
      setPlusGj(!plusGj)
    })
    .catch((err) => {
      console.log(err)
    })
  }


//gym 검색 API 입니다~
    const [search, setSearch] = useState('')

    const onKeyPress = (e) => {
      if(e.key == 'Enter') {
        onclickSearchGym();
      }
    }
    const onclickSearchGym = () => {
      if(search === "") {
        alert('한 글자 이상 입력해주세요')
      } else {
        searchGym();
      }
    }

    const searchGym = async() => {
        await axios.get(`${BASE_URL}/gyms/search?lastArticleId=10000&size=100&query=${search}`)
        .then((res) => {
          if(res.data.data.length !== 0) {

              setState((prev) => ({
                ...prev, center: {lat: res.data.data[0]?.lat, lng: res.data.data[0]?.lon}
              }))
            }
            setGyms(res.data.data)
            setLocation("검색어 '" + search + "'")
            setSearch('')
            setPlusMy(false)
            setPlusSeoul(false)
            setPlusGg(false)
            setPlusBs(false)
            setPlusDg(false)
            setPlusGj(false)
        })
        .catch((err) => {
            console.log(err)
        })
      }
    
      useEffect(()=>{
        // console.log(gyms)
      },[searchGym])

// 마커 마우스 호버 이벤트
      const [isopen, setIsopen] = useState(false)

// 더 보기 이벤트
      const [plusMy, setPlusMy] = useState(true)
      const [plusSeoul, setPlusSeoul] = useState(false)
      const [plusGg, setPlusGg] = useState(false)
      const [plusBs, setPlusBs] = useState(false)
      const [plusDg, setPlusDg] = useState(false)
      const [plusGj, setPlusGj] = useState(false)

// 카테고리 폰트 하이라이트
      const [hightlightSeoul, setHightlightSeoul] = useState(false)
      const [hightlightGg, setHightlightGg] = useState(false)
      const [hightlightBs, setHightlightBs] = useState(false)
      const [hightlightDg, setHightlightDg] = useState(false)
      const [hightlightGj, setHightlightGj] = useState(false)

    return (
        <div>

            <Navbar />

            <div style={{width:'192rem', height:'33.5rem', padding:'8rem 0 0 0', backgroundColor:'#141414', color:'#ffffff'}}>
              
              <div style={{width:'120rem', margin:'0 auto 0 auto'}}>
                  <h1 style={{width:'38rem', margin:'0 35.2rem 0 0'}}>클라이밍짐 후기</h1>
                 
                  <S_input value={search} placeholder="검색어를 입력해 주세요"
                    onChange={(e)=>{ setSearch(e.target.value) }}  onKeyPress={onKeyPress}/> 
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="3x" color='white' style={{position:'absolute', margin:'4.5rem 0 0 -5rem'}} type="button" 
                    onClick={onclickSearchGym} /> 
                  
              </div>

              <div style={{width:'120rem', margin:'4rem auto 0 auto', display:'flex'}}>
                  <S_category onClick={()=>{onclickCategorySeoul(); setHightlightSeoul(true); setHightlightGg(false); setHightlightBs(false); setHightlightDg(false); setHightlightGj(false)}} status={hightlightSeoul}>서울</S_category>
                  <S_category onClick={()=>{onclickCategoryGg(); setHightlightSeoul(false); setHightlightGg(true); setHightlightBs(false); setHightlightDg(false); setHightlightGj(false)}} status={hightlightGg}>경기</S_category>
                  <S_category onClick={()=>{onclickCategoryBs(); setHightlightSeoul(false); setHightlightGg(false); setHightlightBs(true); setHightlightDg(false); setHightlightGj(false)}} status={hightlightBs}>부산</S_category>
                  <S_category onClick={()=>{onclickCategoryDg(); setHightlightSeoul(false); setHightlightGg(false); setHightlightBs(false); setHightlightDg(true); setHightlightGj(false)}} status={hightlightDg}>대구</S_category>
                  <S_category onClick={()=>{onclickCategoryGj(); setHightlightSeoul(false); setHightlightGg(false); setHightlightBs(false); setHightlightDg(false); setHightlightGj(true)}} status={hightlightGj}>광주</S_category>
              </div>

            </div>
            <div style={{width:'192rem', height:'0.5rem', backgroundColor:'#000000'}}></div>

            {/* 내 주변 클라이밍 짐 Area입니다 */}
            <div style={{display:'flex', justifyContent:'center', width:'192rem'}}>


            {/* 카카오 Map 입니다 */}
                
              { state.isLoading ? <Loading /> :
                (<Map
                    center={ state.center }
                    style={{ width: "134rem", height: "97rem" }}
                    level={5}
                >
                    
                    <MapMarker position={state.center}>
                    </MapMarker>

                    {
                        gyms?.map((val, i) => ( 
                          <>
                            <MapMarker onClick={()=>setIsopen(!isopen)}
                            key={`${val.name}-${val.lat}`}
                            position={{
                                lat: val.lat,
                                lng: val.lon
                            }}
                            image={{size:{width: 40, height: 60}, src:"https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"}}
                            title={val.name}
                            clickable={true} 
                            >
                            </MapMarker>

                              {isopen && (
                              <CustomOverlayMap
                              position={{lat: val.lat,lng: val.lon}}
                              yAnchor={1}
                            >
                              <Wrap>
                                <GymName>
                                  {val.name}
                                  <a href={`https://map.kakao.com/link/to/${val.location},${val.lat},${val.lon}`} target="_blank"rel="noreferrer"
                                  >
                                      길찾기
                                  </a>
                                </GymName>
                                
                                <GymFind onClick={()=>{navigate(`/gyms/${val.id}`)}}>
                                  <img src={오른쪽버튼} style={{width:'2.3rem', padding:'12px 0 0 0px'}}/>
                                </GymFind>
                              </Wrap>
                            </CustomOverlayMap>
                            )}

                          </>
                        ))
                    }
                    

                </Map>)
              }


                <GymContainer>
                    <div style={{width:'58rem', position:'absolute', borderBottom:'1px solid #666',padding:'3.5rem 3.5rem 3rem 3.5rem'}}>
                        <span style={{fontWeight:'700', fontSize:'2rem'}}>{location}</span>
                        
                        {
                          plusMy ? <MoreGym onClick={()=>{setSizeMy(70); setPlusMy(false)}} type="button"> 더 보기</MoreGym> :
                             plusSeoul ? <MoreGym onMouseOver={()=>{setSizeSeoul(80)}} onClick={categorySeoul} type="button"> 더 보기</MoreGym> :
                                plusGg ? <MoreGym onMouseOver={()=>{setSizeGg(50)}} onClick={categoryGg} type="button"> 더 보기</MoreGym> :
                                  plusBs ? <MoreGym onMouseOver={()=>{setSizeBs(50)}} onClick={categoryBs} type="button"> 더 보기</MoreGym> :
                                    plusDg ? <MoreGym onMouseOver={()=>{setSizeDg(50)}} onClick={categoryDg} type="button"> 더 보기</MoreGym> :
                                        plusGj ? <MoreGym onMouseOver={()=>{setSizeGj(50)}} onClick={categoryGj} type="button"> 더 보기</MoreGym> : null
                        }
                        
                    </div>

                    <GymList gyms={gyms} onclickGymList={onclickGymList}/>
                    
                </GymContainer>
            </div>
                  
            <Footer />
        </div>
    );
}
const Wrap = styled.div`
border: 1px solid #ddd;
border-radius: 6px;
width: 18rem;
height: 5rem;
margin: -112px 0 0 0px;
background-color: white;
color: black;
/* box-shadow: 0px 1px 2px #888; */
display: flex;
`

const GymName = styled.div`
font-size: 14px;
text-align: center;
width: 80%;
height: 100%;
padding: 3px 15px;
border-bottom: #666666;
display: flex;
flex-direction: column;
/* background-color: #eeeeee; */
`
const GymFind = styled.div`
width: 20%;
height: 100%;
border-radius: 0 6px 6px 0;
background: #fec200;
cursor: pointer;
`

const S_input = styled.input`
width: 60rem;
height: 6rem;
margin: 3rem auto;
border: none;
font-size: 1.4rem;
font-weight: 400;
padding: 0 0 0 2rem;
background-color: #333;
color: #666666;
  `

const S_category = styled.div`
margin: 0 4rem 0 0;
padding: 0 0 1rem 0;
cursor: pointer;
font-size: 2rem;
border-bottom: ${(props) => (props.status ? `2px solid #ffffff` : null)};
color: ${(props) => (props.status ? `#ffffff` : `#999999`)};
font-weight: ${(props) => (props.status ? 700 : 400)};
`

const GymContainer = styled.div`
width: 58rem;
height: 97rem;

background-color: #141414;
color: #ffffff;
border-top: 1px solid #ccc;
/* overflow: auto ; */
`

const MoreGym = styled.span`
font-size: 1.4rem;
border-bottom: 1px solid #cccccc;
margin: 0 0 0 15px;
opacity: 0.8;
`

export default Gym;