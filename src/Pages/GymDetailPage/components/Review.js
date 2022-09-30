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

const Review = ({gym, reload, setReload}) => {
const BASE_URL = "http://sparta-tim.shop";
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
console.log(userId)
const dispatch = useDispatch()

const onclickDelReview = (reviewId) => {
    delReview(reviewId);
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
            <div style={{width:'120rem', margin:'0 auto', padding:'3rem 0 0 0', color:'#999999'}}>
                
                {
                    gym.reviews?.map((review,i) => {
                        return(
                            <div key={i} style={{margin:'0 auto',display:'flex', padding:'5rem 0 0 0',borderBottom:'1px solid #202020'}}>
                                <div style={{width:'11rem', height:'100%'}}>

                                    <div><img src={review.imgUrl !== null ? review.imgUrl : 사용자이미지} style={{width:'8rem', height:'8rem', borderRadius:'60%'}}
                                            onClick={()=>{navigate(`/members/${review.memberId}`)}}/></div>
                                    
                                </div>

                                <div style={{width:'44rem', height:'100%', padding:'1rem', fontSize:'1.4rem'}}>
                                    <div style={{margin:'0 0 0 0', color:'#ffffff'}}>{review.nickname}
                                        <span style={{opacity:'0.5', margin:'0 0 0 2rem'}}>{review.createdAt?.substr(0,10)}</span>
                                    </div>
                                
                                    <div style={{height:'4rem', margin:'0.5rem 0 0 0'}}>
                                        {
                                        review.score === 1 ? <Star />
                                        : review.score === 2 ? <Star2 />
                                            : review.score === 3 ? <Star3 />
                                                : review.score === 4 ? <Star4 />
                                                    : review.score === 5 ? <Star5 />
                                                        : ''
                                        }
                                    </div>

                                    <div style={{margin:'0.5rem 0 0 0'}}>
                                        {review.content}
                                    </div>
                {/* ?? 반복문 웨안돼! */}
                
                                        {   review?.reviewPhotoList?.length === 0 ? null :
                                            review?.reviewPhotoList?.length === 1 ? 
                                            <img src={review.reviewPhotoList[0].imgUrl} style={{width:'12rem', height:'12rem', margin:'1.4rem 1rem 2rem 0'}}
                                            onClick={()=>{openModal(review); setReviewId(review.id)}}/> :
                                            review?.reviewPhotoList?.length === 2 ? 
                                            <>
                                            <img src={review.reviewPhotoList[0].imgUrl} style={{width:'12rem', height:'12rem', margin:'1.4rem 1rem 2rem 0'}}
                                            onClick={()=>{openModal(review); setReviewId(review.id)}}/> 
                                            <img src={review.reviewPhotoList[1].imgUrl} style={{width:'12rem', height:'12rem', margin:'1.4rem 1rem 2rem 0'}}
                                            onClick={()=>{openModal(review); setReviewId(review.id)}}/> 
                                            </> :
                                            <>
                                            <img src={review.reviewPhotoList[0].imgUrl} style={{width:'12rem', height:'12rem', margin:'1.4rem 1rem 2rem 0'}}
                                            onClick={()=>{openModal(review); setReviewId(review.id)}}/> 
                                            <img src={review.reviewPhotoList[1].imgUrl} style={{width:'12rem', height:'12rem', margin:'1.4rem 1rem 2rem 0'}}
                                            onClick={()=>{openModal(review); setReviewId(review.id)}}/> 
                                            <img src={review.reviewPhotoList[2].imgUrl} style={{width:'12rem', height:'12rem', margin:'1.4rem 1rem 2rem 0'}}
                                            onClick={()=>{openModal(review); setReviewId(review.id)}}/>
                                            </>
                                        
                                        }
                                        
                                    
                                </div>
                                
                                {
                                    review?.memberId !== userId ? null : 
                                        <div style={{margin:'1rem 0 0 58rem'}}>
                                            <span onClick={()=>{setEditModal(true); setReviewId(review.id); console.log(review.memberId)}} >수정</span> &nbsp;|&nbsp; 
                                            <span onClick={()=>{onclickDelReview(review.id); console.log(review.id)}} type="button">삭제</span>
                                        </div>
                                }

                                {
                                        editModal && <EditModalReview setEditModal={setEditModal} reviewId={reviewId} gym={gym} reload={reload} setReload={setReload} />
                                }

                            </div>
                        )
                    })
                }
                
            </div>
            
                    {reviewImgModal ? <ReviewImgSlider setReviewImgModal={setReviewImgModal} reviewData={reviewData} reviewId={reviewId}/> : null}

        </div>
    )
}

const Star = () => {
    return(
        <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
    )
}
const Star2 = () => {
    return(
        <>
        <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
                <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
        </>
    )
}
const Star3 = () => {
    return(
        <>
        <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
                <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
                <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
        </>
    )
}
const Star4 = () => {
    return(
        <>
        <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
                <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
                <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
                <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
        </>
    )
}
const Star5 = () => {
    return(
        <>
        <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
                <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
                <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
                <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
                <img src ="https://cdn-icons-png.flaticon.com/512/6364/6364386.png" 
                style={{width:'3rem'}}/>
        </>
    )
}


export default Review;