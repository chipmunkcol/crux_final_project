import { useState } from "react";
import { ReactComponent as ChatIcon } from "../Image/btn_catt.svg";
import styled from "styled-components";
import ChatList from "../Pages/Chatting/ChatList";

function Chat() {
  const [view, setView] = useState(false);

  const handleChatModal = () => {
    setView(!view);
  };

  return (
    <>
      {view && <ChatList onClose={handleChatModal} />}
      <ChatWarp onClick={handleChatModal}>
        <ChatIcon style={{ width: "6rem" }} />
      </ChatWarp>
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
