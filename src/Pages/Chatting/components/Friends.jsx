import React from "react";
import styled from "styled-components";
import 사용자기본이미지 from "../../../Image/사용자기본이미지.jpg";

function Friends({ content, nickname, imgUrl, time }) {
  return (
    <MyMessageBox>
      <div style={{ marginRight: "17px", marginTop: "6px" }}>
        {imgUrl === null ? (
          <img src={사용자기본이미지} />
        ) : (
          <img src={imgUrl} />
        )}
      </div>
      <div>
        <div
          style={{
            marginLeft: "-7px",
            fontWeight: "300",
            fontSize: "10px",
            color: "#999999",
            letterSpacing: "-0.05em",
          }}
        >
          {nickname}
        </div>
        <MyMessage>
          <div>{content}</div>
          <div
            style={{
              margin: "auto 5px 9px 5px",
              color: "#999999",
              fontWeight: "300",
              fontSize: "8px",
            }}
          >
            {time.slice(11, 16)}
          </div>
        </MyMessage>
      </div>
    </MyMessageBox>
  );
}

export default Friends;

const MyMessageBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  img {
    width: 25px;
    height: 25px;
    border-radius: 199.63px;
  }
`;

const MyMessage = styled.div`
  display: flex;
  max-width: 100%;
  height: auto;
  word-wrap: break-word;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.05em;
  color: #cccccc;
  div {
    text-align: left;
    word-break: break-all;
    margin-bottom: 10px;
    &:nth-child(1) {
      width: auto;
      position: relative;
      background: #333333;
      border-radius: 0px 5px 5px 5px;
      padding: 10px;
      ::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        border: 7px solid transparent;
        border-right-color: #333333;
        border-left: 0;
        border-top: 0;
        margin-left: -7px;
      }
    }
  }
`;
