const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cliniclist = new Schema(
  {
    admission: String,
    name: String,
    age: String,
    disease: String,
  },
  { timestamps: true }
);

const clinic = mongoose.model("ClinicList", cliniclist);
module.exports = clinic;
