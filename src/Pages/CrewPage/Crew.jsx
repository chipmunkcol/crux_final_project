import styled from "styled-components";
import Navbar from "../../Shared/Navbar.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PopularCrew from "./components/PopularCrew.js";
import NewCrew from "./components/NewCrew.js";
import Footer from "../../Shared/Footer.js";


const Crew = () => {
  const BASE_URL = "https://sparta-tim.shop";
  // const BASE_URL = "http://54.180.31.108";

  const [choicePopularCrew, setChoicePopularCrew] = useState(true);

  const [choiceCrew, setChoiceCrew] = useState(true);
  const [choiceNewCrew, setChoiceNewCrew] = useState(false);

  const navigate = useNavigate();

  // 크루검색 API 입니다
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      onclickSearchCrew();
    }
  };
  const onclickSearchCrew = () => {
    searchCrew();
  };

  const searchCrew = useCallback(async () => {
    await axios
      .get(`${BASE_URL}/crews/search?query=${search}`)
      .then((res) => {
        setSearchData(res.data.data);
        setSearch("");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [onclickSearchCrew]);

  return (
    <CrewContainer>
      <Navbar />

      <HeaderWrap>
        <h1
          style={{ width: "120rem", margin: "0 auto", padding: "10rem 0 0 0" }}
        >
          크루 모임
        </h1>

        {/* 검색 박스 */}
        <div style={{ width: "120rem", margin: "0 auto", height: "8rem" }}>
          <S_search
            placeholder="크루 이름과 해쉬태그로 검색할 수 있어요 (ex.초보)"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={onKeyPress}
            value={search}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="3x"
            color="#666666"
            onClick={onclickSearchCrew}
            style={{ position: "absolute", margin: "35px 2rem 0 -50px" }}
            type="button"
          />
        </div>
        <div style={{ width: "120rem", margin: "6.2rem auto 0 auto", display:'flex', fontSize:'2rem'}}>
            <CoiceCrew status={choiceCrew} type="button" 
                onClick={()=>{setChoicePopularCrew(true); setSearchData([]); setChoiceCrew(true); setChoiceNewCrew(false)}}>
                  인기 크루
            </CoiceCrew>
            <CoiceCrew status={choiceNewCrew} type="button" style={{margin:'0 0 0 4rem'}}
                onClick={()=>{setChoicePopularCrew(false); setSearchData([]); setChoiceCrew(false); setChoiceNewCrew(true)}}>
                  신규 크루
            </CoiceCrew>
        </div>
      </HeaderWrap>

          {choicePopularCrew === true ? 
            (<PopularCrew searchData={searchData}/>) : 
              (<NewCrew searchData={searchData}/>)}
      
      <Footer/>
    </CrewContainer>
  );
};
const CrewContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderWrap = styled.div`
  width: 192rem;
  height: 33.9rem;
  background-color: #262626;
  color: #ffffff;
`;

const S_search = styled.input`
  width: 60rem;
  height: 6rem;
  margin: 2rem auto;
  border: none;
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0 0 0 2rem;
  background-color: #333;
  color: #666666;
`;

const CoiceCrew = styled.div`
font-size: 2rem;
padding: 0 0 1rem 0;
border-bottom: ${(props) => (props.status ? `2px solid #ffffff` : null)};
color: ${(props) => (props.status ? `#ffffff` : `#999999`)};
font-weight: ${(props) => (props.status ? `700` : `400`)};
`

export default Crew;