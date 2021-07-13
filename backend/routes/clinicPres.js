const router = require("express").Router();
let clinicPres = require("../models/clinicpres");

router.route("/").get((req, res) => {
  clinicPres
    .find()
    .then((transfer) => res.json(transfer))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const drugName = req.body.drugName;
  const quantity = req.body.quantity;
  const unit = req.body.unit;

  const newPres = new clinicPres({
    name,
    drugName,
    quantity,
    unit,
  });

  newPres
    .save()
    .then(() => res.json("Sent successfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  clinicPres
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("clinicPres deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
