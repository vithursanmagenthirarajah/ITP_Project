const router = require("express").Router();
let PatientDetails = require("../models/wardPat.model");

router.route("/").get((req, res) => {
  PatientDetails.find()
    .then((pat) => res.json(pat))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const admission = req.body.admission;
  const Name = req.body.Name;
  const disease = req.body.disease;
  const Treatment = req.body.Treatment;
  const ward = req.body.ward;
  const newVisit = new PatientDetails({
    admission,
    Name,
    disease,
    Treatment,
    ward,
  });

  newVisit
    .save()
    .then(() => res.json("Added Successful"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
