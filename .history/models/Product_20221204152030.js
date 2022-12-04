import mongoose from "mongoose";

const URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);
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

    slug: { type: String, slug: title },

    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

ProductSchema.pre("save", function (next) {
  this.slug = this.title.split(" ").join("-");
  next();
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
