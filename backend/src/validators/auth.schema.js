const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
});

module.exports = loginSchema;
