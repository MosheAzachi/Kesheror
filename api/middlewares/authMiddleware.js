const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "אתה לא מחובר, נא להתחבר" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "משתמש לא נמצא" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "אימות נכשל" });
  }
};

exports.restrict = (req, res, next) => {
  if (req.user.role != "admin") {
    return res.status(403).json({ message: "אין לך הרשאה לבצע פעולה זו" });
  }
  next();
};
