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
    },

    img: {
      type: String,
      required: true,
    },
    userimg: {
      type: String,
      unique: true,
      required: true,
    },

    category: {
      type: Array,
      required: true,
    },

    slug: { type: String, required: true },

    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
