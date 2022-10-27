import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import {
  getApplicationList,
  permitCrew,
  acceptCrew,
  addCrew,
} from "../../../Redux/modules/crewSlice";
import 사용자기본이미지 from "../../../Image/사용자기본이미지.jpg";

function ApplicationListModal({ onClose }) {
  const params = useParams().crewId;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApplicationList(params));
  }, [dispatch]);

  const applicationList = useSelector((state) => state.crews.crewApplication);
  const applicants = applicationList.data;
  // console.log(applicants);

  //크루 가입 승인
  async function permitCrew(memberId) {
    try {
      const response = await axios.post(
        `https://sparta-tim.shop/crews/${params}/members/${memberId}?permit=true`,
        null,
        {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        }
      );
      window.alert("크루 가입 승인 완료.");
      return response.data;
    } catch (error) {
      return error.data;
    }
  }

  return (
    <Background>
      <Modal>
        <Title>
          <h1>신청자 리스트</h1>
        </Title>
        <Xbtn onClick={onClose}></Xbtn>
        <ImgBox>
          <PhotoButton>
            {applicants &&
              applicants.map((applicant) => (
                <Container key={applicant.id}>
                  <IntroContent>
                    <HostDetailBox>
                      <div>
                        <img
                          src={
                            applicant.imgUrl === null
                              ? 사용자기본이미지
                              : applicant.imgUrl
                          }
                        ></img>
                      </div>
                      <HostDetail>
                        <p>{applicant.nickname}</p>
                        <div>
                          <p>{applicant.content}</p>
                        </div>
                      </HostDetail>
                      <button
                        onClick={() => {
                          permitCrew(applicant.id);
                          const payload = {
                            id: applicant.id,
                            nickname: applicant.nickname,
                            imgUrl: applicant.imgUrl,
                            content: applicant.content,
                          };
                          dispatch(addCrew(payload));
                          dispatch(acceptCrew(applicant.id));
                        }}
                      >
                        승인
                      </button>
                    </HostDetailBox>
                  </IntroContent>
                </Container>
              ))}
          </PhotoButton>
        </ImgBox>
      </Modal>
    </Background>
  );
}

export default ApplicationListModal;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  z-index: 99999;
`;

const Modal = styled.div`
  width: 500px;
  height: 635px;
  background-color: #262626;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 65px 45px 65px 45px;
  position: relative;
  margin-top: 200px;
`;

const Title = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: left;
  align-items: center;
  h1 {
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 700;
    font-size: 44px;
    letter-spacing: -0.05em;
    color: #ffffff;
  }
`;
const PhotoButton = styled.div`
  width: 410px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
`;

const ImgBox = styled.div`
  display: flex;
  positon: relative;
  overflow:auto ;
  width: 410px;
  height: 484px;
  ::-webkit-scrollbar {
    display: none;
}
`;

const Xbtn = styled.button`
  width: 25px;
  height: 25px;
  background: none;
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
  ::before,
  ::after {
    position: absolute;
    top: -2px;
    content: "";
    height: 25px;
    width: 1px;
    background-color: #ffffff;
  }
  ::before {
    transform: rotate(45deg);
  }
  ::after {
    transform: rotate(-45deg);
  }
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: #333333;
`;

const IntroContent = styled.div`
  width: 100%;
  p {
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: -0.05em;
    color: #999999;
  }
`;

const HostDetail = styled.div`
  width: 100%;
  height: auto;
  margin-left: 40px;
  p {
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: -0.05em;
    color: #ffffff;
  }
  div {
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

//이미지 cover로 수정
const HostDetailBox = styled.div`
  width: 100%;
  height: auto;
  padding: 15px 30px 15px 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #3f3f3f;
  img {
    width: 50px;
    height: 50px;
    border-radius: 70%;
    overflow: hidden;
  }
  button {
    width: 50px;
    height: 30px;
    border: none;
    color: #999999;
    background-color: transparent;
  }
`;
