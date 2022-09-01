const { Router } = require("express");
const { User } = require("../models");
const { Star } = require("../models");
const asyncHandler = require("../utils/async-handler");

const router = Router();

// 별점 분포도 조회
router.get(
  "/dist/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const authData = await User.findOne({ shortId }); //없으면 null

    if (!authData) {
      res.status(500);
      res.json({
        success: false,
        msg: "User DB 에서 유저 정보를 찾을 수 없습니다.",
      });
      return;
    }

    const checkStar = await Star.findOne({ userRef: authData }); //없으면 null
    // 없으면 카트 새로 만들고 추가
    if (!checkStar) {
      res.json({
        success: true,
        result: {},
        msg: "별점을 매긴 영화가 없습니다.",
      });
    }

    const starList = checkStar.starList;

    var starCnt = starList.length;
    var starSum = 0;
    var starDict = {
      0: 0,
      0.5: 0,
      1: 0,
      1.5: 0,
      2: 0,
      2.5: 0,
      3: 0,
      3.5: 0,
      4: 0,
      4.5: 0,
      5: 0,
    };

    starList.map((item) => {
      starSum += item.star;
      if (starDict[item.star] === undefined) starDict[item.star] = 1;
      else starDict[item.star] += 1;
    });

    // 해당 유저가 가장 많이 준 별점 찾기
    var keys = Object.keys(starDict);
    var max = starDict[keys[0]];
    var maxKey = keys[0];

    for (var i = 1; i < keys.length; i++) {
      var value = starDict[keys[i]];
      if (value > max) {
        maxKey = keys[i];
        max = value;
      }
    }

    console.log("starDict", starDict);
    console.log("starSum", starSum);
    console.log("maxKey", maxKey);

    res.json({
      success: true,
      result: {
        cnt: starDict,
        aver: Number(Math.round((starSum / starCnt) * 100) / 100),
        sum: Number(starSum),
        feq: Number(maxKey),
      },
      msg: "별점 평균, 별점 개수, 최빈 별점 조회에 성공 했습니다.",
    });
  }),
);

// 장르 선호도 조회
router.get(
  "/prefer/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const authData = await User.findOne({ shortId }); //없으면 null

    if (!authData) {
      res.status(500);
      res.json({
        success: false,
        msg: "User DB 에서 유저 정보를 찾을 수 없습니다.",
      });
      return;
    }

    const checkStar = await Star.findOne({ userRef: authData }); //없으면 null
    // 없으면 카트 새로 만들고 추가
    if (!checkStar) {
      res.json({
        success: true,
        result: {},
        msg: "별점을 매긴 영화가 없습니다.",
      });
    }

    /*
     * 장르 별
     * 별점의 횟수(cnt) 및 별점의 총 갯수(starSum) 객체 생성
     * {
     *  '장르1': { cnt: 3, starSum: 4 },
     *  '장르2': { cnt: 3, starSum: 4 },
     * }
     */
    const starList = checkStar.starList;
    var starDict = {};

    starList.map((item) => {
      item.genreList.map((genre) => {
        if (starDict[genre] === undefined) {
          starDict[genre] = { cnt: 1, starSum: item.star };
        } else {
          starDict[genre]["cnt"] += 1;
          starDict[genre]["starSum"] += item.star;
        }
      });
    });

    /*
     * 선호도 계산한 객체 생성
     * 별점의 평균을 5점 만점에서 100점 만점으로 변경 후 반올림
     * cnt : 별점을 매긴 영화의 해당 장르의 갯수
     * aver : 별점을 매긴 영화의 해당 장르의 평균
     * [
     *  {"장르1": "action", "cnt":6, "aver":30},
     *  {"장르2": "comedy", "cnt":3, "aver":30}
     * ]
     * }
     */
    var preferList = [];
    Object.keys(starDict).map((key) => {
      preferList.push({
        name: key,
        cnt: starDict[key].cnt,
        aver: Math.round((starDict[key].starSum / starDict[key].cnt) * 20),
      });
    });

    console.log(preferList);
    res.json({
      success: true,
      result: preferList,
      msg: "선호도 및 장르 조회에 성공 했습니다.",
    });
  }),
);

module.exports = router;
