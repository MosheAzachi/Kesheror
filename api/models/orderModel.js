const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    },
  ],
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  fullName: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["creditCard", "paypal", "cash"],
  },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
