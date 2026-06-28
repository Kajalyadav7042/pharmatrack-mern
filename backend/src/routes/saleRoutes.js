const express = require("express");

const router = express.Router();

const {
  createSale, getSales
} = require("../controllers/saleController");

const protect = require("../middlewares/authMiddleware");

router.post("/", protect, createSale);
router.get("/", protect, getSales);

module.exports = router;