const PurchaseOrder = require("../models/PurchaseOrder");
const Vendor = require("../models/Vendor");
const Medicine = require("../models/Medicine");
const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  try {
    const { vendorId, medicines } = req.body;
    

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

    if (!medicines || medicines.length === 0) {
      return res.status(400).json({
        message: "Please add medicines",
      });
    }


    let totalAmount = 0;

const orderMedicines = [];

    for (const item of medicines) {
  const medicine = await Medicine.findById(
    item.medicineId
  );

  if (!medicine) {
    return res.status(404).json({
      message: `Medicine not found: ${item.medicineId}`,
    });
  }

  if (medicine.vendorId.toString() !== vendorId) {
  return res.status(400).json({
    message: `${medicine.name} does not belong to selected vendor`,
  });
}

  if (item.quantity <= 0) {
    return res.status(400).json({
      message: "Quantity must be greater than 0",
    });
  }

  const unitPrice = medicine.purchasePrice;

  const subtotal =
    item.quantity * unitPrice;

  totalAmount += subtotal;

  orderMedicines.push({
    medicineId: item.medicineId,
    quantity: item.quantity,
    unitPrice,
    subtotal,
  });
}

    const order = await PurchaseOrder.create({
  vendorId,

  medicines: orderMedicines,

  totalAmount,

  orderedBy: req.user._id,

  status: "Pending",
});

    res.status(201).json({
      message: "Purchase Order Created",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find()
      .populate("vendorId", "name email phone")
      .populate("orderedBy", "name email")
      .populate(
        "medicines.medicineId",
        "name batchNumber quantity"
      );

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        message: "Invalid Order ID",
      });
    }

    const order = await PurchaseOrder.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const validStatuses = [
      "Pending",
      "Approved",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    if (
      order.status === "Pending" &&
      status === "Delivered"
    ) {
      return res.status(400).json({
        message:
          "Order must be approved before delivery",
      });
    }

    if (
      status === "Delivered" &&
      order.isStockUpdated
    ) {
      return res.status(400).json({
        message:
          "Stock already updated for this order",
      });
    }

    if (status === "Delivered") {
      for (const item of order.medicines) {
        const medicine =
          await Medicine.findById(
            item.medicineId
          );

        if (medicine) {
          medicine.quantity += item.quantity;

          await medicine.save();
        }
      }

      order.isStockUpdated = true;
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder, getOrders, updateOrderStatus
};