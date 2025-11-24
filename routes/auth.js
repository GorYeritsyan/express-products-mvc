const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

const authController = new AuthController();

// get login page
router.get("/login", authController.getLogin);

// get register page
router.get("/register", authController.getRegister);

// login post route
router.post("/login", authController.login);
// register post route
router.post("/register", authController.register);

module.exports = router;
