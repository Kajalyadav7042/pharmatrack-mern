const Medicine = require("../models/Medicine");
const Vendor = require("../models/Vendor");
const mongoose = require("mongoose")

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

const getMedicines = async (req, res) => {
  try {
    const {
      search,
      lowStock,
      outOfStock,
      expiringSoon,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
      vendorId,
    } = req.query;

    const query = {
      isDeleted: false,
    };

    // Search
    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (vendorId) {
  query.vendorId = vendorId;
}

    // Out Of Stock
    if (outOfStock === "true") {
      query.quantity = 0;
    }

    // Expiring Soon
    if (expiringSoon === "true") {
      const today = new Date();

      const next30Days = new Date();

      next30Days.setDate(today.getDate() + 30);

      query.expiryDate = {
        $gte: today,
        $lte: next30Days,
      };
    }

    // Low Stock
    // MongoDB field-to-field comparison
    if (lowStock === "true") {
      query.$expr = {
        $lte: ["$quantity", "$reorderLevel"],
      };
    }

    const totalRecords =
      await Medicine.countDocuments(query);

    const medicines = await Medicine.find(query)
      .populate("vendorId", "name")
      .populate("createdBy", "name email")
      .sort({
        [sortBy]: order === "asc" ? 1 : -1,
      })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({
      totalRecords,

      currentPage: Number(page),

      totalPages: Math.ceil(
        totalRecords / Number(limit)
      ),

      medicines,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMedicineById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Medicine ID",
      });
    }

    const medicine = await Medicine.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("vendorId", "name email phone")
      .populate("createdBy", "name email");

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Medicine ID",
      });
    }

    const medicine = await Medicine.findById(id);

    if (!medicine || medicine.isDeleted) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    if (
      req.body.purchasePrice &&
      req.body.sellingPrice &&
      Number(req.body.sellingPrice) <
        Number(req.body.purchasePrice)
    ) {
      return res.status(400).json({
        message:
          "Selling price cannot be less than purchase price",
      });
    }

    const updatedMedicine =
      await Medicine.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json({
      message: "Medicine updated successfully",
      medicine: updatedMedicine,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Medicine ID",
      });
    }

    const medicine = await Medicine.findById(id);

    if (!medicine || medicine.isDeleted) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    medicine.isDeleted = true;

    await medicine.save();

    res.status(200).json({
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMedicine,getMedicines,getMedicineById,updateMedicine,deleteMedicine
};