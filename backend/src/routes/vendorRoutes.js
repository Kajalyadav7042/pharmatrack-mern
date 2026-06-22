const express = require("express");

const router = express.Router();

const { createVendor,getVendorById,getVendors,updateVendor,deleteVendor } = require("../controllers/vendorController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.use(protect)
router.get("/",getVendors)
router.get("/:id", getVendorById);

router.post(
  "/",
  authorizeRoles("admin"),
  createVendor
);

router.put(
  "/:id",
  authorizeRoles("admin"),
  updateVendor
);

router.delete(
  "/:id",
  authorizeRoles("admin"),
  deleteVendor
);

module.exports = router;