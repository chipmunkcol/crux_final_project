import styled from "styled-components"
import { useRef,useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import 디폴트짐 from "../../../Image/인기 클라이밍짐.png"



const GymList = ({gyms, onclickGymList}) => {
console.log(gyms)
const navigate = useNavigate()


    return (
        <div style={{margin:'10.5rem 0 0 0'}}>
                <Gymlist>
                    
                    { gyms?.length === 0 ?  <p style={{color:'#ffffff', margin:'6rem 0 0 0', fontSize:'1.6rem', textAlign:'center'}}>검색 결과가 없습니다.</p> : 
                        
                            gyms?.map((gym, i)=>{
                                return(
                                    <div key={gym.id} style={{display:'flex', margin:'2rem 0 0 3.5rem', width:'50rem', height:'17rem', borderBottom:'1px solid #262626'}} 
                                    onClick={()=>{onclickGymList(gym.lat, gym.lon)}}>
                                        <img src={gym.imgUrl !== null ? gym.imgUrl : 디폴트짐} alt='' style={{width:'15rem', height:'15rem'}}/>
                                        <GymContent style={{width:'35rem', padding:'1rem'}}>
                                            <h3 style={{margin:'0 0 0 0'}} onClick={()=>{ navigate(`/gyms/${gym.id}`) }} type="button">{gym.name}</h3>
                                            <p style={{margin:'2rem 0 0 0'}}>{gym.location}</p>
                                            <p style={{margin:'1rem 0 0 0'}}>{gym.phone}</p>
                                            <p style={{margin:'1rem 0 0 0'}}>✨ {Number(gym.avgScore).toFixed(2)}</p>
                                            
                                        </GymContent>
                                    </div>
                                );
                            })
                        }

                </Gymlist>
        </div>
    )
}

const Gymlist = styled.div`
height: 85rem;
overflow: auto;
::-webkit-scrollbar {
    display: none;
}
`

const GymContent = styled.div`
:hover {
    color: #ffb800;
}
`

export default GymList;