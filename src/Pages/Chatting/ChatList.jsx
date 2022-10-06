import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatRoom } from "../../Redux/modules/chatSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatRoom from "./ChatRoom";
import { ReactComponent as ChatXbtn } from "../../Image/chatx.svg";
import useOutSideClick from "../../Shared/hooks/useOutSideClick";
import Draggable from "react-draggable"; 

function ChatList({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //채팅방 목록 불러오기
  useEffect(() => {
    dispatch(getChatRoom());
  }, []);
  const chatRoomList = useSelector((state) => state?.chat?.chatRoom?.data);
  //채팅방 들어가기
  const [isVisible, setIsVisible] = useState(true);
  const handleChange = () => {
    setIsVisible(!isVisible);
  };
  //세부 채팅방  id 전달
  const [chatRoomId, setchatRoomId] = useState("");
  //세부 채팅방 이름 전달
  const [chatRoomName, setChatRoomName] = useState("");
  //세부 채팅방 url 전달
  const [chatRoomImg, setChatRoomImg] = useState("");
  //세부 채팅방 시간 전달
  const [chatRoomTime, setChatRoomTime] = useState("");
  const handleEnterRoom = (id, name, url, time) => {
    setchatRoomId(id);
    setChatRoomName(name);
    setChatRoomImg(url);
  };
  //채팅방 목록 필터할 것,,

  const [position, setPosition] = useState({ x: 0, y: 0 }); // box의 포지션 값
  // 업데이트 되는 값을 set 해줌
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y }); 
  }

  return (
  <Draggable onDrag={(e, data) => trackPos(data)}>
    <ChatWarp>
      {isVisible ? (
        <>
          <Title>
            <h3>크루리스트</h3>
            <ChatXbtn onClick={onClose} style={{ cursor: "pointer" }} />
          </Title>
          <List>
            {chatRoomList?.length === 0 ? <div style={{color:'#ffffff', textAlign:'center', fontSize:'1.4rem', padding:'4rem'}}>가입한 크루원들과 채팅을 할 수 있어요!</div> :
              chatRoomList?.map((room) => (
                <Room
                  key={room.roomId}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleChange();
                    handleEnterRoom(room.roomId, room.crewName, room.imgUrl);
                  }}
                >
                  <Content>
                    <div>
                      <img src={room.imgUrl} />
                    </div>
                    <Text>
                      <div>
                        <h3>{room.crewName}</h3>
                        <p>
                          {room?.lastMessage?.createdAt.slice(0, 10)}{" "}
                          {room?.lastMessage?.createdAt.slice(11, 16)}
                        </p>
                      </div>
                      <div>
                        {room?.lastMessage?.message ? (
                          <p>{room?.lastMessage?.message}</p>
                        ) : (
                          <p>아직 메시지가 없습니다</p>
                        )}
                      </div>
                    </Text>
                  </Content>
                </Room>
            ))}
          </List>
        </>
      ) : (
        <ChatRoom
          onClose={handleChange}
          roomId={chatRoomId}
          roomName={chatRoomName}
          roomImg={chatRoomImg}
        />
      )}
    </ChatWarp>
  </Draggable>
  );
}
export default ChatList;
const ChatWarp = styled.div`
  width: 430px;
  height: 550px;
  box-shadow: 10px 20px 20px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  background-color: #262626;
  padding: 40px 25px 47px 25px;
  z-index: 99999;
  position: fixed;
  top: 20%;
  right: 9%;
`;
const Title = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  h3 {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: -0.05em;
    color: #FFFFFF;
  }
`;
const List = styled.div`
  width: 380px;
  height: 418px;
  flex-flow: column wrap;
  flex-direction: colunm;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Room = styled.div`
  width: 380px;
  height: 97px;
  padding: 14px 55px 20px 20px;
  border-radius: 15px;
  background-color: #333333;
  margin-bottom: 10px;
  display: flex;
`;
const Content = styled.div`
  width: 305px;
  height: 63px;
  display: flex;
  div {
    &:nth-child(1) {
      img {
        width: 55px;
        height: 55px;
        border-radius: 199.63px;
        background: #E8E8E8;
        margin-top: 6px;
        margin-right: 20px;
      }
    }
  }
`;
const Text = styled.div`
  hegith: 60px;
  width: 230px;
  word-break: break-all;
  overflow: hidden;
  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.05em;
    color: #999999;
  }
  div {
    &:nth-child(1) {
      display: flex;
      height: 30px;
      align-items: center;
      h3 {
        font-weight: 400;
        font-size: 15px;
        letter-spacing: -0.05em;
        color: #FFFFFF;
      }
      p {
        font-weight: 300;
        font-size: 10px;
        letter-spacing: -0.05em;
        color: #999999;
        margin-left: 5px;
        margin-top: 3px;
      }
    }
    &:nth-child(2) {
      p {
        font-weight: 400;
        font-size: 12px;
        letter-spacing: -0.05em;
        color: #999999;
      }
    }
  }
`;