import Doctor from "../models/Doctor.js";

export const getDoctorUsingEmail = async(req, res) => {
  try {
    let { email } = req.body;

    if(!email) {
      return res.status(400).json({ message: "Enter Email" });
    }

    let patient = await Doctor.findOne({email : email});
    return res.status(200).json({ message: "success", patient });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", error:err });
  }
}