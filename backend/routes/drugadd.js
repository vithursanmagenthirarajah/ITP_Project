const router = require("express").Router();
let DrugAdd = require("../models/drugadd.model");

router.route("/").get((req, res) => {
  DrugAdd.find()
    .then((druglist) => res.json(druglist))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const drugName = req.body.drugName;
  const type = req.body.type;
  const availableQuantity = req.body.availableQuantity;
  const unit = req.body.unit;

  const newDrugadd = new DrugAdd({
    drugName,
    type,
    availableQuantity,
    unit,
  });

  newDrugadd
    .save()
    .then(() => res.json("Drug Added successfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  DrugAdd.findByIdAndDelete(req.params.id)
    .then(() => res.json("Drug deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  DrugAdd.findById(req.params.id)
    .then((drugDetails) => {
      drugDetails.drugName = req.body.drugName;
      drugDetails.type = req.body.type;
      drugDetails.availableQuantity = req.body.availableQuantity;
      drugDetails.unit = req.body.unit;

      drugDetails
        .save()
        .then(() => res.json("DrugList updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  DrugAdd.findById(req.params.id)
    .then((drugDetails) => res.json(drugDetails))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
