import { connectToDatabase } from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method } = req;

  connectToDatabase();

  if (method === "GET") {
  }

  if (method === "Post") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json(err);
    }
  }
  res.json({ Product });
}
