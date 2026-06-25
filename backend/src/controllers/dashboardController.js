const Medicine = require("../models/Medicine");
const Vendor = require("../models/Vendor");
const Sale = require("../models/Sale");

const getDashboardStats = async (req, res) => {
  try {

    // Total Medicines
    const totalMedicines = await Medicine.countDocuments({
      isDeleted: false,
    });

    // Total Vendors
    const totalVendors = await Vendor.countDocuments();

    // Low Stock Medicines
    const medicines = await Medicine.find({
      isDeleted: false,
    });

    const lowStockCount = medicines.filter(
      (medicine) =>
        medicine.quantity <= medicine.reorderLevel
    ).length;

    // Expiring Soon (Next 30 Days)
    const today = new Date();

    const next30Days = new Date();

    next30Days.setDate(today.getDate() + 30);

    const expiringSoonCount =
      await Medicine.countDocuments({
        isDeleted: false,

        expiryDate: {
          $gte: today,
          $lte: next30Days,
        },
      });

    // Today's Sales

    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();

    endOfDay.setHours(23, 59, 59, 999);

    const todaySales = await Sale.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: null,

          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    res.status(200).json({
      totalMedicines,

      totalVendors,

      lowStockCount,

      expiringSoonCount,

      todaySales:
        todaySales.length > 0
          ? todaySales[0].total
          : 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};