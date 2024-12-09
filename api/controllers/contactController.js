const Contact = require("../models/contactModel");
exports.sendContactRequest = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    if (!fullName || !email || !message) {
      return res.status(400).json({ message: "יש למלא את כל השדות הנדרשים" });
    }
    await Contact.create({ fullName, email, message });
    res.status(200).json({ message: "הפניה נשלחה בהצלחה. תודה שפנית אלינו!" });
  } catch (error) {
    res.status(500).json({ message: "שגיאה בשרת. נסה שוב מאוחר יותר." });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ message: "שגיאה בטעינת הפניות" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "הפניה לא נמצאה" });
    }
    res.status(200).json({ message: "הפניה נמחקה בהצלחה" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "שגיאה במחיקת הפניה" });
  }
};
