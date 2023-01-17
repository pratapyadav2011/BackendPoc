const mongoose = require("mongoose");
const { Schema } = mongoose;

const Domain = new Schema(
  {
    // your data fields here
    name: { type: String },
    isParent: {type: Boolean,default:false},
    parentId: {type: Schema.ObjectId, ref: "Domain" },
    UserList: [{ type: Schema.ObjectId, ref: "User" }],
  },
  { strict: false },
  { timestamps: true }
);

module.exports = mongoose.model("Domain", Domain);




