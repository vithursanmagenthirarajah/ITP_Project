const router = require("express").Router();
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const auth = require("../middleware/auth");
let Patient = require("../models/patient.model");
let Consultation = require("../models/consultation.model");
let Drug = require("../models/opdDrug.model");

/*Operation
****dashboard - get all waiting patients
- redirect to dashboard page
****search waiting patients - get all patients with opd_prescribed stage
- redirect to waiting patients search results page
****issue drug - get all drugs prescribed from consultation
- redirect to issue drug page
- (after confirming) - update prescribed drug info
- using that info add drug actions and update drug balance
****view opd drug list - get all drugs
- redirect to view all drugs page
****search opd drug - find drugs with matching name
- redirect to search results page
****view drug info - get drug with id
- redirect to view info page
****add drug - add a drug with created action
- redirect add drug page
****delete drug - delete drug with id
- redirect to show all drugs or dashboard
****make a drug action - add a action to drug
- update quantity
- redirect to view drug info page
*/

//get all patients
router.route("/all_patients").get(auth, (req, res) => {
  if (req.userData.unit !== "OPD" || req.userData.post !== "Dispenser") {
    throw new HttpError("You are not authorized", 401);
  }
  Patient.find()
    .sort({ name: 1 })
    .limit(20)
    .then((patients) => res.json(patients))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get waiting consultations
router.route("/waiting_consultations").get(auth, (req, res) => {
  if (req.userData.unit !== "OPD" || req.userData.post !== "Dispenser") {
    throw new HttpError("You are not authorized", 401);
  }
  Consultation.find({ stage: "opd_prescribed" })
    .then((consultations) => res.json(consultations))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get a waiting patient
router.route("/waiting_patients/:id").get((req, res) => {
  // if (req.userData.unit !== "OPD" || req.userData.post !== "Dispenser") {
  //   throw new HttpError("You are not authorized", 401);
  // }
  Patient.findById(req.params.id)
    .then((patient) => res.json(patient))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Add a complete drug issue
router.route("/issueComplete/:conId/:pid/:did").post(auth, (req, res) => {
  if (req.userData.unit !== "OPD" || req.userData.post !== "Dispenser") {
    throw new HttpError("You are not authorized", 401);
  }
  Consultation.findById(req.params.conId)
    .then((consultation) => {
      const drugArr = req.body;
      consultation.drugs = [];
      drugArr.forEach((drug) => {
        consultation.drugs.push({
          drugId: drug.drugId,
          drugName: drug.drugName,
          quantity: drug.quantity,
          unit: drug.unit,
          state: drug.state,
        });
      });

      consultation.stage = "opd_drug_issued";
      consultation.dispenser = req.params.did;

      consultation
        .save()
        .then(() => {
          Patient.findByIdAndUpdate(req.params.pid, {
            stage: "treated",
          }).then(() => {
            drugArr.forEach((drug) => {
              if (drug.state === "issued") {
                Drug.findById(drug.drugId)
                  .then((opdDrug) => {
                    const availQuantity = opdDrug.availQuantity - drug.quantity;
                    opdDrug.availQuantity = availQuantity;
                    const date = new Date().getDate();
                    const month = parseInt(new Date().getUTCMonth()) + 1;
                    const year = new Date().getUTCFullYear();
                    const newDrugAction = {
                      actionType: "issue",
                      amount: drug.quantity,
                      balance: availQuantity,
                      unit: drug.unit,
                      dispenser: req.params.did,
                      date: date,
                      month: month,
                      year: year,
                    };
                    opdDrug.drugActions.push(newDrugAction);
                    opdDrug
                      .save()
                      .catch((err) => res.status(400).json("Error: " + err));
                  })
                  .catch((err) => res.status(400).json("Error: " + err));
              }
            });
            res.json("success");
          });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//Add a Incomplete drug issue
router.route("/issueIncomplete/:conId/:did").post(auth, (req, res) => {
  if (req.userData.unit !== "OPD" || req.userData.post !== "Dispenser") {
    throw new HttpError("You are not authorized", 401);
  }
  Consultation.findById(req.params.conId)
    .then((consultation) => {
      const drugArr = req.body;
      consultation.drugs = [];
      drugArr.forEach((drug) => {
        consultation.drugs.push({
          drugId: drug.drugId,
          drugName: drug.drugName,
          quantity: drug.quantity,
          unit: drug.unit,
          state: drug.state,
        });
      });

      consultation.stage = "opd_prescribed";
      consultation.dispenser = req.params.did;

      consultation
        .save()
        .then(() => {
          res.json("success");
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//get all drugs
router.route("/all_drugs").get(auth, (req, res) => {
  if (req.userData.unit !== "OPD" || req.userData.post !== "Dispenser") {
    throw new HttpError("You are not authorized", 401);
  }
  Drug.find()
    .sort({ drugName: 1 })
    .then((drugs) => res.json(drugs))
    .catch((err) => res.status(400).json("Error: " + err));
});

//add a drug
router.route("/add").post(auth, (req, res) => {
  if (req.userData.unit !== "OPD" || req.userData.post !== "Dispenser") {
    throw new HttpError("You are not authorized", 401);
  }
  const drugName = req.body.drugName;
  const drugType = req.body.drugType;
  const availQuantity = req.body.availQuantity;
  const unit = req.body.unit;
  const dispenser = mongoose.Types.ObjectId(req.body.dispenser);

  const newDrug = new Drug({
    drugName,
    drugType,
    availQuantity,
    unit,
  });

  const date = new Date().getDate();
  const month = parseInt(new Date().getUTCMonth()) + 1;
  const year = new Date().getUTCFullYear();

  newDrug.drugActions.push({
    actionType: "add",
    amount: availQuantity,
    unit: unit,
    balance: availQuantity,
    remarks: "Added this drug to OPD drug store",
    dispenser: dispenser,
    date: date,
    month: month,
    year: year,
  });

  newDrug
    .save()
    .then(() => res.json("success"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get a drug
router.route("/drug/:id").get(auth, (req, res) => {
  if (req.userData.unit !== "OPD" || req.userData.post !== "Dispenser") {
    throw new HttpError("You are not authorized", 401);
  }
  Drug.findById(req.params.id)
    .then((drug) => res.json(drug))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update a drug
router.route("/update/:id").post(auth, (req, res) => {
  if (req.userData.unit !== "OPD" || req.userData.post !== "Dispenser") {
    throw new HttpError("You are not authorized", 401);
  }
  const drugName = req.body.drugName;
  const drugType = req.body.drugType;
  const availQuantity = req.body.availQuantity;
  const unit = req.body.unit;
  const dispenser = mongoose.Types.ObjectId(req.userData.userId);

  Drug.findById(req.params.id)
    .then((drug) => {
      drug.drugName = drugName;
      drug.drugType = drugType;
      drug.unit = unit;
      drug.dispenser = dispenser;

      drug
        .save()
        .then(() => res.json("success"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete a drug
router.route("/delete/:id").delete(auth, (req, res) => {
  if (req.userData.unit !== "OPD" || req.userData.post !== "Dispenser") {
    throw new HttpError("You are not authorized", 401);
  }
  Drug.findByIdAndDelete(req.params.id)
    .then((patient) => res.json("success"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//add a drug action
router.route("/drug_action/add/:id").post(auth, (req, res) => {
  if (req.userData.unit !== "OPD" || req.userData.post !== "Dispenser") {
    throw new HttpError("You are not authorized", 401);
  }

  const actionType = req.body.actionType;
  const amount = req.body.amount;
  const unit = req.body.unit;
  const remarks = req.body.remarks;
  let balance = 0.0;
  const dispenser = mongoose.Types.ObjectId(req.userData.userId);

  Drug.findById(req.params.id)
    .then((drug) => {
      if (actionType.trim().toLowerCase() === "add") {
        balance = drug.availQuantity + amount;
      }

      if (actionType.trim().toLowerCase() === "remove") {
        balance = drug.availQuantity - amount;
      }

      const date = new Date().getDate();
      const month = parseInt(new Date().getUTCMonth()) + 1;
      const year = new Date().getUTCFullYear();

      drug.drugActions.push({
        actionType: actionType,
        amount: amount,
        unit: unit,
        balance: balance,
        remarks: remarks,
        dispenser: dispenser,
        date: date,
        month: month,
        year: year,
      });

      drug.availQuantity = balance;

      drug
        .save()
        .then(() => res.json("success"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
