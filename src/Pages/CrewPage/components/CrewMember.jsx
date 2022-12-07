import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { expelCrew } from "../../../Redux/modules/crewSlice";
import axios from "axios";
import 사용자기본이미지 from "../../../Image/사용자기본이미지.jpg";
import { DeleteAxios } from "../../../Shared/api/main";

function CrewMember() {
  //데이터 가져오기
  const crewDetail = useSelector((state) => state?.crews?.crewDetail);
  const members = crewDetail.data.memberList;

  //선언
  const params = useParams().crewId;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //호스트 id
  const hostId = useSelector((state) => state?.crews?.crewDetail?.data?.hostId);
  //유저 id
  const userId = JSON.parse(window?.localStorage?.getItem("userInfo"))?.userId;

  //탈퇴시키기
  async function handleExpel(payload) {
    try {
      const response = await DeleteAxios(`crews/${payload.crewId}/members/${payload.memberId}`)
      
      .then(()=>{
        dispatch(expelCrew(payload.memberId));
      })
      return console.log(response.data);
    } catch (error) {
      return console.log(error.data);
    }
  }

  //유저 마이페이지로 이동시키기
  const onClickImg = (id) => {
    navigate(`/members/${id}`);
  };

  return (
    <Container>
      {members &&
        members.map((member) => (
          <IntroContent key={member.id}>
            <HostDetailBox>
              <img
                src={member.imgUrl === "" ? 사용자기본이미지 : member.imgUrl}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onClickImg(member.id);
                }}
              ></img>
              <HostDetail>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onClickImg(member.id);
                  }}
                >
                  {member.nickname}
                </p>
                <div>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      onClickImg(member.id);
                    }}
                  >
                    {member.content}
                  </p>
                </div>
              </HostDetail>
              {member.id === hostId ? null : Number(userId) === hostId ? (
                <button
                  onClick={() => {
                    if (window.confirm("추방하시겠습니까?")) {
                      const payload = {
                        memberId: member.id,
                        crewId: params,
                      };
                      handleExpel(payload);
                    }
                  }}
                >
                  추방
                </button>
              ) : null}
            </HostDetailBox>
          </IntroContent>
        ))}
    </Container>
  );
}

export default CrewMember;

const CrewIntroBox = styled.div`
  width: 100%;
  height: 360px;
  background-color: white;
  marin-top: 60px;
`;

const Intro = styled.div`
  width: 1200px;
  height: 220px;
  border-bottom: 1px solid #202020;
  display: flex;
  align-items: center;
  backgrond-color: white;
`;

const IntroContent = styled.div`
  width: 1200px;
  height: 220px;
  border-bottom: 1px solid #202020;
  display: flex;
  align-items: center;
  p {
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: -0.05em;
    color: #999999;
  }
`;

const Title = styled.div`
  color: #ffffff;
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.05em;
`;

const HostDetail = styled.div`
  width: 1020px;
  height: 81px;
  margin-left: 40px;
  p {
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: -0.05em;
    color: #cccccc;
  }
  div {
    margin-top: 10px;
    p {
      font-family: "Spoqa Han Sans Neo";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      letter-spacing: -0.05em;
      color: #999999;
    }
  }
`;

const Container = styled.div`
  width: 1200px;
  height: auto;
`;

//하단 소개박스
const HostIntro = styled.div`
  width: 1200px;
  height: 190px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

//이미지 cover로 수정
const HostDetailBox = styled.div`
  width: 1200px;
  height: 140px;
  display: flex;
  img {
    width: 140px;
    height: 140px;
    border-radius: 70%;
    overflow: hidden;
  }
  button {
    width: 50px;
    height: 30px;
    border: none;
    color: #cccccc;
    background-color: transparent;
  }
`;
