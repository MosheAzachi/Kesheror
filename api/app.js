const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const contactRouter = require("./routes/contactRoute");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const DB = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/contact", contactRouter);

module.exports = app;
