import styled from "styled-components"
import 푸터영역 from "../Image/Footer@3x.png"

const Footer = () => {
    return(
        <Container>
            <Anker>
                <Git></Git>
                <Hanghae99></Hanghae99>
            </Anker>

        </Container>
    )
}

const Container = styled.div`
background-image: url(${푸터영역});
background-size: cover;
background-position: center;
width: 100%;
height: 40rem;
margin: 0 auto;
`

const Anker = styled.div`
display: flex;
width: 20rem;
height: 8rem;
/* background-color: yellow; */
float: right;

`

const Git = styled.div`
width: 50%;
/* background-color: red; */
`
const Hanghae99 = styled.div`
width: 50%;
/* background-color: blue; */
`
export default Footer;
