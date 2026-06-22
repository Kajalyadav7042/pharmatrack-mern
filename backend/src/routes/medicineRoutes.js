const express = require("express");

const router = express.Router();

const {
  createMedicine,
} = require("../controllers/medicineController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createMedicine
);

module.exports = router;