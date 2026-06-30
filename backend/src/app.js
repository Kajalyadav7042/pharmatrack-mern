const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const medicineRoutes= require("./routes/medicineRoutes")
const orderRoutes = require("./routes/orderRoutes")
const saleRoutes = require("./routes/saleRoutes")
const dashboardRoutes= require("./routes/dashboardRoutes")
const userRoutes = require("./routes/userRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/medicines",medicineRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);  
app.use("/api/orders", orderRoutes)
app.use("/api/sales", saleRoutes);
app.use("/api/dashboard",dashboardRoutes)
app.use("/api/users",userRoutes)



module.exports = app;