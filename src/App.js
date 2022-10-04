import "./App.css";
// import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Router from "./Shared/router";
import Navbar from "./Shared/Navbar";
import TopBotton from "./Shared/TopBotton";
import Chat from "./Shared/Chat";

function App() {
  return (
    <div className="App">
      <Router />

      <TopBotton />

      <Chat/>
    </div>
  );
}

export default App;
