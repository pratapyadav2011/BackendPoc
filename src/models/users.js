const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema(
  {
    // your data fields here
    name: { type: String },
    homePin: { type: String },
    officePin: { type: String },
    companyName: { type: String },//filter value
    occupation: { type: String },
    location: { type: String },
    dateOfBirth:{type: String},
    wishList:[{ type: Schema.ObjectId, ref: "Domain" }]
  },
  { strict: false },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
