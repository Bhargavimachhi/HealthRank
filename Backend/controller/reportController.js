import Report from "../models/Report.js";
import Patient from "../models/Patient.js";
import reportSchemaValidation from "../validator/reportValidator.js";

export const addReportToPatient = async (req, res) => {
  try {
    let { error } = reportSchemaValidation.validate(req.body);

    if (error) {
      console.log(error);
      return res.status(400).json({ message: error.details[0].message });
    }
    let patientId = req.body.patient;
    let patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(400).json({ message: "Patient Does not exist" });
    }

    let report = new Report(req.body);
    patient.reports[report.type].push(report);
    await report
      .save()
      .then(async () => {
        await patient.save();
        return res.status(200).json({ message: "success" });
      })
      .catch((err) => {
        return res.status(400).json({ message: "Error Occured", err });
      });
    return;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
