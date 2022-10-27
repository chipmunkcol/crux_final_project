import styled from "styled-components";
import Navbar from "../../Shared/Navbar";
import 사용자기본이미지 from "../../Image/사용자기본이미지.jpg"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { __getMyPage } from "../../Redux/modules/mypageSlice";
import Loading from "../../Shared/Loading.js"
import { useState } from "react";
import EditMypage from "./components/EditMypage";
import Footer from "../../Shared/Footer";
import axios from "axios";


const Mypage = () => {
const BASE_URL = "https://sparta-tim.shop";
const userId = JSON.parse(window.localStorage.getItem("userInfo")).userId
// console.log(userId)

const dispatch = useDispatch()
const navigate = useNavigate()
const {isLoading, error, mypage} = useSelector((state)=>state.myPage)
// console.log(isLoading, error, mypage)
const myPage = mypage.data
// console.log(myPage)

const params = Number(useParams().memberId)
// console.log(params)

//프로필 편집 버튼을 누르면 편집모드로 변경합니다.
const [editMypage, setEditMypage] = useState(false)
const [reload, setReload] = useState(false)

useEffect(()=>{
    dispatch(__getMyPage(params))
},[reload])

//회원 탈퇴
const deleteId = async() => {
    if(window.confirm("정말 탈퇴하시겠어요?")) {
        await axios.delete(`${BASE_URL}/members/withdraw`, 
        {headers: {Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token}})
        .then((res) => {
            // console.log(res)
            alert(res.data.data)
            localStorage.removeItem("userInfo")
            navigate('/')
        })
        .catch((err) => {
            // console.log(err)
        })
    }  
}

    return(
        <>


            <Navbar />

            {isLoading === true ? <Loading /> : 
                editMypage === true ? <EditMypage myPage={myPage} setEditMypage={setEditMypage} setReload={setReload} reload={reload}/> : (

                <Container>

                <Flex1>
                    <ProfileImg src={myPage?.imgUrl !== null ? myPage?.imgUrl : 사용자기본이미지}/>
                        
                    <ProfileNickname>{myPage?.nickname}</ProfileNickname>

                    {userId !== params ? null :
                        <>
                        <ButtonBox onClick={()=>{setEditMypage(true)}}>
                            <button>수정하기</button>
                        </ButtonBox>
                        
                        <div style={{color:'#666666', fontWeight:'400', margin:'2.5rem 0 0 0'}} type="button"
                            onClick={deleteId}>
                            회원 탈퇴
                        </div>
                        </>
                    }
                    
                </Flex1>

                <Flex2>
                    <JoinCrewTitle>참가중인 크루</JoinCrewTitle>
                    
                    <JoinCrewContent>

                        {
                            myPage?.crewList.map((crew) => {
                                return(<div key={`${crew.id}+${crew.name}`} type="button" onClick={()=>{navigate(`/crews/${crew.id}`)}}>
                                            &nbsp; &bull; &nbsp; {crew.name}
                                       </div>)
                            })
                        }
                
                    </JoinCrewContent>

                    <LikeGymTitle>즐겨찾기 한 클라이밍 짐</LikeGymTitle>
                    
                    <LikeGymContent>
                        
                        {
                            myPage?.gymList.map((gym) => {
                                return(<div key={`${gym.gymId}+${gym.name}`} type="button" onClick={()=>{navigate(`/gyms/${gym.gymId}`)}}>
                                            &nbsp; &bull; &nbsp; {gym.name}
                                       </div>)
                            })
                        }

                    </LikeGymContent>
                        
                    <div style={{color:'#666666', margin:'3rem 0 1.5rem 7rem', fontSize:'2rem', fontWeight:'400'}}>
                        소개글
                    </div>
                    
                    <ProfileContent>{myPage?.content}</ProfileContent>

                </Flex2>

                <Flex3>
                    <JoinCrewTitle>좋아요 한 크루</JoinCrewTitle>
                    
                    <JoinCrewContent>

                        {
                            myPage?.likeCrewList.map((crew) => {
                                return(<div key={crew.id} type="button" onClick={()=>{navigate(`/crews/${crew.id}`)}}>
                                            &nbsp; &bull; &nbsp; {crew.name}
                                       </div>)
                            })
                        }
                
                    </JoinCrewContent>

                </Flex3>

            </Container>)

            }
            
            <Footer />
        </>
    )
}

const Container = styled.div`
width: 192rem;
height: 81.4rem;
padding: 11rem 0 11.6rem 0;
background-color: #141414;
color: #ffffff;
font-size: 2rem;
display: flex;
`

const Flex1 = styled.div`
width: 75rem;
height: 100%;
border-right: 1px solid #393939;
display: flex;
flex-direction: column;
align-items: center;
padding: 0rem 0 0 30rem;
`
const ProfileImg = styled.img`
width: 25rem;
height: 25rem;
border-radius: 60%;
`

const ProfileNickname = styled.div`
width: 40rem;
text-align: center;
font-size: 3.6rem;
margin: 5rem 0 0 0;
`
const ButtonBox = styled.div`
  width: 30rem;
  height: 60px;
  margin: 4rem 0 0 0;
  display: flex;
  justify-content: space-between;
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: -0.05em;
  button {
    width: 100%;
    height: 60px;
    border: none;
    color: #666666;
    background-color: #999999;
    &:hover {
      color: #262626;
      background-color: #ffb800;
      transition: 0.5s;
    }
  }
`;
const ProfileContent =styled.div`
width: 83rem;
margin: 0 0 0 7rem;
font-size: 2rem;
font-weight: 500;
word-break: break-all;
/* overflo */
`

const Flex2 =styled.div`
width: 42rem;
height: 100%;
`

const JoinCrewTitle = styled.div`
color: #666666;
width: 12rem;
margin: 1rem 85.7rem 1.5rem 7rem ;
`

const JoinCrewContent = styled.div`
color: #FFFFFF;
width: 39.5rem;
height: 9rem;
margin: 1.5rem 75.7rem 0rem 7rem;
overflow: auto;
::-webkit-scrollbar {
    display: none;
}
`
const LikeGymTitle = styled.div`
color: #666666;
width: 20rem;
margin: 3rem 85.7rem 1.5rem 7rem ;
`
const LikeGymContent = styled.div`
color: #FFFFFF;
width: 83rem;
height: 12rem;
margin: 1.5rem 75.7rem 0 7rem;
overflow: auto;
::-webkit-scrollbar {
    display: none;
}
`

const Flex3 =styled.div`
width: 35rem;
height: 100%;
`


export default Mypage;