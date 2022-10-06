import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getGym } from "../../../Redux/modules/homeSlice";
import Loading from "../../../Shared/Loading";
import GymSlider from "./GymSlider";

const GymArea = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoading, error, getGym} = useSelector((state)=>state.getGym)
    const gym = getGym?.data
    // console.log(gym)

    useEffect(()=>{
        dispatch(__getGym())
    },[])


if (isLoading) {
    <Loading />
} 

    return(
        <div style={{width:'192rem', height:'1030px',margin:'0 auto', backgroundColor:'#141414' ,color:'#fff'}}>
                <div style={{width:'1290px', height:'700px', opacity:'0.1', backgroundColor:'#fff'}}></div>
                <div style={{width:'380px', color:'#fff', margin:'-570px 0 0 313px'}}>
                    <div style={{fontSize:'48px', fontWeight:'700', margin:'0 0 30px 0'}}>이번 달<br/> 인기 클라이밍짐</div>
                    <div style={{fontSize:'20px', fontWeight:'500', margin:'0 0 10px 0'}}>볼더링 / 리드 / 스피드</div>
                    <div style={{fontSize:'14px', fontWeight:'400'}}>스포츠클라이밍은 누구나 재미있게 즐기며 몸매관리 및 다이어트에<br/> 매우 좋은 운동입니다.일일예약 및 단체 예약 후 이용 가능합니다.</div>
                    <div style={{fontSize:'14px', fontWeight:'400', margin:'3rem 0 0 0'}}>작성해주신 리뷰 평점을 바탕으로 <br/>인기 클라이밍짐이 집계됩니다</div>
                </div>
                <div style={{margin:'-10% 0 0 42%'}}>
                
                    <GymSlider gyms={gym}/>
                   
                </div>

        </div>
    )
}

export default GymArea;