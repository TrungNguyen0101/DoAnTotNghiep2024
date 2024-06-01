const sequelize = require("../models/index.js");

const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
var jwt = require("jsonwebtoken");
const moment = require("moment");

const config = {
  vnp_TmnCode: "SQPL0LV8",
  vnp_HashSecret: "LPTBSFYQTKLHTOFAKUCHYWKXBPCUZKLF",
  vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_ReturnUrl: "http://localhost:3000/payment-result",
};
var courseManage;
var studentManage;

function getDataPayment(cart, student) {
  courseManage = cart;
  studentManage = student;
}

function pad2(n) {
  // always returns a string
  return (n < 10 ? "0" : "") + n;
}

const dateFormat = (date) => {
  return (
    date.getFullYear() +
    pad2(date.getMonth() + 1) +
    pad2(date.getDate()) +
    pad2(date.getHours()) +
    pad2(date.getMinutes()) +
    pad2(date.getSeconds())
  );
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

const getPaymentUrl = async (req, res) => {
  const body = {
    course_id: req.body.course_id,
    student_id: req.body.student_id,
    tutor_id: req.body.tutor_id,
    // schedule: req.body.tutor_available_date,
  };

  // tạo booked_session
  var course = await models.course.findByPk(body.course_id);
  getDataPayment(course, req.body.student_id);
  if (course) {
    var booked_session = await models.booked_session.create({
      booked_session_id: uuidv4(),
      student_id: body.student_id,
      tutor_id: body.tutor_id,
      course_id: course?.dataValues?.course_id,
      price: course.dataValues.price,
      // checkout_session_id: null,
      data: course,
      status: "PENDING",
    });
  }

  // var tutoring_contract = await models.tutoring_contract.create({
  //   tutoring_contract_id: uuidv4(),
  //   booked_session_id: booked_session.dataValues.booked_session_id,
  //   tutor_id: body.tutor_id,
  // });

  // var schedules = await models.schedule.bulkCreate(
  //   body.schedule.map((x) => {
  //     return {
  //       schedule_id: uuidv4(),
  //       student_id: body.student_id,
  //       tutor_available_date_id: x,
  //       status: "PENDING",
  //     };
  //   })
  // );
  // tạo tutoring contraction

  // tạo link thanh toán
  var tmnCode = config.vnp_TmnCode;
  var secretKey = config.vnp_HashSecret;
  var vnpUrl = config.vnp_Url;
  var returnUrl = config.vnp_ReturnUrl;

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var orderId = booked_session?.dataValues?.booked_session_id;
  var amount = parseInt(course.dataValues.price);
  var bankCode = "";

  var locale = req.body.language;
  locale = "vn";
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  return succesCode(res, vnpUrl);
};

const checkSumPayment = async (req, res) => {
  let vnp_Params = req.query;
  console.log("checkSumPayment ~ vnp_Params:", vnp_Params);

  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];
  vnp_Params = sortObject(vnp_Params);

  var tmnCode = config.vnp_TmnCode;
  var secretKey = config.vnp_HashSecret;

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf8")).digest("hex");
  // let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    const rspCode = vnp_Params["vnp_ResponseCode"];
    if (rspCode === "00") {
      const booked_session_id = vnp_Params["vnp_TxnRef"];
      var booked = await models.booked_session.findByPk(booked_session_id);
      booked.update({
        booked_session_id,
        status: "DONE",
      });
      await booked.save();
      var course_payment = await models.payment_transaction.create({
        payment_transaction_id: vnp_Params["vnp_TxnRef"],
        amount: vnp_Params["vnp_Amount"] / 100,
        student_id: studentManage,
        course_payment: courseManage,
        time: vnp_Params["vnp_PayDate"],
      });
    }
    if (vnp_Params["vnp_ResponseCode"]) {
      return succesCode(res, {
        code: vnp_Params["vnp_ResponseCode"],
        course: { courseManage },
      });
    }
  } else {
    return succesCode(res, {
      code: vnp_Params["vnp_ResponseCode"],
      course: { courseManage },
    });
  }
};

module.exports = { getPaymentUrl, checkSumPayment };
