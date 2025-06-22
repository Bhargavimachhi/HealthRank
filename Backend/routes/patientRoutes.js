import express from "express";
import { addPatient } from "../controller/patientController.js";
import { addReportToPatient } from "../controller/reportController.js";
const patientRouter = express.Router();

patientRouter.post("/add", addPatient);
patientRouter.post("/upload-report", addReportToPatient);

export default patientRouter;
