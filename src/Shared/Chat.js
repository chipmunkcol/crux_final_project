import { useState } from "react";
import { ReactComponent as ChatIcon } from "../Image/btn_catt.svg";
import styled from "styled-components";
import ChatList from "../Pages/Chatting/ChatList";
// import Draggable from "react-draggable"; 

function Chat() {
  const [view, setView] = useState(false);

  const handleChatModal = () => {
    setView(!view);
  };
  // const [position, setPosition] = useState({ x: 0, y: 0 }); // box의 포지션 값
  // // 업데이트 되는 값을 set 해줌
  // const trackPos = (data) => {
	// setPosition({ x: data.x, y: data.y }); 
  // };

  return (
    
    
      <>
      {view && <ChatList onClose={handleChatModal} />}
      {/* <Draggable onDrag={(e, data) => trackPos(data)} > */}
      <ChatWarp onClick={handleChatModal}>
        <ChatIcon style={{ width: "6rem" }} />
      </ChatWarp>
      {/* </Draggable> */}
      </>
    
    
  );
}

export default Chat;

const ChatWarp = styled.div`
  position: fixed;
  right: 19%;
  bottom: 10%;
  margin-bottom: 50px;
  cursor: pointer;
`;
