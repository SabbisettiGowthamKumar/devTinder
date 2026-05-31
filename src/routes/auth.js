const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const { userAuth } = require("../middlewares/auth");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    console.log(password, user.password);

    const isPasswordValid = user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    } else {
      // generate a JWT token with user ID as payload and a secret key
      const token = await user.getJWT();

      // add the token to cookie and send the response back to the client
      res.cookie("token", token);
      res.send("Login successful", token);
    }
  } catch (err) {
    res.status(404).send("ERROR:" + err.message);
  }
});

module.exports = authRouter;
