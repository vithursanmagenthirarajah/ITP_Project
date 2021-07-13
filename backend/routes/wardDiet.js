const router = require("express").Router();
let DietDetails = require("../models/wardDiet.mode.");

router.route("/").get((req, res) => {
  DietDetails.find()
    .then((pat) => res.json(pat))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const DateTime = req.body.DateTime;
  const issuedDiet = req.body.issuedDiet;
  const admission = req.body.admission;
  const waID = req.body.waID;
  const newDiet = new DietDetails({
    DateTime,
    issuedDiet,
    admission,
    waID,
  });

  newDiet
    .save()
    .then(() => res.json("Added Successful"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  DietDetails.findByIdAndDelete(req.params.id)
    .then(() => res.json("Diet deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  DietDetails.findById(req.params.id)
    .then((issueDiet) => {
      issueDiet.DateTime = req.body.DateTime;
      issueDiet.issuedDiet = req.body.issuedDiet;
      issueDiet.admission = req.body.admission;
      issueDiet.waID = req.body.waID;

      issueDiet
        .save()
        .then(() => res.json("DietList updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  DietDetails.findById(req.params.id)
    .then((issueDiet) => res.json(issueDiet))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
