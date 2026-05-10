const express = require("express");
const app = express();

// multiple route handlers
app.get(
  "/user",
  [
    (req, res, next) => {
      console.log("first callback");
      next();
      //res.send({ firstname: "gowtham", lastname: "kumar" });
    },
    (req, res, next) => {
      console.log("second callback");
      next();
    },
  ],
  (req, res) => {
    console.log("third callback");
    res.send({ firstname: "gowtham3", lastname: "kumar3" });
  },
);

// another route handler technique
app.get("/user2", (req, res, next) => {
  console.log("user id is ");
  next();
});

app.get("/user2", (req, res) => {
  console.log("user2 route handler");
  res.send({ firstname: "gowtham2", lastname: "kumar2" });
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
