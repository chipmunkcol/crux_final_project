import { React, useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styled from "styled-components";
import { addMessage, loadMessage } from "../../Redux/modules/chatSlice";
import { ReactComponent as ChatXbtn } from "../../Image/chatx.svg";
import { ReactComponent as ChatBackbtn } from "../../Image/chatback.svg";
import { ReactComponent as ChatSendbtn } from "../../Image/chatsend.svg";
import Me from "./components/Me";
import Friends from "./components/Friends";
import _ from "lodash";

const headers = {
  Authorization: window.localStorage.getItem("access_token"),
};
const socket = new SockJS(`https://01192mg.shop/stomp/chat`);
const client = Stomp.over(socket);
client.debug = () => {};
client.connect(headers, () => {});

function ChatRoom({ onClose, roomId, roomName, roomImg }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitSuccessful },
  } = useForm();

  //기본설정---헤더, 토큰, 주소설정
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");


  useEffect(() => {
    onConneted();
  }, []);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", (e) => {
  //     client.disconnect(() => client.unsubscribe("sub-0"), headers);
  //   }); // 브라우저를 새로고침 하거나 종료하면 disconnect신호 보냄
  //   return () => {
  //     client.disconnect(() => client.unsubscribe("sub-0"), headers);
  //   };
  // }, []);

  //데이터 불러오기
  useEffect(() => {
    dispatch(loadMessage(roomId));
  }, [dispatch]);
  const chatList = useSelector((state) => state?.chat?.chat?.data);

  //   연결&구독
  function onConneted() {
    client.subscribe(
      `/sub/chat/room/${roomId}`,
      (data) => {
        const newMessage = JSON.parse(data.body);
        dispatch(addMessage(newMessage));
      },
      headers
    );
  }

  const nickname = window?.localStorage?.getItem("nickname");

  //메시지 보내기
  const onSubmit = (data) => {
    client.send(
      `/pub/chat/message`,
      headers,
      JSON.stringify({
        roomId: roomId,
        message: data.message,
        writer: nickname,
      })
    );
    setMessage("");
  };

  //클릭으로 메세지 보내기
  const onClickSubmit = () => {
    const data = getValues("message");
    client.send(
      `/pub/chat/message`,
      headers,
      JSON.stringify({
        roomId: roomId,
        message: data,
        writer: nickname,
      })
    );
    reset({
      message: "",
    });
  };

  const boxRef = useRef(); // 채팅 박스 ref
  const scrollRef = useRef(); // 채팅 박스 맨 아래를 가르키는 ref

  //채팅 방 들어가면 자동 스크롤
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      scrollRef.current.scrollIntoView({ behavior: "smooth" }, 2000);
    });
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [chatList?.message?.length]);
  const [scrollState, setScrollState] = useState(true);

  const scrollEvent = _.debounce(() => {
    // console.log("scroll");
    const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
    const clientHeight = boxRef.current.clientHeight; // 요소의 높이
    const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이
    // 스크롤이 맨 아래에 있을때
    setScrollState(
      scrollTop + clientHeight >= scrollHeight - 100 ? true : false
    );
  }, 100);

  const scroll = useCallback(scrollEvent, []);

  useEffect(() => {
    if (scrollState) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatList]);

  useEffect(() => {
    boxRef.current.addEventListener("scroll", scroll);
  });

  useEffect(() => {
    reset({
      message: "",
    });
  }, [isSubmitSuccessful]);

  return (
    <div>
      <Top>
        <div>
          <ChatBackbtn onClick={onClose} style={{ cursor: "pointer" }} />
          <h3>{roomName}</h3>
          {/* <p>22-09-27 07:19 AM</p> */}
        </div>
        <ChatXbtn style={{ cursor: "pointer" }} onClick={onClose} />
      </Top>
      <ChatWarp>
        <CrewImgBox>
          <div>
            <img src={roomImg} />
          </div>
          <div>
            <h3>{roomName}</h3>
            {/* <p>22-09-27 07:19 AM</p> */}
          </div>
        </CrewImgBox>
        <ChatContainer ref={boxRef}>
          {chatList &&
            chatList.map((chat, i) => {
              if (chat.sender === nickname) {
                return (
                  <div key={i} style={{ marginTop: "auto" }}>
                    <Me content={chat.message} time={chat.createdAt} />
                  </div>
                );
              } else {
                return (
                  <div key={i}>
                    <Friends
                      content={chat.message}
                      nickname={chat.sender}
                      imgUrl={chat.imgUrl}
                      time={chat.createdAt}
                    />
                  </div>
                );
              }
            })}
          <div ref={scrollRef}></div>
        </ChatContainer>
      </ChatWarp>
      <ChatInput>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="메시지를 입력해주세요."
            {...register("message", { required: true })}
          ></input>
          <button type="submit" style={{ display: "none" }}></button>
          <ChatSendbtn
            style={{ cursor: "pointer" }}
            onClick={() => {
              onClickSubmit();
            }}
          />
        </form>
      </ChatInput>
    </div>
  );
}
export default ChatRoom;
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
  margin-bottom: 10px;
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
    margin-bottom: 10px;
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
      img {
        width: 100%;
        height: 100%;
        border-radius: 199.63px;
      }
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
  height: 364px;
  max-height: 364px;
  margin-bottom: 25px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;