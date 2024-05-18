const express = require("express");
const {
    AddRate
} = require("../controllers/rate.controller");

const rateRoutes = express.Router();

rateRoutes.post('/create', AddRate);



module.exports = rateRoutes;