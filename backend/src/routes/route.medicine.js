const express = require('express');
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");
const { createMedicineSchema } = require("../validators/medicine.schema");

const {
  createMedicine,
  GetAllMedicines,
  deleteMedicine,
} = require('../controllers/medicine.controller');

const restrictTo = require("../middleware/restrictTo");

const medicineRoute = express.Router();

medicineRoute.post('/create',auth,restrictTo("PHARMACIST"),validate(createMedicineSchema), createMedicine);
medicineRoute.delete('/delete/:id',auth,restrictTo("PHARMACIST"),deleteMedicine);
medicineRoute.get('/all',auth,restrictTo("PHARMACIST"),GetAllMedicines);

module.exports = medicineRoute;
