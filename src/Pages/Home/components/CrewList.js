import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getCrew, __getGym } from "../../../Redux/modules/homeSlice";
import Loading from "../../../Shared/Loading"
import 인기크루 from "../../../Image/인기크루.png"
import { useEffect } from "react";


const CrewList = ({crews}) => {


const navigate = useNavigate()


return (
    <>
        {
            crews?.length===0 ? <Loading /> :
                crews?.map((crew,i)=>{
                    return(
                            <CrewImg key={crew.id} >
                                <img src={crew.imgUrl !== "" ? crew.imgUrl : 인기크루} alt="" style={{width:'25rem', height:'250px', margin:'0 10px', borderRadius:'60%'}}
                                    onClick={()=>{navigate(`/crews/${crew.id}`)}}/>
                                <div>
                                    <Snumber>{i+1}</Snumber>
                                    <div style={{textAlign:'center', color:'white'}}>
                                        <CrewName >{crew?.name}</CrewName>
                                        <div>좋아요 {crew?.likeNum}개</div>
                                    </div>
                                </div>
                                
                            </CrewImg>
                    )
                })
        }
    </>
    )
}

const CrewImg = styled.div`
/* style={{width:'274px', height:'400px', margin:'0 70px 0 0'}} */
width: 27.4rem;
height: 40rem;
margin: 0 7rem 0 0;
:hover {
    transform: scale(1.05);
    transition: 0.5s;
  }
cursor: pointer;
`
const CrewName = styled.div`
margin: 0px auto 14px auto;
overflow: hidden;
width: 13rem;

` 
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

export default CrewList;