import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled, { keyframes } from "styled-components";
import 슬라이더왼쪽버튼 from "../../../Image/btn_left.png"
import 슬라이더오른쪽버튼 from "../../../Image/btn_right.png"
import 기본클라이밍짐 from "../../../Image/인기 클라이밍짐.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SliderGym = ({ gyms }) => {
    const navigate = useNavigate()

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        // autoplay: true,
        // autoplaySpeed: 5000,
        slidesToShow: 1.7,
        slidesToScroll: 1,
        pauseOnHover: true,
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
        
            <StyledSlider {...settings}>

        {/* Gym 슬라이드 */}

            {
                gyms?.map((gym,i)=>{
                    return(
                        <Wrap key={i}>
                            <GymName onClick={()=>{navigate(`/gyms/${gym.id}`)}}> 
                                {gym.name} (평점: {Number(gym.avgScore).toFixed(2)}점)
                                <GymNavi>바로가기</GymNavi>
                            </GymName>
                            <img src={gym.imgUrl !== null ? gym.imgUrl : 기본클라이밍짐} alt="" 
                                 style={{width:'630px', height:'630px', margin:'0 2%', position:'relative'}}/>
                        </Wrap>
                    )
                })
            }

            </StyledSlider>

        </div>
    );
}
const blinkEffect = keyframes`
    0% {
        color: white;
    }
    50% {
        color: #ffb800;
    }
    100% {
        color: white;
    }
`

const Wrap = styled.div`
:hover {
    color: #ffb800;
    span{
        color: white;
        animation: ${blinkEffect} 1s 1s infinite;
    }
}
cursor: pointer;
`

const GymName = styled.div`
font-size: 2rem;
margin: 1rem 0px 8px 3rem;
position: absolute;
z-index: 3;
`
const GymNavi = styled.span`
font-size: 1.6rem;
text-decoration: underline;
margin-left: 5px;
`

const StyledSlider = styled(Slider)`
width: 100%;
position: relative;
.slick-prev::before,
.slick-next::before{
    opacity: 0;
    display: none;
}
.slick-slide div {
    //슬라이더  컨텐츠
    /* cursor: pointer; */
}
`

const Snext = styled.div`
width: 30px;
height: 30px;
position: absolute;
/* right: 16px; */
z-index: 99;
margin: 0% 1500px 0 0;
/* text-align: right; */
line-height: 30px;
`;

const Sprev = styled.div`
width: 30px;
height: 30px;
position: absolute;
/* left: 16px; */
z-index: 99;
margin: 0 0 0 -470px;
/* text-align: left; */
line-height: 30px;
`;


export default SliderGym;