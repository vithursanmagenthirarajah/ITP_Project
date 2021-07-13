const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DrugAddSchema = new Schema(
  {
    drugName: String,
    type: String,
    availableQuantity: String,
    unit: {
      type: String,
      enum: ["mg", "g", "ml"],
    },
  },
  { timestamps: true }
);

const DrugAdd = mongoose.model("DrugAdd", DrugAddSchema);
module.exports = DrugAdd;
