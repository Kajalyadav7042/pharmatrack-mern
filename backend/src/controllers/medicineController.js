const Medicine = require("../models/Medicine");
const Vendor = require("../models/Vendor");

const createMedicine = async (req, res) => {
  try {
    const {
      name,
      category,
      manufacturer,
      batchNumber,
      purchasePrice,
      sellingPrice,
      discount,
      quantity,
      reorderLevel,
      expiryDate,
      vendorId,
    } = req.body;

    const mongoose = require("mongoose");

if (!mongoose.Types.ObjectId.isValid(vendorId)) {
  return res.status(400).json({
    message: "Invalid Vendor ID",
  });
}

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    const medicineExists = await Medicine.findOne({
      batchNumber,
    });

    if (medicineExists) {
      return res.status(400).json({
        message: "Batch number already exists",
      });
    }

    const medicine = await Medicine.create({
      name,
      category,
      manufacturer,
      batchNumber,
      purchasePrice,
      sellingPrice,
      discount,
      quantity,
      reorderLevel,
      expiryDate,
      vendorId,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Medicine created successfully",
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMedicine,
};