import mongoose from "mongoose";

let reportSchema = {
  type: [mongoose.Schema.Types.ObjectId],
  ref: "Report",
  default: [],
};

let patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  reports: {
    bloodSugar: [reportSchema],
    bloodCount: [reportSchema],
    serumCreatinine: [reportSchema],
    urine: [reportSchema],
    electrolyte: [reportSchema],
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["female", "male"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
