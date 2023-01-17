const mongoose = require("mongoose");
const { Schema } = mongoose;

const Feature = new Schema(
  {
    // your data fields here
    Feature: { type: String },
    DomainId: { type: Schema.ObjectId, ref: "Domain" },
    UserIds: [{ type: Schema.ObjectId, ref: "User" }],
  },
  { strict: false },
  { timestamps: true }
);

module.exports = mongoose.model("Feature", Feature);
