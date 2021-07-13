const router = require("express").Router();
let Dgissue = require("../models/issuedrug.model");

router.route("/").get((req, res) => {
  Dgissue.find()
    .then((issue) => res.json(issue))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const DateTime = req.body.DateTime;
  const type = req.body.type;
  const admission = req.body.admission;
  const nustaff = req.body.nustaff;

  const newIssue = new Dgissue({
    name,
    DateTime,
    type,
    admission,
    nustaff,
  });

  newIssue
    .save()
    .then(() => res.json("Issued Successful"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Dgissue.findByIdAndDelete(req.params.id)
    .then(() => res.json("Drug Issue deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
