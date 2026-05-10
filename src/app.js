const express = require("express");
const app = express();

// get will match only the get http request method
app.get("/user", (req, res) => {
  res.send({ firstname: "gowtham", lastname: "kumar" });
});

// post will match only the post http request method
app.post("/user", (req, res) => {
  console.log("data received from client");
  res.send("post request received");
});

// put will match only the put http request method
app.delete("/user", (req, res) => {
  console.log("delete request received");
  res.send("delete request received");
});

// use will match all the http request methods (get, post, put, delete)
app.use("/test", (req, res) => {
  res.send("hello from server");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
