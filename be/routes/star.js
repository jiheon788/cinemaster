const { Router } = require("express");
const { User } = require("../models");
const { Star } = require("../models");
const asyncHandler = require("../utils/async-handler");

const router = Router();

// 별점 평균 가져오기
router.get(
  "/average/:movieId",
  asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const starAllData = await Star.find({});
    let cnt = 0;
    let sum = 0;

    starAllData.forEach((x) => {
      x.starList.forEach((y) => {
        if (y.movieId === movieId) {
          cnt += 1;
          sum += y.star;
        }
      });
    });

    if (cnt === 0) {
      res.json({
        movieId: movieId,
        result: 0,
      });
    } else {
      res.json({
        movieId: movieId,
        result: sum / cnt,
      });
    }

    return;
  }),
);

// 별점 가져오기
router.get(
  "/:shortId/:movieId",
  asyncHandler(async (req, res) => {
    const { shortId, movieId } = req.params;

    const starData = await Star.findOne({ shortId });
    const result = starData.starList.find((element) => {
      if (element.movieId === movieId) {
        return true;
      }
    });

    if (result) {
      res.json(result);
    } else {
      // 별점 등록한 적 없을 때 처리
      res.json({
        movieId: movieId,
        star: 0,
      });
    }
  }),
);

// 별점 등록
router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const { shortId, movieId, star } = req.body;

    const authData = await User.findOne({ shortId }); //없으면 null
    if (!authData) {
      res.status(401);
      res.json({
        fail: "User DB 에서 유저 정보를 찾을 수 없습니다.",
      });
      return;
    }
    console.log("authData", authData);
    // Create. 별점 자체를 최초 등록
    const checkStar = await Star.findOne({ userRef: authData }); //없으면 null
    if (!checkStar) {
      await Star.create({
        userRef: authData,
        starList: [
          {
            movieId,
            star,
          },
        ],
      });

      res.json({
        data: starList,
        result: "별점 목록에 추가 되었습니다.",
      });

      return;
    }

    // Update. 별점 자체를 등록한 적이 있지만
    // 해당 영화를 별점이 매긴 적이 있는지 없는지로 구분 된다
    const callFindIndex = (element) => {
      return element.movieId == movieId;
    };

    const starList = checkStar.starList;
    const findIndex = starList.findIndex(callFindIndex);
    console.log(findIndex);
    if (findIndex < 0) {
      // 기존에 평점을 매겼던 적 없는 영화라면
      const newStarist = [
        ...starList,
        {
          movieId,
          star,
        },
      ];

      await Star.updateOne(
        { userRef: authData },
        {
          starList: newStarist,
        },
      );

      res.json({
        data: newStarist,
        result: "별점 목록에 없던 영화라 추가 되었습니다.",
      });

      return;
    } else {
      // 기존에 평점을 매겼던 영화라면
      starList[findIndex].star = star;

      await Star.updateOne(
        { userRef: authData },
        {
          starList,
        },
      );

      res.json({
        data: starList,
        result: "별점 목록에 있던 영화라 수정 되었습니다.",
      });

      return;
    }
  }),
);

// // 별점 수정
// router.post(
//   "/:movieId/update",
//   asyncHandler(async (req, res, next) => {
//     const { email, star } = req.body;
//     const { movieId } = req.params;

//     const starData = await StarRating.findOne({ email });
//     if (!starData) {
//       res.status(401);
//       res.json({
//         fail: "존재하지 않는 이메일입니다.",
//       });
//       return;
//     }
//     const starRatingList = starData.starList;
//     const callFindIndex = (element) => {
//       return element.movieId == movieId;
//     };
//     const findIndex = starRatingList.findIndex(callFindIndex);

//     if (findIndex === -1) {
//       res.status(500);
//       res.json({
//         fail: "해당 영화의 기등록된 별점을 찾지 못했습니다. 별점을 새로 등록해주세요.",
//       });
//       return;
//     }
//     starRatingList[findIndex].star = star;

//     await StarRating.updateOne(
//       { email },
//       {
//         starList: starRatingList,
//       },
//     );

//     res.json({
//       result: " 별점 목록에 추가 되었습니다.",
//     });
//   }),
// );

module.exports = router;
