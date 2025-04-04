const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => console.log(error?.message || "Failed DB connection."));
