const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

//import created routes here
const usersRouter = require("./routes/users");
const opdTicketClerkRouter = require("./routes/opdTicketClerk");
const opdConsultantRouter = require("./routes/opdConsultant");
const opdDispenserRouter = require("./routes/opdDispenser");
const admissionDoctorRouter = require("./routes/admissionDoctor");
const opdInchargeRouter = require("./routes/opdIncharge");
const employeeRouter = require("./routes/employee");
const individualScheduleRouter = require("./routes/individualSchedule");
const monthlyScheduleRouter = require("./routes/monthlySchedule");
const generalinventoryRouter = require("./routes/generalinventory");
const SurgicalinventoryRouter = require("./routes/surgicalinventory");
const plantRouter = require("./routes/plant");
const scheduleRouter = require("./routes/schedule");
const drugRouter = require("./routes/drug");
const IngredientsRouter = require("./routes/ingredient");
const IssueTreatmentRouter = require("./routes/IssueTreatment");
const dietRouter = require("./routes/diet");
const groceryRouter = require("./routes/grocery");
const dischargeRouter = require("./routes/discharge");
const transferRouter = require("./routes/transfer");
const visitRouter = require("./routes/visit");
const issueDrugRouter = require("./routes/issuedrug");
const addDrugRouter = require("./routes/drugadd");
const wardpatientRouter = require("./routes/wardPatient");
const wardpatientDietRouter = require("./routes/wardDiet");
const wardpatientPresRouter = require("./routes/wardpres");
const clinicpatientadd = require("./routes/cliniclist");
const clinicpatientPres = require("./routes/clinicPres");

//assign routes to use
app.use("/api/users", usersRouter);
app.use("/api/opd_tc", opdTicketClerkRouter);
app.use("/api/opd_consultant", opdConsultantRouter);
app.use("/api/opd_dispenser", opdDispenserRouter);
app.use("/api/admission", admissionDoctorRouter);
app.use("/api/opd_incharge", opdInchargeRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/individualSchedule", individualScheduleRouter);
app.use("/api/monthlySchedule", monthlyScheduleRouter);
app.use("/api/generalinventory", generalinventoryRouter);
app.use("/api/surgicalinventory", SurgicalinventoryRouter);
app.use("/api/plant", plantRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/drug", drugRouter);
app.use("/api/ingredient", IngredientsRouter);
app.use("/api/IssueTreatment", IssueTreatmentRouter);
app.use("/api/diet", dietRouter);
app.use("/api/grocery", groceryRouter);
app.use("/api/clinic", clinicpatientadd);
app.use("/api/clinicpres", clinicpatientPres);
app.use("/api/wardprescription", wardpatientPresRouter);
app.use("/api/discharge", dischargeRouter);
app.use("/api/transfer", transferRouter);
app.use("/api/wardvisit", visitRouter);
app.use("/api/issue", issueDrugRouter);
app.use("/api/drugadd", addDrugRouter);
app.use("/api/wardpatient", wardpatientRouter);
app.use("/api/warddiet", wardpatientDietRouter);

//error handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
