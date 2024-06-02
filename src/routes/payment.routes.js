const express = require("express");
const {
  getPaymentUrl,
  checkSumPayment,
  findAllPayment,
} = require("../controllers/payment.controller");
const paymentRoutes = express.Router();

paymentRoutes.get("/", findAllPayment);
paymentRoutes.post("/get-payment-url", getPaymentUrl);
paymentRoutes.get("/checksum-payment", checkSumPayment);

module.exports = paymentRoutes;
