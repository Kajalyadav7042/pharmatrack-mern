const express = require("express");

const router = express.Router();

const {
  createSale,
} = require("../controllers/saleController");

const protect = require("../middlewares/authMiddleware");

router.post("/", protect, createSale);

module.exports = router;