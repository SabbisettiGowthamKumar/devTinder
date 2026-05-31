const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  // userAuth middleware will run and gets the user details
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    console.error("Error fetching user profile", err);
    res.status(404).send("Something went wrong");
  }
});

module.exports = profileRouter;
