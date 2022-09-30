import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalPortal from "../Pages/Login/MordalPortal";
import LoginModal from "../Pages/Login/LoginModal";
import Legister from "../Pages/Register/Register";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Loading from "./Loading";
import Alam from "./Alam";
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { __getAlam, _readAlam, _addAlam, _deleteAlam, _deleteAlams, __NreadAlam, _minusAlam, _plusAlam } from "../Redux/modules/notification";
import { useEffect } from "react";


const Navbar = () => {
  const userToken = window.localStorage.getItem("access_token")
  const userId = window.localStorage.getItem("userId")
  // console.log(userToken)
  const removeToken = () => {
     localStorage.removeItem("access_token")
     localStorage.removeItem("userId")
     alert('로그아웃 되었습니다.')
     window.location.reload()
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
    sse = new EventSource(`http://sparta-tim.shop/subscribe`,   //구독
    {headers: {Authorization: userToken}  })
    // {"Last-Event-ID": lastEventId}
    
    
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
}, [])

useEffect(()=>{
  dispatch(__NreadAlam())
},[dispatch])

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
              {/* <Alam /> */}
              <NavLogin type="button" onClick={()=>{navigate(`/members/${userId}`)}}>
                MYPAGE
              </NavLogin>

              <NavRegister type="button" onClick={removeToken} >
                LOGOUT
              </NavRegister>
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
`

const NavCrew = styled.div`
margin: 0 40px 0 0;
font-size: 20px;
font-weight: 500;
letter-spacing: -1px;
text-align: left;
`

const NavCreateCrew = styled.div`
margin: 0 40px 0 0;
font-size: 20px;
font-weight: 500;
letter-spacing: -1px;
text-align: left;
`
const NavGym = styled.div`
margin: 0 0 0 0;
font-size: 20px;
font-weight: 500;
letter-spacing: -1px;
text-align: left;
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
`

const NavRegister = styled.div`
font-size: 16px;
font-weight: 500;
`

export default Navbar;