import { Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import KakaoCallBack from "./components/pages/user/KakaoCallback";
import NaverCallBack from "./components/pages/user/NaverCallback";
import Footer from "./components/Footer";
import Login from "./components/Login";

import MyPick from "./components/pages/user/MyPick";
import MyWrittenList from "./components/pages/user/MyWrittenList";
import MyProfile from "./components/pages/user/MyProfile";
import Identification from "./components/Identification";
import Evaluation from "./components/Evaluation";
import MyReport from "./components/report/MyReport";

function App() {
  return (
    <div className="root-wrap">
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/eval" element={<Evaluation />} />
          <Route path="/mypick" element={<MyPick />} />
          <Route path="/writtenlist" element={<MyWrittenList />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/identification" element={<Identification />} />
          <Route path="/myreport" element={<MyReport />} />

          <Route path="oauth">
            <Route path="kakao/callback" element={<KakaoCallBack />} />
            <Route path="naver/callback" element={<NaverCallBack />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
