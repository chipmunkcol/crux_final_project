import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

function Me({ content, time }) {
  return (
    <MyMessageBox>
      <div
        style={{
          margin: "auto 5px 9px auto",
          textAlign: "right",
          color: "#999999",
          fontWeight: "300",
          fontSize: "8px",
        }}
      >
        {time.slice(11, 16)}
      </div>
      <MyMessage>
        <div>{content}</div>
      </MyMessage>
    </MyMessageBox>
  );
}

export default Me;

const MyMessageBox = styled.div`
  width: 100%;
  padding: 0px 7px 0px 0px;
  display: flex;
  justify-content: flex-end;
  word-wrap: break-word;
`;

const MyMessage = styled.div`
  div {
    text-align: left;
    margin-bottom: 10px;
    word-wrap: break-word;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: -0.05em;
    color: #cccccc;
    &:nth-child(1) {
      width: auto;
      word-break: break-all;
      position: relative;
      background: #333333;
      border-radius: 5px 0px 5px 5px;
      padding: 10px;
      ::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        width: 0;
        height: 0;
        border: 7px solid transparent;
        border-left-color: #333333;
        border-right: 0;
        border-top: 0;
        margin-right: -7px;
      }
    }
  }
`;
