let validator = require("validator");

const validateSignUpData = (data) => {
  const { firstName, lastName, emailId } = data;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email format");
  }
};

module.exports = { validateSignUpData };
