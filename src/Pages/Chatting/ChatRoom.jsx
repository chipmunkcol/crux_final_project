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

function ChatRoom({ onClose, roomId, roomName, roomImg }) {
  const { register, handleSubmit, reset, getValues } = useForm();

  const dispatch = useDispatch();
  const nickname = window?.localStorage?.getItem("nickname");

  const headers = {
    Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
  };
  const socket = new SockJS(`https://01192mg.shop/stomp/chat`);
  const client = Stomp.over(socket);

  useEffect(() => {
    clientConnect();
    return () => {
      clientDisconnect();
    };
  }, []);

  const clientConnect = () => {
    try {
      client.debug = null;
      client.connect(headers, () => {
        client.subscribe(
          `/sub/chat/room/${roomId}`,
          (data) => {
            const newMessage = JSON.parse(data.body);
            dispatch(addMessage(newMessage));
          },
          headers
        );
      });
    } catch (err) {}
  };

  const clientDisconnect = () => {
    try {
      client.debug = null;
      client.disconnect(() => {
        client.unsubscribe("sub-0");
      }, headers);
    } catch (err) {}
  };

  //이전 채팅 데이터 불러오기
  useEffect(() => {
    dispatch(loadMessage(roomId));
  }, [dispatch]);
  const chatList = useSelector((state) => state?.chat?.chat?.data);

  //메시지 보내기
  const onSubmit = (data) => {
    client.debug = null;
    client.send(
      `/pub/chat/message`,
      headers,
      JSON.stringify({
        roomId: roomId,
        message: data.message,
        writer: nickname,
      })
    );
    reset({ message: "" });
  };

  //클릭으로 메세지 보내기
  const onClickSubmit = () => {
    const data = getValues("message");
    if (data !== "") {
      client.debug = null;
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
    }
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
    const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
    const clientHeight = boxRef.current.clientHeight; // 요소의 높이
    const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이
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

  return (
    <div>
      <Top>
        <div>
          <ChatBackbtn
            onClick={() => {
              onClose();
            }}
            style={{ cursor: "pointer" }}
          />
          <h3>{roomName}</h3>
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