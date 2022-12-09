import styled from "styled-components";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useOutSideClick from "../../../Shared/hooks/useOutSideClick";
import { ReactComponent as ImgUploadIcon } from "../../../Image/imgUploadBox.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import 슬라이더왼쪽버튼 from "../../Image/btn_left.png";
// import 슬라이더오른쪽버튼 from "../../Image/btn_left.png";
import { addCrewPhoto, } from "../../../Redux/modules/crewSlice";
import { useCallback } from "react";
import Loading from '../components/UploadLoading' 

function UploadPhotoModal({ onClose, setReload }) {
  //기본 세팅
  const params = useParams().crewId;
  const dispatch = useDispatch();
  const photomodalRef = useRef();

  const storage = getStorage();

  // 파일 선택시 파일리스트 상태 변경해주는 함수
  const [imgProductList, setImgProductList] = useState([]);
  // console.log(imgProductList)

  const [loading, setLoading] = useState(false)
  const uploadFB = async (event) => {
    setLoading(true)
    const imageLists = event.target.files;
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${event.target.files[0].name}`),
      event.target.files[0]
    );

    const url = await getDownloadURL(uploaded_file.ref);
    setImgProductList(url);

    let imageUrlLists = [...imgProductList];
    for (let i = 0; i < imageLists.length; i++) {
      const imgUrl = url;
      imageUrlLists.push(imgUrl);
      // console.log(imageUrlLists)
    }
    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }
    setImgProductList(imageUrlLists);
    setLoading(false)
  };

  const onsubmit = () => {
    uploadPhoto();
  };

  const dispatch_Reload = (payload) => {
    dispatch(addCrewPhoto(payload))
  }

  const uploadPhoto = async () => {
    if (imgProductList.length === 0) {
      alert("사진을 첨부해주세요:)");
    } else {
      const payload = {
        id: params,
        imgUrl: imgProductList,
      };
      dispatch(addCrewPhoto(payload));
      onClose(modalRef);
    }
  };

  //이미지 미리보기
  const [imgPreview, setImgPreview] = useState([]);
  // console.log(imgPreview);

  // 이미지 상대경로 저장
  const handleAddImages = (e) => {
    const imageLists = e.target.files;

    let imageUrlLists = [...imgPreview];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
    if (imageUrlLists.length > 5) {
      window.alert("사진은 5장까지만 등록 가능합니다.");
      imageUrlLists = imageUrlLists.slice(0, 5);
    }
    setImgPreview(imageUrlLists);
  };

  //이미지 삭제
  const handleDeleteImage = (id) => {
    setImgPreview(imgPreview.filter((_, index) => index !== id));
    setImgProductList(imgProductList.filter((_, index) => index !== id));
  };

  //버튼 클릭하면 file호출
  const imgRef = useRef();

  const onClickImg = () => {
    imgRef.current.click();
  };

  //모달 스크롤 방지
  // useEffect(() => {
  //   const $body = document.querySelector("body");
  //   $body.style.overflow = "hidden";
  //   return () => ($body.style.overflow = "auto");
  // }, []);

  //모달 바깎 클릭시 close
  const modalRef = useRef(null);
  // useOutSideClick(modalRef, onClose);

  return (
    <Background>
      <Modal ref={modalRef} onSubmit={onsubmit}>
        <Title>
          <h1>사진 ({imgProductList.length}/5)</h1>
        </Title>
        <Xbtn onClick={onClose}></Xbtn>
        <ImgBox>
          <StyledSlider {...settings}>
            {imgPreview.map((image, id) => (
              <div key={id}>
                <img src={image} />
              </div>
            ))}
          </StyledSlider>
        </ImgBox>
        <PreviewBox>
          <div>
            <ImgUploadIcon type="button" onClick={onClickImg} />
            <input
              type="file"
              multiple
              accept="image/*"
              ref={imgRef}
              onChange={(e) => {
                handleAddImages(e);
                uploadFB(e);
              }}
            />
          </div>
          {loading ? <Loading /> :
            imgProductList?.map((image, id) => (
            <div key={id} onClick={() => handleDeleteImage(id)}>
              <img src={image} />
            </div>
          ))}
        </PreviewBox>
        <ButtonBox>
          <button type="submit" ref={photomodalRef}>
            사진 등록
          </button>
        </ButtonBox>
      </Modal>
    </Background>
  );
}

export default UploadPhotoModal;

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  centerMode: false,
};

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
`;

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
  width: 500px;
  height: fit-content;
  background-color: #262626;
  display: flex;
  flex-direction: column;
  padding: 65px 50px 65px 50px;
  position: relative;
`;

const Title = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: left;
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
  width: 400px;
  height: 300px;
  background-color: #333333;
  margin-top: 50px;
  div {
    width: 400px;
    height: 300px;
    p {
      font-size: 12px;
      font-weight: 400;
      letter-spacing: -0.05em;
      position: absolute;
      color: #999999;
      z-index: 999;
      top: 25px;
      right: 25px;
    }
    img {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
`;

const PreviewBox = styled.div`
  width: 200px;
  height: 50px;
  margin-top: 15px;
  display: felx;
  flex-direction: row;
  input {
    display: none;
  }
  div {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
      border: 1px solid #666666;
    }
  }
`;

const ButtonBox = styled.div`
  width: 400px;
  height: 60px;
  margin-top: 40px;
  button {
    width: 100%;
    height: 60px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.05em;
    color: #262626;
    border: none;
    background-color: #ffb800;
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
