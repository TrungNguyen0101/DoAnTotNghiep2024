const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const {
  handleExceptionMiddleware,
  authMiddleware,
} = require("./src/middlewares/middleware.js");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
var app = express();
const port = process.env.PORT || 4000;
const http = require("http");
const initModels = require("./src/models/init-models.js");
const sequelize = require("./src/models/index.js");
const models = initModels(sequelize);

const server = http.createServer(app);
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const clients = {};

socketIo.on("connection", (socket) => {
  let userId;

  socket.on("authenticate", (_userId) => {
    userId = _userId;
  });

  socket.on("send-message", async (data) => {
    const { receiverId, message } = data;

    const messageId = uuidv4();
    if (userId && receiverId) {
      await models.message.create({
        message_id: messageId,
        sender_id: userId,
        receiver_id: receiverId,
        message,
        timestamp: new Date(),
        isRead: false,
      });
    }

    socketIo.emit("receive-message", {
      senderId: userId,
      message,
      message_id: messageId,
      isRead: false,
    });

    socket.on("mark-message-read", async (message_id) => {
      console.log("socket.on ~ message_id:", message_id);
      await models.message.update(
        { isRead: true },
        { where: { message_id: message_id?.message_id } }
      );
    });
  });
});

// using exception middleware
app.use((err, req, res, next) => {
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
server.listen(port, () => {
  console.log("Server run ", port);
});
