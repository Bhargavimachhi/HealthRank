import joi from "joi";

const reportSchemaValidation = joi.object({
    patient : joi.required(),
    result : joi.object().required(),
    triageLevel : joi.string().required(),
    date : joi.date().iso().required(),
});

module.exports = reportSchemaValidation;