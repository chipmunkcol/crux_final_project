import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import 메인소개배너 from "../../../Image/매인소개배너.png"
import 오른쪽화살표회색 from "../../../Image/오른쪽화살표회색.png"

const MainBanner = () => {

    const navigate = useNavigate()

    return(
        <Container>
            <Title>혼자 즐기는 클라이밍이 지겹거나 <br/> 
                <span style={{fontWeight:'700'}}>클라이밍을 즐겁게 시작하기를 원한다면?</span></Title>
            <Wrap>
                <ContentArea>
                    <Top>새로운 크루원들과의 만남과<br/> 신나는 도전</Top>
                    <Mid>크럭스에서는 크루를 운영하는 플렛폼을 제공하며,<br/> 크루장과 크루원의 도전을 응원합니다.<br/> 다양한 크루와 신나는 도전을 크럭스에서 즐겨보세요!</Mid>
                    <Bottom><span onClick={()=>{navigate(`/crews`)}} type="button">바로가기 
                        <img src={오른쪽화살표회색} style={{width:'8px', height:'15px', margin:'0 0 0 7px'}}/></span>
                    </Bottom>
                </ContentArea>
            </Wrap>

        </Container>
    )
}

const Container = styled.div`
width: 192rem;
height: 90.5rem;
background-color: #141414;
color: #ffffff;
margin: 0 auto;
`
const Title = styled.div`
width: 120rem;
margin: 0 auto 0 auto;
padding: 14rem 0 0 0;
font-size: 4.8rem;
`
const Wrap = styled.div`
background-image: url(${메인소개배너});
width: 120rem;
height: 45rem;
margin: 6rem auto 0 auto;
`
const ContentArea = styled.div`
width: 40rem;
height: 45rem;
background-color: #2b2b2b;
opacity: 0.57;
float: right;
color: #999999;
font-size: 1.4rem;
padding: 6.75rem 4rem 6.75rem 4rem;
`
const Top = styled.div`
color: #ffffff;
font-size: 2rem;
`
const Mid = styled.div`
margin: 2rem 0 0 0;
`
const Bottom = styled.div`
margin: 15rem 0 0 0;
`

export default MainBanner;