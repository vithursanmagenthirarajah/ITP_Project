const router = require("express").Router();
let Ingredient = require("../models/ingredient.model");

//get all patients
router.route("/").get((req, res) => {
  Ingredient.find()
    .then((Ingredient) => res.json(Ingredient))
    .catch((err) => res.status(400).json("Error: " + err));
});

//add a patient - won't add
router.route("/add").post((req, res) => {
  const ingreId = req.body.ingreId;
  const ingreName = req.body.ingreName;
  const quantity = req.body.quantity;
  const unit = req.body.unit;

  const newIngredient = new Ingredient({
    ingreId,
    ingreName,
    quantity,
    unit,
  });

  newIngredient
    .save()
    .then(() => res.json("Ingredient added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update a patient
router.route("/updateing/:id").post((req, res) => {
  Ingredient.findById(req.params.id)
    .then((drug) => {
      ingredient.ingreId = req.body.ingreId;
      ingredient.ingreName = req.body.ingreName;
      ingredient.quantity = req.body.quantity;
      ingredient.unit = req.body.unit;

      drug
        .save()
        .then(() => res.json(" updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete a patient
router.route("/:id").delete((req, res) => {
  Ingredient.findByIdAndDelete(req.params.id)
    .then(() => res.json("ingredient deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  router.route("/:id").get((req, res) => {
    Drug.findById(req.params.id)
      .then((exercise) => res.json(exercise))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  Ingredient.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
