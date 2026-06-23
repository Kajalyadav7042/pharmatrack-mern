const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const medicineRoutes= require("./routes/medicineRoutes")
const orderRoutes = require("./routes/orderRoutes")


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/medicines",medicineRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/orders", orderRoutes)


module.exports = app;