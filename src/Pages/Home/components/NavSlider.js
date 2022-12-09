import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import 슬라이더왼쪽버튼 from "../../../Image/btn_left.png"
import 슬라이더오른쪽버튼 from "../../../Image/btn_right.png"
import 슬라이더정지버튼 from "../../../Image/btn_stop.png"
import 메인슬라이더1 from "../../../Image/메인슬라이더1.png"
import 메인슬라이더2 from "../../../Image/메인슬라이더2.png"
import 메인슬라이더3 from "../../../Image/메인슬라이더3.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavSlider = () => {

    const navigate = useNavigate()
    
    const [playCarousel, setPlayCarousel] = useState(true);
    const onClickPlayCarousel = () => {
        setPlayCarousel(!playCarousel);
    };

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 1500,
        autoplay: playCarousel,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        nextArrow: (
            <Snext>
                <img src={슬라이더오른쪽버튼} style={{width:'2.5rem'}}/>
            </Snext>
        ),
        prevArrow: (
            <Sprev>
                <img src={슬라이더왼쪽버튼} style={{width:'2.5rem'}}/>
            </Sprev>
        ),
      };

return(
    <div>
    <StopButton src={슬라이더정지버튼} type="button" onClick={onClickPlayCarousel}/>
        <StyledSlider {...settings}>

    {/* 1번째 슬라이드 */}
            <Wrap1>
                <ContentArea>
                    {/* <Top></Top> */}
                    <Mid>지금이 바로 <br/>CRUX와 함께 할 때!</Mid>
                    <Bottom>클라이밍을 즐겁게 시작하고 싶다면 <br/>지금 바로 도전해보세요!</Bottom>
                </ContentArea>
                
            </Wrap1>

    {/* 2번째 슬라이드 */}
            <Wrap2>
                <ContentArea>
                    <Mid>지금이 바로 <br/>CRUX와 함께 할 때!</Mid>
                    <Bottom>클라이밍을 즐겁게 시작하고 싶다면 <br/>지금 바로 도전해보세요!</Bottom>
                </ContentArea>
            </Wrap2>

    {/* 3번째 슬라이드 */}
            <Wrap3>
                <ContentArea>
                    <Mid>지금이 바로 <br/>CRUX와 함께 할 때!</Mid>
                    <Bottom>클라이밍을 즐겁게 시작하고 싶다면 <br/>지금 바로 도전해보세요!</Bottom>
                </ContentArea>
            </Wrap3>


        </StyledSlider>

    </div>
    );
}

const Wrap1 = styled.div`
background-image: url(${메인슬라이더1});
width: 100%;
height: 100rem;
margin: 0 auto;
`
const ContentArea = styled.div`
width: 62.5%;
margin: 34rem 0 0 36rem;
color: #ffffff;
font-size: 20px;
font-weight: 500;
`
const Top = styled.div`
`
const Mid = styled.div`
margin: 5rem 0 0 0;
font-size: 48px;
`
const Bottom = styled.div`
margin: 3rem 0 0 0;
`

const Wrap2 = styled.div`
background-image: url(${메인슬라이더2});
width: 192rem;
height: 100rem;
margin: 0 auto;
`
const Wrap3 = styled.div`
background-image: url(${메인슬라이더3});
width: 192rem;
height: 100rem;
margin: 0 auto;
`

const StopButton = styled.img`
width: 1rem;
height: 2rem;
position: absolute;
margin: 79rem 0 0 41.2rem;
z-index: 5;
`

const StyledSlider = styled(Slider)`
width: 100%;
position: relative;
.slick-prev::before,
.slick-next::before{
    opacity: 0;
    display: none;
}
/* 밑에 right auto 안하면 오른쪽 슬라이더 버튼이 기본 값 right -25px 때문에 왼쪽으로 엄청 밀림... 진짜 이런거 기본값 설정 하지마~~ */
.slick-next {
    right: auto;
}

.slick-slide div {
    //슬라이더  컨텐츠
    /* cursor: pointer; */
}
`

const Snext = styled.div`
width: 2rem;
height: 30px;
position: absolute;
z-index: 4;
margin: 30rem 0 0 44.5rem;
line-height: 30px;
.slick-next {
    right: none;
}
`;

const Sprev = styled.div`
width: 2rem;
height: 30px;
position: absolute;
z-index: 4;
margin: 30rem 0 0 39rem;
line-height: 30px;
`;



export default NavSlider;