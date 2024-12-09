const Product = require("../models/productModel");

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, discount, image } = req.body;
    if (!name || !description || !price || !image) {
      return res.status(400).json({ message: "כל השדות הנדרשים צריכים להיות מלאים" });
    }
    const newProduct = await Product.create({
      name,
      description,
      price,
      discount: discount || 0,
      image,
    });
    res.status(201).json({
      message: "המוצר נוסף בהצלחה",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      return res.status(404).json({ message: "לא נמצאו מוצרים" });
    }
    res.status(200).json({
      message: "המוצרים נטענו בהצלחה",
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "שגיאה בשרת בעת שליפת המוצרים" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "המוצר נמחק בהצלחה",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const newProduct = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "מוצר לא נמצא" });
    }
    res.status(200).json({
      message: "המוצר עודכן בהצלחה",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
