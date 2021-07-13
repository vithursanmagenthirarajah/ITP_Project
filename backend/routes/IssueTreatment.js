const router = require("express").Router();
let IssueTreatment = require("../models/IssueTreatment.model");

//get all patients
router.route("/").get((req, res) => {
  IssueTreatment.find()
    .then((IssueTreatment) => res.json(IssueTreatment))
    .catch((err) => res.status(400).json("Error: " + err));
});

//add a patient - won't add
router.route("/add").post((req, res) => {
  const treatid = req.body.treatid;
  const treatname = req.body.treatname;
  const quantity = req.body.quantity;
  const date = req.body.date;
  const issueto = req.body.issueto;
  const type = req.body.type;

  const newIssueTreatment = new IssueTreatment({
    treatid,
    treatname,
    quantity,
    date,
    issueto,
    type,
  });

  newIssueTreatment
    .save()
    .then(() => res.json("Treatment Issued!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update a issued treatment item
router.route("/update/:id").post((req, res) => {
  IssueTreatment.findById(req.params.id)
    .then((IssueTreatment) => {
      IssueTreatment.treatid = req.body.treatid;
      IssueTreatment.treatname = req.body.treatname;
      IssueTreatment.quantity = req.body.quantity;
      IssueTreatment.date = req.body.date;
      IssueTreatment.issueto = req.body.issueto;
      IssueTreatment.type = req.body.type;

      IssueTreatment.save()
        .then(() => res.json("issued treatment item updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
//delete a issued treatment item
router.route("/:id").delete((req, res) => {
  IssueTreatment.findByIdAndDelete(req.params.id)
    .then(() => res.json("issued treatment deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  IssueTreatment.findById(req.params.id)
    .then((IssueTreatment) => res.json(IssueTreatment))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
