const express = require("express");

const contactController = require("./../controllers/contactController");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router.post("/", contactController.sendContactRequest);
router.get("/", authMiddleware.protect, authMiddleware.restrict, contactController.getContacts);
router.delete("/:id", authMiddleware.protect, authMiddleware.restrict, contactController.deleteContact);

module.exports = router;
