import express from "express";
const router = express.Router();
//import controllers
const { register, login } = require("../controllers/auth");

//routes
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
