import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import styled from "styled-components"
import { Rating } from 'react-simple-star-rating'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import 이미지업로드 from "../../../Image/프리뷰box.png"
import 리뷰기본이미지 from '../../../Image/리뷰기본이미지.jpg'
import { useRef } from "react";
import { useCallback } from "react";
import { ReactComponent as ImgUploadIcon } from "../../../Image/imgUploadBox.svg";
import axios from "axios";
import Loading from "../components/ReviewLoading"


function ModalReview({ setModal, gym, reload, setReload }) {
    const BASE_URL = "https://sparta-tim.shop";
    // const BASE_URL = "https://01192mg.shop";

    const navigate = useNavigate();
    const closeModal = () => {
        setModal(false);
    };

    // 별점 주기 <star rating> 라이브러리!
    const [rating, setRating] = useState(1);
    // console.log(rating)
    const handleRating = (rate: number) => {
        if (rate < 20) {
            setRating(1);
        } else {
            setRating(rate / 20);
        }
    };

    useEffect(() => {
    }, [rating]);

    // 이미지 업로드 <firebase> 라이브러리! 

    const [content, setContent] = useState('');
    const storage = getStorage();
    // const storageRef = ref(storage);


    const [imgProductList, setImgProductList] = useState([]);
    // console.log(imgProductList)

  const [loading, setLoading] = useState(false)
  
  const uploadFB = async (event) => {
    setLoading(true)
    const imageLists = event.target.files;
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${event.target.files[0]?.name}`),
      event.target.files[0]
    );

    const url = await getDownloadURL(uploaded_file.ref);
    setImgProductList(url);

    let imageUrlLists = [...imgProductList];
    for (let i = 0; i < imageLists.length; i++) {
      const imgUrl = url;
      imageUrlLists.push({ imgUrl });
    //   console.log(imageUrlLists)
    }
    if (imageUrlLists.length > 5) {
      alert('리뷰 사진은 5장까지만 업로드 가능합니다')
      imageUrlLists = imageUrlLists.slice(0, 5);
    }
    setImgProductList(imageUrlLists);
    setLoading(false)
  };

  
    //이미지 삭제
    const handleDeleteImage = (id) => {
        setImgProductList(imgProductList.filter((_, index) => index !== id));
    };


    const onsubmit = () => {
        createReview();
    };
    const createReview = async() => {
        if (content === '') {
            alert('후기를 입력해주세요');
        } else {
            const payload = {
                score: rating,
                content: content,
                reviewPhotoList: imgProductList.length !== 0 ? imgProductList 
                                 : [{ imgUrl: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbtOY6e%2FbtrMC0zJgaN%2FE8MiRTJ9nXjXvMPO5q1gQK%2Fimg.jpg" }],
            };
            await axios.post(`${BASE_URL}/reviews/${gym.id}`, payload, {
                headers: { Authorization: window.localStorage.getItem("access_token") }
            })
                .then((res) => {
                    // console.log(res.data)
                    alert('리뷰 작성완료!');
                    setModal(false);
                    setTimeout(() => {
                        setReload(!reload)
                    }, 0);
                    
                })
                .catch((err) => {
                    // console.log(err);
                });
        }
    }


//버튼 클릭하면 file호출
    const imgRef = useRef();

    const onClickImg = () => {
        imgRef.current.click();
        };

    return (
        <ModalPage>
            <Container onClick={(e) => e.stopPropagation()}>

                <div style={{ margin: '8rem auto 0 auto', width: '98rem' }}>
                    <span style={{ fontSize: '36px', fontWeight: '700' }}>{gym.name}</span>
                    <span style={{ fontSize: '1.4rem', margin: '0 0 0 1rem' }}>에 대한 솔직한 리뷰를 작성해주세요</span>
                </div>

                <div style={{ width: '98rem', height: '30rem', margin: '3% auto' }}>
                    <div style={{ width: '100%', height: '8rem', display: 'flex', borderBottom: '1px solid #666666', padding: '5px 0 0 16px', backgroundColor:'#333333', color:'#999999' }}>
                        <div style={{ margin: '0 1.5rem 0 0', padding:'23px 0 0 16px',fontSize: '2rem' }}>별점 남기기</div>
                        <div style={{padding:'11px 0 0 0'}}><Rating onClick={handleRating} ratingValue={rating} /></div>
                    </div>
                    <S_textarea placeholder='후기를 남겨주세요' style={{ width: '100%', height: '74%', fontSize: '1.3rem', border: 'none', padding: '3%' }}
                        onChange={(e) => { setContent(e.target.value); } } />
                </div>

                {/* <label> */}
                
                    <input
                        accept='image/*'
                        type="file" multiple
                        style={{ display: 'none' }}
                        ref={imgRef}
                        onChange={(e)=>{ uploadFB(e) }} />
                    <div style={{display:'flex', position:'absolute', margin:'-1rem 0 0 6rem'}}>
                        <ImgUploadIcon type="button" onClick={onClickImg} />
                        
                        {loading ? <Loading /> :
                          imgProductList?.map((image, id) => (
                                <ImgPreview key={id} onClick={()=>{handleDeleteImage(id)}}>
                                    <img src={image.imgUrl} style={{width:"100%", height:'100%'}}/>
                                </ImgPreview>
                            ))
                        }
                    
                    </div>
                {/* </label> */}
                <div style={{ display: 'flex', margin: '-1rem 0 0 50rem' }}>
                    <S_btn style={{ margin: '0rem 1rem 0 0' }} onClick={closeModal}>취소</S_btn>
                    <S_btn onClick={onsubmit}>리뷰 올리기</S_btn>
                </div>

            </Container>

        </ModalPage>
    );
}

const ModalPage = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 900;
background-color: rgba(0, 0, 0, 0.4);
color:black
`

const Container = styled.div`
width: 110rem;
height: 62rem;

z-index: 999;

position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

background-color: #262626;
color: #ffffff;
`
const S_textarea = styled.textarea`
background-color: #333333;
color: #999999;
`

const CloseButton = styled.button`
position: absolute;
right: 10px;
top: 10px;
`


const UploadImg = styled.div`
width: 5rem;
height: 5rem;
`

const ImgPreview = styled.div`
width: 5rem;
height: 5rem;
border: 1px solid #5e5e5e;
` 

const S_btn = styled.button`
width: 26.5rem;
height: 6rem;
margin: 0rem 0 0 0;
font-size: 2rem;
background-color: #999999;
:hover{
    background-color: #ffb800;
}

`

// const Imgbox = styled.div`
// width: 600px;
// height: 600px;
// position: relative;
// top: 57px;
// img {
// width: 100%;
// height: 100%;
// }
// `;


export default ModalReview;