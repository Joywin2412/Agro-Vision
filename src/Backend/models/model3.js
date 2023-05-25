const mongoose = require("mongoose");
const userCropModel= mongoose.Schema(
  {
    Name: { type: String },
    Email: { type: String, unique: true },
    Crops:[{type:String}]
  },
  { timestamps: true }
);
const UserCrop = mongoose.model("userCrop",  userCropModel);
module.exports = mongoose.model("userCrop", userCropModel);
