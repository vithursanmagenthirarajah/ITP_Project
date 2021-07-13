const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IssueTreatmentSchema = new Schema({
  treatid: String,
  treatname: String,
  quantity: String,
  date: String,
  issueto: String,
  type: String,
});

const IssueTreatment = mongoose.model("IssueTreatment", IssueTreatmentSchema);
module.exports = IssueTreatment;
