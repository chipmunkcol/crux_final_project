import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styled from "styled-components";
import { addMessage } from "../../Redux/modules/chatSlice";
import { ReactComponent as ChatXbtn } from "../../Image/chatx.svg";
import { ReactComponent as ChatBackbtn } from "../../Image/chatback.svg";
import { ReactComponent as ChatSendbtn } from "../../Image/chatsend.svg";

function ChatRoom({ onClose }) {
  //기본설정---헤더, 토큰, 주소설정
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const headers = {
    Authorization: window.localStorage.getItem("access_token"),
  };
  const socket = new SockJS(`https://01192mg.shop/stomp/chat`);
  const client = Stomp.over(socket);

  //   렌더되면 소켓 연결실행
  useEffect(() => {
    onConneted();
    return () => {
      onConneted();
    };
  }, []);

  //데이터 불러오기
  // useEffect(() => {
  //   dispatch(loadMessage(roomId.id));
  // }, []);

  //   엔터 누르면 데이터 전송
  //   const handleEnterPress = (e) => {
  //     if (message.trim() === "") {
  //       e.preventDefault();
  //     }
  //     if (e.keyCode === 13 && e.shiftKey == false) {
  //       sendMessage();
  //     }
  //   };

  //   연결&구독
  function onConneted() {
    try {
      client.connect(headers, () => {
        client.subscribe(
          `/sub/chat/room/29`,
          (data) => {
            const newMessage = JSON.parse(data.body);
            dispatch(addMessage(newMessage));
          },
          headers
        );
      });
    } catch (error) {}
  }

  //메시지 보내기
  const sendMessage = () => {
    client.send(
      `/pub/chat/message`,
      headers,
      JSON.stringify({
        content: message,
      })
    );
    setMessage("");
  };

  return (
    <div>
      <Top>
        <div>
          <ChatBackbtn onClick={onClose} style={{ cursor: "pointer" }} />
          <h3>와우산어쩌고크루</h3>
          <p>22-09-27 07:19 AM</p>
        </div>
        <ChatXbtn style={{ cursor: "pointer" }} />
      </Top>
      <CrewImgBox>
        <div>
          <img src="#" />
        </div>
        <div>
          <h3>크루 이름</h3>
          <p>22-09-27 07:19 AM</p>
        </div>
      </CrewImgBox>
      <ChatContainer>
        <CrewMessageBox>
          <div>
            <img src="#" />
          </div>
          <CrewMessage>
            <div>
              <p>크루 메시지입니다..</p>
            </div>
            <div>
              <p>시간임</p>
            </div>
          </CrewMessage>
        </CrewMessageBox>
        <MyMessageBox>
          <MyMessage>
            <div>
              <p>lsdfjkasldfjkladsjafklasdjfklasjdfkj</p>
            </div>
          </MyMessage>
        </MyMessageBox>
      </ChatContainer>
      <ChatInput>
        <input placeholder="메시지를 입력해주세요."></input>
        <ChatSendbtn style={{ cursor: "pointer" }} />
      </ChatInput>
    </div>
  );
}
export default ChatRoom;

const Warp = styled.div``;

const ChatContainer = styled.div`
  width: 100%;
`;

const MyMessageBox = styled.div`
  width: 100%;
  background-color: pink;
  padding: 0px 7px 0px 0px;
`;

const CrewMessageBox = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  div {
    &:nth-child(1) {
      width: 25px;
      height: 25px;
      background: #e8e8e8;
      border-radius: 199.63px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &:nth-child(3) {
      background-color: gray;
      position: absolute;
      bottom: 0;
      p {
        font-weight: 300;
        font-size: 8px;
        letter-spacing: -0.05em;
        color: #999999;
      }
    }
  }
`;

const CrewMessage = styled.div`
  padding: 0px 0px 0px 7px;
  background-color: red;
  display: flex;
  position: relatvie;
  width: 100%;
  div {
    &:nth-child(1) {
      width: auto;
      position: relative;
      background: #333333;
      border-radius: 0px 5px 5px 5px;
      padding: 10px;
      height: auto;
      word-break: break-all;
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
    p {
      font-weight: 400;
      font-size: 12px;
      letter-spacing: -0.05em;
      color: #cccccc;
      margin-left: 0px;
    }
  }
`;

const MyMessage = styled.div`
  div {
    text-align: right;

    &:nth-child(1) {
      width: auto;
      position: relative;
      background: #00aabb;
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
        border-left-color: #00aabb;
        border-right: 0;
        border-top: 0;
        margin-right: -7px;
      }
    }
  }
`;

const ChatInput = styled.div`
  width: 100%;
  height: 52px;
  background: #333333;
  border-radius: 15px;
  padding-left: 20px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    width: 291px;
    height: 18px;
    background-color: transparent;
    border: none;
    :focus {
      outline: none;
    }
    color: #cccccc;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: -0.05em;
    ::-webkit-input-placeholder {
      color: #3e3e3e;
    }
  }
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    margin-right: 20px;
    display: flex;
    align-items: center;
    h3 {
      font-weight: 400;
      font-size: 20px;
      letter-spacing: -0.05em;
      color: #ffffff;
    }
    p {
      font-weight: 300;
      font-size: 10px;
      letter-spacing: -0.05em;
      color: #999999;
      margin-left: 10px;
      margin-top: 9px;
    }
  }
`;

const CrewImgBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-bottom: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    &:nth-child(1) {
      width: 100px;
      height: 100px;
      background: #e8e8e8;
      border-radius: 199.63px;
    }
    &:nth-child(2) {
      width: 100px;
      margin-top: 10px;
      text-align: center;
      h3 {
        font-weight: 400;
        font-size: 15px;
        letter-spacing: -0.05em;
        color: #ffffff;
      }
      p {
        font-weight: 300;
        font-size: 10px;
        letter-spacing: -0.05em;
        color: #999999;
      }
    }
  }
`;

const ChatWarp = styled.div`
  width: 430px;
  height: 550px;
  box-shadow: 10px 20px 20px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  background-color: #262626;
  padding: 40px 25px 47px 25px;
`;
