const { Schema } = require("mongoose");
const shortId = require("./type/short-id");

module.exports = new Schema(
  {
    shortId,
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    starList: [
      {
        movieId: String,
        star: Number,
        genreList: [String],
      },
    ],
  },
  {
    timestamps: true,
  },
);
