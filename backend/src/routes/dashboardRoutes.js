const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.get("/stats", protect,authorizeRoles("admin"), getDashboardStats);

module.exports = router;