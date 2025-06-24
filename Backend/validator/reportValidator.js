import joi from "joi";

const reportSchemaValidation = joi.object({
  patient: joi.string().length(24).hex().required().messages({
    "string.length": "ObjectId must be 24 characters long.",
    "string.hex": "ObjectId must be a valid hexadecimal string.",
    "any.required": "ObjectId is required.",
  }),
  result: joi.object().required(),
  type: joi
    .string()
    .valid(
      "bloodSugar",
      "bloodCount",
      "serumCreatinine",
      "urine",
      "electrolyte"
    )
    .required(),
  triageLevel: joi
    .string()
    .valid("critical", "abnormal", "stable", "normal")
    .required(),
  date: joi.date().iso().required(),
});

export default reportSchemaValidation;
