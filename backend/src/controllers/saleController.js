const Sale = require("../models/Sale");
const Medicine = require("../models/Medicine");

const createSale = async (req, res) => {
  try {
    const { medicines } = req.body;

    if (!medicines || medicines.length === 0) {
      return res.status(400).json({
        message: "Please add medicines",
      });
    }

    let totalAmount = 0;

    const saleMedicines = [];

    for (const item of medicines) {
      const medicine = await Medicine.findById(
        item.medicineId
      );

      if (!medicine) {
        return res.status(404).json({
          message: `Medicine not found: ${item.medicineId}`,
        });
      }

      if (item.quantity <= 0) {
        return res.status(400).json({
          message: "Quantity must be greater than 0",
        });
      }

      if (medicine.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${medicine.name}`,
        });
      }

      const sellingPrice =
        medicine.sellingPrice;

      const subtotal =
        item.quantity * sellingPrice;

      totalAmount += subtotal;

      saleMedicines.push({
        medicineId: item.medicineId,
        quantity: item.quantity,
        sellingPrice,
      });

      medicine.quantity -= item.quantity;

      await medicine.save();
    }

    const sale = await Sale.create({
      medicines: saleMedicines,

      totalAmount,

      soldBy: req.user._id,
    });

    res.status(201).json({
      message: "Sale created successfully",
      sale,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSale,
};