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

function PhotoDetailModal({ onClose, photoId, postId }) {
  const params = useParams().crewId;

  const dispatch = useDispatch();

  const photoList = photoId;

  const id = postId;

  //모달 바깎 클릭시 close
  const modalRef = useRef(null);
  useOutSideClick(modalRef, onClose);

  return (
    <Background>
      <Modal ref={modalRef}>
        <Xbtn onClick={onClose}></Xbtn>
        <DeleteBtn
          type="button"
          onClick={() => {
            dispatch(deleteCrewPhotos(id));
            dispatch(deleteCrewPhoto(id));
          }}
        >
          삭제
        </DeleteBtn>
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
  font-size: 12px;
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
