// const { spawn } = require("node:child_process");

const { Router } = require("express");
const router = Router();

const asyncHandler = require("./../utils/async-handler");

const { User } = require("../models");
// const { Star } = require("../models");
const { Recommend } = require("../models");

String.prototype.replacell = function (org, dest) {
  return this.split(org).join(dest);
};

// ! python.exe 경로 (테스트 시 수정 바람)
const pythonPath =
  // 현우 로컬 파이썬 경로
  "C:\\Users\\1\\AppData\\Local\\Programs\\Python\\Python38\\python.exe";

// 파이썬 스크립트 파일 경로
const scriptPath = "../services/recommend/app.py";

let userId = 10; // 유저 아이디
let top_n = 30; // 상위 n개 영화

// const prediction = spawn(`${pythonPath}`, [
//   `${scriptPath}`,
//   `${userId}`,
//   `${top_n}`,
// ]);

// prediction.stdout.on("data", function (data) {
//   let textData = data.toString("utf-8");
//   console.log("ㅇㅇ");
//   console.log(textData);

//   textData = textData.replaceAll("'", '"');
//   textData = textData.replaceAll("None", '"None"');

//   const obj = JSON.parse(textData);
//   console.log(obj);
// });

/*
TODO : 구현중...
*/
router.get(
  "/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const authData = await User.findOne({ shortId });

    if (!authData) {
      res.status(401);
      res.json({
        fail: "User not found",
      });

      await Recommend.create({
        userRef: authData,
        recommendList: [
          { movieId: "9909", rating: "3.3" },
          { movieId: "11360", rating: "4.0" },
          { movieId: "819", rating: "3.7" },
          { movieId: "1103", rating: "3.5" },
          { movieId: "11216", rating: "4.3" },
          { movieId: "11778", rating: "4.1" },
          { movieId: "665", rating: "4.0" },
          { movieId: "783", rating: "4.0" },
          { movieId: "6114", rating: "3.5" },
          { movieId: "1598", rating: "3.8" },
          { movieId: "152", rating: "3.2" },
          { movieId: "3179", rating: "3.5" },
          { movieId: "1051", rating: "4.3" },
          { movieId: "97", rating: "3.8" },
          { movieId: "8393", rating: "3.7" },
          { movieId: "847", rating: "3.3" },
          { movieId: "8916", rating: "3.2" },
          { movieId: "9426", rating: "3.4" },
          { movieId: "36819", rating: "3.8" },
          { movieId: "11072", rating: "4.2" },
          { movieId: "710", rating: "3.6" },
          { movieId: "4584", rating: "4.1" },
          { movieId: "9603", rating: "3.6" },
          { movieId: "807", rating: "4.1" },
          { movieId: "629", rating: "4.4" },
          { movieId: "11448", rating: "3.7" },
          { movieId: "2054", rating: "4.0" },
          { movieId: "197", rating: "3.9" },
          { movieId: "16388", rating: "3.5" },
          { movieId: "568", rating: "3.9" },
          { movieId: "414", rating: "3.0" },
          { movieId: "8963", rating: "3.9" },
          { movieId: "1572", rating: "3.5" },
          { movieId: "6520", rating: "3.4" },
          { movieId: "1642", rating: "3.2" },
          { movieId: "11472", rating: "3.0" },
          { movieId: "9804", rating: "2.8" },
          { movieId: "22625", rating: "3.9" },
          { movieId: "2292", rating: "4.0" },
          { movieId: "8984", rating: "3.3" },
          { movieId: "522", rating: "4.3" },
          { movieId: "17207", rating: "3.3" },
          { movieId: "628", rating: "3.6" },
          { movieId: "9587", rating: "3.7" },
          { movieId: "18183", rating: "3.9" },
          { movieId: "4476", rating: "3.7" },
          { movieId: "11318", rating: "4.0" },
          { movieId: "3036", rating: "3.2" },
          { movieId: "6950", rating: "3.3" },
          { movieId: "680", rating: "4.2" },
          { movieId: "11450", rating: "4.0" },
          { movieId: "14334", rating: "3.9" },
          { movieId: "11395", rating: "3.3" },
          { movieId: "9905", rating: "3.7" },
          { movieId: "2064", rating: "3.4" },
          { movieId: "9331", rating: "4.0" },
          { movieId: "10731", rating: "3.6" },
          { movieId: "13", rating: "3.9" },
          { movieId: "712", rating: "3.8" },
          { movieId: "8587", rating: "3.9" },
          { movieId: "854", rating: "3.2" },
          { movieId: "36593", rating: "3.4" },
          { movieId: "12280", rating: "3.5" },
          { movieId: "2788", rating: "3.4" },
          { movieId: "1637", rating: "3.7" },
          { movieId: "10395", rating: "3.2" },
          { movieId: "8011", rating: "3.1" },
          { movieId: "2758", rating: "3.4" },
          { movieId: "37233", rating: "3.6" },
          { movieId: "5503", rating: "4.2" },
          { movieId: "10612", rating: "3.3" },
          { movieId: "9386", rating: "3.9" },
          { movieId: "329", rating: "3.7" },
          { movieId: "9593", rating: "3.2" },
          { movieId: "11971", rating: "4.0" },
          { movieId: "788", rating: "3.9" },
          { movieId: "9800", rating: "3.9" },
          { movieId: "713", rating: "3.8" },
          { movieId: "1245", rating: "4.0" },
          { movieId: "424", rating: "4.2" },
          { movieId: "12519", rating: "3.3" },
          { movieId: "858", rating: "3.5" },
          { movieId: "10635", rating: "3.3" },
          { movieId: "9479", rating: "3.7" },
          { movieId: "10057", rating: "3.2" },
          { movieId: "9066", rating: "3.3" },
          { movieId: "771", rating: "3.4" },
          { movieId: "251", rating: "3.5" },
          { movieId: "812", rating: "3.8" },
          { movieId: "280", rating: "4.2" },
          { movieId: "581", rating: "3.5" },
          { movieId: "268", rating: "3.4" },
          { movieId: "274", rating: "4.0" },
          { movieId: "10112", rating: "3.7" },
          { movieId: "10539", rating: "3.8" },
          { movieId: "503475", rating: "4.1" },
          { movieId: "11359", rating: "3.2" },
          { movieId: "197", rating: "3.9" },
          { movieId: "1024", rating: "4.0" },
          { movieId: "11008", rating: "3.1" },
        ],
      });
      return;
    }
    const checkRecommend = await Recommend.findOne({ userRef: authData }); //없으면 null
    if (!checkRecommend) {
      // res.status(500);
      res.json({
        shortId,
        success: false,
        movieList: [],
        result: "해당 유저는 평가 별점을 매기지 않았습니다.",
      });

      return;
    }
    const random = await Recommend.aggregate([
      { $unwind: "$recommendList" },
      {
        $sample: { size: 20 },
      },
    ]);

    const sendData = [];
    random.map((x) =>
      sendData.push({
        movieId: x.recommendList.movieId,
        rating: x.recommendList.rating,
      }),
    );

    res.json({
      shortId,
      success: true,
      movieList: sendData,
      result: "추천 영화 조회에 성공했습니다.",
    });

    // TODO: 수정중
    // let userId = 10; // 유저 아이디
    // let top_n = 30; // 상위 n개 영화
    // console.log(1);
    // const { spawn } = require("node:child_process");
    // console.log(2);
    // const prediction = spawn(`${pythonPath}`, [
    //   `${scriptPath}`,
    //   `${userId}`,
    //   `${top_n}`,
    // ]);
    // console.log(prediction);
    // console.log(prediction.status);
    // console.log(3);
    // let obj = "";
    // prediction.stdout
    //   .on("data", function (data) {
    //     let textData = data.toString("utf-8");
    //     console.log("ㅇㅇ");
    //     console.log(textData);

    //     textData = textData.replaceAll("'", '"');
    //     textData = textData.replaceAll("None", '"None"');

    //     obj = JSON.parse(textData);
    //     res.json(obj);
    //     console.log(4);
    //   })
    //   .on("end", () => {
    //     console.log(6);
    //     // res.json(obj);
    //   });
    // console.log(5);
  }),
);

module.exports = router;
