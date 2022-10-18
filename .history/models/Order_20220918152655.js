import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      unique: true,
    },

    address: {
      type: String,
      required: true,
      unique: true,
    },

    img: {
      type: String,
      required: true,
    },

    status: {
      type: [Number],
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
