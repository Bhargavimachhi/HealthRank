import express from "express";
import { addPatient } from "../controller/patientController.js";
const patientRouter = express.Router();

patientRouter.post("/add", addPatient);

export default patientRouter;