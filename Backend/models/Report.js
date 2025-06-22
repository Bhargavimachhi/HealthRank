import mongoose from "mongoose";

let reportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  type: {
    type: String,
    enum: {
      values: [
        "bloodSugar",
        "bloodCount",
        "serumCreatinine",
        "urine",
        "electrolyte",
      ],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  result: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  remarks: {
    type: String,
    default: null,
  },
  triageLevel: {
    type: String,
    enum: {
      values: ["critical", "abnormal", "stable", "normal"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
});

const Report = mongoose.model("Report", reportSchema);
export default Report;
