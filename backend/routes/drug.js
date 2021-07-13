const router = require("express").Router();
let Drug = require("../models/drug.model");

//get all patients
router.route("/").get((req, res) => {
  Drug.find()
    .then((drug) => res.json(drug))
    .catch((err) => res.status(400).json("Error: " + err));
});

//add a patient - won't add
router.route("/add").post((req, res) => {
  const drugId = req.body.drugId;
  const drugName = req.body.drugName;
  const quantity = req.body.quantity;
  const type = req.body.type;
  const unit = req.body.unit;

  const newDrug = new Drug({
    drugId,
    drugName,
    quantity,
    type,
    unit,
  });

  newDrug
    .save()
    .then(() => res.json("Drug added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update a patient
router.route("/edit/:id").post((req, res) => {
  Drug.findById(req.params.id)
    .then((drug) => {
      drug.drugId = req.body.drugId;
      drug.drugName = req.body.drugName;
      drug.quantity = req.body.quantity;
      drug.type = req.body.type;
      drug.unit = req.body.unit;

      drug
        .save()
        .then(() => res.json("drug updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
//delete a patient
router.route("/:id").delete((req, res) => {
  Drug.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Drug.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
