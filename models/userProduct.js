const mongoose = require("mongoose");
// const plm = require("passport-local-mongoose"); //plm = passport local mongoose

// isme admin ki details hai 

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    company: String,
    price: String,
    photo: String,
  },

  { timestamps: true }
);

// userrSchema.plugin(plm);

const user = mongoose.model("user", userSchema);

module.exports = user;
