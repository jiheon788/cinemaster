import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const KakaoCallBack = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  // 카카오연동 2번
  // kakao에서 redirect 해준 code 가져오는 부분
  const KAKAO_PARAMS = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    sendCode()
      .then((res) => {
        if (res.data.login) {
          // true면 로그인이 되어있는 상태
          setCookie("userData", res.data, { path: "/" });
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        navigate("/");
      });
  }, []);

  // 카카오연동 3번
  const sendCode = async () => {
    return await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/kakao`, {
      params: {
        code: KAKAO_PARAMS,
      },
    });
  };
};

export default KakaoCallBack;