const router = require("express").Router();
let clinic = require("../models/cliniclist.model");

router.route("/").get((req, res) => {
  clinic
    .find()
    .then((issue) => res.json(issue))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  const disease = req.body.disease;

  const admission = req.body.admission;

  const newIssue = new clinic({
    admission,
    name,
    age,
    disease,
  });

  newIssue
    .save()
    .then(() => res.json("ckndendk Successful"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  clinic
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Clinic Patient deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
