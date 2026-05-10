const express = require("express");
const app = express();

let { adminAuth, userAuth } = require("./middlewares/auth");
app.use("/admin", adminAuth);

app.get("/admin/dashboard", (req, res) => {
  res.send("Welcome to the admin dashboard!");
});

app.get("/user/login", (req, res) => {
  res.send("user succesfully logged in!");
});

app.get("/user/profile", userAuth, (req, res) => {
  res.send("Welcome to your profile!");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
