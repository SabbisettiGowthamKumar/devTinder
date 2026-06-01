let validator = require("validator");

const validateSignUpData = (data) => {
  const { firstName, lastName, emailId } = data;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email format");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req).every((field) =>
    allowedEditFields.includes(field),
  );

  return isEditAllowed;
};

const validateEditProfilePassword = (req) => {
  const isPasswordEditAllowed = validator.isStrongPassword(req.password);
  return isPasswordEditAllowed;
};
module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateEditProfilePassword,
};
