import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {storage} from '../../../Shared/firebase'

import { useState } from "react"
import { useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import 사용자기본이미지 from "../../../Image/사용자기본이미지.jpg"
import 프로필편집 from "../../../Image/프로필수정.png"
import { useDispatch } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { faGear } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const EditMypage = ({ myPage, setEditMypage, setReload, reload }) => {
  const BASE_URL = "https://sparta-tim.shop";
  // const BASE_URL = "http://54.180.31.108";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams().memberId;

  const [editContent, setEditContent] = useState(myPage?.content);
  const [editNickname, setEditNickname] = useState(myPage?.nickname);

  const [fileUrl, setFileUrl] = useState(
    myPage?.imgUrl !== null ? myPage?.imgUrl : 사용자기본이미지
  );
  // console.log(fileUrl);
// 닉네임 2~10 글자 제한
// 소개글 150 글자 제한
  const changeImage = async (e) => {
    const upload_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    const file_url = await getDownloadURL(upload_file.ref);
    setFileUrl(file_url);
  };

  const EditDone = () => {
    if (editContent === "") {
      alert("자기소개를 입력해주세요");
    } else if (editNickname.trim() === "") {
      alert("닉네임을 입력해주세요");
    } else if (editNickname.length <= 1 || editNickname.length >= 11 ) {
      alert("닉네임은 2~10글자 사이로 입력해주세요:)");
    } else if (editContent.length > 150) {
      alert("소개글은 150글자까지 입력 가능합니다:)");
    } 
    else {
      const payload = {
        content: editContent,
        nickname: editNickname,
        imgUrl: fileUrl,
      };
      editProfile(payload);
    }
  };

  const editProfile = async (payload) => {
    await axios
      .put(`${BASE_URL}/members`, payload, {
        headers: { Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token },
      })
      .then((res) => {
        alert("프로필 편집완료");
        setEditMypage(false);
        setReload(!reload)
        // navigate(`/members/${params}`);
        window.localStorage.setItem("nickname", editNickname);
        window.localStorage.setItem("profileImg", fileUrl)
      })
      .catch((err) => {
        // console.log(err);
    }) 
}


    return(
        <>
            <Container>
                
                <Flex1>
                    <ProfileImg src={fileUrl !== "" ? fileUrl : 사용자기본이미지 }/>
                    
                                <label htmlFor="upload-photo">
                                    <input
                                        encType="multipart/form-data"
                                        accept="image/*"
                                        type="file"
                                        id="upload-photo"
                                        name="upload-photo"
                                        // ref={}
                                        style={{ display: 'none' }}
                                        onChange={changeImage}
                                    />
                                    <img src={프로필편집} style={{width:'6rem', margin:'-7rem 0 0 7rem', position:"absolute"}} type="button"/>
                                </label>


                    <ProfileNickname value={editNickname} onChange={(e)=>{setEditNickname(e.target.value)}}/>
                    
                    <div style={{display:'flex'}}>
                        <ButtonBox>
                            <button onClick={EditDone}>수정완료</button>
                        </ButtonBox>
                        {/* <ButtonBox onClick={()=>{setEditMypage(false)}}>
                            <button>취소</button>
                        </ButtonBox> */}
          </div>
        </Flex1>

        <Flex2>
          <JoinCrewTitle>참가중인 크루</JoinCrewTitle>

          <JoinCrewContent>
            {myPage?.crewList.map((crew) => {
              return <div key={crew.id}>&bull; &nbsp; {crew.name}</div>;
            })}
          </JoinCrewContent>

          <LikeGymTitle>즐겨찾기 한 클라이밍 짐</LikeGymTitle>

          <LikeGymContent>
            {myPage?.gymList.map((gym) => {
              return <div key={gym.id}>&bull; &nbsp; {gym.name}</div>;
            })}
          </LikeGymContent>

          <Introduce>
            소개글
          </Introduce>

          <ProfileContent
            value={editContent}
            onChange={(e) => {
              setEditContent(e.target.value);
            }}
          />
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
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 192rem;
  height: 81.4rem;
  padding: 11rem 0 11.6rem 0;
  background-color: #262626;
  color: #ffffff;
  font-size: 2rem;
  display: flex;
`;
const Flex1 = styled.div`
  width: 75rem;
  height: 100%;
  border-right: 1px solid #393939;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 0 0 30rem;
`;
const Introduce = styled.div`
color: #666666;
margin: 3rem 0 1.5rem 7rem;
font-size: 2rem;
font-weight: 400;
`

const ProfileImg = styled.img`
  width: 25rem;
  height: 25rem;
  border-radius: 60%;
`;

const ProfileNickname = styled.input`
  width: 30rem;
  text-align: center;
  font-size: 3.6rem;
  margin: 5rem 0 0 0;
  color: #cccccc;
  background-color: #333333;
  border: none;
`;
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
const ProfileContent = styled.textarea`
  width: 83rem;
  height: 8rem;
  margin: 0 0 0 7rem;
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem;
  color: #cccccc;
  background-color: #333333;
  border: none;
  word-break: break-all;
`;

const Flex2 = styled.div`
  width: 35rem;
  height: 100%;
`;
const JoinCrewTitle = styled.div`
  color: #666666;
  width: 12rem;
  margin: 1rem 85.7rem 1.5rem 7rem;
`;

const JoinCrewContent = styled.div`

color: #FFFFFF;
width: 83rem;
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
  margin: 3rem 85.7rem 1.5rem 7rem;
`;
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

export default EditMypage;