const express = require("express");

const contactController = require("./../controllers/contactController");

const router = express.Router();

router.post("/", contactController.sendContactRequest);
router.get("/", contactController.getContacts);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
