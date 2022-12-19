const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");

let ImgfilePath = "";

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    ImgfilePath = basename + "-" + Date.now() + extension;
    callback(null, basename + "-" + Date.now() + extension);
  },
});

// 1. 미들웨어 등록
let upload = multer({
  storage: storage,
});

router.post("/", upload.single("file"), function (req, res, next) {
  console.log("1234", ImgfilePath);
  // 3. 파일 객체
  let file = req.file;
  // let email = req.email;
  // 4. 파일 정보
  let result = {
    success: true,
    result: "이미지 저장 완료",
    path: ImgfilePath,
  };

  res.json(result);
});

//var upload = multer({ storage: storage }).any();

// router.post("/", upload.single("file"), function (req, res, next) {
//   var tmp_path = req.file.path;
//   console.log(tmp_path);
//   var target_path = "uploads/" + req.file.originalname;
//   var src = fs.createReadStream(tmp_path);
//   var dest = fs.createWriteStream(target_path);

//   src.pipe(dest);
//   src.on("end", function () {
//     res.render("complete");
//   });
//   src.on("error", function (err) {
//     res.render("error");
//   });
// });

/// 최근
// router.post("/", (req, res) => {
//   upload(req, res, (err) => {
//     console.log(req.body);
//     if (err) {
//       return res.json({ success: false, err });
//     }
//     return res.json({
//       success: true,
//       filePath: res.req.file.path,
//       filename: res.req.file.filename,
//     });
//   });
// });

// // multer-optional
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
// var upload = multer({ storage: storage });

// // Router
// router.post("/", upload.array("채점"), (req, res) => {
//   try {
//     res.send({
//       //파일 정보 넘김
//       message: "upload success",
//       status: "success",
//       data: {
//         files: req.files,
//       },
//     });
//   } catch (err) {
//     //무언가 문제가 생김
//     res.send({
//       message: "ERROR",
//       status: "fail",
//     });
//   }
// });

module.exports = router;
