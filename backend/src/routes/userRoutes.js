const express = require("express");

const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
} = require("../controllers/userController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.use(protect);
router.use(authorizeRoles("admin"));

router.get("/", getUsers);

router.post("/", createUser);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

module.exports = router;