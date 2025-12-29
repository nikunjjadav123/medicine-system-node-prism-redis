const express = require("express");
const auth = require("../middleware/auth.middleware");
const { register,login,profile,logout } = require("../controllers/auth.controller");

const userRoute = express.Router();

userRoute.post("/register",register);
userRoute.post("/login",login);
userRoute.get("/profile",auth,profile);
userRoute.post("/logout", auth, logout);

module.exports = userRoute;
