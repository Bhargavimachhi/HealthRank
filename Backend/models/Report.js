import mongoose from "mongoose";

let reportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
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
  triageLevel : {
    type: String,
    required : true,
  },
  image : {
    type: String,
    default: null,
  },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
