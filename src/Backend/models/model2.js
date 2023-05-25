const mongoose = require("mongoose");
const polygonModel = mongoose.Schema(
  {
    Name: { type: String },
    Email: { type: String, unique: true, required: true },
    Polygon_id: { type: String },
    lat1: { type: Number },
    lat2: { type: Number },
    lat3: { type: Number },
    lat4: { type: Number },
    lon1: { type: Number },
    lon2: { type: Number },
    lon3: { type: Number },
    lon4: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("polygon", polygonModel);
