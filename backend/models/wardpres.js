const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WardPresSchema = new Schema(
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

const Pres = mongoose.model("WardPres", WardPresSchema);
module.exports = Pres;
