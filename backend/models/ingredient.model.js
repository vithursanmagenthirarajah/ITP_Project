const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  ingreId: String,
  ingreName: String,
  quantity: String,
  unit: String,
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);
module.exports = Ingredient;
