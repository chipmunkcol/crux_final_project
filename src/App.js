import "./App.css";
import Router from "./Shared/router";
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
