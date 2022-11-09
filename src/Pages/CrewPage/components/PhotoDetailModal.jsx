import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useOutSideClick from "../../../Shared/hooks/useOutSideClick";
import { useParams } from "react-router-dom";
import React, { Component } from "react";
import styled from "styled-components";
import {
  deleteCrewPhoto,
  deleteCrewPhotos,
} from "../../../Redux/modules/crewSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 슬라이더오른쪽버튼 from "../../../Image/btn_right.png"
import 슬라이더왼쪽버튼 from "../../../Image/btn_left.png"

function PhotoDetailModal({ onClose, photoId, postId, authorId }) {
  const params = useParams().crewId;

  const dispatch = useDispatch();

  const photoList = photoId;

  const id = postId;

  //모달 바깎 클릭시 close
  const modalRef = useRef(null);
  useOutSideClick(modalRef, onClose);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    nextArrow: (
      <Snext>
          <img src={슬라이더오른쪽버튼} style={{width:'5rem', height:'5rem', position:'absolute', top:'29rem', right:'6rem'}}/>
      </Snext>
  ),
  prevArrow: (
      <Sprev>
          <img src={슬라이더왼쪽버튼} style={{width:'5rem', height:'5rem', position:'absolute', top:'29rem', left:'6rem'}}/>
      </Sprev>
  ),
  };

  return (
    <Background>
      <Modal ref={modalRef}>
        <Xbtn onClick={onClose}></Xbtn>

        {
          authorId === JSON.parse(window?.localStorage?.getItem("userInfo"))?.userId ?
          ( <DeleteBtn
            type="button"
            onClick={() => {
              if(window.confirm("정말 삭제하시겠어요?")){
                dispatch(deleteCrewPhotos(id));
                dispatch(deleteCrewPhoto(id));
                onClose(modalRef);
              }
            }}
          >
            삭제
          </DeleteBtn>) : null
        }
       
        <ImgBox>
          <StyledSlider {...settings}>
            {photoList &&
              photoList.map((photo) => (
                <div key={photo.photoId}>
                  <img src={photo.imgUrl}></img>
                </div>
              ))}
          </StyledSlider>
        </ImgBox>
      </Modal>
    </Background>
  );
}

export default PhotoDetailModal;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
  .slick-prev::before,
  .slick-next::before{
      opacity: 0;
      display: none;
  }
`;
const Snext = styled.div`
width: 30px;
height: 30px;
position: absolute;
z-index: 99;
line-height: 30px;
`;

const Sprev = styled.div`
width: 30px;
height: 30px;
position: absolute;
z-index: 99;
line-height: 30px;
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
  z-index: 99999;
`;

const Modal = styled.div`
  width: 635px;
  height: 635px;
  background-color: #141414;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 200px;
`;

const ImgBox = styled.div`
  div {
    width: 635px;
    height: 635px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const DeleteBtn = styled.p`
  z-index: 500;
  position: absolute;
  top: 20px;
  left: 20px;
  font-weight: 400;
  letter-spacing: -0.05em;
  font-size: 2rem;
  color: #ffffff;
`;

const Xbtn = styled.button`
  width: 25px;
  height: 25px;
  background: none;
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 500;
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
