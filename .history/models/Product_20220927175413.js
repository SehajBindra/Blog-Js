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
    Userimg: {
      type: String,
      default: "",
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
