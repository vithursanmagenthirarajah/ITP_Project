const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wardPat = new Schema(
  {
    admission: String,
    Name: String,
    ward: String,
    disease: String,
    Treatment: String,
  },
  { timestamps: true }
);

const wp = mongoose.model("WardPatient", wardPat);
module.exports = wp;
