import React, { useEffect, useState } from "react";
import styled from "styled-components";
import 사용자이미지 from "../../../Image/사용자기본이미지.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteCrewNotice } from "../../../Redux/modules/crewSlice";
import CrewNoticeEditModal from "./CrewNoticeEditModal";

function CrewNotice() {
  const dispatch = useDispatch();
  const params = useParams().crewId;

  //크루 데이터
  const crewDetail = useSelector((state) => state?.crews?.crewDetail);
  const noticeList = crewDetail?.data?.noticeList;
  console.log(noticeList);

  //userId가져오기
  const userId = JSON.parse(window?.localStorage?.getItem("userInfo")).userId;

  //삭제하기
  async function delteNotice(payload) {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(
          `https://sparta-tim.shop/notices/${payload}`,
          {
            headers: {
              Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
            },
          }
        );
        return response.data;
      } catch (error) {
        return error.data;
      }
    }
  }

  //수정모달 띄우기
  const [editModal, setEditModal] = useState(false);

  const handleModalClick = () => {
    setEditModal(!editModal);
  };

  //데이터 전달
  const [editid, setEditid] = useState("");
  const [editplace, setEditplace] = useState("");
  const [editcontent, setEditcontent] = useState("");
  const [editdate, setEditdate] = useState("");

  return (
    <div>
      {editModal && (
        <CrewNoticeEditModal
          onClose={handleModalClick}
          id={editid}
          place={editplace}
          content={editcontent}
          date={editdate}
        />
      )}
      {noticeList
        ?.slice(0)
        ?.reverse()
        ?.map((notice, index) => (
          <Container key={index}>
            <IntroContent>
              {Number(userId) === notice?.authorId ? (
                <TextButton>
                  <span
                    onClick={() => {
                      handleModalClick();
                      setEditid(notice?.noticeId);
                      setEditplace(notice?.place);
                      setEditcontent(notice?.content);
                      setEditdate(notice?.date);
                    }}
                  >
                    수정
                  </span>
                  <span>|</span>
                  <span
                    onClick={() => {
                      delteNotice(notice?.noticeId);
                      dispatch(deleteCrewNotice(notice?.noticeId));
                    }}
                  >
                    삭제
                  </span>
                </TextButton>
              ) : (
                <div style={{ height: "15px" }} />
              )}
              <h3>
                ++{notice.date}/{notice.place} 모임++
              </h3>
              <p>- 일시 : {notice.date}</p>
              <p>- 장소 : {notice.place}</p>
              <p>- 상세소개 : {notice.content}</p>
              <UserContent>
                <img
                  src={
                    notice.authorProfileImg
                      ? notice.authorProfileImg
                      : 사용자이미지
                  }
                ></img>
                <div>
                  <h1>{notice.authorNickname}</h1>
                  {/* <p>{notice.authorStatus === "ADMIN" ? "크루장" : "크루원"}</p> */}
                </div>
              </UserContent>
            </IntroContent>
          </Container>
        ))}
    </div>
  );
}

export default CrewNotice;

const Intro = styled.div`
  width: 1200px;
  height: 257px;
  margin-bottom: 20px;
  h3 {
    font-weight: 400;
    font-size: 20px;
    letter-spacing: -0.05em;
    color: #ffffff;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #999999;
  }
`;

const IntroContent = styled.div`
  width: 1200px;
  hieght: fit-content;
  background-color: #262626;
  padding: 15px 30px 30px 30px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 70%;
    overflow: hidden;
    margin-top: 40px;
  }
  h3 {
    font-weight: 400;
    font-size: 20px;
    letter-spacing: -0.05em;
    color: #ffffff;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #999999;
  }
`;

const UserContent = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin-top: 40px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 70%;
    overflow: hidden;
    margin-top: 0px;
    margin-right: 20px;
  }
  div {
    h1 {
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      letter-spacing: -0.05em;
      color: #ffffff;
    }
  }
`;

const TextButton = styled.div`
  width: 1140px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.05em;
  span {
    cursor: pointer;
    border: none;
    color: #999999;
    margin-rignt: 6px;
    &:nth-child(1) {
      padding-right: 6px;
    }
    &:nth-child(3) {
      padding-left: 6px;
    }
  }
`;

const Container = styled.div`
  width: 1200px;
  margin-bottom: 25px;
  height: auto;
  positon: absolute;
`;
