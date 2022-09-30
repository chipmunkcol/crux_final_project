import './App.css';
// import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Router from './Shared/router';
import Navbar from './Shared/Navbar';


function App() {

  return (
    <div className="App">
      
      {/* router 연결 */}
      <Router />



    </div>
  );
}

export default App;
