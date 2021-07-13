const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const drugSchema = new Schema({
  drugId: {
    type: String,
    required: [true, "drug id is required"],
    unique: true,
    trim: true,
    uppercase: true,
  },

  drugName: String,
  quantity: String,
  type: String,
  unit: {
    type: String,
    enum: ["ml", "L", "Kg", "g", "mg", "none"],
    default: "g",
  },
});

const Drug = mongoose.model("Drug", drugSchema);
module.exports = Drug;
