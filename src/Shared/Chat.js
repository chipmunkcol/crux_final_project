import { useState } from "react";
import { ReactComponent as ChatIcon } from "../Image/btn_catt.svg";
import styled from "styled-components";
import ChatList from "../Pages/Chatting/ChatList";
import Draggable from "react-draggable"; 

function Chat() {
  const [view, setView] = useState(false);

  const handleChatModal = () => {
    setView(!view);
  };
  
  const [position, setPosition] = useState({ x: 0, y: 0 }); // box의 포지션 값
  const [checkMove, setCheckMove] = useState({x: 0, y: 0});

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });

    setTimeout(() => {
      setCheckMove({x: data.x, y: data.y})
    }, 500);
  }

  return (
    
    
      <>
      {view && <ChatList onClose={handleChatModal} />}
      <Draggable onDrag={(e, data) => {trackPos(data); e.preventDefault(); }} >
        
        <ChatWarp 
          onClick={()=>{
            if(position.x === checkMove.x) {
              handleChatModal()
            }
          }}>
          <ChatIcon style={{ width: "6rem" }} />
        </ChatWarp>
         
      </Draggable>
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
