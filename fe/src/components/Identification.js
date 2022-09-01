import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Identification = () => {
  const location = useLocation();
  const { email, profileImg } = location.state;
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  console.log("email", email);
  const onClickEnter = () => {
    sendSignInData()
      .then((res) => {
        console.log("로그인에 성공했습니다.");
        navigate("/myprofile");
      })
      .catch((e) => {
        setErrMsg(e.response.data.fail);
      });
  };

  const sendSignInData = async () => {
    // console.log(signInData);
    return await axios.post(process.env.REACT_APP_SERVER_URL + "/user/login", { email, password });
  };

  // 로그인 data를 입력받는 함수
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-page">
      <div className="form">
        <img
          alt="User Picture"
          src={profileImg}
          id="profile-image"
          height="240"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
        />
        <p className="warning-text">{errMsg}</p>
        <button type="button" onClick={()=>onClickEnter()}>
          Enter
        </button>
        <p className="message">
          본인확인이 필요합니다.
        </p>
      </div>
    </div>
  );
};

export default Identification;
