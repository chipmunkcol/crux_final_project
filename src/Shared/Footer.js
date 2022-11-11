import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import 푸터영역 from "../Image/Footer@3x.png"

const Footer = () => {

const navigate = useNavigate()

    return(
        <Container>
            <Anker>
                <Git onClick={()=>{window.open('https://github.com/Crux-TeamProject/FE')}}></Git>
                <Hanghae99 onClick={()=>{window.open('https://hanghae99.spartacodingclub.kr/v2/exhibitions')}}></Hanghae99>
            </Anker>

        </Container>
    )
}

const Container = styled.div`
background-image: url(${푸터영역});
background-size: cover;
background-position: center;
width: 192rem;
height: 40rem;
margin: 0 auto;
`

const Anker = styled.div`
display: flex;
width: 25rem;
height: 8rem;
margin: 25px 0px 0 131.8rem;
position: absolute;
cursor: pointer;
`

const Git = styled.div`
width: 58%;
background-color: transparent;
opacity: 0.8;
`
const Hanghae99 = styled.div`
width: 50%;
opacity: 0.8;
background-color: transparent;
`
export default Footer;