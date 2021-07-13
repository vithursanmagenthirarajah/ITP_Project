const router = require("express").Router();
let Pres = require("../models/wardpres");

router.route("/").get((req, res) => {
  Pres.find()
    .then((transfer) => res.json(transfer))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const drugName = req.body.drugName;
  const quantity = req.body.quantity;
  const unit = req.body.unit;

  const newPres = new Pres({
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
  Pres.findByIdAndDelete(req.params.id)
    .then(() => res.json("Pres deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
