const jwt = require("jsonwebtoken");
const User = require("../models/user");
let userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("token not valid");
    }
    const decodedObj = await jwt.verify(token, "Dev@Tinder$800");
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    req.user = user;
    if (!user) {
      throw new Error("User not found");
    }
    next();
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
};

module.exports = { userAuth };
