import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../../Shared/Loading";
import { GetAxios } from "../../../Shared/api/main";

const GalaryArea = () => {
const BASE_URL = "https://sparta-tim.shop";
const navigate = useNavigate()

const [galarys, setGalarys] = useState([]) 
// console.log(galarys)


// const getGalarys = async () => {
//     await axios.get(`${BASE_URL}/crews/posts?page=0&size=6`)
//         .then((res) => {
//             // console.log(res.data.data)
//             setGalarys((prev) => [...prev, ...res.data.data]);
//         })
//         .catch((err) => {
//         // console.log(err);
//         }) 
// }

const getGalarys = () => {
    GetAxios(`crews/posts?page=0&size=6`)
    .then((res)=>{
        setGalarys((prev) => [...prev, ...res.data.data])
    })
    .catch((err)=>{
        console.log(err)
    })
}

useEffect(()=>{
    getGalarys();
},[])

    return(
        <div style={{width:'1920px', height:'1180px', backgroundColor:'#111'}}>
            <Title> 최신 갤러리 </Title>

            <div style={{width:'1206px', height:'804px', margin:'30px auto 0 auto' }}>
                
            {
                galarys.length === 0 ? <Loading /> :
                    galarys?.slice(0,6).map((galary)=>{
                        return(
                            <GalaryImg key={`${galary.postId}+${galary.crewId}`} 
                                src={galary.imgList[0]?.imgUrl} 
                                style={{width:'400px', height:'400px',position:'relative', margin:'0 1px 1px 0'}}
                                onClick={()=>{navigate(`/crews/${galary.crewId}`)}}/>
                        )
                    })
            }           

            </div>
            

            
            
        </div>
    )
}

const GalaryImg = styled.img`
/* :hover {
    transform: scale(1.05);
    transition: 0.5s;
  } */
cursor: pointer;
`

const Title = styled.div`
width: 1206px;
/* height: 60px; */
margin: 0 auto 0px auto;
padding: 140px 0 0 0;
font-size: 48px;
font-weight: 700;
letter-spacing: -2.4px;
text-align: left;
color: #fff;
`


export default GalaryArea;