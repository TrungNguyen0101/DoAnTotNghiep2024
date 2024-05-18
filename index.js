const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const {
  handleExceptionMiddleware,
  authMiddleware,
} = require("./src/middlewares/middleware.js");
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();

// using exception middleware
app.use((err, req, res, next) => {
  console.log("=================> lỗi rồi !!!");
  res.status(500).send(err);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(express.static("."));

// config api
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/", (req, res, next) => {
  handleExceptionMiddleware(req, res, next);
});

// config routers
app.use("/api/v1", routes);

// start app
app.listen(5000, () => {
  console.log("Server run 5000");
});
