const express = require("express");
const dns = require("dns");
const User = require("./models/user");
const { connectDB } = require("./config/database");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "John",
    lastName: "Doe",
    emailId: "john@gmail.com",
    password: "password1234",
  });
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    console.error("Error creating user", err);
    res.status(500).send("Internal Server Error");
  }
});

connectDB()
  .then(() => {
    console.log("connected to database");
    app.listen(7777, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });
