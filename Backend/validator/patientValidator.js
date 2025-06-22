import joi from "joi";

const patientSchemaValidation = joi.object({
  email: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().required(),
  gender: joi.string().valid("female", "male").required(),
  birthday: joi.date().iso().required(),
});

export default patientSchemaValidation;
