import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const NavbarDropdown = ({setShowMypage, userId, removeToken}) => {

const closeModal = () => {
    setShowMypage(false)
}
const navigate = useNavigate()

    return (
        <ModalPage onClick={closeModal}>
            <ModalBox onClick={(e)=>e.stopPropagation()}>
                <Content onClick={()=>{navigate(`/members/${userId}`)}}>MYPAGE</Content>
                <Content onClick={removeToken}>LOGOUT</Content>
            </ModalBox>
        </ModalPage>
    )
}

const ModalPage = styled.div`
position: absolute;
top: 0;
margin: 0 0 0 -101rem;
width: 1920px;
height: 100%;
z-index: 900;
`   

const ModalBox = styled.div`
width: 11rem;
height: 10rem;
box-shadow: 0px 80px 80px rgba(0, 0, 0, 0.25);
border-radius: 15px;
position: absolute;
top: 21rem;
left: 79.7%;
transform: translate(-50%, -50%);
background: #262626;
color: #cccccc;
overflow: auto;
z-index: 901;
font-size: 1.2rem;
text-align: center;
padding: 1rem 0 0 0;
`

const Content = styled.div`
width: 9rem;
height: 3.5rem;
margin: 2px auto 6px auto;
border-radius: 0.5rem;
background-color: #333333;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
`

export default NavbarDropdown;