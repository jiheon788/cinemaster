const { Router } = require("express");
const { Review } = require("../models");
const asyncHandler = require("../utils/async-handler");

// UTC to KST
const { moment } = require("../utils/moment");

const router = Router();

/*
* Read.
영화별 리뷰 목록 조회

! FIXME: 리뷰 작성 후 조회 시 간헐적으로 500 Error 발생
! -> 좋아요 참조 문제 (리뷰, 좋아요 간 양방향 참조에서 리뷰 임베딩 방식으로 변경중)

TODO: 리뷰 정렬 (좋아요 > 리뷰/별점 > 별점)
TODO: 추천 알고리즘 수정

TODO : 댓글 추가
TODO : 리뷰 아이디 기준으로 CRUD 코드 리팩토링
*/
router.get(
  "/:movieId",
  asyncHandler(async (req, res) => {
    const { movieId } = req.params;

    // star DB는 user별로 만들어졌기 때문에, movieId로 검색하기 위해 쿼리문 작성했음
    const reviewData = await Review.find({ movieId: movieId })
      .populate("userRef")
      .populate("starRef", { starList: { $elemMatch: { movieId: movieId } } });

    console.log("----------------reivews-----------------");
    console.log(reviewData);
    console.log("------------------------------------");

    /*
     * 프론트 요청
     * 리뷰 조회 시 리뷰 유/무 유효성 검사 에러 처리 삭제
     */
    // if (reviewData.length === 0) {
    //   // 에러 코드 삭제
    //   // res.status(404);
    //   res.json({
    //     message: "작성된 리뷰가 존재하지 않습니다.",
    //     result: [],
    //   });
    //   return;
    // }

    const result = await Promise.all(
      reviewData.map((review) => {
        // let like = review.likeRef.likeUsers.find((element) => {
        //   if (element.user === review.userRef.shortId) {
        //     return true;
        //   }
        // });

        // console.log("-----------------like--------------");
        // console.log(like);
        // console.log("------------------------------------");

        /*
         * 프론트 요청
         * 영화별 리뷰 조회 시 유저의 좋아요 유/무 판별을 위해
         * 각 리뷰 데이터에 좋아요 누른 유저를 배열로 추가
         */
        // const likeUsers = review.likeRef.likeUsers;
        // let userList = [];

        // console.log("---------------likeUsers-----------------");
        // console.log(likeUsers);
        // console.log("------------------------------------");

        // likeUsers.map((user) => {
        //   userList.push(user.user);
        // });

        // /*
        //  * 총 좋아요 수
        //  */

        // if (!like) {
        //   like = false;
        // } else {
        //   like = like.like;
        // }

        // let likeCount = review.likeRef.likeCount;

        // if (likeCount >= 1) {
        //   likeCount = review.likeRef.likeCount;
        // } else {
        //   likeCount = 0;
        // }

        const likeUsers = review.likeUsers;

        let userList = [];

        likeUsers.map((user) => {
          userList.push(user.user);
        });

        /*
         * 총 좋아요 수
          총 좋아요 수가 0이면
          likeCount: {} 형태로 떠서
          좋아요 수가 1 이상일 때로 조건문 작성했음
         */
        let likeCount = review.likeCount;

        if (likeCount >= 1) {
          likeCount = review.likeCount;
        } else {
          likeCount = 0;
        }

        const data = {
          movieId: review.movieId, // 프론트 요청으로 추가
          reviewId: review.reviewId,
          shortId: review.userRef.shortId, // 프론트 요청으로 추가
          author: review.userRef.name,
          profileImg: review.userRef.profileImg,
          title: review.title,
          content: review.content,
          star: review.starRef.starList[0].star,
          createdAt: moment(review.createdAt).fromNow(),
          updatedAt: moment(review.updatedAt).fromNow(),
          likeUsers: userList,

          /*
          ? 백엔드 응답만으로 총 좋아요 수 표시 시
          ? 실시간으로 총계 올라가는지 확인 필요
          */
          likeCount: likeCount,
        };
        return data;
      }),
    );

    if (result) {
      res.json(result);
    }
    return;
  }),
);

module.exports = router;
