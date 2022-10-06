import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "../Pages/Home/Home";
import Gym from "../Pages/GymPage/Gym";
import Crew from "../Pages/CrewPage/Crew";
import CrewDetail from "../Pages/CrewPage/CrewDetail";
import GymDetail from "../Pages/GymDetailPage/GymDetail";
import KakaoLogin from "../Pages/Login/KakaoLogin";
import CreateCrew from "../Pages/CrewPage/CreateCrew";
import CrewEdit from "../Pages/CrewPage/CrewEdit";
import Mypage from "../Pages/MyPage/Mypage";
import ChatList from "../Pages/Chatting/ChatList";
import ChatRoom from "../Pages/Chatting/ChatRoom";
import TermsOfUse from "../Pages/Register/TermsOfUse";
import Userprivacy from "../Pages/Register/Userprivacy";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crews" element={<Crew />} />
      <Route path={"/crews/:crewId"} element={<CrewDetail />} />
      <Route path="/gyms" element={<Gym />} />
      <Route path={"/gyms/:gymId"} element={<GymDetail />} />
      <Route path="/kakaoLogin" element={<KakaoLogin />} />
      <Route path="/createcrew" element={<CreateCrew />} />
      <Route path={"/crewedit/:id"} element={<CrewEdit />} />
      <Route path={"/members/:memberId"} element={<Mypage />} />
      <Route path="/chat" element={<ChatList />} />
      <Route path={"/chat/:roomId"} element={<ChatRoom />} />
      <Route path="/terms/terms-of-use" element={<TermsOfUse />} />
      <Route path="/terms/user-privacy" element={<Userprivacy />} />
    </Routes>
  );
};

export default Router;
