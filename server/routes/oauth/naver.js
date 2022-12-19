const { Router } = require("express");
const router = Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwtConfig");
const { User } = require("../../models");

const request = require("request-promise");

router.get("/", async (req, res, next) => {
  const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
  const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
  const NAVER_REDIRECT_URL = process.env.NAVER_REDIRECT_URL;
  const STATE = req.query.state;
  const NAVER_CODE = req.query.code;
  const NAVER_API_URL = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&redirect_uri=${NAVER_REDIRECT_URL}&code=${NAVER_CODE}&state=${STATE}`;
  const options = {
    url: NAVER_API_URL,
    headers: {
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
    },
  };

  const result = await request.get(options);
  const accessToken = JSON.parse(result).access_token;
  const refreshToken = JSON.parse(result).refresh_token;
  const info_options = {
    url: "https://openapi.naver.com/v1/nid/me",
    headers: { Authorization: "Bearer " + accessToken },
  };

  const info_result = await request.get(info_options);
  // string 형태로 값이 담기니 JSON 형식으로 parse를 해줘야 한다.
  const info_result_json = JSON.parse(info_result).response;
  const new_info_result_json = {
    ...info_result_json,
    accessToken,
    refreshToken,
  };
  checkUserData(new_info_result_json, res);
});

const checkUserData = async (userData, res) => {
  console.log("checkUserData", checkUserData);
  const oAuthType = "naver";
  let checkEmail = await User.findOne({
    email: userData.email,
    type: oAuthType,
  });
  try {
    if (!checkEmail) {
      await User.create({
        email: userData.email,
        name: userData.name,
        type: oAuthType,
        profileImg: userData.profile_image,
      });

      checkEmail = await User.findOne({
        email: userData.email,
        type: oAuthType,
      });
    }

    //checkEmail이 존재한다면? 가입이 되어있다면?
    // 로그인 진행
    // 네이버연동 6번
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

module.exports = router;
