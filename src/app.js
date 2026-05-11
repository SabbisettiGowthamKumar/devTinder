const express = require("express");
const dns = require("dns");
const User = require("./models/user");
const { connectDB } = require("./config/database");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    console.error("Error creating user", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getUser", async (req, res) => {
  try {
    const users = await User.find({ emailId: req.body.emailId });
    res.send(users);
  } catch (err) {
    console.error("Error fetching users", err);
    res.status(404).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    console.error("Error fetching users", err);
    res.status(404).send("Something went wrong");
  }
});

app.delete("/deleteUser", async (req, res) => {
  try {
    const userID = req.body.userID;
    await User.findByIdAndDelete(userID);
    res.send("User deleted successfully");
  } catch (err) {
    console.error("Error deleting user", err);
    res.status(404).send("Something went wrong");
  }
});

app.patch("/updateUser", async (req, res) => {
  try {
    const userID = req.body.userID;
    await User.findByIdAndUpdate(userID, req.body);
    res.send("User updated successfully");
  } catch (err) {
    console.error("Error deleting user", err);
    res.status(404).send("Something went wrong");
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
