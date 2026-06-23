const express = require("express");

const router = express.Router();

const {
  createMedicine, getMedicines, getMedicineById, updateMedicine,deleteMedicine
} = require("../controllers/medicineController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.use(protect)

router.post(
  "/",
  authorizeRoles("admin"),
  createMedicine
);

router.get("/",getMedicines)
router.get("/:id", getMedicineById);
router.put(
  "/:id",
  authorizeRoles("admin"),
  updateMedicine
);

router.delete(
  "/:id",
  authorizeRoles("admin"),
  deleteMedicine
);

module.exports = router;