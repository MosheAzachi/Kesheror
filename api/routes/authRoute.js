const express = require("express");

const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/", authController.getUsers);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.getCurrentUser);
router.get("/logout", authController.logout);
router.patch("/:id/set-admin", authController.setAdmin);
router.delete("/:id", authController.deleteUser);

module.exports = router;
