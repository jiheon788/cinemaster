const { Router } = require("express");
const router = Router();
const asyncHandler = require("./../utils/async-handler");
const crypto = require("crypto");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../config/jwtConfig");
const nodeMailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const defaultProfileImg = require("./../config/defaultProfileImg");

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    callback(null, basename + "-" + Date.now() + extension);
  },
});

// 1. 미들웨어 등록
let upload = multer({
  storage: storage,
});

// 유저정보 조회
router.get(
  "/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const authData = await User.findOne({ shortId }); //없으면 null

    if (!authData) {
      res.status(500);
      res.json({
        fail: "User DB 에서 유저 정보를 찾을 수 없습니다.",
      });
      return;
    }

    res.json(authData);
  }),
);

// 유저정보 수정
router.post(
  "/update",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const { shortId, password, name, type } = req.body;
    const authData = await User.findOne({ shortId, type }); //없으면 null

    if (!authData) {
      res.status(500);
      res.json({
        fail: "User DB 에서 유저 정보를 찾을 수 없습니다.",
      });
      return;
    }
    const hashPassword = passwordHash(password);
    const imgfile = req.file;
    const file = req.file;
    let filepath = "";
    let query = "";

    if (imgfile) {
      // 이미지 안보내줬으면 undefined로 온다
      filepath = process.env.SERVER_URL + "/" + file.path;
      query = {
        password: hashPassword,
        name,
        type,
        profileImg: filepath,
      };
    } else {
      filepath = defaultProfileImg.url;
      query = {
        password: hashPassword,
        name,
        type,
      };
    }
    console.log(query);
    await User.updateOne({ shortId }, query);

    res.json({ result: "유저 정보가 수정되었습니다." });
  }),
);

router.post(
  "/signUp",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    const hashPassword = passwordHash(password);
    const checkEmail = await User.findOne({ email, type: "local" });

    if (checkEmail) {
      // throw new Error("이미 가입된 이메일입니다.");
      res.status(500);
      res.json({
        error: "이미 가입된 이메일입니다.",
      });
      return;
    }

    const imgfile = req.file;
    const file = req.file;
    let filepath = "";
    if (imgfile) {
      // 이미지 안보내줬으면 undefined로 온다
      filepath = process.env.SERVER_URL + "/" + file.path;
    } else {
      filepath = defaultProfileImg.url;
    }

    await User.create({
      email,
      password: hashPassword,
      name,
      type: "local",
      profileImg: filepath,
    });

    res.json({
      result: "회원가입이 완료되었습니다. 로그인을 해주세요.",
    });
  }),
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let hashPassword = passwordHash(password);

    const checkEmail = await User.findOne({ email, type: "local" });
    if (!checkEmail) {
      res.status(500);
      res.json({
        fail: "존재하지 않는 이메일입니다.",
      });
      return;
    }

    if (hashPassword !== checkEmail.password) {
      res.status(500);
      res.json({
        fail: "비밀번호가 틀렸습니다.",
      });
      return;
    }

    console.log("checkEmail", checkEmail.shortId);
    jwt.sign(
      {
        shortId: checkEmail.shortId,
        email: email,
        name: checkEmail.name,
      },
      jwtConfig.secret,
      {
        expiresIn: "1d", //1y,1d,2h,1m,5s
      },
      (err, token) => {
        if (err) {
          res
            .status(401)
            .json({ status: false, message: "로그인을 해주세요." });
        } else {
          res.json({
            status: true,
            accessToken: token,
            email: email,
            name: checkEmail.name,
            shortId: checkEmail.shortId,
          });
        }
      },
    );
  }),
);

//비밀번호 찾기 : 2번
router.post(
  "/find/password",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    //email값을 가져옵니다.
    let { email } = req.body;
    //email에 해당하는 사용자 정보를 가져옵니다.
    let user = await User.findOne({ email });
    //email을 전송하는데 사용하게 될 email
    let myEmail = "dudspsdl123321@gmail.com";
    //nodemailer를 사용하여 메일전송을합니다.
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: myEmail,
        pass: "wsdjonteaayznmkm",
      },
    });

    //랜덤 난수값을 가져옵니다.
    const randomPassword = randomPw();
    //랜덤 난수값을 hash형태로 변환합니다.
    const hashRandomPassword = passwordHash(randomPassword);
    //변환된 랜덤 난수 패스워드를 DB에 저장합니다.
    await User.findOneAndUpdate(
      { shortId: user.shortId },
      {
        password: hashRandomPassword,
        status: true, //비밀번호가 변경이 되었다는것을 감지하기 위해 true를 작성
      },
    );

    console.log(hashRandomPassword);

    //실질적으로 email을 보내는 부분입니다.
    let info = await transporter.sendMail({
      from: `"Elice" <${myEmail}>`,
      to: user.email,
      subject: "Reset Password By Elice",
      html: `<b>초기화 비밀번호 : ${randomPassword}</b>`,
    });

    console.log(info.messageId);

    //응답처리
    res.json({ result: "이메일을 전송하였습니다." });
  }),
);

//랜덤 난수 값을 리턴하는 함수
const randomPw = () => {
  return Math.floor(Math.random() * 10 ** 8)
    .toString()
    .padStart("0", 8);
};

const passwordHash = (password) => {
  return crypto.createHash("sha1").update(password).digest("hex");
};

module.exports = router;
