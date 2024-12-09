const express = require("express");

const orderController = require("./../controllers/orderController");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware.protect, orderController.createOrder);
router.get("/", authMiddleware.protect, authMiddleware.restrict, orderController.getAllOrders);
router.patch("/:id/delivered", authMiddleware.protect, authMiddleware.restrict, orderController.setDelivered);
router.get("/user-orders", authMiddleware.protect, orderController.getUserOrders);

module.exports = router;
