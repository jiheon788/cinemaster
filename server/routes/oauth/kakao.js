const { Router } = require("express");
const router = Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwtConfig");
const { User } = require("../../models");
const crypto = require("crypto");

router.get("/", async (req, res, next) => {
  const REST_API_KEY = process.env.KAKAO_API_KEY;
  const REDIRECT_URL = process.env.KAKAO_REDIRECT_URL;
  const KAKAO_CODE = req.query.code;
  console.log(KAKAO_CODE);

  try {
    // 카카오연동 4번
    await axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&code=${KAKAO_CODE}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        },
      )
      .then((getToken) => {
        // 카카오연동 5번
        console.log(getToken.data.access_token);
        getKakaoUserData(getToken.data.access_token).then((userData) => {
          // 가져온 유저 정보 가져와서 콘솔
          //userCheck 함수
          checkUserData(userData.data, res);
        });
      });
  } catch (e) {
    next(e);
  }
});

const checkUserData = async (userData, res) => {
  const oAuthType = "kakao";
  let checkEmail = await User.findOne({
    email: userData.kakao_account.email,
    type: oAuthType,
  });

  try {
    // 비회원 시 회원 가입 되도록 변경
    // 카카오연동 6번
    if (!checkEmail) {
      await User.create({
        email: userData.kakao_account.email,
        name: userData.kakao_account.profile.nickname,
        type: oAuthType,
        profileImg: userData.properties.profile_image,
      });

      checkEmail = await User.findOne({
        email: userData.kakao_account.email,
        type: oAuthType,
      });
    }

    jwt.sign(
      {
        shortId: checkEmail.shortId,
        email: checkEmail.email,
        name: checkEmail.name,
      },
      jwtConfig.secret,
      {
        expiresIn: "1d", //1y,1d,2h,1m,5s
      },
      (err, token) => {
        if (err) {
          res
            .status(401)
            .json({ status: false, message: "로그인을 해주세요." });
        } else {
          res.json({
            login: true,
            status: true,
            accessToken: token,
            email: checkEmail.email,
            name: checkEmail.name,
            shortId: checkEmail.shortId,
          });
        }
      },
    );
  } catch (e) {
    console.log(e);
  }
};

//카카오 유저 정보 가져오는 부분
const getKakaoUserData = async (token) => {
  return await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
};

module.exports = router;
