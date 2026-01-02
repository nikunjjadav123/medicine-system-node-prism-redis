const express = require('express');
const auth = require('../middleware/auth.middleware');
const {
  register,
  login,
  profile,
  logout,
  updateProfile
} = require('../controllers/auth.controller');
const loginSchema = require("../validators/auth.schema");
const validate = require("../middleware/validate");
const {createLimiter} = require("../middleware/rateLimiter");
const upload = require( "../middleware/upload.js");
const userRoute = express.Router();

userRoute.post('/register', register);
userRoute.post('/login',createLimiter,validate(loginSchema),login);
userRoute.get('/profile',auth, profile);
userRoute.post('/logout', auth, logout);

userRoute.put("/edit-profile",auth,upload.single("profile_photo"),updateProfile);


module.exports = userRoute;
