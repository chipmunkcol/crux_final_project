import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  getCrewDetail,
  deleteCrew,
  _crewLike,
  _joinCancelCrew,
  _joinCrew,
} from "../../Redux/modules/crewSlice";
import Navbar from "../../Shared/Navbar";
import CrewIntro from "./components/CrewIntro";
import CrewMember from "./components/CrewMember";
import CrewNotice from "./components/CrewNotice";
import CrewPhotos from "./components/CrewPhotos";
import CrewNoticeModal from "./components/CrewNoticeModal";
import ApplicationListModal from "./components/ApplicationListModal";
import { ReactComponent as Heart } from "../../Image/heart.svg";
import Loading from "../../Shared/Loading";
import Footer from "../../Shared/Footer";

const CrewDetail = () => {
  const params = useParams().crewId;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCrewDetail(params));
    window.scrollTo(0, 0);
  }, [params]);

  const crewDetail = useSelector((state) => state?.crews?.crewDetail);
  const crew = crewDetail?.data;
  console.log(crew);

  //호스트 확인
  const hostId = crew?.hostId;
  const userId = JSON.parse(window?.localStorage?.getItem("userInfo")).userId;
  

  //크루 가입자 확인
  const memberList = crew?.memberList;
  // console.log(memberList);
  const checkmember = memberList?.findIndex((x) => x?.id === Number(userId));

  //크루 삭제
  async function onCrewDelte() {
    if (window.confirm("크루를 삭제하시겠습니까?")) {
      try {
        const response = await axios
          .delete(`https://sparta-tim.shop/crews/${params}`, {
            headers: {
              Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
            },
          })
          .then((response) => {
            // console.log(response);
          });
        window.alert("삭제 완료");
        window.location.replace("/crews");
        return response.data;
      } catch (error) {
        return error.data;
      }
    }
  }

  //크루 수정
  const onCrewEdit = () => {
    if (window.confirm("수정하시겠습니까?")) {
      navigate(`/crewedit/${params}`, {
        state: {
          id: crew?.id,
          name: crew?.name,
          content: crew?.content,
          imgURL: crew?.imgUrl,
          keywords: crew?.keywords,
          mainGym: crew?.mainActivityGym,
          mainArea: crew?.mainActivityArea,
        },
      });
    } else {
      return;
    }
  };

  //크루 가입 신청
  async function joinCrews() {
    try {
      const response = await axios.post(
        `https://sparta-tim.shop/crews/${params}/members`,
        null,
        {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        }
      );
      dispatch(_joinCrew(true));
      window.alert("신청되었습니다.");
      return response.data;
    } catch (error) {
      return error.data;
    }
  }
  async function joinCancelCrews() {
    try {
      const response = await axios.post(
        `https://sparta-tim.shop/crews/${params}/members`,
        null,
        {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        }
      );
      dispatch(_joinCancelCrew(false));
      window.alert("신청 취소되었습니다.");
      return response.data;
    } catch (error) {
      return error.data;
    }
  }

  //크루 탈퇴
  async function withdrawCrew() {
    if (window.confirm("탈퇴하시겠습니까?")) {
      try {
        const response = await axios
          .delete(`https://sparta-tim.shop/crews/${params}/members`, {
            headers: {
              Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
            },
          })
          .then((response) => {
            // console.log(response);
          });
        window.alert("탈퇴 완료");
        window.location.reload();
        return response.data;
      } catch (error) {
        return error.data;
      }
    }
  }

  //크루 좋아요
  async function likeCrew() {
    try {
      const response = await axios
        .post(`https://sparta-tim.shop/crews/${params}/like`, null, {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        })
        .then((response) => {
          // console.log(response);
          window.alert("좋아요 완료");
          dispatch(_crewLike(!crew?.like));
        });
      return response.data;
    } catch (error) {
      return error.data;
    }
  }

  //크루 좋아요 취소
  async function dislikeCrew() {
    try {
      const response = await axios
        .delete(`https://sparta-tim.shop/crews/${params}/like`, {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("userInfo")).access_token,
          },
        })
        .then((response) => {
          // console.log(response);
          window.alert("좋아요 취소");
          dispatch(_crewLike(!crew?.like));
        });
      return response.data;
    } catch (error) {
      return error.data;
    }
  }

  //탭 보이게 하기
  const [introVisible, setIntroVisible] = useState(true);
  const [memberVisible, setMemberVisible] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [photosVisible, setPhotosVisible] = useState(false);

  const handleIntro = () => {
    setIntroVisible(true);
    setMemberVisible(false);
    setNoticeVisible(false);
    setPhotosVisible(false);
  };

  const handleMember = () => {
    setMemberVisible(true);
    setIntroVisible(false);
    setNoticeVisible(false);
    setPhotosVisible(false);
  };

  const handleNotice = () => {
    setMemberVisible(false);
    setIntroVisible(false);
    setNoticeVisible(true);
    setPhotosVisible(false);
  };

  const handlePhotos = () => {
    setMemberVisible(false);
    setIntroVisible(false);
    setNoticeVisible(false);
    setPhotosVisible(true);
  };

  //크루 신청 리스트, 모임 공지 모달 띄우기
  const [applicationModalVisible, setapplicationModalVisible] = useState(false);
  const [isNoticemodal, setIsNoticemodal] = useState(false);

  const handleMadalClick = () => {
    setapplicationModalVisible(!applicationModalVisible);
  };

  const handleNoticeClick = () => {
    setIsNoticemodal(!isNoticemodal);
  };

  if (!crewDetail) {
    return <Loading />;
  }
  return (
    <div>
      <Navbar />
      <Warp>
        {applicationModalVisible && (
          <ApplicationListModal onClose={handleMadalClick} />
        )}
        {isNoticemodal && <CrewNoticeModal onClose={handleNoticeClick} />}
        <ThumbnailContainer>
          <ThumbnailContentBox>
            <ImgBox>
              <HeartIcon type="button">
                <Heart
                  width="50px"
                  height="50px"
                  fill="#FFB800"
                  onClick={crew?.like === true ? dislikeCrew : likeCrew}
                  opacity={crew?.like === true ? "80%" : "30%"}
                />
              </HeartIcon>
              <img src={crewDetail?.data?.imgUrl} />
            </ImgBox>
            <ContentBox>
              <TextBox>
                {hostId === Number(userId) ? (
                  <TextButton>
                    <span type="button" onClick={onCrewEdit}>
                      수정
                    </span>
                    <span type="button" onClick={onCrewDelte}>
                      삭제
                    </span>
                  </TextButton>
                ) : null}
                <h1>{crewDetail?.data?.name}</h1>
                <Keyword>
                  {crew?.keywords?.map((keyword, index) => (
                    <div key={index}>
                      <p>#{keyword}</p>
                    </div>
                  ))}
                </Keyword>
                <TextDetail>
                  <Text>
                    <p>참여자</p> <p>{crew?.crewNum}명</p>
                  </Text>
                  <Text>
                    <p>주 활동 지역</p>
                    <p>{crew?.mainActivityArea}</p>
                  </Text>
                  <Text>
                    <p>주 활동 클라이밍장</p>
                    <p> {crew?.mainActivityGym}</p>
                  </Text>
                </TextDetail>
              </TextBox>
              {checkmember < 0 && crew?.submit === true ? (
                <ButtonBox>
                  <button
                    onClick={() => {
                      joinCancelCrews();
                    }}
                  >
                    가입 취소
                  </button>
                </ButtonBox>
              ) : checkmember < 0 && crew?.submit === false ? (
                <ButtonBox>
                  <button
                    onClick={() => {
                      joinCrews();
                    }}
                  >
                    크루 가입
                  </button>
                </ButtonBox>
              ) : checkmember === 0 ? (
                <ButtonBox>
                  <button onClick={handleNoticeClick}>모임 공지</button>
                  <button onClick={handleMadalClick}>신청 현황</button>
                </ButtonBox>
              ) : (
                <ButtonBox>
                  <button onClick={handleNoticeClick}>모임 공지</button>
                  <button onClick={withdrawCrew}>크루 탈퇴</button>
                </ButtonBox>
              )}
            </ContentBox>
          </ThumbnailContentBox>
          <TabButton>
            <span type="button" onClick={handleIntro}>
              소개
            </span>
            <span type="button" onClick={handleMember}>
              참여멤버
            </span>
            <span type="button" onClick={handleNotice}>
              모임공지
            </span>
            <span type="button" onClick={handlePhotos}>
              사진첩
            </span>
          </TabButton>
        </ThumbnailContainer>
        <TabContainer>
          {introVisible && (
            <CrewIntro
              img={crew?.memberList[0]?.imgUrl}
              content={crew?.content}
              adminNickname={crew?.memberList[0]?.nickname}
              adminContent={crew?.memberList[0]?.content}
            />
          )}
          {memberVisible && <CrewMember members={[crew?.memberList]} />}
          {noticeVisible && <CrewNotice notice={crew?.noticeList} />}
          {photosVisible && <CrewPhotos crew={crew}/>}
        </TabContainer>
      </Warp>
      <Footer />
    </div>
  );
};

export default CrewDetail;

const Warp = styled.div`
  display: flex;
  flex-direction: column;
`;

const Keyword = styled.div`
  display: flex;
  margin-top: 10px;
  div {
    width: 79px;
    height: 26px;
    border: 1px solid #666666;
    border-radius: 22px;
    display: flex;
    padding: 6px 10px 5px 10px;
    margin-right: 5px;
    justify-content: center;
    align-items: center;
    p {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: -0.05em;
      color: #666666;
    }
  }
`;

const ThumbnailContainer = styled.div`
  width: 1920px;
  height: 815px;
  background-color: #202020;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  position: relative;
`;

const TabContainer = styled.div`
  width: 1920px;
  min-height: 864px;
  padding-top: 60px;
  height: auto;
  background-color: #141414;
  display: flex;
  justify-content: center;
`;

const ThumbnailContentBox = styled.div`
  width: 1200px;
  height: 600px;
  display: flex;
  justify-content: space-between;
`;

const ImgBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: #202020;
  img {
    width: 100%;
    height: 100%;
  }
  position: relative;
`;

const HeartIcon = styled.div`
  position: absolute;
  right: 30px;
  top: 26px;
`;

const ContentBox = styled.div`
  width: 550px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TextBox = styled.div`
  width: 550px;
  height: 372px;
  word-break: break-all;
  h1 {
    color: #ffffff;
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 700;
    font-size: 44px;
    letter-spacing: -0.05em;
  }
`;

const TextDetail = styled.div`
  width: 550px;
  height: 206px;
  margin-top: 45px;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 14px;
  p {
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: -0.05em;
    color: #cccccc;
    &:nth-child(1) {
      color: #666666;
      font-size: 20px;
      margin-right: 20px;
    }
  }
`;

const TextButton = styled.div`
  width: 550px;
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
    border: none;
    color: #999999;
    margin-rignt: 6px;
    &:nth-child(1) {
      padding-right: 6px;
    }
    &:nth-child(2) {
      padding-left: 6px;
    }
  }
`;

const ButtonBox = styled.div`
  width: 550px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: -0.05em;
  button {
    width: 250px;
    height: 60px;
    border: none;
    color: #666666;
    background-color: #999999;
    &:hover {
      color: #262626;
      background-color: #ffb800;
      transition: 0.5s;
    }
  }
`;

const TabButton = styled.div`
  margin-top: 80px;
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.05em;
  color: #999999;
  position: absolute;
  left: 360px;
  bottom: 3px;
  span {
    &:nth-child(1) {
      padding-right: 40px;
      text-decoration: underline 2px;
      text-underline-offset: 8px;
    }
    &:nth-child(2) {
      padding-right: 40px;
      text-decoration: underline 2px;
      text-underline-offset: 8px;
    }
    &:nth-child(3) {
      padding-right: 40px;
      text-decoration: underline 2px;
      text-underline-offset: 8px;
    }
    &:nth-child(4) {
      text-decoration: underline 2px;
      text-underline-offset: 8px;
    }
    &:hover {
      color: #ffffff;
      transition: 0.5s;
    }
  }
`;
