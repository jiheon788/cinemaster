const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const asyncHandler = require("../utils/async-handler");
const router = Router();
const { EvalStar } = require("../models");
const { User } = require("../models");
const { Recommend } = require("../models");
// const parse = require("csv-parse/lib/sync");
/*
* 영화 랜덤으로 뽑아오기
movieCounte 갯수만큼 기존 데이터셋 파일(ratings_small.csv) 에 
mmoiveID 중 20개를 추출하여 Client에게 전달한다
*/
router.get(
  "/:movieCount",
  asyncHandler(async (req, res) => {
    /*
    movie Count 만큼 영화 뽑아서 응답
    */
    const { movieCount } = req.params;
    console.log(movieCount);
    const FILE_NAME = "rating_tmdb_link.csv";

    const csvPath = path.join(
      __dirname,
      "..",
      "services",
      "recommend",
      "data",
      FILE_NAME,
    );

    const csv = require("csv-parser");
    let movieSet = new Set();
    let resultSet = new Set();

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        movieSet.add(row["tmdbId"]);
      })
      .on("end", () => {
        movieSet = Array.from(movieSet);
        while (resultSet.size < movieCount) {
          resultSet.add(movieSet[Math.floor(Math.random() * movieSet.length)]);
        }

        res.json({
          movieNum: Number(movieCount),
          result: Array.from(resultSet),
        });

        return;
      });
  }),
);

////////////////////////////////////////////////////////////////////

/*
 * Client 에서 평가한 영화 및 평점을 
    CSV 에 저장 한다
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    /*
    IN - 
[
  { movieId: '37550', rating: 2 },
  { movieId: '862', rating: 3.5 },
  { movieId: '3525', rating: 0.5 },
  { movieId: '22256', rating: 0 },
  { movieId: '22796', rating: 1 }
]
    
    */
    const { shortId, movieList } = req.body;
    const authData = await User.findOne({ shortId }); //없으면 null

    if (!authData) {
      res.status(500);
      res.json({
        fail: "User DB 에서 유저 정보를 찾을 수 없습니다.",
      });
      return;
    }

    const FILE_NAME = "rating_tmdb_link.csv";
    const csvPath = path.join(
      __dirname,
      "..",
      "services",
      "recommend",
      "data",
      FILE_NAME,
    );

    // Header 설정
    const createCsvWriter = require("csv-writer").createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: csvPath,
      header: [
        { id: "userId", title: "USER ID" },
        { id: "tmdbId", title: "TMDB ID" },
        { id: "rating", title: "RATING" },
      ],
      append: true,
    });

    const records = [];

    movieList.map((x) => {
      records.push({
        userId: shortId,
        tmdbId: x[Object.keys(x)[0]],
        rating: x[Object.keys(x)[1]],
      });
    });

    csvWriter
      .writeRecords(records) // returns a promise
      .then(() => {
        console.log("...Done");
      });

    /*
    ! 임시 코드
    */
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

    res.json({
      result: "개발중 ,,,",
    });
  }),
);

/*
 * 영화 별점 한개씩 디비에 쓰려고 만들어 놓은 코드
 */

// /*
//  * Evalutaion 영화 별점 추가 (1개씩)
//   movieStar = {
//     movieId : "1234",
//     star : 4.5
//   }
//  */
//   router.post(
//     "/each",
//     asyncHandler(async (req, res) => {
//       const { shortId, movieId, star } = req.body;

//       const authData = await User.findOne({ shortId }); //없으면 null
//       if (!authData) {
//         res.status(401);
//         res.json({
//           fail: "User DB 에서 유저 정보를 찾을 수 없습니다.",
//         });
//         return;
//       }
//       console.log("authData", authData);

//       // Create. 별점 자체를 최초 등록
//       const checkEvalStar = await EvalStar.findOne({ userRef: authData }); //없으면 null
//       console.log("checkEvalStar -- ", checkEvalStar);
//       if (!checkEvalStar) {
//         await EvalStar.create({
//           userRef: authData,
//           starList: [{ movieId, star }],
//         });

//         res.json({
//           data: [{ movieId, star }],
//           result: "평가 별점 목록에 추가 되었습니다.",
//         });

//         return;
//       }

//       // Update. 별점 자체를 등록한 적이 있지만
//       // 해당 영화를 별점이 매긴 적이 있는지 없는지로 구분 된다
//       const callFindIndex = (element) => {
//         return element.movieId == movieId;
//       };

//       const evalStarList = checkEvalStar.starList;
//       const findIndex = evalStarList.findIndex(callFindIndex);
//       console.log("findIndex", findIndex);
//       if (findIndex < 0) {
//         // 기존에 평점을 매겼던 적 없는 영화라면
//         const newEvalStarlist = [
//           ...evalStarList,
//           {
//             movieId,
//             star,
//           },
//         ];

//         await EvalStar.updateOne(
//           { userRef: authData },
//           {
//             starList: newEvalStarlist,
//           },
//         );

//         res.json({
//           data: newEvalStarlist,
//           result: "별점 목록에 없던 영화라 추가 되었습니다.",
//         });

//         return;
//       } else {
//         // 기존에 평점을 매겼던 영화라면
//         evalStarList[findIndex].star = star;

//         await EvalStar.updateOne(
//           { userRef: authData },
//           {
//             evalStarList,
//           },
//         );

//         res.json({
//           data: evalStarList,
//           result: "별점 목록에 있던 영화라 수정 되었습니다.",
//         });

//         return;
//       }
//     }),
//   );

//   /*
//    * 평가하다가 중간에 취소 할 경우
//    * Document 삭제
//    */
//   router.get(
//     "/cancel/:shortId",
//     asyncHandler(async (req, res) => {
//       const { shortId } = req.params;
//       const authData = await User.findOne({ shortId });
//       const evalStarDel = await EvalStar.deleteOne({ userRef: authData });

//       if (!evalStarDel) {
//         return res.status(404).json({
//           success: false,
//           data: "User DB 에서 유저 정보를 찾을 수 없습니다.",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         data: {},
//       });
//     }),
//   );

//   /*
//    * 평가완료 후 제출
//    */
//   router.get(
//     "/submit/:shortId",
//     asyncHandler(async (req, res) => {
//       const { shortId } = req.params;

//       const authData = await User.findOne({ shortId }); //없으면 null

//       if (!authData) {
//         res.status(401);
//         res.json({
//           success: false,
//           data: "User DB 에서 유저 정보를 찾을 수 없습니다.",
//         });
//         return;
//       }

//       // 별점 등록 한적이 없을 때 처리
//       // evalstar Collection 에 해당 유저의 Document가 없을 때
//       const checkEvalStar = await EvalStar.findOne({ userRef: authData }); //없으면 null
//       if (!checkEvalStar) {
//         res.status(500);
//         res.json({
//           success: false,
//           data: "평가 별점을 매기지 않았습니다.",
//         });

//         return;
//       }

//       const evarStarList = checkEvalStar.starList;
//       if (evarStarList.length === 0) {
//         res.status(500);
//         res.json({
//           success: false,
//           data: "평가 별점 배열이 비어 있습니다.",
//         });

//         return;
//       }

//       /*
//        * 모든 유효성 통과
//        */
//       const FILE_NAME = "rating_tmdb_link.csv";
//       const csvPath = path.join(
//         __dirname,
//         "..",
//         "services",
//         "recommend",
//         "data",
//         FILE_NAME,
//       );

//       // Header 설정
//       // userId,tmdbId,rating
//       const createCsvWriter = require("csv-writer").createObjectCsvWriter;
//       const csvWriter = createCsvWriter({
//         path: csvPath,
//         header: [
//           { id: "userId", title: "USER ID" },
//           { id: "tmdbId", title: "TMDB MOVIE ID" },
//           { id: "rating", title: "RATING" },
//         ],
//         append: true,
//       });

//       const records = [];
//       evarStarList.map((x) => {
//         records.push({
//           userId: shortId,
//           tmdbId: x.movieId,
//           rating: x.star,
//         });
//       });

//       console.log(records);

//       csvWriter
//         .writeRecords(records) // returns a promise
//         .then(() => {
//           console.log("...Done");
//         });

//       // const evalStarDel = await EvalStar.deleteOne({ userRef: authData });
//       res.json("구현 중....");
//     }),
//   );

module.exports = router;
