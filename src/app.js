const express = require("express");
const app = express();

app.get("/getUserData", (req, res) => {
  throw new Error("Something wuhfuhhasddnent wrong!");
  res.send("User data");
});

// common Error handling, always use 4 parameters to use it as an error handler
app.use("/", (err, req, res, next) => {
  console.log(err);
  if (err) res.status(500).send("Bro Something went wrong...!");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
