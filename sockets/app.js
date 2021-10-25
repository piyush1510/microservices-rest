require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const controller = require("./controller");
const cookieParser = require("cookie-parser");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME,
});

const app = express();
const server = require("http").createServer(app);
app
  .use(express.json())
  .use(cookieParser())
  .post("/login", controller.login)
  .post("/register", controller.register)
  .get("/auth", controller.auth)
  .use(controller.error404)
  .use(controller.error500);

server.listen(process.env.port, () => {
  console.log(`Server started on ${process.env.port}`);
});
const io = require("socket.io")(server);
const ioHandler = require('./io');
ioHandler(io)


