const Vendor = require("../models/Vendor");

const createVendor = async (req, res) => {
  try {
    const { name, email, phone, address, gstNumber } = req.body;

    const vendorExists = await Vendor.findOne({
      $or: [{ email }, { gstNumber }],
    });

    if (vendorExists) {
      return res.status(400).json({
        message: "Vendor already exists",
      });
    }

    const vendor = await Vendor.create({
      name,
      email,
      phone,
      address,
      gstNumber,
    });

    res.status(201).json({
      message: "Vendor created successfully",
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();

    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      message: "Vendor updated successfully",
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(
      req.params.id
    );

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      message: "Vendor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
};