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
const {createLimiter,deleteLimiter,readLimiter} = require("../middleware/rateLimiter");

const medicineRoute = express.Router();

medicineRoute.post('/create',auth,restrictTo("PHARMACIST"),createLimiter,validate(createMedicineSchema), createMedicine);
medicineRoute.delete('/delete/:id',auth,restrictTo("PHARMACIST"),deleteLimiter,deleteMedicine);
medicineRoute.get('/all',auth,restrictTo("PHARMACIST"),readLimiter,GetAllMedicines);

module.exports = medicineRoute;
