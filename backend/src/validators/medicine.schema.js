const Joi = require("joi");

const createMedicineSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  expiryDate: Joi.date().greater("now").required()
});

module.exports = createMedicineSchema;
