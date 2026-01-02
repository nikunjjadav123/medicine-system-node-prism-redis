const express = require("express");
const auth = require('../middleware/auth.middleware');
const restrictTo = require("../middleware/restrictTo");
const {updateLimiter} = require("../middleware/rateLimiter");
const updateUserRole = require("../controllers/admin.controller");

const router = express.Router();

router.patch("/user/:id/role",auth,restrictTo('SUPER_ADMIN'),updateLimiter,updateUserRole);

module.exports = router;
