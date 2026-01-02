const express = require("express");
const auth = require('../middleware/auth.middleware');
const restrictTo = require("../middleware/restrictTo");
const {updateLimiter} = require("../middleware/rateLimiter");
const updateUserRole = require("../controllers/admin.controller");
// const { uploadProfile } = require("../middleware/upload");

const router = express.Router();

router.patch("/user/:id/role",auth,restrictTo('ADMIN'),updateLimiter,updateUserRole);
// router.patch("/profile-photo",auth,restrictTo('ADMIN','DOCTOR','PHARMACIST'),updateLimiter,uploadProfile);

module.exports = router;
