import dbConnect from "../../../lib/mongo";

import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
  }

  if (method === "Post") {
    try {
      const product = await Product.create(req.body);
      res.json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
