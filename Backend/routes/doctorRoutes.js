import express from "express";
import { getDoctorUsingEmail } from "../controller/doctorController.js";
const doctorRouter = express.Router();

doctorRouter.post("/email", getDoctorUsingEmail);

export default doctorRouter;
