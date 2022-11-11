import styled from "styled-components";
import 알람종 from "../Image/알람종.png"
import 사용자이미지 from "../Image/사용자기본이미지.jpg"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalPortal from "../Pages/Login/MordalPortal";
import LoginModal from "../Pages/Login/LoginModal";
import Legister from "../Pages/Register/Register";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Loading from "./Loading";
import Alam from "./Alam";
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { __getAlam, _readAlam, _addAlam, _deleteAlam, _deleteAlams, __NreadAlam, _minusAlam, _plusAlam } from "../Redux/modules/notification";
import { __getMyPage } from "../Redux/modules/mypageSlice";
import NavbarDropdown from "./NavbarDropdown";


const Navbar = () => {

  const [userInfo, setUserInfo] = useState()
  const userToken = userInfo?.access_token
  const userId = userInfo?.userId

  function getUserInfo() {
    const userInfo = window.localStorage.getItem("userInfo");
    
    if(!userInfo) {
      return null;
    }
    const objUserInfo = JSON.parse(userInfo);
    
    if(Date.now() > objUserInfo.expire) {
      window.localStorage.removeItem('userInfo')
      window.location.reload();
    }
    // console.log(objUserInfo)
    return setUserInfo(objUserInfo)
  }
  
  useEffect(()=>{
    getUserInfo()
  },[])

  const removeToken = () => {
     localStorage.removeItem("userInfo")
     alert('로그아웃 되었습니다.')
     navigate('/')
     window.location.reload();
  }

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);

  const handleLoginModal = () => {
    setLoginVisible(!loginVisible);
  };

  const handleRegisterModal = () => {
    setRegisterVisible(!registerVisible);
  };


//알람 모달 입니다~
  const [showAlam, setShowAlam] = useState(false)
  const {isLoading2, error2, NreadAlams} = useSelector((state) => state.NreadAlams)
  // console.log(NreadAlams.data, error2)

  const { isLoading, error, alams } = useSelector((state) => state.alams)
  // console.log(isLoading, error, alams)
  const [realtimeAlam, setRealtimeAlam] = useState([])
  // console.log(realtimeAlam)

  useEffect(()=>{
    if(window.localStorage.getItem("userInfo")){
      dispatch(__NreadAlam())
      dispatch(__getAlam())
    }
  },[dispatch])

//SSE 연결하기
const EventSource = EventSourcePolyfill || NativeEventSource;  //eventsource 쓰려면 import 해야됨!

let sse = undefined;
useEffect(()=>{
  if (userToken) {
    sse = new EventSource(`https://sparta-tim.shop/subscribe`,   //구독
    {headers: {Authorization: userToken}  })
    
    sse.onopen = e => {
      // console.log("연결완료")
    }

    sse.addEventListener('sse', e => {
        if(e.data.startsWith('{')) {
          // console.log(e.data)
          setRealtimeAlam((prev) => [JSON.parse(e.data)])

        }}
    )

    sse.onerror = e => {
      // console.log(e)
    };
  }
  return () => {
    if(userToken) {
      sse.close();
    }
  }
}, [userToken])

useEffect(()=>{
  if(realtimeAlam.length !== 0) {
    dispatch(_addAlam(realtimeAlam[0]))
    dispatch(_plusAlam(1))
  }
},[realtimeAlam])

// 로그인 시 본인 사진 가져오기
const [showMypage, setShowMypage] = useState(false)

const profileImg = JSON.parse(window?.localStorage?.getItem('userInfo'))?.profileImg
// console.log(profileImg)


  return (
    <NavContainer>
      <ModalPortal>
        {loginVisible && <LoginModal onClose={handleLoginModal} />}
        {registerVisible && <Legister onClose={handleRegisterModal} setLoginVisible={setLoginVisible}/>}
      </ModalPortal>
      <NavContent>

        <NavMain type="button" onClick={() => {navigate("/")}}>
          CRUX
        </NavMain>
        <NavCrew type="button" onClick={() => {navigate("/crews")}}>
          크루 모임
        </NavCrew>
        <NavCreateCrew type="button" onClick={() => {navigate("/createcrew")}}> 
          크루 생성
        </NavCreateCrew>
        <NavGym type="button" onClick={() => {navigate("/gyms")}}>
          클라이밍짐 후기
        </NavGym>
        
      </NavContent>
          
          {
            window.localStorage.getItem("userInfo") !== null ?
            <NavContentLogin>
              
              {/* 알림 드롭다운 */}
              <AlamImg src={알람종} 
                onClick={()=>{setShowAlam(!showAlam)}}/>
              
              <NreadAlam>{NreadAlams?.data?.count}</NreadAlam>
              
              { showAlam ? <Alam setShowAlam={setShowAlam} alams={alams} NreadAlams={NreadAlams}/> : null }
              
              {/* 프로필 이미지 드롭다운 */}
              <ProfileImg src={profileImg ? profileImg : 사용자이미지} 
                onClick={()=>{setShowMypage(!showMypage)}}/>
              
              { showMypage ? <NavbarDropdown setShowMypage={setShowMypage} userId={userId} removeToken={removeToken}/> : null }
              
            </NavContentLogin>

            :

            <NavContentLogin>
              <NavLogin type="button" onClick={handleLoginModal}>
                LOGIN
              </NavLogin>

              <NavRegister type="button" onClick={handleRegisterModal}>
                REGISTER
              </NavRegister>
            </NavContentLogin>
          }
          
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: flex;
  color: #ffffff;
  z-index: 3;
  /* position: absolute; */
  padding: 0 0 4.2rem 0;
  margin: 0;
  width: 192rem;
  background-color: #000000;
`;

const NavContent = styled.div`
  width: 65rem;
  margin: 10rem 0 0 36rem;
  align-items: baseline;
  display: flex;
  
`;

const NavMain = styled.div`
margin: 0 60px 0 0;
font-family: GothamBold;
font-size: 40px;
font-weight: 700;
letter-spacing: -2px;
text-align: left;
cursor: pointer;
`

const NavCrew = styled.div`
margin: 0 40px 0 0;
font-size: 20px;
font-weight: 500;
letter-spacing: -1px;
text-align: left;
cursor: pointer;
`

const NavCreateCrew = styled.div`
margin: 0 40px 0 0;
font-size: 20px;
font-weight: 500;
letter-spacing: -1px;
text-align: left;
cursor: pointer;
`
const NavGym = styled.div`
margin: 0 0 0 0;
font-size: 20px;
font-weight: 500;
letter-spacing: -1px;
text-align: left;
cursor: pointer;
`
const NavContentLogin = styled.div`
display: flex;
margin: 10rem 0 0 0;
align-items: end;

`
const NavLogin = styled.div`
margin: 0 25px 0 390px;
font-size: 16px;
font-weight: 500;
cursor: pointer;
`

const NavRegister = styled.div`
font-size: 16px;
font-weight: 500;
cursor: pointer;
`

const AlamImg = styled.img`
width: 3rem;
position: absolute;
margin: -6px 0 0 42rem;
cursor: pointer;
`

const NreadAlam = styled.div`
width: 2rem;
height: 2rem;
background-color: #ffb80091;
border-radius: 60%;
position: absolute;
margin: 0px 0 0 44rem;
top: 11.5rem;
padding: 2px 0 0 6.5px;
`

const ProfileImg = styled.img`
width: 5rem;
height: 5rem;
border-radius: 60%;
position: absolute;
margin: -6px 0 0 49.3rem;
cursor: pointer;
`

export default Navbar;