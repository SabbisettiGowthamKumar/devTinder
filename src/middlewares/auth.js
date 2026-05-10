let adminAuth = (req, res, next) => {
  let auth = true; // This is just a placeholder. In a real application, you would check the user's authentication status.

  if (auth) {
    next(); // If the user is authenticated, proceed to the next middleware or route handler.
  } else {
    res.status(401).send("Unauthorized");
  }
};

let userAuth = (req, res, next) => {
  let auth = true;

  if (auth) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { adminAuth, userAuth };
