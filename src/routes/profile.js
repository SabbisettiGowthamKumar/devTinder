const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");
const {
  validateEditProfileData,
  validateEditProfilePassword,
} = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  // userAuth middleware will run and gets the user details
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    console.error("Error fetching user profile", err);
    res.status(404).send("Something went wrong");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req.body))
      throw new Error("Invalid edit request");

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.json({ message: "Profile updated successfully", data: loggedInUser });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!validateEditProfilePassword(req.body))
      throw new Error("Enter a strong password");

    let passwordHash = await bcrypt.hash(req.body.password, 10);

    const loggedInUser = req.user;
    loggedInUser.password = passwordHash;

    await loggedInUser.save();
    res.json({ message: "password updated successfully" });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
