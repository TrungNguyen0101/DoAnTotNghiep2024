const express = require("express");
const {
  getPaymentUrl,
  checkSumPayment,
} = require("../controllers/payment.controller");
const paymentRoutes = express.Router();

paymentRoutes.post("/get-payment-url", getPaymentUrl);
paymentRoutes.get("/checksum-payment", checkSumPayment);

module.exports = paymentRoutes;
