const mongose = require("mongoose");

const connectDB = async () => {
  await mongose.connect(
    "mongodb+srv://sabbisettigowthamkumar_db_user:newlife@namastenode.9sc7xna.mongodb.net/devTinder",
  );
};
module.exports = { connectDB };
