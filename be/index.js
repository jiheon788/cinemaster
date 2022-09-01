// library
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Router
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const starRouter = require("./routes/star");
const fileUploadRouter = require("./routes/fileUpload");
const kakaoRouter = require("./routes/oauth/kakao");
const naverRouter = require("./routes/oauth/naver");
const reviewRouter = require("./routes/review");
const reviewListRouter = require("./routes/reviewList");
const likeRouter = require("./routes/like");
const evaluationRouter = require("./routes/evaluation");
const reportRouter = require("./routes/report");

const fs = require("fs");

// .env 파일 사용 위한 세팅
require("dotenv").config();

const recommendRouter = require("./routes/recommend");

// const authMiddleware = require("./utils/authMiddleware");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

app.use("/uploads", express.static("uploads")); // 이미지 경로 접근 허용하도록

//DB 연결
// mongoose.connect("mongodb://localhost:27017/Cinemaster");
mongoose.connect(process.env.DB_CONNECT);

mongoose.connection.on("connected", () => {
  console.log("DB connect success");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//user url 경로 라우팅
app.use("/user", userRouter);
//app.use("/cart", authMiddleware, movieCartRouter);
app.use("/cart", cartRouter);

app.use("/star", starRouter);

//auth url 경로 라우팅
app.use("/auth/kakao", kakaoRouter);
app.use("/auth/naver", naverRouter);

// review url 경로 라우팅
app.use("/review", reviewRouter);

// reviewlist url 경로 라우팅 (리뷰 목록 조회)
app.use("/reviewlist", reviewListRouter);

// like url 경로 라우팅
app.use("/like", likeRouter);

// recommend url 경로 라우팅
app.use("/recommend", recommendRouter);

// 평가하기 경로 라우팅
app.use("/eval", evaluationRouter);

app.use("/upload", fileUploadRouter);

app.use("/report", reportRouter);

// //api/index.js
// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });

//api/index.js
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("success!");
});
