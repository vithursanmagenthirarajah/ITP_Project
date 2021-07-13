const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DietSchema = new Schema(
  {
    DateTime: String,
    issuedDiet: String,
    admission: String,
    //admission: { type: Schema.Types.ObjectId, ref: "WardPatient" },
    waID: String,
  },
  { timestamps: true }
);

const DietDetails = mongoose.model("WardDiet", DietSchema);
module.exports = DietDetails;
