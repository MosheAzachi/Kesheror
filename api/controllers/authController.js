const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = (userId, res) => {
  const token = createToken(userId);
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ message: "אנא מלא פרטים חסרים" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "משתמש עם אימייל זה כבר קיים" });
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
    sendToken(newUser._id, res);
    res.status(201).json({
      message: "המשתמש נרשם בהצלחה!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "אנא מלא פרטים חסרים" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "אימייל או סיסמא שגויים" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "אימייל או סיסמא שגויים" });
    }
    sendToken(user._id, res);
    res.status(200).json({
      message: "התחברת בהצלחה",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(404).json({ message: "לא נמצאו משתמשים" });
    }
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(401).json({ message: "טוקן אינו חוקי" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "לא נמצא טוקן" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "משתמש לא נמצא" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "טוקן אינו חוקי" });
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 0,
  });
  res.status(200).json({ message: "התנתקת בהצלחה" });
};

exports.setAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "משתמש לא נמצא" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "המשתמש כבר מנהל" });
    }
    user.role = "admin";
    await user.save();
    res.status(200).json({ message: "התפקיד שונה למנהל בהצלחה" });
  } catch (error) {
    res.status(500).json({ message: "שגיאה בשינוי הרשאה" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user.role === "admin") {
      return res.status(403).json({ message: "לא ניתן למחוק משתמש עם תפקיד מנהל" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "המשתמש נמחק בהצלחה",
    });
  } catch (error) {
    res.status(500).json({ message: "שגיאה במחיקת משתמש" });
  }
};
