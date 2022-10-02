import styled from "styled-components";
import 알람종 from "../../../Image/알람종.png"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalPortal from "../../../Pages/Login/MordalPortal";
import LoginModal from "../../..//Pages/Login/LoginModal";
import Legister from "../../..//Pages/Register/Register";
import { useSelector, useDispatch } from "react-redux";
import Alam from "../../../Shared/Alam";
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { _addAlam, __NreadAlam, _plusAlam } from "../../../Redux/modules/notification";
import { __getMyPage } from "../../../Redux/modules/mypageSlice";
import NavbarDropdown from "../../../Shared/NavbarDropdown";


const Navbar = () => {
  const userToken = window.localStorage.getItem("access_token")
  const userId = window.localStorage.getItem("userId")
  // console.log(userToken)
  const removeToken = () => {
     localStorage.removeItem("access_token")
     localStorage.removeItem("userId")
     localStorage.removeItem("nickname")
     alert('로그아웃 되었습니다.')
     navigate('/')
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
  console.log(NreadAlams.data, error2)

//SSE 연결하기
const EventSource = EventSourcePolyfill || NativeEventSource;  //eventsource 쓰려면 import 해야됨!
// console.log(lastEventId)

let sse = undefined;
useEffect(()=>{
  if (userToken) {
    sse = new EventSource(`https://sparta-tim.shop/subscribe`,   //구독
    {headers: {Authorization: userToken}  })
    
    sse.onopen = e => {
      console.log("연결완료")
    }

    sse.addEventListener('sse', e => {
        if(e.data.startsWith('{')) {
          console.log(e)
          console.log(JSON.parse(e.data))

          dispatch(_addAlam(JSON.parse(e.data)))
          dispatch(_plusAlam(1))
          // setAlam(prev => [...prev, JSON.parse(e.data).content])
        }}
    )

    sse.onerror = e => {
      console.log(e)
      sse.close();
    }
  }
  return () => {
    sse.close();
  }
}, [userToken])

useEffect(()=>{
  dispatch(__NreadAlam())
},[dispatch])

// 로그인 시 본인 사진 가져오기
const {isLoading, error, mypage} = useSelector((state)=>state.myPage)
// console.log(isLoading, error, mypage)
const profileImg = mypage?.data?.imgUrl
console.log(profileImg)

const [showMypage, setShowMypage] = useState(false)

useEffect(()=>{
  if (userToken) {
    dispatch(__getMyPage(userId))
  }
},[userToken])

  return (
    <NavContainer>
      <ModalPortal>
        {loginVisible && <LoginModal onClose={handleLoginModal} />}
        {registerVisible && <Legister onClose={handleRegisterModal} />}
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
            userToken !== null ?
            <NavContentLogin>
              
              {/* 알림 드롭다운 */}
              <AlamImg src={알람종} 
                onClick={()=>{setShowAlam(!showAlam)}}/>
              <NreadAlam>{NreadAlams.data.count}</NreadAlam>
              
              { showAlam ? <Alam setShowAlam={setShowAlam} NreadAlams={NreadAlams}/> : null }
              
              {/* 프로필 이미지 드롭다운 */}
              <ProfileImg src={profileImg} 
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
  padding: 0 0 4.2rem 0;
  position: absolute;
  margin: 0;
  width: 192rem;
  background-color: transparent;
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
position: absolute;
margin: -6px 0 0 49.3rem;
`

export default Navbar;