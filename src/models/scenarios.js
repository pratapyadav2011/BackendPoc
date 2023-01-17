const mongoose = require("mongoose");
const {Schema} = mongoose;

const Scenario = new Schema(
    {
        /*targetAudience: {
            factorsToFilter: {type: String}, // target to audience
            filterValue: [{type: String}],// target to audience
        },*/
        scenarioDescription: {type: String},
        domainId: {type: Schema.ObjectId, ref: "Domain"},
        subDomainId: {type: Schema.ObjectId, ref: "Domain"},
        parameterJson: {type: Schema.Types.Mixed}
    },
    {strict: false},
    {timestamps: true}
);

module.exports = mongoose.model("Scenario", Scenario);
