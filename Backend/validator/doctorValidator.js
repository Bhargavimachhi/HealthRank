import joi from "joi";

const doctorSchemaValidation = joi.object({
  email: joi.string().required().email(),
  name: joi.string().required(),
  password: joi.string()
  .min(6)
  .pattern(new RegExp('(?=.*[A-Z])'))        // at least one uppercase letter
  .pattern(new RegExp('(?=.*[!@#$%^&*])'))   // at least one special character
  .required()
  .messages({
    'string.min': 'Password must be at least 6 characters long.',
    'string.pattern.base': 'Password must contain at least one uppercase letter and one special character.',
    'any.required': 'Password is required.'
  }),
  gender: joi.string().valid("female", "male").required(),
});

export default doctorSchemaValidation;
