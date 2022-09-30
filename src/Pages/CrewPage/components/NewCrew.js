import styled from "styled-components";
import Loading from "../../../Shared/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const NewCrew = ({searchData}) => {

    const BASE_URL = "http://sparta-tim.shop";
    // const BASE_URL = 'https://01192mg.shop'
  
    const navigate = useNavigate();
  
    const [list, setList] = useState([]);
    console.log(list)
    
  
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
            newCrew();
      }, [page])
  
    
      const obsHandler = ((entries) => { //옵저버 콜백함수
        const target = entries[0];
        if(!endRef.current && target.isIntersecting && preventRef.current){ //옵저버 중복 실행 방지
          preventRef.current = false; //옵저버 중복 실행 방지
          setPage(prev => prev+1 ); //페이지 값 증가
        }
    })

    const newCrew = useCallback(async () => {
        setLoad(true);
        await axios.get(`${BASE_URL}/crews?page=${page}&size=6`)
          .then((res) => {
            setList((prev) => [...prev, ...res.data.data.content]);
            // setNewlist([]);
            preventRef.current = true;
          })
          .catch((err) => {
            console.log(err);
          }) 
          setLoad(false);
      }, [page])



return (
    <Container>
        <Wrap>
            
          {
            searchData?.length !== 0 ? 
            
            (searchData?.map((val, i) => (
                <React.Fragment key={i}>
                  <CrewList
                    key={i}
                    onClick={() => {
                      navigate(`/crews/${val.id}`);
                    }}
                  >
                    <img
                      src={val.imgUrl}
                      alt=""
                      style={{ width: "38rem", height: "38rem" }}
                    />
                    <h3 style={{ margin: "2rem 0 0 0" }}>{val.name}</h3>
                    <p style={{ margin: "0.5rem 0 0 0", height:'2rem', overflow:'hidden' }}>{val.content}</p>
                    <p style={{ margin: "1rem 0 0 0" }}>
                      🖤 50명 | 🙍‍♀️ {val.crewNum}
                    </p>
                  </CrewList>
                </React.Fragment>
              ))) 
            
            :
    // 검색한 크루가 있으면 검색 된 크루를 보여줍니다
              list?.map((val, i) => (
                <React.Fragment key={i}>
                  <CrewList
                    key={i} onClick={() => {
                      navigate(`/crews/${val.id}`);
                    }}
                  >
                    <img
                      src={val.imgUrl}
                      alt=""
                      style={{ width: "38rem", height: "38rem" }}
                    />
                    <h3 style={{ margin: "2rem 0 0 0" }}>{val.name}</h3>
                    <p style={{ margin: "0.5rem 0 0 0", height:'2rem', overflow:'hidden' }}>{val.content}</p>
                    <p style={{ margin: "1rem 0 0 0" }}>
                      🖤 50명 | 🙍‍♀️ {val.crewNum}
                    </p>
                  </CrewList>
                </React.Fragment>
              ))

            }

            { load && <Loading />}
            <div ref={obsRef}></div>
        </Wrap>
      </Container>
    )
}

const Container = styled.div`
width: 192rem;
background-color: #141414;
color: #999999;
`
const Wrap = styled.div`
display: grid;
grid-template-columns: 41rem 41rem 39rem;
justify-content: center;
width: 123rem;
margin: 0 auto;
padding: 4rem 0 0 0;
`

const CrewList = styled.div`
width: 38rem;
height: 49rem;
margin: 2rem 1rem 0 2rem;
padding: 0;
overflow: hidden;
`

export default NewCrew;