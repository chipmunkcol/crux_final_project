import { useRef, useState, useEffect } from "react";
import { storage } from "../../../Shared/firebase";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React from "react";
import styled from "styled-components";
import UploadPhotoModal from "./UploadPhotoModal";
import PhotoDetailModal from "./PhotoDetailModal";
import { getCrewPhoto } from "../../../Redux/modules/crewSlice";
import { ReactComponent as ImgUpload } from "../../../Image/imgUpload.svg";

function CrewPhotos({crew}) {
  const params = useParams().crewId;
  const dispatch = useDispatch();
  const userId = Number(JSON.parse(window?.localStorage?.getItem("userInfo")).userId)

  useEffect(() => {
    dispatch(getCrewPhoto(params));
  }, [dispatch]);

  const crewPhotos = useSelector((state) => state?.crews?.crewPhotos?.data);
  const Photos = crewPhotos;

  // const userData = useSelector((state) => state);
  // console.log(userData);

  //업로드 모달 띄우기
  const [uploadModalVisible, setUploadModaVisible] = useState(false);

  const handleMadalClick = () => {
    const a = crew?.memberList.findIndex((val)=>val.id === userId)
    // console.log(a)
    if (a !== -1) {
      setUploadModaVisible(!uploadModalVisible);
    } else {
      alert(`${crew?.name}멤버만 사진 등록이 가능합니다`)
    }
  };

  //이미지 리스트 모달 띄우기-->모달에 postId전달.
  const [photoDetailModalVisible, setImgListModaVisible] = useState(false);
  const [photoId, setPhotoId] = useState([]);
  const [postId, setPostId] = useState([]);

  const handleImgMadalClick = (data, id) => {
    setImgListModaVisible(!photoDetailModalVisible);
    setPhotoId(data);
    setPostId(id?.postId);
  };

  return (
    <Container>
      {uploadModalVisible && <UploadPhotoModal onClose={handleMadalClick} />}
      {photoDetailModalVisible && (
        <PhotoDetailModal
          onClose={handleImgMadalClick}
          photoId={photoId}
          postId={postId}
        />
      )}
      <ImgBox onClick={handleMadalClick} type="button">
        <ImgUpload />
      </ImgBox>
      {crewPhotos &&
        crewPhotos.map((photo) => (
          <ImgBox
            key={photo.postId}
            props={photo.imgList[0]?.imgUrl}
            onClick={() => {
              handleImgMadalClick(photo.imgList, photo);
            }}
            style={{cursor:'zoom-in'}}
          >
            <OverLay>
              <div style={{ margin: "-23.5rem 0 0rem -14rem" }}>
                {photo.createdAt.substr(0, 10)}
              </div>
              <div style={{ position: "absolute", fontSize: "3rem" }}>
                +{photo.imgList.length}
              </div>
            </OverLay>
          </ImgBox>
        ))}
    </Container>
  );
}

export default CrewPhotos;

const Container = styled.div`
  width: 1200px;
  height: auto;
  max-height: 800px;
  margin-bottom: 200px;
  display: grid;
  grid-template-columns: 280px 280px 280px 280px;
  grid-template-rows: 280px 280px 280px 280px;
  row-gap: 25px;
  column-gap: 27px;
`;

const ImgBox = styled.div`
  width: 280px;
  height: 280px;
  background: url(${(props) => props.props});
  background-position: center;
  background-size: cover;
  background-color: rgba(0, 0, 0, 1);
  :hover {
    transform: scale(1.05);
    transition: 0.5s;
  }
`;

const OverLay = styled.div`
  position: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #ffffff;
  width: 280px;
  height: 280px;
  opacity: 0;
  :hover {
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
  }
`;
// const ImgText = styled.div`
//   width: 300px;
//   height: 300px;
//   position: relative;
//   p {
//     margin-top: 18px;
//     margin-left: 94px;
//     font-weight: 700;
//     font-size: 20px;
//     color: #666666;
//   }
// `;
const PhotoButton = styled.div`
  background-color: gray;
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Xbtn = styled.button`
  width: 60px;
  height: 60px;
  background: none;
  border: none;
  position: absolute;
  ::before,
  ::after {
    position: absolute;
    top: -2px;
    content: "";
    height: 60px;
    width: 6px;
    background-color: #666666;
  }
  ::before {
    transform: rotate(90deg);
  }
  ::after {
    transform: rotate(0deg);
  }
`;
