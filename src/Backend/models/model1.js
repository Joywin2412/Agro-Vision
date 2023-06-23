const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = mongoose.Schema(
  {
    Name: { type: String },
    Email: { type: String, unique: true },
    Password: { type: String },
    Phone: { type: String },
    Lat: { type: String },
    Lon: { type: String },
    Address: { type: String },
    // Location: { type: String, required: true },
  },
  { timestamps: true }
);
userModel.methods.matchPassword = async function (enteredPassword) {
  console.log(enteredPassword);
  return await bcrypt.compare(enteredPassword, this.Password);
};
userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  console.log(this.Password);
});
const User = mongoose.model("user", userModel);
module.exports = mongoose.model("user", userModel);
// First parameter is naming the model and that could be table name
// Username
// Email
// Password
// Phone
// Location
