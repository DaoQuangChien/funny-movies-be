const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      email: String,
      password: String,
    },
    { timestamps: true }
  )
);

module.exports = User;
