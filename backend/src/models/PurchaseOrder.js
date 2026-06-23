const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    medicines: [
  {
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    unitPrice: {
      type: Number,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },
  },
],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Delivered", "Cancelled"],
      default: "Pending",
    },

    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isStockUpdated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
