const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
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

        sellingPrice: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sale", saleSchema);