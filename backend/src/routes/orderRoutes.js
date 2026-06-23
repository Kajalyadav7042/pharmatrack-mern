const express = require("express");

const router = express.Router();

const {
  createOrder, getOrders, updateOrderStatus
} = require("../controllers/orderController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.use(protect)

router.post(
  "/",
  authorizeRoles("admin"),
  createOrder
);

router.get("/",getOrders)


router.put("/:id/status",authorizeRoles("admin"),updateOrderStatus)

module.exports = router;