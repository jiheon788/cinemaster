import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const NaverCallBack = () => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  // 네이버연동 2번
  // kakao에서 redirect 해준 code 가져오는 부분
  const NAVER_PARAMS = new URL(window.location.href).searchParams.get("code");
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

  // 네이버연동 3번
  const sendCode = async () => {
    return await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/naver`, {
      params: {
        code: NAVER_PARAMS,
      },
    });
  };
};

export default NaverCallBack;