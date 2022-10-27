import styled from "styled-components";
import Loading from "../../../Shared/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const PopularCrew = ({searchData}) => {
    // const BASE_URL = "http://54.180.31.108";
    const BASE_URL = "https://sparta-tim.shop";
    // const BASE_URL = 'http://3.39.237.124'
  
    const navigate = useNavigate();
  
    const [list, setList] = useState([]);
    // console.log(list)
  
    // 무한스크롤 적용하기
      const [page, setPage] = useState(0); //현재 페이지
      // console.log(page)
      const obsRef = useRef(null); 	//observer Element
  
      const [load, setLoad] = useState(false); //로딩 스피너
      const preventRef = useRef(true); //옵저버 중복 실행 방지
      const endRef = useRef(false); //모든 글 로드 확인
  
      useEffect(()=> { //옵저버 생성
        const observer = new IntersectionObserver(obsHandler, { threshold : 0.5 });
        if(obsRef.current) observer.observe(obsRef.current);
        return () => { observer.disconnect(); }
      }, [])
  
      useEffect(()=> {
          getCrew();
      }, [page])
  
    
      const obsHandler = ((entries) => { //옵저버 콜백함수
        const target = entries[0];
        if(!endRef.current && target.isIntersecting && preventRef.current){ //옵저버 중복 실행 방지
          preventRef.current = false; //옵저버 중복 실행 방지
          setTimeout(() => {
            setPage(prev => prev+1 ); //페이지 값 증가  
          }, 0);
          //setPage => setLastId 에 lastId max 받아다가  
        }
    })

    const getCrew = useCallback(async () => {
        setLoad(true);
        await axios.get(`${BASE_URL}/crews/popular?page=${page}&size=6`)
          .then((res) => {
            setList((prev) => [...prev, ...res.data.data.content]);
            
            preventRef.current = true;
          })
          .catch((err) => {
            // console.log(err);
          }) 
          setLoad(false);
      }, [page])


return (
    <Container >
        <Wrap>
        {
            searchData?.length !== 0 ? 
            
            (searchData?.map((val, i) => (
                // <React.Fragment key={i}>
                  <CrewList key={i}
                    onClick={() => {navigate(`/crews/${val.id}`)}}>
                    <img
                      src={val.imgUrl}
                      alt=""
                      style={{ width: "38rem", height: "38rem" }}
                    />
                     <HashWrap >
                      <HashTag>#{val.keywords[0]}&nbsp;</HashTag>
                      <HashTag>#{val.keywords[1]}&nbsp;</HashTag>
                      <HashTag>#{val.keywords[2]}&nbsp;</HashTag>
                    </HashWrap>
                    
                    <h3 style={{ margin: "2rem 0 0 0" }}>{val.name}</h3>
                    <p style={{ margin: "0.5rem 0 0 0", height:'2rem', overflow:'hidden' }}>{val.content}</p>
                    <p style={{ margin: "1rem 0 0 0" }}>
                      🖤 {val.likeNum}명 
                        <span style={{margin:'0 0.4rem 0 0.6rem'}}>|</span> 
                      🙍‍♀️ {val.crewNum}명
                    </p>
                  </CrewList>
                // </React.Fragment>
              ))) 
            
            :
            
    // 검색한 크루가 있으면 검색 된 크루를 보여줍니다
              list?.map((val, i) => (
                // <React.Fragment key={i}>
                  <CrewList key={i}
                    onClick={() => {navigate(`/crews/${val.id}`)}}>
                    <img
                      src={val.imgUrl}
                      alt=""
                      style={{ width: "38rem", height: "38rem" }}
                    />

                    <HashWrap >
                      <HashTag>#{val.keywords[0]}&nbsp;</HashTag>
                      <HashTag>#{val.keywords[1]}&nbsp;</HashTag>
                      <HashTag>#{val.keywords[2]}&nbsp;</HashTag>
                    </HashWrap>

                    <h3 style={{ margin: "2rem 0 0 0" }}>{val.name}</h3>
                    <p style={{ margin: "0.5rem 0 0 0", height:'2rem', overflow:'hidden' }}>{val.content}</p>
                    <p style={{ margin: "1rem 0 0 0" }}>
                      🖤 {val.likeNum}명 
                        <span style={{margin:'0 0.4rem 0 0.6rem'}}>|</span> 
                      🙍‍♀️ {val.crewNum}명
                    </p>
                  </CrewList>
                // </React.Fragment>
              ))

        }
                        
            <div ref={obsRef} ></div>

            { load && <Loading />}
          
        </Wrap>
      </Container>
    )
}


const Container = styled.div`
  width: 192rem;
  background-color: #141414;
  color: #999999;
`;

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 41rem 41rem 39rem;
  justify-content: center;
  width: 123rem;
  margin: 0 auto;
  padding: 4rem 0 0 0;
`;

const CrewList = styled.div`
width: 38rem;
height: 49rem;
margin: 2rem 1rem 0 0.4rem;
padding: 0;
overflow: hidden;
:hover {
    transform: scale(1.05);
    transition: 0.5s;
  }
cursor: pointer;
`
const HashWrap =styled.div`
display: flex;
position: absolute;
margin: 0 0 0 0;
color: #ffffff;
font-size: 1.2rem;
margin: 8rem 0 0 12rem;
color: #999999;
`

const HashTag = styled.div`

`


const Topbar = styled.div`
  width: 122rem;
  margin: 0 auto;
  height: 0.1rem;
`;

export default PopularCrew;