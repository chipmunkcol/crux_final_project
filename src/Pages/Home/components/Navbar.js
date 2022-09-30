import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../../Login/MordalPortal";
import LoginModal from "../../Login/LoginModal";
import Register from "../../Register/Register";
import Alam from '../../../Shared/Alam'


const Navbar = () => {

  const userToken = window.localStorage.getItem("access_token")
  const userId = window.localStorage.getItem("userId")
  // console.log(userToken)
  const removeToken = () => {
     localStorage.removeItem("access_token")
     localStorage.removeItem("userId")
     alert('로그아웃 되었습니다.')
     navigate('/')
    //  window.location.reload('/')
  }

  const navigate = useNavigate();

  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);

  const handleLoginModal = () => {
    setLoginVisible(!loginVisible);
  };

  const handleRegisterModal = () => {
    setRegisterVisible(!registerVisible);
  };


  return (
    <NavContainer>
      <ModalPortal>
        {loginVisible && <LoginModal onClose={handleLoginModal} />}
        {registerVisible && <Register onClose={handleRegisterModal} />}
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
  background-color: transparent;
  color: #ffffff;
  z-index: 3;
  position: absolute;
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
