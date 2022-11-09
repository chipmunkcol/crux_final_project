import styled from "styled-components";
import 탑버튼 from "../Image/TopBtn.png";
import Draggable from "react-draggable"; 
import { useState } from "react";

const TopBotton = () => {

  const [position, setPosition] = useState({ x: 0, y: 0 }); // box의 포지션 값
  const [checkMove, setCheckMove] = useState({x: 0, y: 0});

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });

    setTimeout(() => {
      setCheckMove({x: data.x, y: data.y})
    }, 500);
  }
  
  return (
    <Draggable 
      onDrag={(e, data) => {trackPos(data); e.preventDefault();}}>
      <TopBtn
        onClick={() => {
          if(position.x === checkMove.x) {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }
        }}
      >
        <img src={탑버튼} style={{ width: "6rem" }} />
      </TopBtn>
    </Draggable>
  );
};

const TopBtn = styled.div`
  position: fixed;
  z-index: 999999;
  right: 19%;
  bottom: 10%;
  cursor: pointer;
`;

export default TopBotton;
