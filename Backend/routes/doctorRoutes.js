import express from "express";
import { addDoctor, getDoctorUsingEmail } from "../controller/doctorController.js";
const doctorRouter = express.Router();

doctorRouter.post("/add", addDoctor);
doctorRouter.post("/email", getDoctorUsingEmail);

export default doctorRouter;
