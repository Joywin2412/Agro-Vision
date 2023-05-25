const mongoose = require("mongoose");
const friendModel = mongoose.Schema(
  {
    Email1: { type: String },
    Email2: { type: String },
    Status: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("friend", friendModel);
