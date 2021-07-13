const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClinicPresSchema = new Schema(
  {
    name: String,
    drugName: String,
    quantity: String,
    unit: {
      type: String,
      enum: ["mg", "g", "ml"],
    },
  },
  { timestamps: true }
);

const clinicPres = mongoose.model("ClinicPres", ClinicPresSchema);
module.exports = clinicPres;
