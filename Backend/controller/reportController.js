import Report from "../models/Report.js";
import Patient from "../models/Patient.js";
import reportSchemaValidation from "../validator/reportValidator.js";

export const addReportToPatient = async (req, res) => {
  try {
    let { error } = reportSchemaValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let {id} = req.params;
    let patient = await Patient.findById(id);

    if (!patient) {
      return res.status(400).json({ message: "Patient Does not exist" });
    }

    let report = new Report(req.body);
    patient.reports[report.type].push(report);
    await report
      .save()
      .then(async () => {
        await patient.save();
        return res.status(200).json({ message: "success",reportId: report._id  });
      })
      .catch((err) => {
        return res.status(400).json({ message: "Error Occured", err });
      });
    return;
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

export const getReportById = async (req, res) => {
  try {
    const { reportId } = req.params;
    if (!reportId) {
      return res.status(400).json({ message: "Report ID is required" });
    }

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json(report);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
