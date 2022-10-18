import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    _id: {
      type: [String],
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },

    desc: {
      type: String,
      required: true,
      unique: true,
    },

    img: {
      type: String,
      required: true,
    },

    date: {
      type: [Number],
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
