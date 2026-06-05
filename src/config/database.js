const mongose = require("mongoose");

const connectDB = async () => {
  await mongose.connect(process.env.DB_CONNECTION_SECRET);
};
module.exports = { connectDB };
