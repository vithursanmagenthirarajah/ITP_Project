const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VisitSchema = new Schema(
  {
    name: String,
    reading: String,
    treatment: String,
    datetime: String,
    dietplan: String,
    admission: String,
    warddoctor: String,
  },
  { timestamps: true }
);

const Visit = mongoose.model("Visit", VisitSchema);
module.exports = Visit;
