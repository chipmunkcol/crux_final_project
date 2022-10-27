import styled from "styled-components";
import { useState, useEffect } from "react";
import Loading from "../Shared/components/AlamLoading"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getAlam, _readAlam, _deleteAlam, _deleteAlams, _minusAlam } from "../Redux/modules/notification";
import axios from "axios";


const Alam = ({setShowAlam, alams, NreadAlams}) => {

const BASE_URL = "https://sparta-tim.shop";
// const BASE_URL = 'https://01192mg.shop'

const navigate = useNavigate()
const dispatch = useDispatch()

const closeModal = () => {
  setShowAlam(false)
}

const onclickReadAlam = (notificationId) => {
  readAlam(notificationId)
  dispatch(_readAlam(notificationId))

  const a = alams.data.findIndex((v) => v.id === notificationId)
  if (!alams.data[a].status) {
    dispatch(_minusAlam(1))
  }
}

const onclickDeleteAlam = (notificationId) => {
  deleteAlam(notificationId)
  dispatch(_deleteAlam(notificationId))

  const a = alams.data.findIndex((v) => v.id === notificationId)
  if (!alams.data[a].status) {
    dispatch(_minusAlam(1))
  }
}

const onclickDeleteAlams = () => {
  deleteAlams()
  dispatch(_deleteAlams())
  dispatch(_minusAlam(NreadAlams.data.count))
}

const readAlam = async (notificationId) => {
  await axios.post(`${BASE_URL}/notifications/${notificationId}`, null,
          { headers: {Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token }})
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      // console.log(err);
    }) 
}
const deleteAlam = async (notificationId) => {
  await axios.delete(`${BASE_URL}/notifications/${notificationId}`,
          { headers: {Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token}})
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      // console.log(err);
    }) 
}
const deleteAlams = async () => {
  await axios.delete(`${BASE_URL}/notifications`,
          { headers: {Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token}})
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      // console.log(err);
    }) 
}


    return (
        <ModalPage onClick={closeModal}>
          
            <AlamBox onClick={(e)=>e.stopPropagation()}>
            
              {
                alams?.data.length === 0 ? 
                    (<div style={{height:'46rem'}}>
                        <div style={{padding:'3rem 0 0 0', textAlign:'center', fontSize:'1.4rem'}}>아직 알람이 없습니다</div>
                      </div>) : (
                      
                    <>
                      <div style={{fontSize:'2rem', margin:'4rem 0 2rem 2.5rem'}}> 
                        나의 알림
                      </div>
                      
                      <AlamLists >
                        {
                            alams?.data.map((alam) => {
                          return (
                            <div key={alam.id}>
                              {!alam.status ? 
                                (<AlamList onClick={()=>{ onclickReadAlam(alam.id); navigate(`/crews/${alam.content.crewId}`); window.location.reload()}}>
                                  <AlamContent >
                                    <span >{alam.content.content}</span> 
                                    <AlamDelete onClick={(e)=>{e.stopPropagation(); onclickDeleteAlam(alam.id)}}>삭제</AlamDelete> 
                                  </AlamContent>
                                </AlamList>)
                              :
                                (<AlamList onClick={()=>{ navigate(`/crews/${alam.content.crewId}`); window.location.reload()}}>
                                  <ReadAlamContent >
                                    <span >{alam.content.content}</span>
                                    <AlamDelete onClick={(e)=>{e.stopPropagation(); onclickDeleteAlam(alam.id); }}>삭제</AlamDelete> 
                                  </ReadAlamContent>
                                </AlamList>)
                              }
                            </div>
                          )})
                        }
                      </AlamLists>
                    </>
                  )
              }
            
                <AlamsDelete onClick={(e)=>{e.stopPropagation(); onclickDeleteAlams()}}>
                    <div style={{textAlign:'center'}}>전체 삭제</div>
                </AlamsDelete>
            </AlamBox>
          
        </ModalPage>
    )
}

const ModalPage = styled.div`
position: absolute;
top: 0;
margin: 0 0 0 -101rem;
width: 1920px;
height: 100%;
z-index: 900;
`

const AlamBox = styled.div`
width: 43rem;
height: 55rem;
box-shadow: 10px 20px 20px rgba(0, 0, 0, 0.4);
border-radius: 15px;
position: absolute;
top: 44.5rem;
left: 72.5%;
transform: translate(-50%, -50%);
background: #262626;
color: #cccccc;
overflow: auto;
z-index: 901;
font-size: 1.2rem;
`
const AlamLists = styled.div`
height: 37rem;
overflow: auto;
::-webkit-scrollbar {
    display: none;
}
`

const AlamList = styled.div`
width: 38rem;
height: 5.6rem;
margin: 1rem auto;
background-color: #333333;
border-radius: 1.5rem;
padding: 1.8rem 2rem 2rem 2rem;
cursor: pointer;
`
const AlamDelete = styled.span`
float: right;
`

const AlamsDelete = styled.div`
font-size: 1.4rem;
margin: 3rem 0 0 0rem;
position: absolute;
width: 43rem;
height: 6rem;
background: linear-gradient(180deg, rgba(217, 217, 217, 0) -70.63%, rgba(20, 20, 20, 0) -70.62%, rgba(20, 20, 20, 0) 3.13%, rgba(20, 20, 20, 0) 13.79%, rgba(20, 20, 20, 0.443299) 52.01%, rgba(20, 20, 20, 0.463918) 53.79%, #141414 100%);
cursor: pointer;
`

const AlamContent = styled.div`

`

const ReadAlamContent = styled.div`
opacity: 0.3;
`

export default Alam;