import { useEffect, useState } from "react";
import CrewList from "./CrewList";
import CrewListNew from "./CrewListNew";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { __getCrew } from "../../../Redux/modules/homeSlice";
import { GetAxios } from "../../../Shared/api/main";

const CrewArea = () => {

const BASE_URL = "https://sparta-tim.shop";
// const BASE_URL = "54.180.106.211";

const dispatch = useDispatch()
const [showNewCrew, setShowNewCrew] = useState(false)    

const [choiceCrew, setChoiceCrew] = useState(true)
const [choiceNewCrew, setChoiceNewCrew] = useState(false)

const {getCrew} = useSelector((state)=>state.getCrew)
const crews = getCrew?.data?.content

const [newCrews, setNewCrews] = useState([]) 
// console.log(crews)

// const getNewCrew = async () => {
//     await axios.get(`${BASE_URL}/crews?page=0&size=4`)
//       .then((res) => {
//         setNewCrews((prev) => [...prev, ...res.data.data.content]);
//       })
//       .catch((err) => {
//         console.log(err);
//       }) 
// }

const getNewCrew = () => {
    GetAxios(`crews?page=0&size=4`)
    .then((res)=>{
        setNewCrews((prev)=> [...prev, ...res.data.data.content]);
    }).catch((err)=>{
        console.log(err);
    })
}

useEffect(()=>{
    dispatch(__getCrew())
    getNewCrew();
},[])

return(
        <div style={{width:'100%',height:'560px', padding:'74px 0 0 0', backgroundColor:'#111', margin:'0 auto'}}>
            <div style={{width:'1220px', fontSize:'32px', margin:'0 auto', color:'white'}}>
                <ChoiceCrew status={choiceCrew} type="button"
                    onClick={()=>{setShowNewCrew(false); setChoiceCrew(true); setChoiceNewCrew(false)}}>
                        인기 크루
                </ChoiceCrew>

                <span style={{margin:'0 25px 0 25px', opacity:"0.15"}}>|</span>

                <ChoiceCrew status={choiceNewCrew} type="button"
                    onClick={()=>{setShowNewCrew(true); setChoiceNewCrew(true); setChoiceCrew(false)}}>
                        신규 크루
                </ChoiceCrew>
            </div>
            <div style={{width:'1210px', margin:'12px 360px 0 350px', display:'flex'}}>
            
            { showNewCrew ? <CrewListNew crews={newCrews}/> : <CrewList crews={crews}/> }

            </div>
        </div>
    )
}


const ChoiceCrew = styled.span`
font-size: 3.2rem;
font-weight: ${(props) => (props.status ? 700 : 400)};
`

export default CrewArea;