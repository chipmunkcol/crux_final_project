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

const EditMypage = ({ myPage, setEditMypage }) => {
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
  console.log(fileUrl);

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
    } else if (editNickname === "") {
      alert("닉네임을 입력해주세요");
    } else {
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
        headers: { Authorization: window.localStorage.getItem("access_token") },
      })
      .then((res) => {
        alert("프로필 편집완료");
        setEditMypage(false);
        navigate(`/members/${params}`);
        window.localStorage.setItem("nickname", editNickname);
      })
      .catch((err) => {
        console.log(err);
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

          <div
            style={{
              color: "#666666",
              margin: "0 0 1.5rem 7rem",
              fontSize: "2rem",
              fontWeight: "400",
            }}
          >
            소개글
          </div>

          <ProfileContent
            value={editContent}
            onChange={(e) => {
              setEditContent(e.target.value);
            }}
          />
        </Flex2>
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
  padding: 4rem 0 0 30rem;
`;
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
  color: #cccccc;
  background-color: #333333;
  border: none;
`;

const Flex2 = styled.div`
  width: 103.6rem;
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
  margin: 5rem 85.7rem 1.5rem 7rem;
`;
const LikeGymContent = styled.div`
color: #FFFFFF;
width: 83rem;
height: 13rem;
margin: 1.5rem 75.7rem 0 7rem;
overflow: auto;
::-webkit-scrollbar {
    display: none;
}
`

export default EditMypage;
