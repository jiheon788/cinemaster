const { Schema } = require("mongoose");
const shortId = require("./type/short-id");

// 빈 String 값 허용
Schema.Types.String.checkRequired((v) => typeof v === "string");

module.exports = new Schema(
  {
    reviewId: shortId, // 유저 "shortId"와 헷갈려서 변수명 할당
    userRef: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    movieId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likeCount: {
      default: 0,
    },
    likeUsers: [
      {
        user: String,
        like: Boolean,
      },
    ],
    starRef: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Star",
    },
  },
  {
    timestamps: true,
  },
);
