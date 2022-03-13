import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Main from "./pages/Main";
import Chat from "./pages/Chat";
//import "antd/dist/antd.css";
import 'antd/dist/antd.min.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main/>}></Route>
      <Route path="/chat" element={<Chat/>}></Route>
    </Routes>
  );
}

export default App;
