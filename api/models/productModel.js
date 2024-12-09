const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "שם המוצר נדרש"],
      trim: true,
      minlength: [3, "שם המוצר חייב להיות לפחות 3 תווים"],
    },
    description: {
      type: String,
      required: [true, "תיאור המוצר נדרש"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "מחיר המוצר נדרש"],
      min: [0, "מחיר המוצר לא יכול להיות שלילי"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "הנחה לא יכולה להיות שלילית"],
      max: [100, "הנחה לא יכולה להיות יותר מ-100%"],
    },
    image: {
      type: String,
      required: [true, "תמונת המוצר נדרשת"],
      validate: {
        validator: function (url) {
          return /^https?:\/\/.+/i.test(url);
        },
        message: "כתובת התמונה לא תקינה",
      },
      trim: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
