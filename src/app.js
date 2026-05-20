const express = require("express");
const dns = require("dns");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const { connectDB } = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    let { firstName, lastName, emailId, password } = req.body;
    validateSignUpData(req.body);

    let passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    console.error("Error creating user", err);
    res.status(500).send("Internal Server Error" + err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    console.log(password, user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    } else {
      // generate a JWT token with user ID as payload and a secret key
      const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$800");
      console.log(token);

      // add the token to cookie and send the response back to the client
      res.cookie("token", token);
      res.send("Login successful");
    }
  } catch (err) {
    res.status(404).send("ERROR:" + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("No token found");
    }

    const decidedMessage = await jwt.verify(token, "Dev@Tinder$800");
    const { _id } = decidedMessage;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    console.log("User ID from token:", _id);
    res.send(user);
  } catch (err) {
    console.error("Error fetching user profile", err);
    res.status(404).send("Something went wrong");
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

app.patch("/updateUser/:userID", async (req, res) => {
  const userID = req.params.userID;
  try {
    const ALLOWED_UPDATES = ["photoURL", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(req.body).every((update) =>
      ALLOWED_UPDATES.includes(update),
    );

    if (!isUpdateAllowed) {
      return res.status(400).send("Invalid updates");
    }

    if (req.body.skills.length > 10) {
      throw new Error("Skills should be less than 10");
    }

    await User.findByIdAndUpdate(userID, req.body, { runValidators: true });
    res.send("User updated successfully");
  } catch (err) {
    console.error("Error deleting user", err);
    res.status(404).send("Something went wrong" + err);
  }
});

connectDB()
  .then(() => {
    console.log("connected to database");
    //await User.syncIndexes();
    app.listen(7777, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });
