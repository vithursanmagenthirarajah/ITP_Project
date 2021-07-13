const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IssueDrugSchema = new Schema(
  {
    DateTime: String,
    name: String,
    type: String,
    admission: String,
    nustaff: String,
  },
  { timestamps: true }
);

const Dgissue = mongoose.model("IssueDrug", IssueDrugSchema);
module.exports = Dgissue;
