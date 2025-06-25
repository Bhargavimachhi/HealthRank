import express from "express";
import { addPatient, getPatientUsingEmail } from "../controller/patientController.js";
import { addReportToPatient } from "../controller/reportController.js";
const patientRouter = express.Router();

patientRouter.post("/add", addPatient);
patientRouter.post("/:id/upload-report", addReportToPatient);
patientRouter.post("/email", getPatientUsingEmail)

export default patientRouter;
