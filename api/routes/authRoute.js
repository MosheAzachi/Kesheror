const express = require("express");

const authController = require("./../controllers/authController");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware.protect, authMiddleware.restrict, authController.getUsers);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.getCurrentUser);
router.get("/logout", authController.logout);
router.patch("/:id/set-admin", authMiddleware.protect, authMiddleware.restrict, authController.setAdmin);
router.delete("/:id", authMiddleware.protect, authMiddleware.restrict, authController.deleteUser);

module.exports = router;
