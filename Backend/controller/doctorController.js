import Doctor from "../models/Doctor.js";
import doctorSchemaValidation from "../validator/doctorValidator.js";

export const addDoctor = async (req, res) => {
  try {
    let { error } = doctorSchemaValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let doctor = new Doctor(req.body);
    await doctor
      .save()
      .then(() => {
        return res.status(200).json({ message: "success" });
      })
      .catch((err) => {
        return res.status(400).json({ message: "Error Occured", err });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

export const getDoctorUsingEmail = async(req, res) => {
  try {
    let { email } = req.body;

    if(!email) {
      return res.status(400).json({ message: "Enter Email" });
    }

    let doctor = await Doctor.findOne({email : email});
    return res.status(200).json({ message: "success", doctor });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", error:err });
  }
}