import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Chat from "./components/Chat";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import axios from "axios";

axios.defaults.baseURL="http://localhost:5000/api/v1";
axios.defaults.withCredentials=true;

const App=()=>{
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
