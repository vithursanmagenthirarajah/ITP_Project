const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransferSchema = new Schema(
  {
    name: String,
    DateTime: String,
    to: String,
    suggestedTreatment: String,
    DOT: String,
    durationofresidence: String,
    reason: String,
    report: String,
    wardinch: String,
  },
  { timestamps: true }
);

const Transfer = mongoose.model("Transfer", TransferSchema);
module.exports = Transfer;
