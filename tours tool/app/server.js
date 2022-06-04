const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
require("../app/database/connect");
const userRouter = require("../routes/user.routes");
const adminRouter = require("../routes/admin.routes");
const flightRouter = require("../routes/flight.routes");
const cors = require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/flight", flightRouter);
app.all("*", (req, res) => {
  res.status(404).send({
    AppReq: false,
    data: {},
    message: "invalid url",
  });
});
module.exports = app;
