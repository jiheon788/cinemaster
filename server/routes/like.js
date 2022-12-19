const { Router } = require("express");
const { User } = require("../models");
const { Review } = require("../models");
// const { Like } = require("../models");
const asyncHandler = require("../utils/async-handler");

const router = Router();

/*
* ✨ Create & Update ✨
* 좋아요 Toggle 기능
* 리뷰에 대해서 유저가 좋아요를 누른 적이 있는지 확인 후 유저 정보를 배열에 담거나 삭제
* 좋아요 True/False 값과 리뷰에 대한 총 좋아요 수를 Response

------------------------------ 예시 ------------------------------
* 1. 좋아요 버튼 클릭 시, "user2"가 좋아요 누른 적이 없는 경우
* ex) [ {"user1", true}, {"user2", true}, {"user3", true} ... ]

* 2. 좋아요 버튼 클릭 시, "user2"가 좋아요 누른 적이 있는 경우
* ex) [ {"user1", true}, {"user3", true}, ... ]
------------------------------------------------------------------
*/
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { shortId, reviewId } = req.body;

    const authData = await User.findOne({ shortId });

    if (!authData) {
      res.status(500);
      res.json({
        fail: "User DB 에서 유저 정보를 찾을 수 없습니다.",
      });
      return;
    }

    const reviewData = await Review.findOne({ reviewId: reviewId });
    console.log(reviewData);

    const likeData = await Review.findOne({
      $and: [{ reviewId: reviewId }, { "likeUsers.user": shortId }],
    });

    console.log("------------------------------------");
    console.log(likeData);
    console.log("------------------------------------");

    if (!likeData) {
      await Review.findOneAndUpdate(
        { reviewId: reviewId },
        { $push: { likeUsers: { user: shortId, like: true } } },
      );

      const newLikeData = await Review.findOne({ reviewId: reviewId });

      const likeUsers = newLikeData.likeUsers;

      await Review.findOneAndUpdate(
        {
          reviewId: reviewId,
        },
        { likeCount: likeUsers.length },
      );

      const result = {
        shortId: shortId,
        reviewId: reviewId,
        like: true,
        likeCount: likeUsers.length,
      };

      res.json(result);
    } else {
      await Review.findOneAndUpdate(
        { reviewId: reviewId },
        { $pull: { likeUsers: { user: shortId } } },
      );

      const newLikeData = await Review.findOne({ reviewId: reviewId });

      const likeUsers = newLikeData.likeUsers;

      await Review.findOneAndUpdate(
        {
          reviewId: reviewId,
        },
        { likeCount: likeUsers.length },
      );

      const result = {
        shortId: shortId,
        reviewId: reviewId,
        like: false,
        likeCount: likeUsers.length,
      };

      res.json(result);
    }

    /*
    ! 좋아요 설계 변경 중 (아래는 원본 코드)
    const likeData = await Like.findOne({
      $and: [{ reviewRef: reviewData }, { "likeUsers.user": shortId }],
    });

    if (!likeData) {
      await Like.findOneAndUpdate(
        { reviewRef: reviewData },
        { $push: { likeUsers: { user: shortId, like: true } } },
      );

      const newLikeData = await Like.findOne({ reviewid: reviewId });

      const likeUsers = newLikeData.likeUsers;

      await Like.findOneAndUpdate(
        { reviewRef: reviewData },
        {
          likeCount: likeUsers.length,
        },
      );

      const result = {
        shortId: shortId,
        reviewId: reviewId,
        like: true,
        likeCount: likeUsers.length,
      };

      res.json(result);
    } else {
      await Like.findOneAndUpdate(
        { reviewRef: reviewData },
        { $pull: { likeUsers: { user: shortId } } },
      );

      const newLikeData = await Like.findOne({ reviewid: reviewId });

      const likeUsers = newLikeData.likeUsers;

      await Like.findOneAndUpdate(
        { reviewRef: reviewData },
        {
          likeCount: likeUsers.length,
        },
      );

      const result = {
        shortId: shortId,
        reviewId: reviewId,
        like: false,
        likeCount: likeUsers.length,
      };

      res.json(result);
    }
    */
  }),
);

module.exports = router;
