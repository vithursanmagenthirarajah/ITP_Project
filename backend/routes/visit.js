const router = require("express").Router();
let Visit = require("../models/visit.model");

router.route("/").get((req, res) => {
  Visit.find()
    .then((visit) => res.json(visit))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const reading = req.body.reading;
  const treatment = req.body.treatment;
  const datetime = req.body.datetime;
  const dietplan = req.body.dietplan;
  const admission = req.body.admission;
  const warddoctor = req.body.warddoctor;

  const newDischarge = new Visit({
    name,
    reading,
    treatment,
    datetime,
    dietplan,
    admission,
    warddoctor,
  });

  newDischarge
    .save()
    .then(() => res.json("Visit Completed"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Visit.findByIdAndDelete(req.params.id)
    .then(() => res.json("Visit deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
