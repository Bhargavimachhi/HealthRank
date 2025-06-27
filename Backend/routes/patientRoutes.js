import express from "express";
import {
  addPatient,
  getPatientUsingEmail,
  getReportsOfPatient,
} from "../controller/patientController.js";
import {
  addReportToPatient,
  getReportById,
} from "../controller/reportController.js";
const patientRouter = express.Router();

patientRouter.post("/add", addPatient);
patientRouter.post("/:id/upload-report", addReportToPatient);
patientRouter.get("/:id/past-reports", getReportsOfPatient);
patientRouter.post("/email", getPatientUsingEmail);
patientRouter.get("/report/:reportId", getReportById);

export default patientRouter;
