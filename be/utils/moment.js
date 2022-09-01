require("moment-timezone");

const moment = require("moment");

// Time Zone 기본값을 서울로 설정
moment.tz.setDefault("Asia/Seoul");

// 언어를 한국어로 설정
moment.locale("ko");

exports.moment = moment;
