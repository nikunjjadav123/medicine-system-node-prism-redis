const express = require('express');
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");
const { createMedicineSchema } = require("../validators/medicine.schema");

const {
  createMedicine,
  GetAllMedicines,
  deleteMedicine,
} = require('../controllers/medicine.controller');

const medicineRoute = express.Router();

medicineRoute.post('/create',auth,validate(createMedicineSchema), createMedicine);
medicineRoute.delete('/delete/:id',auth, deleteMedicine);
medicineRoute.get('/all',auth, GetAllMedicines);

module.exports = medicineRoute;
