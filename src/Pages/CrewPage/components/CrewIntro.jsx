import React from "react";
import styled from "styled-components";
import { ReactComponent as Crown } from "../../../Image/crown.svg";
import 사용자기본이미지 from "../../../Image/사용자기본이미지.jpg";

function CrewIntro({ content, adminNickname, adminContent, img }) {
  // console.log(img)
  return (
    <Container>
      <Intro>
        <IntroContent>
          <p>{content}</p>
        </IntroContent>
      </Intro>
      <HostIntro>
        <Title>크루장 소개</Title>
        <HostDetailBox>
          <img src={img === "" ? 사용자기본이미지 : img}></img>
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              paddingLeft: "100px",
            }}
          >
            <Crown />
          </div>
          <HostDetail>
            <p>{adminNickname}</p>
            <div>
              <p>{adminContent}</p>
            </div>
          </HostDetail>
        </HostDetailBox>
      </HostIntro>
    </Container>
  );
}

export default CrewIntro;
const CrewIntroBox = styled.div`
  width: 100%;
  height: 360px;
  marin-top: 60px;
`;

const Intro = styled.div`
  width: 1200px;
  height: 158px;
  border-bottom: 1px solid #202020;
  display: flex;
`;

const IntroContent = styled.div`
  width: 1200px;
  hieght: 108px;
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
  margin-top: 25px;
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
    p {
      font-family: "Spoqa Han Sans Neo";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      letter-spacing: -0.05em;
      margin-top: 10px;
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
  position: relative;
  img {
    width: 140px;
    height: 140px;
    border-radius: 70%;
    overflow: hidden;
    margin-top: 25px;
  }
`;
