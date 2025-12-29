const express = require("express");
const { createMedicine,GetAllMedicines,deleteMedicine } = require("../controllers/medicine.controller");

const medicineRoute = express.Router();

medicineRoute.post("/create",createMedicine);
medicineRoute.delete("/delete/:id",deleteMedicine);
medicineRoute.get("/all",GetAllMedicines);

module.exports = medicineRoute;
