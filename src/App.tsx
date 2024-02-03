import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Chat from "./components/Chat";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import { useState} from "react";

axios.defaults.baseURL="http://localhost:5000/api/v1";
axios.defaults.withCredentials=true;

type Messages={
  role:"string";
  content:string
};

const App=()=>{

  const [messages,setMessages]=useState<Messages[]>([]);

  return (
    <Router>
      <Header />
      <SearchBar msg={setMessages} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat msg={messages} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
