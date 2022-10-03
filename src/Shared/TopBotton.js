import styled from "styled-components";
import 탑버튼 from "../Image/TopBtn.png";

const TopBotton = () => {
  return (
    <TopBtn
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <img src={탑버튼} style={{ width: "6rem" }} />
    </TopBtn>
  );
};

const TopBtn = styled.div`
  position: fixed;
  right: 19%;
  bottom: 10%;
  cursor: pointer;
`;

export default TopBotton;
