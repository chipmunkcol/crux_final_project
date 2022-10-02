import './App.css';
// import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Router from './Shared/router';
import Navbar from './Shared/Navbar';
import TopBotton from './Shared/TopBotton';

function App() {

  return (
    <div className="App">
      
      {/* router 연결 */}
      <Router />

      <TopBotton />

    </div>
  );
}

export default App;
