const mongoose = require("mongoose");

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
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one lowercase, one uppercase, one number, and one special character (@$!%*?&). Minimum 8 characters.",
      ],
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
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
