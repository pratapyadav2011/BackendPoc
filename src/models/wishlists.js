const mongoose = require("mongoose");
const { Schema } = mongoose;

const Wishlist = new Schema(
  {
    // your data fields here
    UserId: { type: Schema.ObjectId, ref: "User" },
    FeatureId: { type: Schema.ObjectId, ref: "Feature" },
  },
  { strict: false },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", Wishlist);
