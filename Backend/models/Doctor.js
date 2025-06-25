import mongoose from "mongoose";

let doctorSchema = new mongoose.Schema({
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
  gender: {
    type: String,
    enum: {
      values: ["female", "male"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  requests : {
    type:[Object],
    default:[],
  }
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
