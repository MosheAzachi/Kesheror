const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {
  try {
    const { items, phoneNumber, address, fullName, totalPrice, paymentMethod } = req.body;
    const userId = req.user._id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "ההזמנה חייבת להכיל לפחות מוצר אחד" });
    }

    if (!phoneNumber || !address || !fullName) {
      return res.status(400).json({ message: "יש למלא את כל השדות (שם מלא, מספר טלפון, כתובת)" });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: "יש לבחור שיטת תשלום" });
    }

    const newOrder = await Order.create({
      user: userId,
      items: items.map((productId) => ({ product: productId })),
      phoneNumber,
      address,
      fullName,
      totalPrice,
      paymentMethod,
    });

    res.status(201).json({ message: "ההזמנה נוצרה בהצלחה", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "שגיאה ביצירת ההזמנה" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders and populate product details
    const orders = await Order.find()
      .populate({
        path: "items.product",
        select: "id name price", // Select only the required fields from Product
      })
      .populate({
        path: "user",
        select: "name address", // Optionally include user details
      });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "לא נמצאו הזמנות" });
    }
    res.status(200).json({ message: "רשימת הזמנות", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "שגיאה בשליפת ההזמנות" });
  }
};

exports.setDelivered = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "הזמנה לא קיימת" });
    }

    order.status = "Delivered";
    await order.save();

    res.status(200).json({ message: "סטטוס הזמנה שונה בהצלחה", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "שגיאה בשינוי סטטוס הזמנה" });
  }
};

exports.getUserOrders = async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await Order.find({ user: userId }).populate("items.product", "name price").sort({ createdAt: 1 });
    res.status(200).json({ message: "הזמנות נטענו בהצלחה", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "שגיאה בטעינת ההזמנות" });
  }
};
