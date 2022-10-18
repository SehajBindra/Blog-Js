import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
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

    username: {
      type: String,
      required: true,
    },

    categories: {
      type: Array,
      required: false,
    },

    date: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
