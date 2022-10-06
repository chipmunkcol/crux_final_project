import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DetePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import * as dateFns from "date-fns";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import {
  // createCrewNotice,
  addCrewNotice,
} from "../../../Redux/modules/crewSlice";
import { ReactComponent as ChatXbtn } from "../../../Image/chatx.svg";

function CrewNoticeModal({ onClose }) {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const params = useParams().crewId;
  const userId = window?.localStorage?.getItem("userId");
  const nickname = window?.localStorage?.getItem("nickname");
  const modalRef = useRef();

  const onSubmit = (data) => {
    const payload = {
      id: params,
      date: dateFns.format(startDate, "PPP EEE aa h:mm", { locale: ko }),
      place: data.place,
      content: data.content,
      authorId: Number(userId),
      authorNickname: nickname,
    };
    createCrewNotice(payload);
    dispatch(addCrewNotice(payload));
    onClose(modalRef);
  };

  //크루 공지사항 생성
  async function createCrewNotice(payload) {
    try {
      const response = await axios.post(
        `https://sparta-tim.shop/notices/${payload.id}`,
        {
          content: payload.content,
          date: payload.date,
          place: payload.place,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("access_token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.data;
    }
  }

  //일시 설정 저장
  const [startDate, setStartDate] = useState(new Date());

  //주소 검색 모달 열기
  const [isOpenPost, setIsOpenPost] = useState(false);
  const userMenu = useRef();

  //주소 저장
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }
    setAddressDetail(fullAddr);
    setIsOpenPost(false);
  };

  const postCodeStyle = {
    display: "block",
    width: "400px",
    height: "400px",
    zIndex: 100,
    position: "absolute",
    top: "250px",
    right: "-800px",
  };

  return (
    <Background>
      {isOpenPost && (
        <div style={{ position: "relative" }}>
          <DaumPostcode
            style={postCodeStyle}
            onComplete={onCompletePost}
            autoClose={false}
          />
          <ChatXbtn
            style={{
              position: "absolute",
              top: "230px",
              right: "-797px",
              zIndex: 150,
              cursor: "pointer",
            }}
            onClick={() => {
              setIsOpenPost(false);
            }}
          />
        </div>
      )}
      <Modal onSubmit={handleSubmit(onSubmit)}>
        <Xbtn onClick={onClose} />
        <Title>
          <h1>모임 공지</h1>
        </Title>
        <ImgBox>
          <Time>
            <h3>모임 일시</h3>
            <SdatePicker
              selected={startDate}
              showTimeInput
              disabledKeyboardNavigation
              locale={ko}
              dateFormat="yyyy.MM.dd (eee) aa h:mm"
              showPopperArrow={false}
              minDate={new Date()}
              onChange={(date) => setStartDate(date)}
            />
          </Time>
          <Place>
            <h3>모임 장소</h3>
            <input
              type="text"
              placeholder="장소를 입력해주세요."
              {...register("place", { required: true })}
            />
          </Place>
          <Intro>
            <h3>상세소개</h3>
            <textarea
              {...register("content", { required: true })}
              maxLength="100"
              spellCheck="false"
              placeholder="주최하는 모임에 대한 소개를 100자 이내로 작성해주세요.
            예) 오늘 OO클라이밍에서 클라이밍할 예정입니다. 시간 되시는 크루 분들 함께 해요!"
            />
          </Intro>
        </ImgBox>
        <ButtonBox>
          <button type="submit" ref={modalRef}>
            등록
          </button>
          <button onClick={onClose}>취소</button>
        </ButtonBox>
      </Modal>
    </Background>
  );
}

export default CrewNoticeModal;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  padding-top: 200px;
  z-index: 99999;
`;

const Modal = styled.form`
  width: 1100px;
  height: fit-content;
  background-color: #262626;
  display: flex;
  flex-direction: column;
  padding: 60px 60px 55px 60px;
  position: relative;
`;

const Title = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  h1 {
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 700;
    font-size: 44px;
    letter-spacing: -0.05em;
    color: #ffffff;
  }
`;

const ImgBox = styled.div`
  width: 980px;
  height: 300px;
  background-color: #333333;
  margin-top: 42px;
`;

const SdatePicker = styled(DetePicker)`
  width: 100%;
  font-size: 14px;
  letter-spacing: -0.05em;
  color: #888888;
  background-color: transparent;
  border: none;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const Time = styled.div`
  width: 100%;
  height: 80px;
  padding: 30px;
  border-bottom: 1px solid #3f3f3f;
  display: flex;
  color: #999999;
  h3 {
    width: 92px;
    margin-right: 20px;
  }
`;

const Place = styled.div`
  width: 100%;
  height: 80px;
  padding: 30px;
  border-bottom: 1px solid #3f3f3f;
  display: flex;
  align-items: center;
  font-size: 14px;
  letter-spacing: -0.05em;
  color: #888888;
  h3 {
    width: 92px;
    margin-right: 20px;
    color: #999999;
  }
  input {
    width: 100%;
    background-color: transparent;
    border: none;
    font-size: 14px;
    letter-spacing: -0.05em;
    color: #888888;
    :focus {
      outline: none;
    }
  }
`;

const Intro = styled.div`
  width: 100%;
  height: 140px;
  padding: 30px 30px 30px 30px;
  display: flex;
  align-items: center;
  color: #999999;
  h3 {
    width: 92px;
    margin-right: 20px;
  }
  textarea {
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    background-color: transparent;
    white-space: pre-line;
    font-size: 14px;
    letter-spacing: -0.05em;
    color: #888888;
    :focus {
      outline: none;
    }
    overflow: hidden;
  }
`;

const ButtonBox = styled.div`
  width: 400px;
  height: 60px;
  margin-top:40px;
  margin-left:auto;
  button {
    width: 190px;
    height: 60px;
    font-size:20px;
    font-weight:500;
    color:#262626
    background-color:#999999
    letter-spacing: -0.05em;
    &:nth-child(1) {
      margin-right: 15px;
      background-color:#FFB800;}
      &:nth-child(2) {
        background-color:#999999}
}
`;

const Xbtn = styled.button`
  width: 25px;
  height: 25px;
  background: none;
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
  ::before,
  ::after {
    position: absolute;
    top: -2px;
    content: "";
    height: 25px;
    width: 1px;
    background-color: #ffffff;
  }
  ::before {
    transform: rotate(45deg);
  }
  ::after {
    transform: rotate(-45deg);
  }
`;
