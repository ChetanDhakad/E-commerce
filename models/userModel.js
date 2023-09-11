const mongoose = require("mongoose");
const plm = require("passport-local-mongoose"); //plm = passport local mongoose

//isme user ki details hai

const userrSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    contact: String,
    email: String,
  },

  { timestamps: true }
);

userrSchema.plugin(plm);

const detail = mongoose.model("detail", userrSchema);

module.exports = detail;
