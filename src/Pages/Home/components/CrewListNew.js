import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../../Shared/Loading"
import 인기크루 from "../../../Image/인기크루.png"
import { useEffect, useState } from "react";
import axios from "axios";


const CrewListNew = ({crews}) => {

const navigate = useNavigate()

return (
    <>
        {
            crews.length===0 ? <Loading /> :

                crews?.map((crew,i)=>{
                    return(
                            <div key={crew.id} style={{width:'274px', height:'400px', margin:'0 70px 0 0'}}>
                                <img src={crew.imgUrl !== "" ? crew.imgUrl : 인기크루} alt="" style={{width:'250px', height:'250px', margin:'0 10px', borderRadius:'60%'}}
                                    onClick={()=>{navigate(`/crews/${crew.id}`)}}/>
                                <div>
                                    <Snumber>{i+1}</Snumber>
                                    <div style={{textAlign:'center'}}>
                                        <div style={{color:'white', margin:'0 0 14px 0'}}>{crew?.name}</div>
                                        <div style={{color:'white'}}>좋아요 {crew?.likeNum}개</div>
                                    </div>
                                </div>
                                
                            </div>
                    )
                })
        }
    </>
)
}


const Snumber = styled.div`
width: 56px;
height: 135px;
opacity: 0.05;
font-family: Poppins;
font-size: 180px;
font-weight: 600;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: -9px;
text-align: left;
color: #fff;
margin: -104px 0 0 -10px;
`

export default CrewListNew;