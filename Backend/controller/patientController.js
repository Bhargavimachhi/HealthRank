import Patient from "../models/Patient.js";
import patientSchemaValidation from "../validator/patientValidator.js";

export const addPatient = async (req, res) => {
  try {
    let { error } = patientSchemaValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let patient = new Patient(req.body);
    await patient
      .save()
      .then(() => {
        return res.status(200).json({ message: "success" });
      })
      .catch((err) => {
        return res.status(400).json({ message: "Error Occured", err });
      });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

export const getPatientUsingEmail = async(req, res) => {
  try {
    let { email } = req.body;

    if(!email) {
      return res.status(400).json({ message: "Enter Email" });
    }

    let patient = await Patient.findOne({email : email});
    return res.status(200).json({ message: "success", patient });
  }
  catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
}