const express = require("express");


const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile
} = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

router.get("/profile", protect, getProfile);

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;