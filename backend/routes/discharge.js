const router = require("express").Router();
let Discharge = require("../models/discharge.model");

router.route("/").get((req, res) => {
  Discharge.find()
    .then((discharge) => res.json(discharge))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const DateTime = req.body.DateTime;
  const Diagnosis = req.body.Diagnosis;
  const afterTreatment = req.body.afterTreatment;
  const DOD = req.body.DOD;
  const durationofresidence = req.body.durationofresidence;
  const cured = req.body.cured;
  const remarks = req.body.remarks;
  const chargename = req.body.chargename;

  const newDischarge = new Discharge({
    name,
    DateTime,
    Diagnosis,
    afterTreatment,
    DOD,
    durationofresidence,
    cured,
    remarks,
    chargename,
  });

  newDischarge
    .save()
    .then(() => res.json("Discharged successfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Discharge.findByIdAndDelete(req.params.id)
    .then(() => res.json("Discharge deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
