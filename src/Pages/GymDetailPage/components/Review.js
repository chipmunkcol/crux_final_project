import styled from "styled-components";
import 사용자이미지 from "../../../Image/사용자기본이미지.jpg"
import Loading from "../../../Shared/Loading";
import { __delReview } from "../../../Redux/modules/gymDetilSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import EditModalReview from "./EditModalReview";
import ReviewImgSlider from "./ReviewImgSlider";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 노랑별 from "../../../Image/노랑별.png"
import 검은별 from "../../../Image/검은별.png"


const Review = ({gym, reload, setReload}) => {
const BASE_URL = "https://sparta-tim.shop";
const navigate = useNavigate()
const [editModal, setEditModal] = useState(false)
const [reviewId, setReviewId] = useState('')
const [reviewImgModal, setReviewImgModal] = useState(false)
const [reviewData, setReviewData] = useState([])

const openModal = (review) => {
    setReviewImgModal(true);
    setReviewData(review)
}

const userId = Number(window.localStorage.getItem('userId'))
// console.log(userId)
const dispatch = useDispatch()

const onclickDelReview = (reviewId) => {
    if (window.confirm("정말 삭제하시겠어요?")) {
        delReview(reviewId);
    } else {}
}

const delReview = async (reviewId) => {
    await axios.delete(`${BASE_URL}/reviews/${reviewId}`,
        { headers: {Authorization: window.localStorage.getItem("access_token")}})
      .then((res) => {
        setReload(!reload)
      })
      .catch((err) => {
        console.log(err);
      }) 
}

if(gym === undefined) {
    return( <Loading/>)
}

    return(
        <div style={{width:'192rem', backgroundColor:'#141414'}}>
            <Wrap style={{width:'120rem', margin:'0 auto', padding:'3rem 0 0 0', color:'#999999'}}>
                
                {
                    gym.reviews?.map((review,i) => {
                        return(
                            <div key={i} style={{margin:'0 auto',display:'flex', padding:'5rem 0 0 0',borderBottom:'1px solid #202020'}}>
                                <div style={{width:'11rem', height:'100%'}}>

                                    <div><img src={review.imgUrl !== "" || null || undefined ? review.imgUrl : 사용자이미지} style={{width:'8rem', height:'8rem', borderRadius:'60%'}}
                                            onClick={()=>{navigate(`/members/${review.memberId}`)}}/></div>
                                    
                                </div>

                                <div style={{width:'84rem', height:'100%', padding:'1rem', fontSize:'1.4rem'}}>
                                    <div style={{margin:'0 0 0 0', color:'#ffffff', fontSize:'2rem'}}>{review.nickname}
                                        <span style={{opacity:'0.5', margin:'0 0 0 2rem', fontSize:'1.4rem'}}>{review.createdAt?.substr(0,10)}</span>
                                    </div>
                                
                                    <div style={{height:'3rem', margin:'0.5rem 0 0 0'}}>
                                        {
                                        review.score === 1 ? <Star1 />
                                        : review.score === 2 ? <Star2 />
                                            : review.score === 3 ? <Star3 />
                                                : review.score === 4 ? <Star4 />
                                                    : review.score === 5 ? <Star5 />
                                                        : <Star0 />
                                        }
                                    </div>

                                    <ReviewContent >
                                        {review.content}
                                    </ReviewContent>
                {/* ?? 반복문 웨안돼! */}
                
                                        {   review?.reviewPhotoList?.length === 0 ? null :
                                            review?.reviewPhotoList?.length === 1 ? 
                                            <ReviewImg src={review.reviewPhotoList[0].imgUrl} style={{width:'12rem', height:'12rem', margin:'1.4rem 1rem 2rem 0'}}
                                            onClick={()=>{openModal(review); setReviewId(review.id)}}/> :
                                            review?.reviewPhotoList?.length === 2 ? 
                                            <>
                                            <ReviewImg src={review.reviewPhotoList[0].imgUrl} style={{width:'12rem', height:'12rem', margin:'1.4rem 1rem 2rem 0'}}
                                            onClick={()=>{openModal(review); setReviewId(review.id)}}/> 
                                            <ReviewImg src={review.reviewPhotoList[1].imgUrl} style={{width:'12rem', height:'12rem', margin:'1.4rem 1rem 2rem 0'}}
                                            onClick={()=>{openModal(review); setReviewId(review.id)}}/> 
                                            </> :
                                            <>
                                            <ReviewImg src={review.reviewPhotoList[0].imgUrl} style={{width:'12rem', height:'12rem', margin:'1.4rem 1rem 2rem 0'}}
                                            onClick={()=>{openModal(review); setReviewId(review.id)}}/> 
                                            <ReviewImg src={review.reviewPhotoList[1].imgUrl} style={{width:'12rem', height:'12rem', margin:'1.4rem 1rem 2rem 0'}}
                                            onClick={()=>{openModal(review); setReviewId(review.id)}}/> 
                                            <ReviewImg src={review.reviewPhotoList[2].imgUrl} style={{width:'12rem', height:'12rem', margin:'1.4rem 1rem 2rem 0'}}
                                            onClick={()=>{openModal(review); setReviewId(review.id)}}/>
                                            </>
                                        
                                        }
                                        
                                    
                                </div>
                                
                                {
                                    review?.memberId !== userId ? null : 
                                        <div style={{margin:'1rem 0 0 17rem'}}>
                                            <span onClick={()=>{setEditModal(true); setReviewId(review.id)}} type="button">수정</span> &nbsp;|&nbsp; 
                                            <span onClick={()=>{onclickDelReview(review.id)}} type="button">삭제</span>
                                        </div>
                                }

                                {
                                        editModal && <EditModalReview setEditModal={setEditModal} reviewId={reviewId} gym={gym} reload={reload} setReload={setReload} />
                                }

                            </div>
                        )
                    })
                }
                
            </Wrap>
            
                    {reviewImgModal ? <ReviewImgSlider setReviewImgModal={setReviewImgModal} reviewData={reviewData} reviewId={reviewId}/> : null}

        </div>
    )
}

const ReviewImg = styled.img`
cursor: zoom-in;
`
const ReviewContent = styled.div`
width: 94rem;
margin: 1rem 0 0.5rem 0;
color: #999999;
`

const Wrap = styled.div`
word-break: break-all;
`

const Star0 = () => {
    return(
        <>
        <img src ={검은별} 
                style={{width:'2rem', margin:'0 0.8rem 0 0rem'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        </>
    )
}
const Star1 = () => {
    return(
        <>
        <img src ={노랑별} 
                style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        </>
    )
}
const Star2 = () => {
    return(
        <>
        <img src ={노랑별} 
                style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={노랑별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        </>
    )
}
const Star3 = () => {
    return(
        <>
        <img src ={노랑별} 
                style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={노랑별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={노랑별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        </>
    )
}
const Star4 = () => {
    return(
        <>
        <img src ={노랑별} 
                style={{width:'2rem', margin:'0 0.8rem 0 0rem'}}/>
        <img src ={노랑별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={노랑별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={노랑별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={검은별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        </>
    )
}
const Star5 = () => {
    return(
        <>
        <img src ={노랑별} 
                style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={노랑별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={노랑별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={노랑별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        <img src ={노랑별}
        style={{width:'2rem', margin:'0 0.8rem 0 0'}}/>
        </>
    )
}



export default Review;