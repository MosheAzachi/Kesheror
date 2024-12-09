const express = require("express");

const authMiddleware = require("./../middlewares/authMiddleware");
const productController = require("./../controllers/productController");

const router = express.Router();

router.get("/", productController.getProducts);
router.post("/", authMiddleware.protect, authMiddleware.restrict, productController.addProduct);
router.put("/:id", authMiddleware.protect, authMiddleware.restrict, productController.updateProduct);
router.delete("/:id", authMiddleware.protect, authMiddleware.restrict, productController.deleteProduct);

module.exports = router;
