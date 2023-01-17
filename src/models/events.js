const mongoose = require("mongoose");
const { Schema } = mongoose;

const Event = new Schema(
  {
    // your data fields here
    EventName: { type: String },
    EventDescription: { type: String },
    Location: { type: String },
    Pin: { type: String },
    FeatureId: { type: Schema.ObjectId, ref: "Feature" },
  },
  { strict: false },
  { timestamps: true }
);

module.exports = mongoose.model("Event", Event);

// start date -> timestamp
// end date -> timestamp
// connected feature
