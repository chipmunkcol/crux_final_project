import styled from "styled-components";
import 탑버튼 from "../Image/TopBtn.png";
import Draggable from "react-draggable"; 
import { useState } from "react";

const TopBotton = () => {

  const [position, setPosition] = useState({ x: 0, y: 0 }); // box의 포지션 값
  // 업데이트 되는 값을 set 해줌
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y }); 
  }
  
  return (
    // <Draggable 
    //   onDrag={(e, data) => trackPos(data)}
    //   allowAnyClick={true}
    // >
      <TopBtn
        onMouseUp={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        <img src={탑버튼} style={{ width: "6rem" }} />
      </TopBtn>
    // </Draggable>
  );
};

const TopBtn = styled.div`
  position: fixed;
  right: 19%;
  bottom: 10%;
  cursor: pointer;
`;

export default TopBotton;
