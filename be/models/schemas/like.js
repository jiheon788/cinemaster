const { Schema } = require("mongoose");
const shortId = require("./type/short-id");

module.exports = new Schema(
  {
    shortId,
    reviewRef: {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
    likeCount: { default: 0 },
    likeUsers: [
      {
        user: String,
        like: Boolean,
      },
    ],
  },
  { timestamps: true },
);
