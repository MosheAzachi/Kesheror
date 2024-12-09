const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
