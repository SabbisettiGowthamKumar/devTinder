const express = require("express");
const cookieParser = require("cookie-parser");
const dns = require("dns");
const cors = require("cors");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const { connectDB } = require("./config/database");

const app = express();

app.use(cors());
// Middleware to parse JSON bodies and cookies (must come before routes)
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("connected to database");
    //await User.syncIndexes();
    app.listen(process.env.PORT, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });
