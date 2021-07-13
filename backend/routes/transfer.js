const router = require("express").Router();
let Transfer = require("../models/transfer.model");

router.route("/").get((req, res) => {
  Transfer.find()
    .then((transfer) => res.json(transfer))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const DateTime = req.body.DateTime;
  const to = req.body.to;
  const suggestedTreatment = req.body.suggestedTreatment;
  const DOT = req.body.DOT;
  const durationofresidence = req.body.durationofresidence;
  const reason = req.body.reason;
  const report = req.body.report;
  const wardinch = req.body.wardinch;

  const newTransfer = new Transfer({
    name,
    DateTime,
    to,
    suggestedTreatment,
    DOT,
    durationofresidence,
    reason,
    report,
    wardinch,
  });

  newTransfer
    .save()
    .then(() => res.json("Transfered successfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Transfer.findByIdAndDelete(req.params.id)
    .then(() => res.json("Diet deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
