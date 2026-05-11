const mongoose = require("mongoose");
const validate = require("validator");

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
      age: {
        type: Number,
        min: 18,
        max: 100,
      },
      gender: {
        type: String,
        validate(value) {
          if (["male", "female", "other"].indexOf(value) === -1) {
            throw new Error("Invalid gender value");
          }
        },
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
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
