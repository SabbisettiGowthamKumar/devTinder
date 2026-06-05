const mongoose = require("mongoose");
const validate = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validate.isEmail(value)) {
          throw new Error("Invalid email format" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validate.isStrongPassword(value)) {
          throw new Error("ENter a Strong password:" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not valid gender type`,
      },
      // validate(value) {
      //   if (["male", "female", "other"].indexOf(value) === -1) {
      //     throw new Error("Invalid gender value");
      //   }
      // },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "This is default about section",
      minLength: 10,
      maxLength: 500,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

// userSchema.index({ firstName: 1 });
// userSchema.index({ gender: 1 });

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );
  console.log(isPasswordValid);
  return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema);
