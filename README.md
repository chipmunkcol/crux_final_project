<img src="https://user-images.githubusercontent.com/88928469/201078490-fed7cb7b-af3f-4c84-a63b-893490a4a38e.png">

</br>

##   🧗‍♂️ CRUX

클라이밍 유저들을 위한 모임, 정보 제공 커뮤니티 서비스입니다.

<br>




## 📺 시연 영상 [프레젠테이션 영상보기](https://www.youtube.com/watch?v=DWAgb-X79Ok&t=16s)

<img src="https://user-images.githubusercontent.com/88928469/201088609-d9e8bafb-cb82-4c3d-aa5a-ec770e7fecb6.gif">

#### [ -> CRUX 바로가기](https://youmadeit.shop/)

<br />

## 📅 프로젝트 기간

> 2022.8.26 ~ 2022.10.07

<br />


## 🎮 주요기능

- 소셜 로그인이 가능합니다
- 크루원들끼리 실시간 채팅으로 소통 할 수 있습니다
- SSE를 통해 실시간 알람을 받을 수 있습니다
- 카카오Map을 통해 전국 클라이밍짐을 한눈에 볼 수 있습니다 ([시연영상](https://www.youtube.com/watch?v=UJhx60YTabw), 
[Git코드](https://github.com/Crux-TeamProject/FE/blob/master/src/Pages/GymPage/Gym.jsx))

<br />

## 🔗 바로가기
- [Crux 이용하러 가기](https://youmadeit.shop/)
- [프론트엔드 GitHub](https://github.com/Crux-TeamProject/FE)
- [백엔드 GitHub](https://github.com/Crux-TeamProject/BE)
- [팀 Notion](https://www.notion.so/6-b8b446f2809c49148f9be2cd678fe538)
- [API 명세서](https://www.notion.so/API-e5a62aa1845b47a5bc8c8dd10dbc22ac)

<br />

## 🔧 기술스택
 <br>
<div align=center>

  <img src="https://img.shields.io/badge/React-60d3f3?style=for-the-badge&logo=react&logoColor=black">
 <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <img src="https://img.shields.io/badge/ReduxToolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> 
  <img src="https://img.shields.io/badge/Axios-5B0BB5?style=for-the-badge&logo=Axios&logoColor=white">
  
  <br>

  
<img src="https://img.shields.io/badge/SockJs-02B78F?style=for-the-badge&logo=SockJs&logoColor=white">
<img src="https://img.shields.io/badge/Stomp-4A86CF?style=for-the-badge&logo=Stomp&logoColor=white">
   <img src="https://img.shields.io/badge/sse-010101?style=for-the-badge&logo=stomp&logoColor=white">
  <br>

 
  <img src="https://img.shields.io/badge/AWS%20S3-232F3E?style=for-the-badge&logo=AmazonAWS&logoColor=FF9A00"/>
  <img src="https://img.shields.io/badge/AWS%20CloudFront-232F3E?style=for-the-badge&logo=AmazonAWS&logoColor=FF9A00"/>
  <img src="https://img.shields.io/badge/AWS%20Route%2053-232F3E?style=for-the-badge&logo=AmazonAWS&logoColor=FF9A00"/>
 
  <br>
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white">
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
</div>
  
<br />

## 🕹 서비스 아키텍쳐  
<img src="https://user-images.githubusercontent.com/109011766/194456262-69a3f74a-4772-4bf7-9e4f-1b667bae8567.png" width="800px"/>

<br />

## ⚠️ Trouble Shooting

<details>
<summary>SSE (Server-Sent Events) Message를 여러번 수신하는 문제 발생</summary>

* 해결 </br>
SSE 연결 시 특정 상황마다(랜더링을 순간적으로 자주 발생시키는 경우) 중첩 연결되어 response를 여러번 수신한다고 판단 </br>
useEffect 의 clean up 함수를 사용하여 component unmount시에 연결을 끊어 중첩 연결 방지하여 문제 해결 </br>

<img src="https://user-images.githubusercontent.com/109011766/194454090-9d2d6a40-70d9-4893-ad15-38ab547941b2.JPG"/>

</details>

</br>

<details>
<summary>input 안에서 간헐적으로 타이핑 속도가 느려지는 현상 </summary>
* 해결 </br>
ref기반의 react-hook-from 라이브러리를 사용하여 사용자가 트리거시까지 리렌더링을 일으키지 않도록 하여 해결. </br>
<img src="https://user-images.githubusercontent.com/109011766/194454141-5d2af974-0fec-4e62-89b7-bcaa0c183387.JPG"/>
</br>
</details>

</br>


## 🙆‍ 유저피드백

<br>

* 피드백 수집일자 : 2022년 10월 05일 ~ 2022년 10월 14일
* 피드백 수 : 총 31개

< 크럭스에서 만족스러웠던 부분 >
* 위치 기반을 이용한 검색 서비스
* 간편한 모임 가입과 유저 간 연결
* 깔끔한 디자인/UI

<br />

< 유저 피드백 개선사항 >

<details>
<summary>사진 업로드가 안돼요</summary>

</br>

 - Firebase로 업로드 되는 시간 사이에 사진을 등록하여 사진 업로드가 안되는 문제로 사진이 업로드되는 동안 loading spiner처리
 
   <img src="https://user-images.githubusercontent.com/88928469/201101894-274d44cc-9f40-41f4-87ea-d2c29367efe0.png" width="250px">
</details>

<details>
<summary>채팅 관련 문의</summary>

</br>

 > 채팅은 어떻게 할 수 있나요? </br>
 - 처음 가입한 사용자의 경우 가입한 크루가 없어 채팅기능의 인식 저하, 안내 문구를 추가하여 크루 가입 장려 
 ![image](https://user-images.githubusercontent.com/88928469/201099305-3378c11a-70c3-476d-86d9-1326c6b352f9.png)
 > 제 채팅과 상대 채팅이 구분이 잘 안가요!
 - 본인 채팅 아래와 같이 구분하여 해결
 ![image](https://user-images.githubusercontent.com/88928469/201099737-8e9d35cc-7b62-4fcf-ac16-0a4dee65bc42.png)
</details>

<br />

##  💁‍♀️🙋‍♂️팀원(FE)

|팀원 |깃허브|역할분담|
|---|---|---|
|이용규🔰|[Github](https://github.com/chipmunkcol)&nbsp;| 카카오Map, 실시간 알람, 메인/크루/클라이밍짐/리뷰/마이 페이지  |
|임효림|[Github](https://github.com/hyolimlim)|소셜로그인, 회원가입, 실시간 채팅, 크루 생성 및 크루 디테일(소개/참여멤버/모임공지/사진첩) 페이지|

<br>
<br>