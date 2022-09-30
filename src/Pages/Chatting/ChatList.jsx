import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatRoom } from "../../Redux/modules/chatSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatRoom from "./ChatRoom";

function ChatList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //채팅방 목록 불러오기
  useEffect(() => {
    dispatch(getChatRoom());
  }, []);

  const chatRoomList = useSelector((state) => state?.chat?.chatRoom?.data);

  //채팅방 들어가기
  const [isVisible, setIsVisible] = useState(true);

  //
  const handleChange = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ padding: "10px" }}>
      <ChatWarp>
        {isVisible ? (
          <>
            <Title>
              <h3>크루리스트</h3>
              <h3>X</h3>
            </Title>
            <List>
              {chatRoomList?.map((room) => (
                <Room
                  key={room.roomId}
                  style={{ cursor: "pointer" }}
                  onClick={handleChange}
                >
                  <Content>
                    <div>
                      <img src={room.imgUrl} />
                    </div>
                    <Text>
                      <div>
                        <h3>{room.crewName}</h3>
                        {/* <p>22-09-27 07:19 AM </p> */}
                      </div>
                      <div>
                        {room.lastMessage === null ? (
                          <p>아직 메시지가 없습니다.</p>
                        ) : (
                          <p>{room.lastMessage}</p>
                        )}
                      </div>
                    </Text>
                  </Content>
                </Room>
              ))}
            </List>
          </>
        ) : (
          <ChatRoom onClose={handleChange} />
        )}
      </ChatWarp>
    </div>
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
    color: #ffffff;
  }
`;

const List = styled.div`
  width: 380px;
  height: 418px;
  display: flex;
  flex-direction: colunm;
  overflow: auto;
  flex-wrap: wrap;
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
        background: #e8e8e8;
        margin-top: 6px;
        margin-right: 20px;
      }
    }
  }
`;

const Text = styled.div`
  hegith: 60px;
  width: 230px;
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
        color: #ffffff;
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
