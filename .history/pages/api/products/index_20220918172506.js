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
      res.status(201).json(product);
    } catch (error) {
      return res.status(405).send("Method not allowed.");
    }
  }
}
