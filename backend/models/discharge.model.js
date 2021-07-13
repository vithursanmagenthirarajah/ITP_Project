const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DischargeSchema = new Schema(
  {
    name: String,
    DateTime: String,
    Diagnosis: String,
    afterTreatment: String,
    DOD: String,
    durationofresidence: String,
    cured: {
      type: String,
      enum: ["cured", "not cured"],
    },
    remarks: String,
    chargename: String,
  },
  { timestamps: true }
);

const Discharge = mongoose.model("Discharge", DischargeSchema);
module.exports = Discharge;
