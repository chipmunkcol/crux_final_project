import styled from "styled-components";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import 슬라이더왼쪽버튼 from "../../../Image/btn_left.png"
import 슬라이더오른쪽버튼 from "../../../Image/btn_right.png"


const ReviewImgSlider = ({setReviewImgModal, reviewData, reviewId}) => {
   
// console.log(reviewData)
// console.log(reviewId)

const closeModal = () => {
    setReviewImgModal(false);
} 

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
        <Snext>
            <img src={슬라이더오른쪽버튼} style={{width:'5rem'}}/>
        </Snext>
    ),
    prevArrow: (
        <Sprev>
            <img src={슬라이더왼쪽버튼} style={{width:'5rem'}}/>
        </Sprev>
    ),
  };


    return(
        <ModalPage onClick={closeModal}>
            <Container onClick={(e)=> e.stopPropagation()}>

            <StyledSlider  {...settings} >

                {   
                reviewData.id !== reviewId ? null :
                    reviewData?.reviewPhotoList.map((review, i) => {
                        return(
                            <div key={i} >

                                <PhotoImg img={review.imgUrl}/> 
                            
                            </div>
                        )
                    })
                }

                </StyledSlider>

            </Container>

        </ModalPage>
    )
}

const ModalPage = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 900;
background-color: rgba(0, 0, 0, 0.4);
color:black
`
const Container = styled.div`
width: 63rem;
height: 63rem;
z-index: 999;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: #ffffff;
border: 1px solid black;
/* border-radius: 8px; */
`

const PhotoImg = styled.div`
width: 63rem;
height: 63rem;
display: block;
background: url(${(props) => props.img});
background-position: center;
background-size: cover;
background-repeat: no-repeat;
`

const StyledSlider = styled(Slider)`
width: 100%;
height: 0rem;
position: relative;
.slick-prev::before,
.slick-next::before{
    opacity: 0;
    display: none;
}
    .slick-slider{
        width: 100%;
        align-items: center;
        justify-content: center;
    }
`

const Snext = styled.div`
position: absolute;
/* right: 16px; */
z-index: 100;
margin: 48% 12% 0 0;
/* text-align: right; */
line-height: 30px;
`;

const Sprev = styled.div`
position: absolute;
/* left: 16px; */
z-index: 100;
margin: 48% 0 0 9%;
/* text-align: left; */
line-height: 30px;
`;


export default ReviewImgSlider;